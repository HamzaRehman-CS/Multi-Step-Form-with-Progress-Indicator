import React from "react";
import { FileText, Calendar, Code, Check } from "lucide-react";
import { FormData, ValidationErrors } from "../types";

interface StepScopeProps {
  formData: FormData;
  onChange: (fields: Partial<FormData>) => void;
  errors: ValidationErrors;
}

export default function StepScope({ formData, onChange, errors }: StepScopeProps) {
  const customTechnologies = [
    { id: "react", label: "React & Vite", category: "Frontend" },
    { id: "tailwind", label: "Tailwind CSS v4", category: "Styling" },
    { id: "node", label: "Node.js & Express", category: "Backend" },
    { id: "postgres", label: "PostgreSQL Db", category: "Database" },
    { id: "gemini", label: "Google Gemini API", category: "Artificial Intelligence" },
  ];

  const handleTechToggle = (techId: string) => {
    const list = [...formData.technologies];
    const index = list.indexOf(techId);
    if (index > -1) {
      list.splice(index, 1);
    } else {
      list.push(techId);
    }
    onChange({ technologies: list });
  };

  return (
    <div className="space-y-6 text-slate-900">
      {/* Project Title */}
      <div>
        <label htmlFor="projectTitle" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Project Name / Initiative Title <span className="text-blue-600">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <FileText className="h-4.5 w-4.5" />
          </div>
          <input
            type="text"
            id="projectTitle"
            className={`block w-full pl-10 pr-4 py-3 bg-white border ${
              errors.projectTitle ? "border-rose-500 focus:border-rose-500" : "border-slate-200 focus:border-blue-600"
            } text-slate-800 placeholder:text-slate-400 rounded-xl text-sm focus:outline-hidden transition-all`}
            placeholder="E.g., Portal Revamp v2"
            value={formData.projectTitle}
            onChange={(e) => onChange({ projectTitle: e.target.value })}
          />
        </div>
        {errors.projectTitle && (
          <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block"></span>
            {errors.projectTitle}
          </p>
        )}
      </div>

      {/* Project Description */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="projectDescription" className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Structural & Business Scope <span className="text-blue-600">*</span>
          </label>
          <span className="text-[10px] font-mono text-slate-400">
            {formData.projectDescription.length}/500 chars (Min 30)
          </span>
        </div>
        <textarea
          id="projectDescription"
          rows={4}
          maxLength={500}
          className={`block w-full px-4 py-3 bg-white border ${
            errors.projectDescription ? "border-rose-500 focus:border-rose-500" : "border-slate-200 focus:border-blue-600"
          } text-slate-800 placeholder:text-slate-400 rounded-xl text-sm focus:outline-hidden transition-all resize-none`}
          placeholder="Describe your project goals, workflows, and core user bases. Please provide at least 30 characters for high quality review."
          value={formData.projectDescription}
          onChange={(e) => onChange({ projectDescription: e.target.value })}
        />
        {errors.projectDescription && (
          <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block"></span>
            {errors.projectDescription}
          </p>
        )}
      </div>

      {/* Technologies Selection */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
          <Code className="w-4 h-4 text-slate-400" />
          Preferred Tech Stack (Optional)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {customTechnologies.map((tech) => {
            const isChecked = formData.technologies.includes(tech.id);
            return (
              <button
                type="button"
                key={tech.id}
                onClick={() => handleTechToggle(tech.id)}
                className={`flex items-start gap-2.5 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isChecked
                    ? "bg-blue-50/70 border-blue-600 text-blue-900 shadow-xs"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
                id={`tech-btn-${tech.id}`}
              >
                <div
                  className={`flex items-center justify-center w-4.5 h-4.5 rounded border mt-0.5 shrink-0 transition-colors ${
                    isChecked
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3] text-white" />}
                </div>
                <div>
                  <div className={`text-xs font-semibold ${isChecked ? "text-blue-950" : "text-slate-700"}`}>
                    {tech.label}
                  </div>
                  <div className={`text-[9px] uppercase font-bold tracking-wider mt-0.5 ${isChecked ? "text-blue-600" : "text-slate-400"}`}>
                    {tech.category}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Launch Date */}
      <div>
        <label htmlFor="expectedLaunchDate" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Expected Launch Date <span className="text-blue-600">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Calendar className="h-4.5 w-4.5" />
          </div>
          <input
            type="date"
            id="expectedLaunchDate"
            className={`block w-full pl-10 pr-4 py-3 bg-white border ${
              errors.expectedLaunchDate ? "border-rose-500 focus:border-rose-500" : "border-slate-200 focus:border-blue-600"
            } text-slate-850 rounded-xl text-sm focus:outline-hidden transition-all`}
            value={formData.expectedLaunchDate}
            onChange={(e) => onChange({ expectedLaunchDate: e.target.value })}
          />
        </div>
        {errors.expectedLaunchDate && (
          <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block"></span>
            {errors.expectedLaunchDate}
          </p>
        )}
      </div>
    </div>
  );
}
