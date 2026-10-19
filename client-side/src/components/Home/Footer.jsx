import React from 'react'

const Footer = () => {
  return (
  <>
  <footer className="flex flex-wrap justify-center lg:justify-between gap-10 md:gap-20 py-16 px-6 md:px-16 lg:px-24 xl:px-32 text-[13px] text-gray-400  bg-gradient-to-r from-white via-green-100 to-white">
    
    {/* Left */}
    <div className="flex flex-wrap items-start gap-10 md:gap-[60px] xl:gap-[140px]">
      
      {/* Logo */}
      <a href="/" className="text-green-500 font-semibold text-lg">
        my<span className="text-slate-800">Resume</span>
      </a>

      {/* Product */}
      <div>
        <p className="text-slate-800 font-semibold">Product</p>
        <ul className="mt-3 space-y-2">
          <li><a href="/" className="hover:text-green-500 transition">Home</a></li>
          <li><a href="/" className="hover:text-green-500 transition">Features</a></li>
          <li><a href="/" className="hover:text-green-500 transition">Templates</a></li>
          <li><a href="/" className="hover:text-green-500 transition">Pricing</a></li>
        </ul>
      </div>

      {/* Resources */}
      <div>
        <p className="text-slate-800 font-semibold">Resources</p>
        <ul className="mt-3 space-y-2">
          <li><a href="/" className="hover:text-green-500 transition">Blogs</a></li>
          <li><a href="/" className="hover:text-green-500 transition">Guides</a></li>
          <li><a href="/" className="hover:text-green-500 transition">Community</a></li>
          <li>
            <a href="/" className="hover:text-green-500 transition">
              Careers
              <span className="ml-2 px-2 py-0.5 text-xs rounded bg-green-600 text-slate-600">
                Hiring
              </span>
            </a>
          </li>
        </ul>
      </div>

      {/* Legal */}
      <div>
        <p className="text-slate-800 font-semibold">Legal</p>
        <ul className="mt-3 space-y-2">
          <li><a href="/" className="hover:text-green-500 transition">Privacy Policy</a></li>
          <li><a href="/" className="hover:text-green-500 transition">Terms & Conditions</a></li>
        </ul>
      </div>
    </div>

    {/* Right */}
    <div className="flex flex-col items-end max-md:items-center max-md:text-center gap-2">
      <p className="max-w-64">
        Helping developers and professionals build resumes that actually get shortlisted.
      </p>

      {/* Socials */}
      <div className="flex items-center gap-4 mt-4">
        {["linkedin", "github", "twitter", "youtube"].map((icon) => (
          <a key={icon} href="/" className="hover:text-green-500 transition">
            <span className="uppercase text-xs">{icon}</span>
          </a>
        ))}
      </div>

      <p className="mt-4 text-center text-gray-500">
        © 2026 <span className="text-slate-800 font-medium">myResume</span>. All rights reserved.
      </p>
    </div>
  </footer>
   <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
    * {
      font-family: 'Poppins', sans-serif;
    }
  `}</style>

</>

  )
}

export default Footer