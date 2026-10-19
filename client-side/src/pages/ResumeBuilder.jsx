import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Share2Icon,
  Sparkles,
  User,
} from "lucide-react"
import PersonalInfoForm from "../components/resume/PersonalInfoForm"
import ResumePreview from "../components/resume/ResumePreview"
import TemplateSelector from "../components/resume/TemplateSelector"
import ColorPicker from "../components/resume/ColorPicker"
import SummaryForm from "../components/resume/SummaryForm"
import ExperienceForm from "../components/resume/ExperienceForm"
import EducationForm from "../components/resume/EducationForm"
import ProjectsForm from "../components/resume/ProjectsForm"
import SkillsForm from "../components/resume/SkillsForm"
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import api from "../configs/api";

const ResumeBuilder = () => {

  const { resumeId } = useParams()
  const { token } = useSelector(state=>state.auth)

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  })

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false)
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ]

  const activeSection = sections[activeSectionIndex]

 /* ---------------- LOAD RESUME ---------------- */
  const loadExistingResume = async () => {
    try {
      const { data } = await api.get(`/api/resumes/get/${resumeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.resume) {
        setResumeData(data.resume);
        document.title = data.resume.title;
        setIsDirty(false);
      }
    } catch (error) {
      toast.error("Failed to load resume");
    }
  };

  useEffect(() => {
    loadExistingResume();
  }, [resumeId]);

    /* ---------------- SAVE CHANGES ---------------- */
  const saveChanges = async () => {
  try {
    setIsSaving(true);
    const updatedResumeData = structuredClone(resumeData);
    if (
      updatedResumeData.personal_info &&
      typeof updatedResumeData.personal_info.image === "object"
    ) {
      delete updatedResumeData.personal_info.image;
    }
    const formData = new FormData();
    formData.append("resumeId", resumeId);
    formData.append("resumeData", JSON.stringify(updatedResumeData));
    if (removeBackground) {
      formData.append("removeBackground", "yes");
    }
    if (
      resumeData.personal_info &&
      typeof resumeData.personal_info.image === "object"
    ) {
      formData.append("image", resumeData.personal_info.image);
    }
    const { data } = await api.put(
      "/api/resumes/update",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setResumeData(data.resume);
    setIsDirty(false);

    toast.success(data.message || "Resume saved successfully");
  } catch (error) {
    console.error("Error saving resume", error);
    toast.error("Failed to save resume");
  } finally {
    setIsSaving(false);
  }
};

 
  const changeResumeVisibility = async()=>{
    try {
      const formData = new FormData();
      formData.append("resumeId" , resumeId)
      formData.append("resumeData", JSON.stringify({public: !resumeData.public}))

      const {data} = await api.put('/api/resumes/update' , formData , {headers : { Authorization : token }})

      setResumeData({...resumeData, public: !resumeData.public})
      toast.success(data.message)
    } catch (error) {
      console.error("Error saving resume." , error)
    }
  }
 
  const handleShare=()=>{
    const frontendUrl = window.location.href.split('/app/')[0];
    const resumeUrl = frontendUrl + '/view/' + resumeId;

    if(navigator.share){
      navigator.share({url: resumeUrl, text: "My Resume", })
    }else{
      alert('Share not supported on this browser.')
    }
  }

  const downloadResume = ()=>{
    window.print();
  }

  return (
    <div>
      {/*  TOP HEADER ROW  */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">

        {/* LEFT */}
        <Link to="/app" className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700" >
          <ArrowLeftIcon className="size-4" />
          Back to Dashboard
        </Link>

        {/* RIGHT ACTION BUTTONS */}
        <div className="flex items-center gap-3">
          {resumeData.public && (
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 text-sm
              rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
            >
              <Share2Icon className="size-4" />
              Share
            </button>
          )}

          <button
            onClick={changeResumeVisibility}
            className="flex items-center gap-2 px-4 py-2 text-sm
            rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200"
          >
            {resumeData.public ? <EyeIcon className="size-4" /> : <EyeOffIcon className="size-4" />}
            {resumeData.public ? "Public" : "Private"}
          </button>

          <button
            onClick={downloadResume}
            className="flex items-center gap-2 px-4 py-2 text-sm
            rounded-full bg-green-100 text-green-600 hover:bg-green-200"
          >
            <DownloadIcon className="size-4" />
            Download
          </button>
        </div>
      </div>

      {/* main content */}
      <div className="max-w-7xl mx-auto px-4 pb-8 ">
        <div className="grid lg:grid-cols-12 gap-8 ">
          {/* LEFT PANEL */}
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1 ">
              {/* progress bar */}
              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
              <hr
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000"
                style={{
                  width: `${
                    (activeSectionIndex * 100) /
                    (sections.length - 1)
                  }%`,
                }}
              />

              {/* section navigation */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                <div className="flex items-center gap-2">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) =>
                      setResumeData((prev) => ({
                        ...prev,
                        template,
                      }))
                    }
                  />
                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={(color) =>
                      setResumeData((prev) => ({
                        ...prev,
                        accent_color: color,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center">
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() =>
                        setActiveSectionIndex((i) =>
                          Math.max(i - 1, 0)
                        )
                      }
                      className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                    >
                      <ChevronLeft className="size-4" />
                      Previous
                    </button>
                  )}

                  <button
                    onClick={() =>
                      setActiveSectionIndex((i) =>
                        Math.min(i + 1, sections.length - 1)
                      )
                    }
                    className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${
                      activeSectionIndex === sections.length - 1
                        ? "opacity-50"
                        : ""
                    }`}
                    disabled={
                      activeSectionIndex === sections.length - 1
                    }
                  >
                    Next <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              {/* form content */}
              <div className="space-y-6">
                {activeSection.id === "personal" && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) => {
                    setResumeData((p) => ({ ...p, personal_info: data }));
                    setIsDirty(true);
              }}
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}/>
                )}
                {activeSection.id === "summary" && (
                    <SummaryForm
              data={resumeData.professional_summary}
              onChange={(value) => {
                setResumeData((p) => ({
                  ...p,
                  professional_summary: value,
                }));
                setIsDirty(true);
              }}
            />

                )}
                  {activeSection.id === "experience" && (
            <ExperienceForm
              data={resumeData.experience}
              onChange={(data) => {
                setResumeData((p) => ({ ...p, experience: data }));
                setIsDirty(true);
              }}
            />
          )}

          {activeSection.id === "education" && (
            <EducationForm
              data={resumeData.education}
              onChange={(data) => {
                setResumeData((p) => ({ ...p, education: data }));
                setIsDirty(true);
              }}
            />
          )}

          {activeSection.id === "projects" && (
            <ProjectsForm
              data={resumeData.project}
              onChange={(data) => {
                setResumeData((p) => ({ ...p, project: data }));
                setIsDirty(true);
              }}
            />
          )}

          {activeSection.id === "skills" && (
            <SkillsForm
              data={resumeData.skills}
              onChange={(data) => {
                setResumeData((p) => ({ ...p, skills: data }));
                setIsDirty(true);
              }}
            />
          )}
              </div>
            <button
              onClick={saveChanges}
              disabled={!isDirty || isSaving}
              className={`mt-6 px-6 py-2 text-sm rounded-md transition-all
              ${
              isDirty
              ? "bg-gradient-to-br from-green-100 to-green-200 hover:ring-2 hover:ring-green-400 text-green-700"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }
            `}
             >
            {isSaving ? "Saving..." : isDirty ? "Save Changes" : "Saved ✔"}
            </button>

            </div>
          </div>

          {/* RIGHT PANEL – PREVIEW (FULL HEIGHT, SAFE) */}
          <div className="lg:col-span-7">
            <div id="resume-preview">
              <ResumePreview
                data={resumeData}
                template={resumeData.template}
                accentColor={resumeData.accent_color}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder


const saveResume = async() =>{
  try {
    let updatedResumeData = structuredClone(resumeData)

    // remove image from updatedResumeData
    if(typeof resumeData.personal_info === 'object'){
      delete updatedResumeData.personal_info.image
    }

    const formData = new FormData();
    formData.append("resumeId", resumeId)
    formData.append('resumeData', JSON.stringify(updatedResumeData))
    removeBackground && formData.append("removeBackground", "yes");
    typeof resumeData.personal_info.image === 'object' && formData.append("image", resumeData.personal_info.image)

    const { data } = await api.put('/api/resumes/update' , formData , {headers: { Authorization: token }})
    setResumeData(data.resume)
    toast.success(data.message)
  } catch (error) {
    console.error("Error saving Resume" , error)
  }
}