import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NAVBAR_HEIGHT = 64; // h-16 = 64px

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const {user} = useSelector(state => state.auth)

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  const navItems = ["Home", "Features", "Testimonials", "Contact"];

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-[100] w-full bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 md:px-8 lg:px-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-green-600 text-white flex items-center justify-center font-bold">
              ⬢
            </div>
            <span className="text-xl font-semibold text-slate-900">
              myResume
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-slate-700 hover:text-green-600 transition"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex gap-3">
            <Link
              to="/login?state=signup"
              className="rounded-full bg-green-600 px-5 py-2.5 text-sm text-white hover:bg-green-700"
              hidden={user}
            >
              Get started
            </Link>
            <Link
              to="/login?state=login"
              className="rounded-full border border-slate-300 px-5 py-2.5 text-sm text-slate-700 hover:bg-slate-100"
              hidden={user}
            >
              Login
            </Link>
            <Link to='/app' className="hidden md:block px-8 py-2 bg-green-500 hover:bg-green-700 active:scale-95 transition-all rounded-full text-white"
            hidden={!user}>
              Dashboard
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100"
          >
            ☰
          </button>
        </div>
      </header>

      {/* ================= OVERLAY ================= */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed left-0 right-0 bottom-0 z-[60] md:hidden
        transition-all duration-300
        ${open ? "opacity-100 visible" : "opacity-0 invisible"}
        bg-black/40 backdrop-blur-md`}
        style={{ top: NAVBAR_HEIGHT }}
      />

      {/* ================= MOBILE MENU ================= */}
      <aside
        className={`fixed top-0 left-0 z-[110] h-full w-72 bg-white shadow-xl
        transform transition-transform duration-300 md:hidden
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="pt-24 px-6 flex flex-col gap-6">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="text-lg font-medium text-slate-800 hover:text-green-600"
            >
              {item}
            </a>
          ))}

          <Link
            to="/login?state=signup"
            onClick={() => setOpen(false)}
            className="mt-6 rounded-full bg-green-600 px-6 py-3 text-center text-white"
            hidden={user}
          >
            Get started
          </Link>

          <Link
            to="/login?state=login"
            onClick={() => setOpen(false)}
            className="rounded-full border border-slate-300 px-6 py-3 text-center text-slate-700"
            hidden={user}
          >
            Login
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
