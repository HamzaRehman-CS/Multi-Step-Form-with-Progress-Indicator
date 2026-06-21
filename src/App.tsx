import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowRight, ArrowLeft, Send, Sparkles, FolderSync, ShieldAlert, Trash2 } from "lucide-react";
import { FormData, ValidationErrors, FORM_STEPS, INITIAL_FORM_DATA } from "./types";
import FormProgress from "./components/FormProgress";
import StepCompany from "./components/StepCompany";
import StepScope from "./components/StepScope";
import StepTerms from "./components/StepTerms";
import StepReview from "./components/StepReview";
import SubmissionSuccess from "./components/SubmissionSuccess";

const COLD_DRAFT_KEY = "enterprise_onboarding_form_draft";

export default function App() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [autosaveStatus, setAutosaveStatus] = useState<"synced" | "saving" | "idle">("idle");
  const [showRestoredNotice, setShowRestoredNotice] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [maxReachedStep, setMaxReachedStep] = useState(0);

  // 1. Initial Draft Recovery on Mount
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem(COLD_DRAFT_KEY);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft) as FormData;
        // Verify fields keys exist compared to baseline to avert formatting crash
        if (parsed.companyName || parsed.projectTitle || parsed.contactEmail) {
          setFormData(parsed);
          setShowRestoredNotice(true);
          
          // Re-calculate how far they got to restore step click bounds
          let maxStep = 0;
          if (parsed.companyName.trim() && parsed.primaryGoal && parsed.contactEmail.trim()) {
            maxStep = 1;
            if (parsed.projectTitle.trim() && parsed.projectDescription.trim().length >= 30 && parsed.expectedLaunchDate) {
              maxStep = 2;
              if (parsed.budgetTier && parsed.agreeNda) {
                maxStep = 3;
              }
            }
          }
          setMaxReachedStep(maxStep);
        }
      }
    } catch (e) {
      console.warn("Could not retrieve localStorage draft structure.", e);
    }
  }, []);

  // 2. Autosave triggers on any changes to the form state
  useEffect(() => {
    if (isSubmitted) return;
    
    // Skip saving empty default templates
    if (JSON.stringify(formData) === JSON.stringify(INITIAL_FORM_DATA)) {
      return;
    }

    setAutosaveStatus("saving");
    const timeoutId = setTimeout(() => {
      try {
        localStorage.setItem(COLD_DRAFT_KEY, JSON.stringify(formData));
        setAutosaveStatus("synced");
      } catch (e) {
        console.error("Autosave storage operation failed", e);
      }
    }, 600);

    return () => clearTimeout(timeoutId);
  }, [formData, isSubmitted]);

  // 3. Validation Utility
  const validateStepFields = (stepIdx: number, data: FormData): ValidationErrors => {
    const stepErrors: ValidationErrors = {};
    
    if (stepIdx === 0) {
      if (!data.companyName.trim()) {
        stepErrors.companyName = "Company/Organization name is required.";
      }
      if (!data.primaryGoal) {
        stepErrors.primaryGoal = "Please select a response objective.";
      }
      if (!data.contactEmail.trim()) {
        stepErrors.contactEmail = "Email address is required.";
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.contactEmail.trim())) {
          stepErrors.contactEmail = "Please enter a valid format (e.g., mail@corp.com).";
        }
      }
    }
    
    if (stepIdx === 1) {
      if (!data.projectTitle.trim()) {
        stepErrors.projectTitle = "Project name/title is required.";
      }
      if (!data.projectDescription.trim()) {
        stepErrors.projectDescription = "Project description scope is required.";
      } else if (data.projectDescription.trim().length < 30) {
        stepErrors.projectDescription = `Please input at least 30 characters. Currently at ${data.projectDescription.trim().length}.`;
      }
      if (!data.expectedLaunchDate) {
        stepErrors.expectedLaunchDate = "Expected launch date is required.";
      } else {
        // Strict baseline comparison today: 2026-06-20
        const todayStr = "2026-06-20";
        if (new Date(data.expectedLaunchDate) < new Date(todayStr)) {
          stepErrors.expectedLaunchDate = "Target timeline cannot sit in the past.";
        }
      }
    }
    
    if (stepIdx === 2) {
      if (!data.budgetTier) {
        stepErrors.budgetTier = "Please choose a professional budget tier.";
      }
      if (!data.agreeNda) {
        stepErrors.agreeNda = "NDA authorization is mandatory to build enterprise records.";
      }
    }
    
    return stepErrors;
  };

  // 4. Handle Field Mutations From Steps
  const handleFieldChange = (fields: Partial<FormData>) => {
    const updated = { ...formData, ...fields };
    setFormData(updated);

    // Clear inline error if the user has fixed the field value
    const currentStepErrors = validateStepFields(currentStepIndex, updated);
    const resolvedErrors = { ...errors };
    
    Object.keys(fields).forEach((key) => {
      const fieldKey = key as keyof ValidationErrors;
      if (!currentStepErrors[fieldKey]) {
        delete resolvedErrors[fieldKey];
      } else {
        resolvedErrors[fieldKey] = currentStepErrors[fieldKey];
      }
    });
    setErrors(resolvedErrors);
  };

  // 5. Navigate Steps Mechanics
  const handleNextStep = () => {
    const stepErrors = validateStepFields(currentStepIndex, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setErrors({});
    if (currentStepIndex < FORM_STEPS.length - 1) {
      setDirection(1);
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      if (nextIdx > maxReachedStep) {
        setMaxReachedStep(nextIdx);
      }
    }
  };

  const handlePrevStep = () => {
    setErrors({});
    if (currentStepIndex > 0) {
      setDirection(-1);
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleStepClick = (targetIndex: number) => {
    // Only permit clicking previously validated and reached steps
    if (targetIndex <= maxReachedStep) {
      setDirection(targetIndex > currentStepIndex ? 1 : -1);
      setCurrentStepIndex(targetIndex);
      setErrors({});
    }
  };

  const resetFormDraftAndState = () => {
    try {
      localStorage.removeItem(COLD_DRAFT_KEY);
    } catch (_) {}
    setFormData(INITIAL_FORM_DATA);
    setCurrentStepIndex(0);
    setMaxReachedStep(0);
    setErrors({});
    setIsSubmitted(false);
    setShowRestoredNotice(false);
    setAutosaveStatus("idle");
  };

  // Final Action Submit
  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all individual steps as a double check
    let allErrors: ValidationErrors = {};
    for (let i = 0; i < 3; i++) {
      allErrors = { ...allErrors, ...validateStepFields(i, formData) };
    }

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      // Focus first error page
      if (allErrors.companyName || allErrors.primaryGoal || allErrors.contactEmail) {
        setDirection(-1);
        setCurrentStepIndex(0);
      } else if (allErrors.projectTitle || allErrors.projectDescription || allErrors.expectedLaunchDate) {
        setDirection(-1);
        setCurrentStepIndex(1);
      } else {
        setDirection(-1);
        setCurrentStepIndex(2);
      }
      return;
    }

    // Success Action!
    try {
      localStorage.removeItem(COLD_DRAFT_KEY);
    } catch (_) {}
    setIsSubmitted(true);
  };

  // Determine Overall Filled Field Progress Percentage Based on required elements
  const calculateDynamicProgress = (): number => {
    let completedRequiredCount = 0;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const todayStr = "2026-06-20";

    if (formData.companyName.trim()) completedRequiredCount++;
    if (formData.primaryGoal) completedRequiredCount++;
    if (formData.contactEmail.trim() && emailRegex.test(formData.contactEmail.trim())) completedRequiredCount++;
    if (formData.projectTitle.trim()) completedRequiredCount++;
    if (formData.projectDescription.trim().length >= 30) completedRequiredCount++;
    if (formData.expectedLaunchDate && new Date(formData.expectedLaunchDate) >= new Date(todayStr)) completedRequiredCount++;
    if (formData.budgetTier) completedRequiredCount++;
    if (formData.agreeNda) completedRequiredCount++;

    return (completedRequiredCount / 8) * 100;
  };

  // Modern CSS slide animation configurations
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  const activeStepMeta = FORM_STEPS[currentStepIndex];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between py-12 px-4 selection:bg-blue-100 selection:text-blue-900 font-sans leading-relaxed">
      
      {/* 1. Header Branding section */}
      <header className="w-full max-w-3xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-extrabold font-display text-slate-900 mt-1 tracking-tight">
          Initiate New Project Blueprint
        </h1>
      </header>

      {/* 2. Primary Form wrapper card */}
      <main className="w-full max-w-3xl mx-auto flex-1 flex flex-col justify-center">
        
        {/* Restored notice dropdown alert */}
        <AnimatePresence>
          {showRestoredNotice && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 bg-blue-50/70 border border-blue-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left"
              id="restored-draft-notice"
            >
              <div className="flex items-center gap-2.5">
                <FolderSync className="w-4 h-4 text-blue-600 shrink-0" />
                <div className="text-xs text-slate-700">
                  <span className="font-bold text-slate-900">Draft retrieved successfully!</span> We restored your autosaved form progress for <strong className="text-blue-600">{formData.companyName || "the previous session"}</strong>.
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowRestoredNotice(false)}
                  className="px-2.5 py-1 text-[10px] text-slate-500 hover:text-slate-800 font-bold cursor-pointer transition-colors"
                >
                  Dismiss
                </button>
                <button
                  type="button"
                  onClick={resetFormDraftAndState}
                  className="flex items-center gap-1 bg-rose-50 hover:bg-rose-100/50 text-rose-600 font-bold text-[10px] py-1 px-2.5 rounded-lg border border-rose-200 transition-all cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" /> Start Fresh
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Master Interface Card */}
        <div className="w-full bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xs relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
               <motion.div
                key="form-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Dynamically updating Progress Bar */}
                <FormProgress
                  steps={FORM_STEPS}
                  currentStepIndex={currentStepIndex}
                  progressPercentage={calculateDynamicProgress()}
                  onStepClick={handleStepClick}
                  maxReachedStep={maxReachedStep}
                />

                {/* Step header details */}
                <div className="border-b border-slate-150 pb-3">
                  <span className="text-[10px] font-mono text-blue-600 font-bold tracking-widest uppercase">
                    STAGE 0{activeStepMeta.id} / 04
                  </span>
                  <h2 className="text-xl font-bold font-display text-slate-900 mt-1">
                    {activeStepMeta.title}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    {activeStepMeta.subtitle}
                  </p>
                </div>

                {/* Steps with slide transit effect */}
                <div className="py-2 min-h-[280px]">
                  <AnimatePresence mode="popLayout" custom={direction}>
                    <motion.div
                      key={currentStepIndex}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      {currentStepIndex === 0 && (
                        <StepCompany
                          formData={formData}
                          onChange={handleFieldChange}
                          errors={errors}
                        />
                      )}
                      
                      {currentStepIndex === 1 && (
                        <StepScope
                          formData={formData}
                          onChange={handleFieldChange}
                          errors={errors}
                        />
                      )}
                      
                      {currentStepIndex === 2 && (
                        <StepTerms
                          formData={formData}
                          onChange={handleFieldChange}
                          errors={errors}
                        />
                      )}
                      
                      {currentStepIndex === 3 && (
                        <StepReview
                          formData={formData}
                          onJumpToStep={(idx) => {
                            setDirection(-1);
                            setCurrentStepIndex(idx);
                          }}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Action Buttons Row */}
                <div className="pt-6 border-t border-slate-150 flex items-center justify-end gap-4 mt-6">
                  {/* Intersect Buttons */}
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    {currentStepIndex > 0 && (
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-50 border border-slate-200 transition-all cursor-pointer w-1/2 sm:w-auto"
                        id="form-prev-btn"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Previous Step
                      </button>
                    )}

                    {currentStepIndex < FORM_STEPS.length - 1 ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer w-full sm:w-auto ml-auto sm:ml-0"
                        id="form-next-btn"
                      >
                        Continue
                        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleFinalSubmit}
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer w-full sm:w-auto ml-auto sm:ml-0"
                        id="form-submit-btn"
                      >
                        Launch Setup Blueprint
                        <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <SubmissionSuccess
                formData={formData}
                onReset={resetFormDraftAndState}
              />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
