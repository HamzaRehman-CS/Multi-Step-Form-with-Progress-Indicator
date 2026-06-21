import React from "react";
import { Mail, Building2, Target, Users } from "lucide-react";
import { FormData, ValidationErrors } from "../types";

interface StepCompanyProps {
  formData: FormData;
  onChange: (fields: Partial<FormData>) => void;
  errors: ValidationErrors;
}

export default function StepCompany({ formData, onChange, errors }: StepCompanyProps) {
  const companyScaleOptions = [
    { label: "1 - 10", value: "1-10", desc: "Seed stage startup" },
    { label: "11 - 50", value: "11-50", desc: "Challenger scale" },
    { label: "51 - 200", value: "51-200", desc: "Mid-market scale" },
    { label: "201+", value: "201+", desc: "Enterprise division" },
  ];

  const primaryGoalOptions = [
    { label: "Launch a New Digital Product", value: "launch_product" },
    { label: "Optimize Cloud Operations", value: "optimize_operations" },
    { label: "Corporate Brand & Design System", value: "brand_redesign" },
    { label: "Custom Software Architecture", value: "custom_software" },
  ];

  return (
    <div className="space-y-6 text-slate-900">
      {/* Company Name */}
      <div>
        <label htmlFor="companyName" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Company/Organization Name <span className="text-blue-600">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Building2 className="h-4.5 w-4.5" />
          </div>
          <input
            type="text"
            id="companyName"
            className={`block w-full pl-10 pr-4 py-3 bg-white border ${
              errors.companyName ? "border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-200/50" : "border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-100"
            } text-slate-800 placeholder:text-slate-400 rounded-xl text-sm focus:outline-hidden transition-all`}
            placeholder="E.g., Stripe, Inc."
            value={formData.companyName}
            onChange={(e) => onChange({ companyName: e.target.value })}
          />
        </div>
        {errors.companyName && (
          <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block"></span>
            {errors.companyName}
          </p>
        )}
      </div>

      {/* Primary Goal Selection */}
      <div>
        <label htmlFor="primaryGoal" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Primary Objective <span className="text-blue-600">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Target className="h-4.5 w-4.5" />
          </div>
          <select
            id="primaryGoal"
            className={`block w-full pl-10 pr-10 py-3 bg-white border appearance-none ${
              errors.primaryGoal ? "border-rose-500 focus:border-rose-500" : "border-slate-200 focus:border-blue-600"
            } text-slate-800 rounded-xl text-sm focus:outline-hidden transition-all`}
            value={formData.primaryGoal}
            onChange={(e) => onChange({ primaryGoal: e.target.value })}
          >
            <option value="" disabled>Select your primary project objective...</option>
            {primaryGoalOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {/* Custom chevron indicator */}
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
            <svg className="h-4 w-4 fill-none stroke-current" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {errors.primaryGoal && (
          <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block"></span>
            {errors.primaryGoal}
          </p>
        )}
      </div>

      {/* Corporate Scale (Radio Tiles) */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
          <Users className="w-4 h-4 text-slate-400" />
          Company Size
        </label>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {companyScaleOptions.map((opt) => (
            <label
              key={opt.value}
              htmlFor={`team-size-${opt.value}`}
              className={`flex flex-col justify-center p-3.5 rounded-xl border text-center cursor-pointer transition-all ${
                formData.companySize === opt.value
                  ? "bg-blue-50/70 border-blue-600 text-blue-900 shadow-xs"
                  : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
              }`}
              id={`label-size-${opt.value}`}
            >
              <input
                type="radio"
                id={`team-size-${opt.value}`}
                name="companySize"
                value={opt.value}
                checked={formData.companySize === opt.value}
                onChange={() => onChange({ companySize: opt.value })}
                className="sr-only"
              />
              <span className="font-semibold text-sm">{opt.label}</span>
              <span className={`text-[10px] mt-0.5 ${formData.companySize === opt.value ? "text-blue-700" : "text-slate-400"}`}>{opt.desc}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Operational Email */}
      <div>
        <label htmlFor="contactEmail" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Operational Email Address <span className="text-blue-600">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Mail className="h-4.5 w-4.5" />
          </div>
          <input
            type="email"
            id="contactEmail"
            className={`block w-full pl-10 pr-4 py-3 bg-white border ${
              errors.contactEmail ? "border-rose-500 focus:border-rose-500" : "border-slate-200 focus:border-blue-600"
            } text-slate-800 placeholder:text-slate-400 rounded-xl text-sm focus:outline-hidden transition-all`}
            placeholder="e.g., hello@workspace.com"
            value={formData.contactEmail}
            onChange={(e) => onChange({ contactEmail: e.target.value })}
          />
        </div>
        {errors.contactEmail && (
          <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block"></span>
            {errors.contactEmail}
          </p>
        )}
      </div>
    </div>
  );
}
