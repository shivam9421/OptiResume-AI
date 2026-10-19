import {
  FilePenLineIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import api from "../configs/api";
import pdfToText from "react-pdftotext";
import Loader from "../components/Preview/Loader";

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const colors = ["#16a34a", "#0284c7", "#9333ea", "#d97706", "#dc2626"];

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [uploadTitle, setUploadTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  /* ---------------- LOAD RESUMES ---------------- */
  const loadAllResumes = useCallback(async () => {
    try {
      const { data } = await api.get("/api/users/resumes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllResumes(data.resumes || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    loadAllResumes();
  }, [token, loadAllResumes, navigate]);

  /* ---------------- CREATE RESUME ---------------- */
  const createResume = async () => {
    if (!title.trim()) {
      toast.error("Resume title is required");
      return;
    }

    try {
      const { data } = await api.post(
        "/api/resumes/create",
        { title },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAllResumes((prev) => [...prev, data.resume]);
      setTitle("");
      setShowCreateResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  /* ---------------- UPLOAD RESUME ---------------- */
  const uploadResume = async () => {
    if (!uploadTitle.trim()) {
      toast.error("Resume title is required");
      return;
    }

    if (!selectedFile) {
      toast.error("Please select a PDF file");
      return;
    }

    if (!selectedFile.type.includes("pdf")) {
      toast.error("Only PDF files are supported");
      return;
    }

    setIsLoading(true);

    try {
      const resumeText = await pdfToText(selectedFile);

      if (!resumeText || resumeText.trim().length < 100) {
        throw new Error("Unable to read resume. Upload a text-based PDF.");
      }

      const { data } = await api.post(
        "/api/ai/upload-resume",
        { title: uploadTitle, resumeText },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUploadTitle("");
      setSelectedFile(null);
      setShowUploadResume(false);
      navigate(`/app/builder/${data.resumeId}`);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Resume upload failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------------- DELETE RESUME ---------------- */
  const deleteResume = async (resumeId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?"
    );
    if (!confirmDelete) return;

    try {
      const { data } = await api.delete(
        `/api/resumes/delete/${resumeId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAllResumes((prev) =>
        prev.filter((resume) => resume._id !== resumeId)
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

 

  /* ---------------- NAVIGATION ---------------- */
  const openResume = (id) => navigate(`/app/view/${id}`);
  const editResume = (id) => navigate(`/app/builder/${id}`);

  /* ---------------- UI ---------------- */
  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-[100] bg-black/30 flex items-center justify-center">
          <Loader />
        </div>
      )}

      <div className="relative min-h-screen bg-slate-50 overflow-hidden">
        {/* Background */}
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-green-100 blur-3xl opacity-60" />
        <div className="absolute bottom-[-200px] right-[-200px] h-[500px] w-[500px] rounded-full bg-green-50 blur-3xl opacity-70" />

        <div className="relative max-w-7xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-semibold text-slate-900">
              Welcome back, {user?.name || "User"} 👋
            </h1>
            <p className="mt-2 text-slate-500">
              Create, upload, and manage your AI-powered resumes.
            </p>
          </div>

          {/* Actions */}
          <div className="rounded-2xl border bg-white/70 p-8 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-md">
              <button
                onClick={() => setShowCreateResume(true)}
                className="h-48 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed hover:border-green-500 transition"
              >
                <PlusIcon className="size-11 p-2.5 bg-green-600 text-white rounded-full" />
                <p>Create Resume</p>
              </button>

              <button
                onClick={() => setShowUploadResume(true)}
                className="h-48 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed hover:border-green-500 transition"
              >
                <UploadCloudIcon className="size-11 p-2.5 bg-green-600 text-white rounded-full" />
                <p>Upload Resume</p>
              </button>
            </div>
          </div>

          {/* Recent Resumes */}
          <div className="mt-16">
            <h2 className="text-lg font-semibold mb-4">Recent Resumes</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {allResumes.map((resume, index) => {
                const baseColor = colors[index % colors.length];
                return (
                  <div
                    key={resume._id}
                    onClick={() => openResume(resume._id)}
                    className="relative h-44 rounded-xl border cursor-pointer hover:shadow-lg transition group flex flex-col items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}30)`,
                      borderColor: `${baseColor}40`,
                    }}
                  >
                    <FilePenLineIcon style={{ color: baseColor }} />
                    <p style={{ color: baseColor }}>{resume.title}</p>

                    <div
                      className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <PencilIcon
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          editResume(resume._id);
                        }}
                      />
                      <TrashIcon
                        className="text-red-600 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteResume(resume._id);
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CREATE MODAL */}
        {showCreateResume && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="relative bg-white p-6 rounded-xl w-full max-w-md">
              <XIcon
                className="absolute top-3 right-3 cursor-pointer"
                onClick={() => setShowCreateResume(false)}
              />

              <h2 className="text-lg font-semibold">Create Resume</h2>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Resume title"
                className="mt-4 w-full border rounded-lg px-3 py-2"
              />

              <button
                onClick={createResume}
                className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg"
              >
                Create
              </button>
            </div>
          </div>
        )}

        {/* UPLOAD MODAL */}
        {showUploadResume && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="relative bg-white p-6 rounded-xl w-full max-w-md h-[450px]">
              <XIcon
                className="absolute top-3 right-3 cursor-pointer"
                onClick={() => setShowUploadResume(false)}
              />

              <h2 className="text-lg font-semibold mb-4">Upload Resume</h2>

              <input
                value={uploadTitle}
                onChange={(e) => setUploadTitle(e.target.value)}
                placeholder="Resume title"
                className="w-full border rounded-lg px-3 py-2 mb-4"
              />

              <label className="h-36 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer">
                <UploadCloudIcon className="size-8 text-green-600" />
                <p className="text-sm mt-2">
                  {selectedFile ? selectedFile.name : "Select PDF file"}
                </p>
                <input
                  type="file"
                  hidden
                  accept=".pdf"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
              </label>

              <button
                onClick={uploadResume}
                disabled={isLoading}
                className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg"
              >
                Upload Resume
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
