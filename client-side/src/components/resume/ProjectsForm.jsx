import { Plus, Trash2 } from "lucide-react";
import React from "react";

const ProjectsForm = ({ data = [], onChange }) => {
  const addProject = () => {
    onChange([
      ...data,
      {
        name: "",
        type: "",
        description: "",
      },
    ]);
  };

  const removeProject = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange(updated);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
          <p className="text-sm text-gray-500">
            Add your project details
          </p>
        </div>

        <button
          type="button"
          onClick={addProject}
          className="flex items-center gap-2 px-3 py-1.5 text-sm
          bg-purple-100 text-purple-700 rounded-md
          hover:bg-purple-200 transition"
        >
          <Plus className="size-4" />
          Add Project
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-4 mt-6">
        {data.map((project, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-lg space-y-4"
          >
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-gray-800">
                Project #{index + 1}
              </h4>
              <button
                type="button"
                onClick={() => removeProject(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="size-4" />
              </button>
            </div>

            <div className="grid gap-3">
              <input
                type="text"
                placeholder="Project Name"
                value={project.name}
                onChange={(e) =>
                  updateProject(index, "name", e.target.value)
                }
                className="w-full h-[42px] px-3 text-sm border border-gray-300 rounded-md"
              />

              <input
                type="text"
                placeholder="Project Type"
                value={project.type}
                onChange={(e) =>
                  updateProject(index, "type", e.target.value)
                }
                className="w-full h-[42px] px-3 text-sm border border-gray-300 rounded-md"
              />

              <textarea
                rows={4}
                value={project.description}
                onChange={(e) =>
                  updateProject(index, "description", e.target.value)
                }
                placeholder="Describe your project..."
                className="w-full min-h-[100px] px-3 py-2 text-sm border border-gray-300 rounded-md resize-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsForm;
