import React from "react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/resume-builder")}
      className="
        sticky top-0 z-50
        w-full
        cursor-pointer
        bg-gradient-to-r from-[#ABFF7E] to-[#FDFEFF]
        py-2.5
        text-center text-sm font-medium text-green-800
        transition-all duration-300
        hover:brightness-95
        animate-slide-down
      "
    >
      <p className="flex items-center justify-center gap-2">
        <span className="rounded-lg bg-green-600 px-3 py-1 text-xs font-semibold text-white animate-pulse">
          New
        </span>
        AI Resume Builder
      </p>
    </div>
  );
};

export default Banner;
