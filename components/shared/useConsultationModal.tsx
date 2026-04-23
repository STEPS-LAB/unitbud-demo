"use client";

import { useState, useCallback, type ComponentType } from "react";

/*
 * Кастомна обгортка навколо "важкої" ConsultationModal для MAX-ледачого
 * завантаження. Справжня проблема: навіть next/dynamic({ssr:false}) пре-
 * завантажує chunk модулю одразу після hydration, бо Next.js додає його в
 * loadable-маніфест. Chunk ConsultationModal тягне react-hook-form + zod +
 * framer-motion → ~38 КБ gz у shared-chunk, що псує Lantern-LCP (~150 мс).
 *
 * Тут імпорт стартує ТІЛЬКИ коли користувач клікнув «Залишити заявку».
 * Повертаємо компонент разом з відкривачем/закривачем, щоб ціна кліку була
 * першого разу ~300 мс (одна round-trip + parse), а наступні — миттєво.
 */

type ModalProps = {
  open: boolean;
  onClose: () => void;
};

export function useConsultationModal() {
  const [Component, setComponent] = useState<ComponentType<ModalProps> | null>(
    null,
  );
  const [open, setOpen] = useState(false);

  const loadAndOpen = useCallback(() => {
    if (Component) {
      setOpen(true);
      return;
    }
    import("@/features/forms/ConsultationModal").then((mod) => {
      setComponent(() => mod.ConsultationModal);
      setOpen(true);
    });
  }, [Component]);

  const close = useCallback(() => setOpen(false), []);

  const modal = Component ? <Component open={open} onClose={close} /> : null;

  return { open: loadAndOpen, modal };
}
