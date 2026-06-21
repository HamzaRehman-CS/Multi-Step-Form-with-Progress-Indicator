import React from "react";
import { CreditCard, Cloud, ShieldCheck, HelpCircle } from "lucide-react";
import { FormData, ValidationErrors } from "../types";

interface StepTermsProps {
  formData: FormData;
  onChange: (fields: Partial<FormData>) => void;
  errors: ValidationErrors;
}

export default function StepTerms({ formData, onChange, errors }: StepTermsProps) {
  const customBudgets = [
    {
      id: "startup",
      title: "Startup Tier",
      price: "$5k - $15k",
      desc: "Ideal for early stage MVPs, clean prototypes, and core launches.",
    },
    {
      id: "growth",
      title: "Growth Suite",
      price: "$15k - $50k",
      desc: "For scaled production rollouts, complex backends, and multi-user sync.",
    },
    {
      id: "enterprise",
      title: "Enterprise Force",
      price: "$50k+",
      desc: "Broad relational cloud grids, SLA uptime, and custom legal parameters.",
    },
  ];

  const cloudProviders = [
    { id: "gcp", label: "Google Cloud (GCP)", desc: "Highly optimized Gemini and container scaling" },
    { id: "aws", label: "Amazon Web Services (AWS)", desc: "Traditional corporate cloud topologies" },
    { id: "none", label: "Decide Later", desc: "Consult our engineers for architecture layout" },
  ];

  return (
    <div className="space-y-6 text-slate-900">
      {/* Budget Tier Grid */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
          <CreditCard className="w-4 h-4 text-slate-400" />
          Budget Allocation <span className="text-blue-600">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {customBudgets.map((tier) => {
            const isSelected = formData.budgetTier === tier.id;
            return (
              <button
                type="button"
                key={tier.id}
                onClick={() => onChange({ budgetTier: tier.id })}
                className={`flex flex-col justify-between p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                  isSelected
                    ? "bg-blue-50/70 border-blue-600 shadow-xs text-slate-900"
                    : "bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50/40 text-slate-700"
                }`}
                id={`budget-tier-${tier.id}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? "text-blue-700" : "text-slate-400"}`}>{tier.title}</span>
                    {isSelected && (
                      <span className="bg-blue-100 text-blue-700 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">
                        Selected
                      </span>
                    )}
                  </div>
                  <div className={`text-xl font-extrabold font-display mb-2 ${isSelected ? "text-blue-950" : "text-slate-800"}`}>{tier.price}</div>
                  <p className={`text-xs leading-relaxed ${isSelected ? "text-slate-700" : "text-slate-500"}`}>{tier.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
        {errors.budgetTier && (
          <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block"></span>
            {errors.budgetTier}
          </p>
        )}
      </div>

      {/* Cloud Integration */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
          <Cloud className="w-4 h-4 text-slate-400" />
          Hosting Topology / Vendor
        </label>
        <div className="space-y-2.5">
          {cloudProviders.map((cloud) => {
            const isChecked = formData.cloudProvider === cloud.id;
            return (
              <label
                key={cloud.id}
                htmlFor={`cloud-${cloud.id}`}
                className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isChecked
                    ? "bg-blue-50/40 border-blue-500/50"
                    : "bg-white border-slate-200 hover:bg-slate-50"
                }`}
                id={`cloud-label-${cloud.id}`}
              >
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    id={`cloud-${cloud.id}`}
                    name="cloudProvider"
                    value={cloud.id}
                    checked={isChecked}
                    onChange={() => onChange({ cloudProvider: cloud.id })}
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                      isChecked ? "border-blue-600" : "border-slate-300 bg-white"
                    }`}
                  >
                    {isChecked && (
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    )}
                  </div>
                </div>
                <div>
                  <span className={`block text-xs font-semibold ${isChecked ? "text-blue-950" : "text-slate-700"}`}>
                    {cloud.label}
                  </span>
                  <span className="block text-[10px] text-slate-550 mt-0.5">
                    {cloud.desc}
                  </span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* NDA Agreement */}
      <div className="pt-2">
        <label
          htmlFor="agreeNda"
          className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all bg-white ${
            formData.agreeNda
              ? "border-blue-500/40 bg-blue-50/20"
              : errors.agreeNda
              ? "border-rose-300 bg-rose-50/15"
              : "border-slate-200 hover:bg-slate-50"
          }`}
          id="nda-checkbox-container"
        >
          <div className="flex items-center mt-0.5">
            <input
              type="checkbox"
              id="agreeNda"
              checked={formData.agreeNda}
              onChange={(e) => onChange({ agreeNda: e.target.checked })}
              className="sr-only"
            />
            <div
              className={`w-4.5 h-4.5 rounded border flex items-center justify-center transition-colors shrink-0 ${
                formData.agreeNda
                  ? "bg-blue-600 border-blue-600 text-white"
                  : errors.agreeNda
                  ? "border-rose-500 bg-white"
                  : "border-slate-300 bg-white"
              }`}
            >
              {formData.agreeNda && <ShieldCheck className="w-4 h-4 stroke-[2] text-white" />}
            </div>
          </div>
          <div className="space-y-1">
            <span className="block text-xs font-semibold text-slate-800">
              I agree to the Mutual Non-Disclosure & Services Agreement (NDA) <span className="text-blue-600">*</span>
            </span>
            <span className="block text-[10px] text-slate-500 leading-relaxed font-sans">
              We hold high regard for proprietary intellectual assets and strictly promise that codebases and technical specifications will not be sold, indexed, or shared with third-party advertisers.
            </span>
          </div>
        </label>
        {errors.agreeNda && (
          <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block"></span>
            {errors.agreeNda}
          </p>
        )}
      </div>
    </div>
  );
}
