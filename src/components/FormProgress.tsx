import React from "react";
import { Check } from "lucide-react";
import { motion } from "motion/react";
import { FormStep } from "../types";

interface FormProgressProps {
  steps: FormStep[];
  currentStepIndex: number;
  progressPercentage: number;
  onStepClick: (stepIndex: number) => void;
  maxReachedStep: number;
}

export default function FormProgress({
  steps,
  currentStepIndex,
  progressPercentage,
  onStepClick,
  maxReachedStep,
}: FormProgressProps) {
  return (
    <div className="w-full mb-8 bg-slate-50/80 border border-slate-250/60 rounded-2xl p-5 md:p-6 shadow-xs backdrop-blur-md">
      {/* Top row: Labels and percentage info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">
            Step {currentStepIndex + 1} of {steps.length}
          </span>
          <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2 mt-0.5">
            Current Stage:{" "}
            <span className="text-blue-600 font-display">{steps[currentStepIndex].label}</span>
          </h3>
        </div>
        <div className="flex items-end sm:items-center gap-2 font-mono text-xs text-slate-500">
          <span className="text-medium text-blue-600 font-bold">{Math.round(progressPercentage)}%</span>
          <span>completed</span>
        </div>
      </div>

      {/* Modern line progress track */}
      <div className="relative w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mb-6">
        <motion.div
          className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Grid steps navigation pills */}
      <div className="grid grid-cols-4 gap-2 md:gap-3">
        {steps.map((step, idx) => {
          const isActive = idx === currentStepIndex;
          const isCompleted = idx < currentStepIndex;
          const isReachable = idx <= maxReachedStep;

          return (
            <button
              key={step.id}
              onClick={() => isReachable && onStepClick(idx)}
              disabled={!isReachable}
              className={`group flex items-center gap-2 px-2.5 py-2 rounded-xl text-left transition-all duration-300 border focus:outline-hidden ${
                isActive
                  ? "bg-blue-50/60 border-blue-500/50 text-blue-900 cursor-default"
                  : isCompleted
                  ? "bg-slate-100/80 border-slate-200 hover:border-blue-500/30 text-blue-600 cursor-pointer"
                  : isReachable
                  ? "bg-white border-slate-200 hover:border-slate-300 text-slate-600 cursor-pointer"
                  : "bg-slate-50/30 border-slate-100 text-slate-300 cursor-not-allowed"
              }`}
              id={`progress-step-btn-${idx}`}
            >
              <div
                className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold shrink-0 transition-all ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : isCompleted
                    ? "bg-blue-100 text-blue-600"
                    : "bg-slate-200 text-slate-400 group-hover:bg-slate-300"
                }`}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : step.id}
              </div>
              <span className={`hidden md:inline font-sans text-xs font-semibold ${
                isActive ? "text-blue-905" : "text-slate-500"
              }`}>
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
