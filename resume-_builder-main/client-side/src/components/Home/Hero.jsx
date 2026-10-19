import { Link } from "react-router-dom";


const Hero = () => {

  return (
    <section className="mt-20 flex flex-col items-center justify-between gap-20 px-4 pb-20 md:flex-row md:px-16 lg:px-24 xl:px-32">
      {/* Left */}
      <div className="flex max-w-xl flex-col items-center md:items-start">
        <div className="mb-4 flex items-center rounded-full border border-slate-400 px-4 py-1 text-xs text-gray-500">
          <span>Trusted by thousand of job seekers</span>
        </div>

        <h1 className="text-center text-5xl font-medium leading-[68px] text-slate-900 md:text-left md:text-6xl md:leading-[84px]">
          Build job-ready resumes with AI.
        </h1>

        <p className="mt-4 max-w-lg text-center text-sm text-slate-700 md:text-left">
          Create ATS-optimized, professional resumes tailored to your skills,
          role, and experience — in minutes using AI.
        </p>

        <div className="mt-8 flex gap-4">
           <Link to="/app?state=register" className="h-11 px-7 rounded-md bg-green-600 text-white hover:bg-gray-400 inline-flex items-center justify-center">
            Get started
          </Link>
          <button className="flex h-11 items-center gap-2 rounded-md border border-slate-600 px-6 text-slate-600 hover:bg-slate-100">
            Watch demo
          </button>
        </div>
      </div>

      {/* Right Image */}
      <img
        src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/hero-section-showcase-4.png"
        alt="AI Resume Preview"
        className="max-w-xs sm:max-w-sm lg:max-w-md"
      />
    </section>
  );
};

export default Hero;
