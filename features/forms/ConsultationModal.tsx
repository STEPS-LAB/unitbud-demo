"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { X, CheckCircle2, Loader2, Phone, User, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn, formatPhone, isValidPhone } from "@/lib/utils";
import { useLocale, type Locale } from "@/hooks/useLocale";

function buildSchema(locale: Locale) {
  return z.object({
    name: z
      .string()
      .min(2, locale === "en" ? "Minimum 2 characters" : "Мінімум 2 символи")
      .max(60, locale === "en" ? "Maximum 60 characters" : "Максимум 60 символів")
      .regex(/^[a-zA-Zа-яА-ЯіІїЇєЄ\s'-]+$/, locale === "en" ? "Letters only" : "Тільки літери"),
    phone: z.string().refine(isValidPhone, locale === "en" ? "Enter a valid phone number" : "Введіть коректний номер"),
    comment: z.string().max(300).optional(),
  });
}

type FormData = z.infer<ReturnType<typeof buildSchema>>;

const fieldInnerClass =
  "no-outline w-full min-h-0 rounded-none border-0 bg-transparent px-3 py-3.5 text-[0.9375rem] text-[#131311] shadow-none outline-none placeholder:text-[#8e8e88] focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0";

function FieldIconWrap({
  icon: Icon,
  multiline,
  children,
  error,
}: {
  icon: LucideIcon;
  multiline?: boolean;
  children: ReactNode;
  error?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex overflow-hidden rounded-[8px] border transition-[border-color,box-shadow]",
        error
          ? "border-[#cc4444] bg-[#fff8f8] shadow-[0_0_0_3px_rgba(204,68,68,0.1)]"
          : "border-[#dfdfdb] bg-[#f6f6f4] focus-within:border-[#77d14d] focus-within:shadow-[0_0_0_3px_rgba(119,209,77,0.12)]",
      )}
    >
      <div
        className={cn(
          "flex w-[3.25rem] shrink-0 items-center justify-center text-[#6b6b66]",
          multiline ? "items-start pt-3.5" : "",
        )}
      >
        <Icon size={16} strokeWidth={1.75} aria-hidden />
      </div>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ConsultationModal({ open, onClose }: Props) {
  const { locale, tr } = useLocale();
  const schema = useMemo(() => buildSchema(locale), [locale]);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const phoneValue = watch("phone", "");

  const nameRegister = register("name", {
    setValueAs: (v: unknown) => (typeof v === "string" ? v.replace(/\d/g, "") : v),
  });

  // Lock scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      if (!open) { reset(); setSuccess(false); }
    }
    return () => { document.body.style.overflow = ""; };
  }, [open, reset]);

  // Keyboard close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const formatted = formatPhone(raw);
    setValue("phone", formatted, { shouldValidate: true });
  };

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1400));
    console.log("Form submitted:", data);
    setSubmitting(false);
    setSuccess(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { reset(); setSuccess(false); }, 400);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={backdropRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
          style={{ background: "rgba(19,19,17,0.6)", backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === backdropRef.current) handleClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white w-full sm:max-w-md rounded-t-[12px] sm:rounded-[8px] overflow-hidden"
            style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.18)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-0">
              <div>
                <h2
                  className="text-xl font-400 text-[#131311] tracking-tight"
                  style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
                >
                  {success ? (locale === "en" ? "Thank you!" : "Дякуємо!") : tr.common.consultation}
                </h2>
                <p className="text-sm text-[#7c7c78] mt-1">
                  {success
                    ? locale === "en"
                      ? "We'll contact you within a minute"
                      : "Ми зв'яжемось з вами протягом хвилини"
                    : locale === "en"
                      ? "Our architect will call you shortly"
                      : "Наш архітектор зателефонує вам найближчим часом"}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="ml-4 p-2 rounded-[4px] text-[#a8a8a3] hover:text-[#131311] hover:bg-[#f2f2f0] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 pb-6 pt-6">
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center py-6 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 20 }}
                    >
                      <CheckCircle2 size={56} className="text-[#77d14d] mb-4" />
                    </motion.div>
                    <p className="text-[#555552] text-sm leading-relaxed max-w-xs">
                      {locale === "en"
                        ? "Thank you for your request! Expect a call from our architect. We respond within 1 minute during working hours."
                        : "Дякуємо за вашу заявку! Очікуйте дзвінка від нашого архітектора. Ми відповідаємо протягом 1 хвилини в робочий час."}
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-6 btn-outline text-sm"
                    >
                      {tr.form.close}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key={`form-${locale}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="space-y-4"
                  >
                    {/* Name */}
                    <div>
                      <FieldIconWrap icon={User} error={!!errors.name}>
                        <input
                          {...nameRegister}
                          type="text"
                          placeholder={tr.form.name}
                          autoComplete="given-name"
                          onKeyDown={(e) => {
                            if (e.key.length === 1 && /\d/.test(e.key) && !e.ctrlKey && !e.metaKey) {
                              e.preventDefault();
                            }
                          }}
                          className={fieldInnerClass}
                        />
                      </FieldIconWrap>
                      {errors.name && (
                        <p className="mt-1.5 text-[12px] text-[#cc4444]">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <FieldIconWrap icon={Phone} error={!!errors.phone}>
                        <input
                          ref={phoneInputRef}
                          value={phoneValue}
                          onChange={handlePhoneInput}
                          type="tel"
                          placeholder="+38 (0__) ___-__-__"
                          autoComplete="tel"
                          inputMode="numeric"
                          className={fieldInnerClass}
                        />
                      </FieldIconWrap>
                      {errors.phone && (
                        <p className="mt-1.5 text-[12px] text-[#cc4444]">{errors.phone.message}</p>
                      )}
                    </div>

                    {/* Comment */}
                    <div>
                      <FieldIconWrap icon={MessageSquare} multiline>
                        <textarea
                          {...register("comment")}
                          placeholder={locale === "en" ? "Comment or preferences (optional)" : "Коментар або побажання (необов'язково)"}
                          rows={3}
                          className={cn(fieldInnerClass, "min-h-[6.5rem] resize-none")}
                        />
                      </FieldIconWrap>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary btn-text-graphite w-full justify-center text-sm py-3.5 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={15} className="animate-spin" />
                          {tr.form.sending}
                        </>
                      ) : (
                        tr.housePage.getConsultation
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
