"use client";

import { useState } from "react";
import { Phone } from "lucide-react";
import { ConsultationModal } from "@/features/forms/ConsultationModal";
import { useLocale } from "@/hooks/useLocale";

export function StickyBookingBar() {
  const { tr } = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile only */}
      <div className="lg:hidden sticky-bar fixed bottom-0 inset-x-0 z-30 bg-white border-t border-[#e8e8e5] px-4 py-3 flex gap-3">
        <a
          href="tel:+380800000000"
          className="flex items-center justify-center gap-2 flex-1 border border-[#e8e8e5] rounded-[4px] py-3 text-sm font-500 text-[#3a3a38] hover:border-[#77d14d] transition-colors"
        >
          <Phone size={14} className="text-[#77d14d]" />
          {tr.common.call}
        </a>
        <button
          onClick={() => setOpen(true)}
          className="btn-primary btn-text-graphite flex-[2] py-3 text-sm"
        >
          {tr.common.consultation}
        </button>
      </div>

      <ConsultationModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
