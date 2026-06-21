import React from "react";
import { Edit2, Shield, AlertTriangle, Cpu, HelpCircle } from "lucide-react";
import { FormData } from "../types";

interface StepReviewProps {
  formData: FormData;
  onJumpToStep: (stepIdx: number) => void;
}

export default function StepReview({ formData, onJumpToStep }: StepReviewProps) {
  const getGoalLabel = (val: string) => {
    switch (val) {
      case "launch_product":
        return "Launch a New Digital Product";
      case "optimize_operations":
        return "Optimize Cloud Operations";
      case "brand_redesign":
        return "Corporate Brand & Design System";
      case "custom_software":
        return "Custom Software Architecture";
      default:
        return "Not selected";
    }
  };

  const getBudgetLabel = (val: string) => {
    switch (val) {
      case "startup":
        return "Startup Tier ($5k - $15k)";
      case "growth":
        return "Growth Suite ($15k - $50k)";
      case "enterprise":
        return "Enterprise Force ($50k+)";
      default:
        return "Not selected";
    }
  };

  const getCloudLabel = (val: string) => {
    switch (val) {
      case "gcp":
        return "Google Cloud Platform (GCP)";
      case "aws":
        return "Amazon Web Services (AWS)";
      case "none":
        return "Decide Later / Consultation";
      default:
        return "Not selected";
    }
  };

  const getTechLabel = (techId: string) => {
    const list: Record<string, string> = {
      react: "React & Vite",
      tailwind: "Tailwind CSS v4",
      node: "Node.js & Express",
      postgres: "PostgreSQL Db",
      gemini: "Google Gemini API",
    };
    return list[techId] || techId;
  };

  return (
    <div className="space-y-6 text-slate-900">
      {/* Section 1: Company Profile */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5 space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-slate-150">
          <h4 className="text-xs font-mono tracking-wider uppercase text-slate-400 font-bold">
            01 / Company Profile
          </h4>
          <button
            type="button"
            onClick={() => onJumpToStep(0)}
            className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-bold transition-colors cursor-pointer"
            id="jump-step-1"
          >
            <Edit2 className="w-3 h-3" /> Edit Section
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="block text-[10px] text-slate-400 uppercase tracking-wide font-bold">
              Organization Name
            </span>
            <span className="text-sm text-slate-800 mt-0.5 block font-semibold">
              {formData.companyName || <span className="text-rose-500 font-semibold">Incomplete</span>}
            </span>
          </div>

          <div>
            <span className="block text-[10px] text-slate-400 uppercase tracking-wide font-bold">
              Operational Scale
            </span>
            <span className="text-sm text-slate-800 mt-0.5 block font-semibold">
              {formData.companySize} employees
            </span>
          </div>

          <div className="md:col-span-2">
            <span className="block text-[10px] text-slate-400 uppercase tracking-wide font-bold">
              Primary Objective
            </span>
            <span className="text-sm text-slate-800 mt-0.5 block font-semibold">
              {getGoalLabel(formData.primaryGoal)}
            </span>
          </div>

          <div className="md:col-span-2">
            <span className="block text-[10px] text-slate-400 uppercase tracking-wide font-bold">
              Contact Email
            </span>
            <span className="text-sm text-slate-850 mt-0.5 block font-mono font-semibold">
              {formData.contactEmail || <span className="text-rose-505 font-semibold text-rose-500">Incomplete</span>}
            </span>
          </div>
        </div>
      </div>

      {/* Section 2: Technical Specifications & Features */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5 space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-slate-150">
          <h4 className="text-xs font-mono tracking-wider uppercase text-slate-400 font-bold">
            02 / Scope & Tech Specs
          </h4>
          <button
            type="button"
            onClick={() => onJumpToStep(1)}
            className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-bold transition-colors cursor-pointer"
            id="jump-step-2"
          >
            <Edit2 className="w-3 h-3" /> Edit Section
          </button>
        </div>

        <div className="gap-4 space-y-4">
          <div>
            <span className="block text-[10px] text-slate-400 uppercase tracking-wide font-bold">
              Project / Initiative Name
            </span>
            <span className="text-sm text-slate-800 mt-0.5 block font-semibold">
              {formData.projectTitle || <span className="text-rose-500 font-semibold">Incomplete</span>}
            </span>
          </div>

          <div>
            <span className="block text-[10px] text-slate-400 uppercase tracking-wide font-bold">
              Technical Scope & Purpose
            </span>
            <p className="text-xs text-slate-700 mt-1 block leading-relaxed whitespace-pre-wrap bg-white p-3 rounded-lg border border-slate-200">
              {formData.projectDescription || <span className="text-rose-500 font-semibold">Incomplete</span>}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="block text-[10px] text-slate-400 uppercase tracking-wide font-bold mb-1">
                Preferred Technologies
              </span>
              {formData.technologies.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {formData.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md"
                    >
                      {getTechLabel(tech)}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-xs text-slate-400 italic block">None selected (Optionally consult team)</span>
              )}
            </div>

            <div>
              <span className="block text-[10px] text-slate-400 uppercase tracking-wide font-bold">
                Target Launch Date
              </span>
              <span className="text-sm text-slate-800 mt-0.5 block font-mono font-semibold">
                {formData.expectedLaunchDate || <span className="text-rose-500 font-semibold">Incomplete</span>}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Budget & Compliance */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5 space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-slate-150">
          <h4 className="text-xs font-mono tracking-wider uppercase text-slate-400 font-bold">
            03 / Parameters & Terms
          </h4>
          <button
            type="button"
            onClick={() => onJumpToStep(2)}
            className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-bold transition-colors cursor-pointer"
            id="jump-step-3"
          >
            <Edit2 className="w-3 h-3" /> Edit Section
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="block text-[10px] text-slate-400 uppercase tracking-wide font-bold">
              Budget Tier Selection
            </span>
            <span className="text-sm text-slate-800 mt-0.5 block font-semibold">
              {getBudgetLabel(formData.budgetTier)}
            </span>
          </div>

          <div>
            <span className="block text-[10px] text-slate-400 uppercase tracking-wide font-bold">
              Target Host Architecture
            </span>
            <span className="text-sm text-slate-800 mt-0.5 block font-semibold">
              {getCloudLabel(formData.cloudProvider)}
            </span>
          </div>

          <div className="md:col-span-2 flex items-center gap-2 mt-1 py-1.5 px-3 bg-blue-50/50 rounded-lg border border-blue-100">
            <Shield className="w-4 h-4 text-blue-605 text-blue-600 shrink-0" />
            <span className="text-[11px] text-slate-700 font-semibold">
              Mutual Non-Disclosure Agreement (NDA) successfully signed & authorized.
            </span>
          </div>
        </div>
      </div>

      {/* Verification Shield Notice */}
      <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/30 p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h5 className="text-xs font-bold text-slate-800">Submit and Initiate Workspace</h5>
          <p className="text-[10px] text-slate-500 leading-relaxed font-sans">
            Please make sure that the operational email is active. A system administrator will process your requirements, generate a private GitHub workspace path, and deliver credentials within 12 business hours.
          </p>
        </div>
      </div>
    </div>
  );
}
