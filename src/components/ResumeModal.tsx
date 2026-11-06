import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, Download, ExternalLink, FileText } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm"
          />

          {/* Modal Dialog */}
          <motion.div
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-4xl h-[85vh] bg-[#0B0B0E] border border-zinc-800 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-zinc-800 bg-[#121216]">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <h2 id="resume-modal-title" className="font-display text-base font-semibold text-zinc-100">
                    Niranjan P — Official Curriculum Vitae
                  </h2>
                  <p className="text-xs text-zinc-400">
                    B.E. Electronics & Communication Engineering · Madurai, Tamil Nadu
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <a
                  href={PROFILE_DATA.resumePdfUrl}
                  download="Niranjan_P_Resume.pdf"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>
                <a
                  href={PROFILE_DATA.resumePdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Open Full Tab</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close resume preview"
                  className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Embedded PDF Frame */}
            <div className="flex-1 bg-zinc-950 relative">
              <iframe
                src={PROFILE_DATA.resumePdfUrl}
                title="Niranjan P Resume PDF"
                className="w-full h-full border-0"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
