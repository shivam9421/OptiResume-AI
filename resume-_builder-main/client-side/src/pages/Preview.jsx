import React, { useEffect, useState } from 'react'
import { useParams , useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import api from "../configs/api";
import ResumePreview from '../components/resume/ResumePreview'
import Loader from '../components/Preview/Loader'
import { ArrowLeftIcon } from 'lucide-react'

const Preview = () => {

  const { resumeId } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(true)
  const [resumeData, setResumeData] = useState(null)
  
  const loadResume = async ()=>{
     try {
      const { data } = await api.get(
        `/api/resumes/get/${resumeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResumeData(data.resume);
    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
      setResumeData(null);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    if (resumeId && token) {
      loadResume();
    }
  }, [resumeId, token]);

  if (isLoading) {
    return <Loader />;
  }

    if (!resumeData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-center text-6xl text-slate-400 font-medium">
          Resume not found
        </p>
        <button
          onClick={() => navigate("/app")}
          className="mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9
          ring-offset-1 ring-1 ring-green-400 flex items-center transition-colors"
        >
          <ArrowLeftIcon className="mr-2 size-4" />
          Go to dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-100">
      <div className="max-w-3xl mx-auto py-10">
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
          classes="py-4 bg-white"
        />
      </div>
    </div>
  );
};


export default Preview