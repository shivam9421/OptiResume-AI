import { GoogleGenerativeAI } from "@google/generative-ai";
import Resume from "../models/Resume.js";

/* =========================================================
   Gemini Client
========================================================= */

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const textModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

/* =========================================================
   Enhance Professional Summary
========================================================= */

export const enhanceProfessionalSummary = async (req, res) => {
  try {
    console.log("GEMINI KEY:", process.env.GEMINI_API_KEY);
    const { userContent } = req.body;

    if (!userContent || userContent.trim().length < 10) {
      return res.status(400).json({
        message: "Invalid summary input",
      });
    }

    const prompt = `
Rewrite this resume professional summary.

Rules:
- ATS friendly
- Professional tone
- Maximum 2 sentences
- Improve clarity and impact

Summary:
${userContent}
`;

    const result = await textModel.generateContent(prompt);
    const text = result.response.text();

    res.status(200).json({
      enhancedContent: text.trim(),
    });

  } catch (error) {
    console.error("SUMMARY ERROR:", error);

    res.status(500).json({
      message: "AI enhancement failed",
    });
  }
};

/* =========================================================
   Enhance Job Description
========================================================= */

export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent || userContent.trim().length < 10) {
      return res.status(400).json({
        message: "Invalid job description input",
      });
    }

    const prompt = `
Rewrite this resume job description bullet point.

Rules:
- Start with strong action verbs
- Highlight measurable impact
- ATS optimized
- Keep concise

Text:
${userContent}
`;

    const result = await textModel.generateContent(prompt);
    const text = result.response.text();

    res.status(200).json({
      enhancedContent: text.trim(),
    });

  } catch (error) {
    console.error("JOB DESC ERROR:", error);

    res.status(500).json({
      message: "AI enhancement failed",
    });
  }
};

/* =========================================================
   Upload & Parse Resume (Structured JSON)
========================================================= */

export const uploadResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeText, title } = req.body;

    if (!resumeText || resumeText.trim().length < 100) {
      return res.status(400).json({
        message: "Resume text is empty or invalid",
      });
    }

    if (resumeText.length > 12000) {
      return res.status(413).json({
        message: "Resume text too large (max 12k characters)",
      });
    }

    const prompt = `
Extract structured information from this resume.

Return ONLY valid JSON with this schema:

{
  "professional_summary": "",
  "skills": [],
  "personal_info": {
    "image": "",
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "experience": [],
  "projects": [],
  "education": []
}

Resume text:
${resumeText}
`;

    const result = await textModel.generateContent(prompt);

    const rawText = result.response.text();

    let parsedData;

    try {
      parsedData = JSON.parse(rawText);
    } catch (err) {
      console.error("AI RAW OUTPUT:", rawText);

      return res.status(500).json({
        message: "AI returned invalid JSON",
      });
    }

    const newResume = await Resume.create({
      userId,
      title: title || "Uploaded Resume",
      ...parsedData,
    });

    res.status(201).json({
      message: "Resume uploaded successfully",
      resume: newResume,
      resumeId: newResume._id,
    });

  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    res.status(500).json({
      message: "Resume parsing failed",
    });
  }
};