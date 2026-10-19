import React from "react";

const Title = ({ title, description, align = "center" }) => {
  // Determine alignment classes dynamically
  const alignment =
    align === "left"
      ? "text-left md:text-left"
      : "text-center md:text-center";

  return (
    <div className={`mt-10 ${alignment} max-w-3xl mx-auto`}>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 leading-snug">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

export default Title;
