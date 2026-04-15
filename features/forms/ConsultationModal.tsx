"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Loader2, Phone, User, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formatPhone, isValidPhone } from "@/lib/utils";

const schema = z.object({
  name: z
    .string()
    .min(2, "Мінімум 2 символи")
    .max(60, "Максимум 60 символів")
    .regex(/^[a-zA-Zа-яА-ЯіІїЇєЄ\s'-]+$/, "Тільки літери"),
  phone: z.string().refine(isValidPhone, "Введіть коректний номер"),
  comment: z.string().max(300).optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ConsultationModal({ open, onClose }: Props) {
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
                  style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
                >
                  {success ? "Дякуємо!" : "Безкоштовна консультація"}
                </h2>
                <p className="text-sm text-[#7c7c78] mt-1">
                  {success
                    ? "Ми зв'яжемось з вами протягом хвилини"
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
                      Дякуємо за вашу заявку! Очікуйте дзвінка від нашого архітектора. Ми відповідаємо протягом 1 хвилини в робочий час.
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-6 btn-outline text-sm"
                    >
                      Закрити
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="space-y-4"
                  >
                    {/* Name */}
                    <div>
                      <div className="relative">
                        <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a8a8a3] pointer-events-none" />
                        <input
                          {...register("name")}
                          type="text"
                          placeholder="Ваше ім'я"
                          className={["input-field pl-10", errors.name ? "error" : ""].join(" ")}
                          autoComplete="given-name"
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1.5 text-[12px] text-[#cc4444]">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <div className="relative">
                        <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a8a8a3] pointer-events-none" />
                        <input
                          ref={phoneInputRef}
                          value={phoneValue}
                          onChange={handlePhoneInput}
                          type="tel"
                          placeholder="+38 (0__) ___-__-__"
                          className={["input-field pl-10", errors.phone ? "error" : ""].join(" ")}
                          autoComplete="tel"
                          inputMode="numeric"
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1.5 text-[12px] text-[#cc4444]">{errors.phone.message}</p>
                      )}
                    </div>

                    {/* Comment */}
                    <div>
                      <div className="relative">
                        <MessageSquare size={15} className="absolute left-3.5 top-3.5 text-[#a8a8a3] pointer-events-none" />
                        <textarea
                          {...register("comment")}
                          placeholder="Коментар або побажання (необов'язково)"
                          rows={3}
                          className="input-field pl-10 resize-none"
                        />
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary w-full justify-center text-sm py-3.5 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={15} className="animate-spin" />
                          Відправляємо...
                        </>
                      ) : (
                        "Отримати безкоштовну консультацію"
                      )}
                    </button>

                    <p className="text-center text-[11px] text-[#a8a8a3]">
                      Натискаючи кнопку, ви погоджуєтесь з{" "}
                      <a href="/privacy" className="underline hover:text-[#77d14d] transition-colors">
                        політикою конфіденційності
                      </a>
                    </p>
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
