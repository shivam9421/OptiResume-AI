import { Briefcase, Plus, Sparkles, Trash2 } from "lucide-react"
import React from "react"

const ExperienceForm = ({ data, onChange }) => {

  const addExperience = () => {
    onChange([
      ...data,
      {
        company: "",
        position: "",
        start_date: "",
        end_date: "",
        description: "",
        is_current: false,
      },
    ])
  }

  const removeExperience = (index) => {
    onChange(data.filter((_, i) => i !== index))
  }

  const updateExperience = (index, field, value) => {
    const updated = [...data]

    // If currently working → clear end_date
    if (field === "is_current" && value === true) {
      updated[index] = {
        ...updated[index],
        is_current: true,
        end_date: "",
      }
    } else {
      updated[index] = {
        ...updated[index],
        [field]: value,
      }
    }

    onChange(updated)
  }

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Professional Experience
          </h3>
          <p className="text-sm text-gray-500">
            Add your work experience details
          </p>
        </div>

        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-3 py-1.5 text-sm
          bg-purple-100 text-purple-700 rounded-md
          hover:bg-purple-200 transition"
        >
          <Plus className="size-4" />
          Add Experience
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="text-center py-10 text-gray-500 border border-dashed rounded-lg">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No work experience added yet</p>
          <p className="text-sm">Click “Add Experience” to begin</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((experience, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-4"
            >
              {/* Card Header */}
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-gray-800">
                  Experience #{index + 1}
                </h4>
                <button
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* Inputs */}
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Company Name"
                  value={experience.company}
                  onChange={(e) =>
                    updateExperience(index, "company", e.target.value)
                  }
                  className="input w-full h-[42px] px-3 text-sm border border-gray-300 rounded-md bg-white"
                />

                <input
                  type="text"
                  placeholder="Job Title"
                  value={experience.position}
                  onChange={(e) =>
                    updateExperience(index, "position", e.target.value)
                  }
                  className="w-full h-[42px] px-3 text-sm border border-gray-300 rounded-md bg-white"
                />

                <input
                  type="month"
                  placeholder="Start Month"
                  value={experience.start_date}
                  onChange={(e) =>
                  updateExperience(index, "start_date", e.target.value)
                }
                className="w-full h-[42px] px-3 text-sm border border-gray-300 rounded-md bg-white"
              />


                <input
                  type="month"
                  placeholder="End Month"
                  value={experience.end_date || ""}
                  disabled={experience.is_current}
                  onChange={(e) =>
                  updateExperience(index, "end_date", e.target.value)
                  }
                  className="w-full h-[42px] px-3 text-sm border border-gray-300 rounded-md bg-white disabled:opacity-50"
                />


              {/* Checkbox */}
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={experience.is_current}
                  onChange={(e) =>
                    updateExperience(index, "is_current", e.target.checked)
                  }
                  className="rounded border-gray-300 text-purple-600"
                />
                Currently working here
              </label>
            </div>
              {/* Description */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-700">
                    Job Description
                  </label>
                  <button
                    type="button"
                    className="flex items-center gap-1 px-2 py-1 text-xs
                    bg-purple-100 text-purple-700 rounded
                    hover:bg-purple-200"
                  >
                    <Sparkles className="w-3 h-3" />
                    Enhance with AI
                  </button>
                </div>

                <textarea
                  rows={4}
                  placeholder="Describe responsibilities & achievements..."
                  value={experience.description}
                  onChange={(e) =>
                    updateExperience(index, "description", e.target.value)
                  }
                  className="w-full min-h-[100px] px-3 py-2 text-sm border border-gray-300 rounded-md bg-white resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ExperienceForm
