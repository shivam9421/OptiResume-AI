import {
  BriefcaseBusiness,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react"
import React, { useEffect } from "react"

const PersonalInfoForm = ({
  data,
  onChange,
  removeBackground,
  setRemoveBackground,
}) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  // avoid memory leak for image preview
  useEffect(() => {
    return () => {
      if (data.image && typeof data.image === "object") {
        URL.revokeObjectURL(data.image)
      }
    }
  }, [data.image])

  const fields = [
    { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
    { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
    { key: "location", label: "Location", icon: MapPin, type: "text" },
    { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text" },
    { key: "linkedin", label: "LinkedIn Profile", icon: Linkedin, type: "url" },
    { key: "website", label: "Personal Website", icon: Globe, type: "url" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Personal Information
        </h3>
        <p className="text-sm text-gray-600">
          Get started with your basic details
        </p>
      </div>

      {/* Image Upload */}
      <div className="flex items-center gap-4">
        <label className="cursor-pointer">
          {data.image ? (
            <img
              src={
                typeof data.image === "string"
                  ? data.image
                  : URL.createObjectURL(data.image)
              }
              alt="user"
              className="w-16 h-16 rounded-full object-cover ring ring-slate-300 hover:opacity-80 transition"
            />
          ) : (
            <div className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-700">
              <User className="size-10 p-2.5 border rounded-full" />
              <span className="text-sm">Upload user image</span>
            </div>
          )}
          <input
            type="file"
            accept="image/jpeg, image/png"
            className="hidden"
            onChange={(e) => handleChange("image", e.target.files[0])}
          />
        </label>

        {/* Remove Background Toggle */}
        {typeof data.image === "object" && (
          <div className="flex flex-col gap-1 text-sm">
            <p className="text-gray-600">Remove Background</p>
            <label className="relative inline-flex items-center cursor-pointer gap-2">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={removeBackground}
                onChange={() => setRemoveBackground((prev) => !prev)}
              />
              <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-600 transition-colors" />
              <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
            </label>
          </div>
        )}
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 gap-5">
        {fields.map((field) => {
          const Icon = field.icon

          return (
            <div key={field.key} className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <Icon className="size-4" />
                {field.label}
                {field.required && (
                  <span className="text-red-500">*</span>
                )}
              </label>

              <input
                type={field.type}
                value={data[field.key] || ""}
                onChange={(e) =>
                  handleChange(field.key, e.target.value)
                }
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                required={field.required}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg
                           text-sm outline-none transition
                           focus:ring-2 focus:ring-blue-500
                           focus:border-blue-500"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PersonalInfoForm
