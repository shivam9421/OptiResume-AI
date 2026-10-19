import { Sparkles } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../../configs/api";
import toast from "react-hot-toast";

const SummaryForm = ({ data, onChange }) => {
  const { token } = useSelector((state) => state.auth);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummary = async () => {
    try {
      if (!data?.trim()) {
        toast.error("Please write some summary first");
        return;
      }

      setIsGenerating(true);

      const prompt = `Enhance my professional summary:\n${data}`;

      const response = await api.post(
        "/api/ai/enhance-pro-sum",
        { userContent: prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onChange(response.data.enhancedContent);
    } catch (error) {
      console.error("AI Enhance error:", error);
      toast.error(
        error?.response?.data?.message || "AI enhancement failed"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-500">
            Add summary for your resume here
          </p>
        </div>

        <button
          type="button"
          onClick={generateSummary}
          disabled={isGenerating || !data}
          className="flex items-center gap-2 px-3 py-1 text-sm
          bg-purple-100 text-purple-700 rounded
          hover:bg-purple-200 disabled:opacity-50"
        >
          <Sparkles className="size-4" />
          {isGenerating ? "Enhancing..." : "AI Enhance"}
        </button>
      </div>

      <textarea
        value={data || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={7}
        className="w-full p-3 border rounded-lg resize-none
        focus:ring focus:ring-blue-500 outline-none"
        placeholder="Write a compelling professional summary..."
      />

      <p className="text-xs text-gray-500 text-center">
        Tip: Keep it concise (3–4 sentences) and focus on your most relevant
        achievements and skills
      </p>
    </div>
  );
};

export default SummaryForm;
