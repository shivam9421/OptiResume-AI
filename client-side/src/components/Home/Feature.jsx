import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import Title from "./Title";

const features = [
  {
    title: "Smart Analytics",
    desc: "Track performance and engagement with real-time insights.",
    icon: <path d="M12 3v18M3 12h18" />,
  },
  {
    title: "Secure by Design",
    desc: "Modern security with scalable architecture.",
    icon: <path d="M12 3l9 4.5v9L12 21l-9-4.5v-9z" />,
  },
  {
    title: "Fully Customizable",
    desc: "Tailor features and UI to match your workflow.",
    icon: <path d="M4 4h16v16H4z" />,
  },
];

const Features = () => {
  return (
    <section className="mt-32 flex flex-col items-center px-4 md:px-16 lg:px-24 xl:px-32">
      
      {/* ===================== TOP BADGE ===================== */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-400/10 border border-indigo-200 rounded-full px-4 py-1 w-max">
          <Zap width={14}/>
          <span>Simple Process</span>
        </div>
      </motion.div>

      <Title title='Build your resume' description='Our streamlined process helps you create a proffesional resume in minutes in witn intelligent AI-powered tools and features.'/>

      {/* ===================== GRID WITH IMAGE + FEATURES ===================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center xl:-mt-10">
        
        {/* Left Image */}
        <motion.img
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png"
          alt="App preview"
          className="w-full max-w-xl mx-auto md:mx-0"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />

        {/* Right Content (Feature Cards) */}
        <div className="space-y-6">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group cursor-pointer"
            >
              <div
                className="flex gap-4 p-6 rounded-xl border border-green-200
                           transition-all duration-300
                           group-hover:bg-green-100
                           group-hover:border-green-400"
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="size-6 stroke-green-600"
                  whileHover={{ rotate: 10, scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item.icon}
                </motion.svg>

                <div>
                  <h3 className="text-base font-semibold text-slate-800">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
