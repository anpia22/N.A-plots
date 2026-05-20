"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";
import { usePopup, PopupType } from "@/hooks/usePopup";

const config: Record<PopupType, { icon: React.ReactNode; accent: string; bg: string }> = {
  success: {
    icon: <CheckCircle size={22} />,
    accent: "text-emerald-600",
    bg: "bg-emerald-50 border-emerald-200",
  },
  error: {
    icon: <XCircle size={22} />,
    accent: "text-red-600",
    bg: "bg-red-50 border-red-200",
  },
  warning: {
    icon: <AlertTriangle size={22} />,
    accent: "text-amber-600",
    bg: "bg-amber-50 border-amber-200",
  },
  info: {
    icon: <Info size={22} />,
    accent: "text-blue-600",
    bg: "bg-blue-50 border-blue-200",
  },
};

export default function Popup() {
  const { isOpen, message, title, type, hidePopup } = usePopup();
  const { icon, accent, bg } = config[type];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={hidePopup}
          />

          {/* Card */}
          <motion.div
            className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden font-body"
            initial={{ scale: 0.92, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 12 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          >
            {/* Top coloured strip */}
            {/* <div className={`flex items-center gap-3 px-5 py-4 border-b ${bg}`}>
              <span className={`${accent} shrink-0`}>{icon}</span>
              {title ? (
                <p className={`font-heading font-bold text-sm ${accent}`}>{title}</p>
              ) : (
                <p className={`font-heading font-bold text-sm ${accent} capitalize`}>{type}</p>
              )}
              <button
                onClick={hidePopup}
                className="ml-auto text-gray-400 hover:text-gray-600 transition-colors cursor-pointer shrink-0"
                aria-label="Close popup"
              >
                <X size={16} />
              </button>
            </div> */}

            {/* Body */}
            <div className="px-5 py-4">
              <p className="text-text-primary text-sm leading-relaxed font-body">{message}</p>
            </div>

            {/* Footer */}
            <div className="px-5 pb-5">
              <button
                onClick={hidePopup}
                className="w-full bg-primary hover:bg-primary-dark text-white text-sm font-semibold font-heading rounded-xl py-2.5 transition-all active:scale-95 cursor-pointer shadow-sm"
              >
                OK
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
