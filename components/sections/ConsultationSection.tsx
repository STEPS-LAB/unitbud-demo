"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, User, MessageSquare, Loader2, CheckCircle2 } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/hooks/useLocale";
import { formatPhone, isValidPhone } from "@/lib/utils";

const schema = z.object({
  name: z
    .string()
    .min(2, "Мінімум 2 символи")
    .regex(/^[a-zA-Zа-яА-ЯіІїЇєЄ\s'-]+$/, "Тільки літери"),
  phone: z.string().refine(isValidPhone, "Введіть коректний номер"),
  comment: z.string().max(300).optional(),
});
type FormData = z.infer<typeof schema>;

export function ConsultationSection() {
  const { tr } = useLocale();
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const phoneValue = watch("phone", "");

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("phone", formatPhone(e.target.value), { shouldValidate: true });
  };

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Consultation:", data);
    setSubmitting(false);
    setSuccess(true);
  };

  return (
    <section id="contacts" className="section-padding bg-[#f9f9f8]">
      <div className="container-narrow">
        <SectionHeader
          label="Консультація"
          title={tr.sections.consultation}
          subtitle={tr.sections.consultationSub}
          centered
        />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white border border-[#e8e8e5] rounded-[8px] p-8 md:p-12 max-w-lg mx-auto"
          style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.07)" }}
        >
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center py-6"
            >
              <CheckCircle2 size={56} className="text-[#77d14d] mb-4" />
              <h3
                className="text-xl font-400 text-[#131311] mb-2"
                style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
              >
                {tr.form.success}
              </h3>
              <p className="text-sm text-[#7c7c78]">{tr.form.successSub}</p>
              <button
                onClick={() => { reset(); setSuccess(false); }}
                className="mt-6 btn-outline text-sm"
              >
                Надіслати ще заявку
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              <div>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a8a8a3] pointer-events-none" />
                  <input
                    {...register("name")}
                    type="text"
                    placeholder={tr.form.name}
                    className={["input-field pl-10", errors.name ? "error" : ""].join(" ")}
                  />
                </div>
                {errors.name && <p className="mt-1.5 text-[12px] text-[#cc4444]">{errors.name.message}</p>}
              </div>

              <div>
                <div className="relative">
                  <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a8a8a3] pointer-events-none" />
                  <input
                    value={phoneValue}
                    onChange={handlePhoneInput}
                    type="tel"
                    placeholder="+38 (0__) ___-__-__"
                    className={["input-field pl-10", errors.phone ? "error" : ""].join(" ")}
                    inputMode="numeric"
                  />
                </div>
                {errors.phone && <p className="mt-1.5 text-[12px] text-[#cc4444]">{errors.phone.message}</p>}
              </div>

              <div>
                <div className="relative">
                  <MessageSquare size={15} className="absolute left-3.5 top-3.5 text-[#a8a8a3] pointer-events-none" />
                  <textarea
                    {...register("comment")}
                    placeholder={tr.form.comment}
                    rows={3}
                    className="input-field pl-10 resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full justify-center py-4 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <><Loader2 size={15} className="animate-spin" /> Відправляємо...</>
                ) : (
                  tr.form.submit
                )}
              </button>

              <p className="text-center text-[11px] text-[#a8a8a3]">
                Погоджуючись, ви приймаєте{" "}
                <a href="/privacy" className="underline hover:text-[#77d14d] transition-colors">
                  політику конфіденційності
                </a>
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
