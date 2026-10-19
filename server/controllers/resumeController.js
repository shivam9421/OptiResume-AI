import Resume from "../models/Resume.js";
import imagekit from "../configs/imageKit.js";
import fs from "fs";


/* =========================================================
   CREATE RESUME
   POST /api/resumes/create
========================================================= */
export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;


    // create new resume
    const newResume = await Resume.create({
      userId,
      title: title || "Untitled Resume",
    });

    // return success message
    return res.status(201).json({ message: 'Resume created successfully' ,resume : newResume });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* =========================================================
   DELETE RESUME
   DELETE /api/resumes/delete
========================================================= */
export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const resume = await Resume.findOneAndDelete({
      userId,
      _id: resumeId,
    });

    // resume not found
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* =========================================================
   controller to get user resume by id
   GET: /api/resumes/get
========================================================= */
export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const resume = await Resume.findOne({
      userId,
      _id: resumeId,
    });

    // resume not found
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined;
    // return success message
    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* =========================================================
   GET RESUME by id public
   GET /api/resumes/public
========================================================= */
export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findOne({
      public: true,
      _id: resumeId,
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* =========================================================
   UPDATE RESUME
   controller to update resume
   PUT /api/resumes/update
========================================================= */
export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId, resumeData, removeBackground } = req.body;
    const image = req.file;

    console.log("REQ BODY:", req.body);
    console.log("REQ FILE:", req.file);


    /* ---------------- Parse resumeData safely ---------------- */
    let resumeDataCopy;
    if (typeof resumeData === "string") {
      resumeDataCopy = JSON.parse(resumeData);
    } else {
      resumeDataCopy = { ...resumeData };
    }

    /* ---------------- Handle image upload ---------------- */
    if (image) {
      // create stream from temp file
      const stream = fs.createReadStream(image.path);

      const uploaded = await imagekit.upload({
        file: stream,
        fileName: `profile_${Date.now()}.png`,
        folder: "user-resumes",
        transformation: {
          pre:
            "w-300,h-300,fo-face,z-0.75" +
            (removeBackground ? ",e-bgremove" : ""),
        },
      });

      // ensure personal_info exists
      if (!resumeDataCopy.personal_info) {
        resumeDataCopy.personal_info = {};
      }

      // save image URL
      resumeDataCopy.personal_info.image = uploaded.url;

      // cleanup temp file
      try {
        fs.unlinkSync(image.path);
      } catch (err) {
        console.warn("Temp file cleanup failed:", err.message);
      }
    }

    /* ---------------- Update resume in MongoDB ---------------- */
    const resume = await Resume.findOneAndUpdate(
      { _id: resumeId, userId },
      resumeDataCopy,
      { new: true }
    );

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    /* ---------------- Success response ---------------- */
    return res.status(200).json({
      message: "Resume updated successfully",
      resume,
    });
  } catch (error) {
    console.error("Update resume error:", error);
    return res.status(500).json({
      message: "Failed to save resume",
      error: error.message,
    });
  }
};