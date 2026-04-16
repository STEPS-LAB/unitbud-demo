"use client";

import type { ChangeEvent, ReactNode } from "react";
import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { LucideIcon } from "lucide-react";
import { Phone, User, MessageSquare, Loader2, CheckCircle2 } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale, type Locale } from "@/hooks/useLocale";
import { cn, formatPhone, isValidPhone } from "@/lib/utils";

function buildSchema(locale: Locale) {
  return z.object({
    name: z
      .string()
      .min(2, locale === "en" ? "Minimum 2 characters" : "Мінімум 2 символи")
      .regex(/^[a-zA-Zа-яА-ЯіІїЇєЄ\s'-]+$/, locale === "en" ? "Letters only" : "Тільки літери"),
    phone: z.string().refine(isValidPhone, locale === "en" ? "Enter a valid phone number" : "Введіть коректний номер"),
    comment: z.string().max(300).optional(),
  });
}
type FormData = z.infer<ReturnType<typeof buildSchema>>;

/** Без власного outline: глобальний :focus-visible малював би другу рамку всередині рядка з іконкою */
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

export function ConsultationSection() {
  const { locale, tr } = useLocale();
  const schema = useMemo(() => buildSchema(locale), [locale]);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const phoneValue = watch("phone", "");

  const handlePhoneInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue("phone", formatPhone(e.target.value), { shouldValidate: true });
  };

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Consultation:", data);
    setSubmitting(false);
    setSuccess(true);
  };

  const nameRegister = register("name", {
    setValueAs: (v: unknown) => (typeof v === "string" ? v.replace(/\d/g, "") : v),
  });

  return (
    <section id="contacts" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <Image
          src="/bgcons.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover scale-105"
          loading="lazy"
          quality={75}
        />
      </div>
      {/* Чорне тонування: біла картка форми контрастніша, фото лише приглушене */}
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-b from-black/42 via-black/48 to-black/54"
        aria-hidden
      />

      <div className="container-narrow relative z-10">
        <SectionHeader
          title={tr.sections.consultation}
          subtitle={tr.sections.consultationSub}
          centered
          responsiveAlign
          variant="onDark"
          titleClassName="font-black [text-shadow:0_1px_2px_rgba(0,0,0,0.35),0_8px_32px_rgba(0,0,0,0.2)]"
          showTitleMarker
        />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-lg"
        >
          <div
            className="relative border border-[#e2e2de] bg-white p-8 shadow-[0_24px_64px_rgba(0,0,0,0.28)] md:p-11"
            style={{ borderRadius: "var(--radius-site)" }}
          >
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-4 text-center"
              >
                <CheckCircle2 size={52} className="mb-4 text-[#77d14d]" />
                <h3
                  className="mb-2 text-xl font-normal text-[#131311]"
                  style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
                >
                  {tr.form.success}
                </h3>
                <p className="max-w-sm text-sm text-[#7c7c78]">{tr.form.successSub}</p>
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    setSuccess(false);
                  }}
                  className="btn-outline mt-8 text-sm"
                >
                  {tr.form.submitAnother}
                </button>
              </motion.div>
            ) : (
              <form key={locale} onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                <div>
                  <FieldIconWrap icon={User} error={!!errors.name}>
                    <input
                      {...nameRegister}
                      type="text"
                      autoComplete="name"
                      placeholder={tr.form.name}
                      onKeyDown={(e) => {
                        if (e.key.length === 1 && /\d/.test(e.key) && !e.ctrlKey && !e.metaKey) {
                          e.preventDefault();
                        }
                      }}
                      className={fieldInnerClass}
                    />
                  </FieldIconWrap>
                  {errors.name && <p className="mt-1.5 text-[12px] text-[#cc4444]">{errors.name.message}</p>}
                </div>

                <div>
                  <FieldIconWrap icon={Phone} error={!!errors.phone}>
                    <input
                      value={phoneValue}
                      onChange={handlePhoneInput}
                      type="tel"
                      autoComplete="tel"
                      placeholder="+38 (0__) ___-__-__"
                      inputMode="numeric"
                      className={fieldInnerClass}
                    />
                  </FieldIconWrap>
                  {errors.phone && <p className="mt-1.5 text-[12px] text-[#cc4444]">{errors.phone.message}</p>}
                </div>

                <div>
                  <FieldIconWrap icon={MessageSquare} multiline>
                    <textarea
                      {...register("comment")}
                      placeholder={tr.form.comment}
                      rows={3}
                      className={cn(fieldInnerClass, "min-h-[6.5rem] resize-none")}
                    />
                  </FieldIconWrap>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary btn-text-graphite no-outline w-full justify-center py-4 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={15} className="animate-spin" /> {tr.form.sending}
                    </>
                  ) : (
                    tr.form.submit
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
