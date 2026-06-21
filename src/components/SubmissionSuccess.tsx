import React from "react";
import { Check, Download, RotateCcw } from "lucide-react";
import { motion } from "motion/react";
import { FormData } from "../types";

interface SubmissionSuccessProps {
  formData: FormData;
  onReset: () => void;
}

export default function SubmissionSuccess({ formData, onReset }: SubmissionSuccessProps) {
  const guidRef = React.useMemo(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let token = "REQ-";
    for (let i = 0; i < 8; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  }, []);

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

  const handleDownload = () => {
    const techStackString = formData.technologies.length > 0 
      ? formData.technologies.map(t => getTechLabel(t)).join(", ")
      : "None selected";

    const formattedDesc = (formData.projectDescription || "No scope details provided.")
      .replace(/\r\n/g, "<br>")
      .replace(/\n/g, "<br>");

    const docContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' 
            xmlns:w='urn:schemas-microsoft-com:office:word' 
            xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Project Specification Blueprint Report - ${guidRef}</title>
        <!--[if gte mso 9]>
        <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotOptimizeForBrowser/>
          </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
          @page {
            size: 8.5in 11.0in;
            margin: 1.0in 1.0in 1.0in 1.0in;
            mso-header-margin: .5in;
            mso-footer-margin: .5in;
            mso-paper-source: 0;
          }
          body {
            font-family: 'Calibri', 'Segoe UI', Arial, sans-serif;
            color: #1e293b;
            line-height: 1.5;
            background-color: #ffffff;
            font-size: 11pt;
          }
          .header-banner {
            border-bottom: 3.5pt double #1e3a8a;
            padding-bottom: 12px;
            margin-bottom: 25px;
          }
          h1 {
            color: #1e3a8a;
            font-family: 'CalibriLight', 'Segoe UI', Arial, sans-serif;
            font-size: 22pt;
            font-weight: bold;
            margin: 0 0 5px 0;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .meta-info {
            font-size: 10pt;
            color: #64748b;
            font-weight: bold;
            margin: 0;
          }
          h2 {
            color: #1e3a8a;
            font-size: 14pt;
            font-weight: bold;
            margin-top: 25px;
            margin-bottom: 10px;
            border-bottom: 1px solid #1e3a8a;
            padding-bottom: 3px;
            text-transform: uppercase;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
            margin-bottom: 15px;
          }
          th {
            background-color: #f1f5f9;
            color: #1e293b;
            font-weight: bold;
            text-align: left;
            padding: 8px 10px;
            border: 1px solid #cbd5e1;
            font-size: 10.5pt;
            width: 35%;
          }
          td {
            padding: 8px 10px;
            border: 1px solid #cbd5e1;
            font-size: 10.5pt;
            color: #0f172a;
          }
          .description-block {
            background-color: #f8fafc;
            border-left: 3pt solid #3b82f6;
            padding: 12px;
            margin-top: 10px;
            margin-bottom: 20px;
            font-size: 10.5pt;
            color: #334155;
            font-style: italic;
          }
          .footer-note {
            font-size: 8.5pt;
            color: #64748b;
            margin-top: 50px;
            border-top: 1px solid #e2e8f0;
            padding-top: 12px;
          }
        </style>
      </head>
      <body>
        <div class="header-banner">
          <h1>Project Blueprint Report</h1>
          <p class="meta-info">REFERENCE NUMBER: ${guidRef} &bull; CONFIDENTIAL SPECIFICATION DOCUMENT</p>
        </div>
        
        <p>This blueprint contains the compiled business objectives, structural requirements, technical preferences, and hosting configurations submitted on the configuration system.</p>
        
        <h2>01. Organization & Core Objectives</h2>
        <table>
          <tr>
            <th>Company Name / Organization</th>
            <td><strong>${formData.companyName || "N/A"}</strong></td>
          </tr>
          <tr>
            <th>Primary Business Objective</th>
            <td>${getGoalLabel(formData.primaryGoal)}</td>
          </tr>
          <tr>
            <th>Operational Scale (Company Size)</th>
            <td>${formData.companySize} employees</td>
          </tr>
          <tr>
            <th>Operational Contact Email</th>
            <td>${formData.contactEmail || "N/A"}</td>
          </tr>
        </table>
        
        <h2>02. Project Target Scope & Technologies</h2>
        <table>
          <tr>
            <th>Project/Initiative Title</th>
            <td><strong>${formData.projectTitle || "N/A"}</strong></td>
          </tr>
          <tr>
            <th>Preferred Tooling / Tech Stack</th>
            <td>${techStackString}</td>
          </tr>
          <tr>
            <th>Expected Target Launch Date</th>
            <td>${formData.expectedLaunchDate || "N/A"}</td>
          </tr>
        </table>
        
        <h3 style="font-size: 11pt; font-weight: bold; margin-top: 15px; margin-bottom: 5px; color: #1e3a8a;">Structural & Business Scope Description</h3>
        <div class="description-block">
          ${formattedDesc}
        </div>
        
        <h2>03. Resource Allocations & Terms</h2>
        <table>
          <tr>
            <th>Allocated Budget Tier</th>
            <td>${getBudgetLabel(formData.budgetTier)}</td>
          </tr>
          <tr>
            <th>Target Cloud Vendor Topology</th>
            <td>${getCloudLabel(formData.cloudProvider)}</td>
          </tr>
          <tr>
            <th>Mutual Non-Disclosure Agreement (NDA)</th>
            <td>Signed & Digitally Authorized (Yes)</td>
          </tr>
        </table>
        
        <div class="footer-note">
          <p><strong>Corporate Integrity Verification:</strong> In compliance with standard data retention and non-disclosure standards, this report's specifications exist solely on standard local dynamic states and will not be indexed, distributed, or published to external parties.</p>
          <p>Compiled dynamically on ${new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })} at ${new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}.</p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff' + docContent], {
      type: 'application/msword;charset=utf-8'
    });
    
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement("a");
    downloadAnchor.href = url;
    downloadAnchor.download = `${formData.companyName ? formData.companyName.toLowerCase().replace(/[^a-z0-9_-]/g, "_") : "project"}_blueprint_specification.doc`;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="text-center space-y-8"
    >
      {/* Visual Celebration Circle */}
      <div className="flex flex-col items-center">
        <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 border border-blue-200 mb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white"
          >
            <Check className="w-7 h-7 stroke-[3]" />
          </motion.div>
        </div>

        <span className="text-[10px] font-mono tracking-widest text-blue-600 uppercase font-bold px-2.5 py-1 bg-blue-50 border border-blue-200 rounded-full">
          Reference: {guidRef}
        </span>
        <h2 className="text-2xl font-bold font-display text-slate-800 mt-4">
          Requirement Form Submitted
        </h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto mt-2 leading-relaxed font-sans">
          Your project proposal has been securely logged. The local autosave cache has been cleared, and your dynamic session is active.
        </p>
      </div>

      {/* Meta Action Cards */}
      <div className="max-w-md mx-auto bg-slate-50/40 border border-slate-200 rounded-2xl p-5 text-left space-y-4">
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Whats Next?
          </h4>
          <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4 leading-relaxed font-sans">
            <li>An automated onboarding representative will review target dependencies.</li>
            <li>Our backend team compiles configuration keys for <strong className="text-slate-850 font-bold">{formData.companyName || "your company"}</strong>.</li>
            <li>All technical outlines mapped onto <strong className="text-blue-600 font-bold">{formData.cloudProvider.toUpperCase()}</strong> will be dispatched to <strong className="text-slate-850 font-bold">{formData.contactEmail}</strong>.</li>
          </ul>
        </div>

        <div className="pt-3 border-t border-slate-200 flex flex-col gap-3 items-center">
          <span className="text-[10px] font-mono text-slate-400 font-bold text-center">
            SPECIFICATION BLUEPRINT REPORT
          </span>
          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer transition-colors shadow-xs"
            id="download-doc-btn"
          >
            <Download className="w-4 h-4" />
            Download Specification Document (.doc)
          </button>
        </div>
      </div>

      {/* Restart form footer */}
      <div>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors py-2 px-4 rounded-lg hover:bg-slate-50 cursor-pointer"
          id="reset-form-btn"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Start a New Blueprint
        </button>
      </div>
    </motion.div>
  );
}
