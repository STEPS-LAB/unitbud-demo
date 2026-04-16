"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, Sparkles, X } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { AI_WIDGET_BOTTOM_MOBILE } from "@/lib/mobileSticky";
import { CHROME_SLIDE_DURATION, CHROME_SLIDE_EASE } from "@/lib/slideChrome";
import { cn } from "@/lib/utils";

type Props = {
  /** Інші сторінки: керування opacity/transform ззовні. */
  overlayStyle?: CSSProperties;
  /** Головна: той самий виїзд знизу, що й у панелі консультації. */
  slideFromBottom?: boolean;
  slideOpen?: boolean;
};

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

function normalizePath(p: string) {
  const trimmed = p.replace(/\/$/, "") || "/";
  return trimmed;
}

const demoResponses: Record<string, { uk: string; en: string }> = {
  catalog: {
    uk: "Каталог на сайті — житлові, комерційні моделі та лазні. Можна відфільтрувати за площею та лінійкою (Комфорт, Преміум тощо). Переглянути всі моделі можна в розділі «Каталог».",
    en: "Our catalog lists residential, commercial, and bath/sauna models. Filter by area and line (Comfort, Premium, etc.). Open the Catalog section to browse everything.",
  },
  pricing: {
    uk: "Орієнтовну вартість зручно порахувати в калькуляторі на головній — залежить від моделі та комплектації. Точну пропозицію під ваш ділянковий випадок дасть менеджер після консультації.",
    en: "Use the homepage calculator for a ballpark figure — it depends on the model and finish level. For an exact quote, our manager will help after a short consultation.",
  },
  timeline: {
    uk: "Середній термін реалізації під ключ — від близько 75 днів залежно від моделі та погодних умов. На етапах узгоджуємо графік прозоро.",
    en: "Typical turnkey timelines start around 75 days, depending on the model and weather. We keep milestones clear at every stage.",
  },
  warranty: {
    uk: "На каркасно-модульні рішення діє гарантія до 10 років — деталі зафіксовані в договорі та при передачі об'єкта.",
    en: "Frame-modular homes include up to a 10-year warranty — specifics are in your contract and handover documentation.",
  },
  consultation: {
    uk: "Залиште заявку через кнопку «Безкоштовна консультація» у шапці або внизу сторінки на телефоні — менеджер набере вас і відповість на всі питання.",
    en: "Tap “Free consultation” in the header or the bottom bar on mobile — a manager will call you back and walk through every detail.",
  },
  process: {
    uk: "Процес простий: консультація → підбір моделі та комплектації → договір → виробництво та доставка → монтаж і підключення. На головній є блок «Процес придбання будинку» з кроками.",
    en: "We go: consultation → model and finish selection → contract → manufacturing and delivery → installation and hookup. The homepage “Purchase process” section lists all steps.",
  },
  tech: {
    uk: "Ми будуємо каркасно-модульні будинки: заводська точність вузлів, швидкий монтаж на ділянці, енергоефективна оболонка. Підходить для цілорічного проживання та бізнесу.",
    en: "We build frame-modular homes: precision factory components, fast on-site assembly, and an efficient building envelope — ideal for year-round living or business use.",
  },
  commercial: {
    uk: "Є окремі комерційні рішення — офіси, точки продажу, гостьові модулі. У каталозі оберіть тип «Комерційні» або напишіть менеджеру для підбору під задачу.",
    en: "We offer commercial modules — offices, retail kiosks, guest units. Pick “Commercial” in the catalog or ask a manager for a tailored layout.",
  },
  default: {
    uk: "Дякую за звернення! Можу підказати про каталог, ціни, терміни, гарантію, технологію та консультацію. Уточніть, що саме вас цікавить?",
    en: "Thanks for reaching out! I can help with the catalog, pricing, timelines, warranty, our build system, or booking a consultation. What should we dive into?",
  },
};

const ROOT_CLASS = cn(
  "fixed right-4 z-40 will-change-transform lg:bottom-6 lg:right-6",
  AI_WIDGET_BOTTOM_MOBILE,
);

export function AiWidget({ overlayStyle, slideFromBottom, slideOpen = false }: Props) {
  const pathname = usePathname();
  const { locale, tr } = useLocale();
  const path = normalizePath(pathname ?? "");
  const isHome = path === "/";

  const [pastHero, setPastHero] = useState(!isHome);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const welcomeContent = tr.aiChat.welcome;
  const lang = locale === "uk" ? "uk" : "en";

  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: "1",
      role: "assistant",
      content: welcomeContent,
      timestamp: new Date(),
    },
  ]);

  const syncHero = useCallback(() => {
    if (!isHome || slideFromBottom) {
      setPastHero(true);
      return;
    }
    const el = document.getElementById("hero");
    if (!el) {
      setPastHero(true);
      return;
    }
    setPastHero(el.getBoundingClientRect().bottom <= 1);
  }, [isHome, slideFromBottom]);

  useLayoutEffect(() => {
    syncHero();
  }, [path, syncHero]);

  useLayoutEffect(() => {
    if (!isHome || slideFromBottom) return;
    window.addEventListener("scroll", syncHero, { passive: true });
    window.addEventListener("resize", syncHero);
    return () => {
      window.removeEventListener("scroll", syncHero);
      window.removeEventListener("resize", syncHero);
    };
  }, [isHome, slideFromBottom, syncHero]);

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].role === "assistant" && prev[0].id === "1") {
        return [{ ...prev[0], content: welcomeContent, timestamp: new Date() }];
      }
      return prev;
    });
  }, [welcomeContent]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  /** Блок фонового скролу сторінки (особливо iOS), поки відкрито модалку чату. */
  useLayoutEffect(() => {
    if (!isOpen) return;

    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;

    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPosition = body.style.position;
    const prevBodyTop = body.style.top;
    const prevBodyLeft = body.style.left;
    const prevBodyRight = body.style.right;
    const prevBodyWidth = body.style.width;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.position = prevBodyPosition;
      body.style.top = prevBodyTop;
      body.style.left = prevBodyLeft;
      body.style.right = prevBodyRight;
      body.style.width = prevBodyWidth;
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  const getResponse = (userMessage: string): string => {
    const lower = userMessage.toLowerCase();

    if (
      lower.includes("каталог") ||
      lower.includes("catalog") ||
      lower.includes("модел") ||
      lower.includes("model") ||
      lower.includes("будинк") ||
      lower.includes("house") ||
      lower.includes("home")
    ) {
      return demoResponses.catalog[lang];
    }
    if (
      lower.includes("ціна") ||
      lower.includes("цін") ||
      lower.includes("вартість") ||
      lower.includes("price") ||
      lower.includes("cost") ||
      lower.includes("кошт") ||
      lower.includes("calc") ||
      lower.includes("калькуля")
    ) {
      return demoResponses.pricing[lang];
    }
    if (
      lower.includes("термін") ||
      lower.includes("75") ||
      lower.includes("дні") ||
      lower.includes("days") ||
      lower.includes("timeline") ||
      lower.includes("швид") ||
      lower.includes("how long")
    ) {
      return demoResponses.timeline[lang];
    }
    if (
      lower.includes("гарант") ||
      lower.includes("warrant") ||
      lower.includes("10") && (lower.includes("рок") || lower.includes("year"))
    ) {
      return demoResponses.warranty[lang];
    }
    if (
      lower.includes("консультац") ||
      lower.includes("consult") ||
      lower.includes("заявк") ||
      lower.includes("менедж") ||
      lower.includes("manager") ||
      lower.includes("зв'яз") ||
      lower.includes("contact") ||
      lower.includes("телефон") ||
      lower.includes("phone")
    ) {
      return demoResponses.consultation[lang];
    }
    if (
      lower.includes("процес") ||
      lower.includes("process") ||
      lower.includes("крок") ||
      lower.includes("step") ||
      lower.includes("купівл") ||
      lower.includes("purchase") ||
      lower.includes("брон") ||
      lower.includes("book")
    ) {
      return demoResponses.process[lang];
    }
    if (
      lower.includes("каркас") ||
      lower.includes("frame") ||
      lower.includes("модуль") ||
      lower.includes("modular") ||
      lower.includes("технолог") ||
      lower.includes("technology") ||
      lower.includes("енерго")
    ) {
      return demoResponses.tech[lang];
    }
    if (
      lower.includes("комерц") ||
      lower.includes("commercial") ||
      lower.includes("бізнес") ||
      lower.includes("business") ||
      lower.includes("офіс") ||
      lower.includes("office") ||
      lower.includes("лазн") ||
      lower.includes("саун") ||
      lower.includes("sauna") ||
      lower.includes("bath")
    ) {
      return demoResponses.commercial[lang];
    }
    return demoResponses.default[lang];
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    window.setTimeout(() => {
      const assistantMessage: Message = {
        id: `${Date.now()}-a`,
        role: "assistant",
        content: getResponse(text),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1100);
  };

  const chromeReady = slideFromBottom ? slideOpen : pastHero;
  const fabVisible = chromeReady && !isOpen;

  const fab = (
    <motion.button
      type="button"
      initial={false}
      animate={{
        y: fabVisible ? 0 : 16,
        opacity: fabVisible ? 1 : 0,
        scale: fabVisible ? 1 : 0.92,
      }}
      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      whileHover={fabVisible ? { scale: 1.03 } : undefined}
      whileTap={fabVisible ? { scale: 0.97 } : undefined}
      onClick={() => setIsOpen(true)}
      className={cn(
        "flex h-14 items-center gap-2 rounded-2xl px-4 shadow-[0_8px_28px_rgba(0,0,0,0.18)] lg:h-auto lg:px-5 lg:py-3.5",
        "bg-[#131311] text-white ring-1 ring-white/10 hover:bg-[#1f1f1c]",
        fabVisible ? "pointer-events-auto" : "pointer-events-none",
      )}
      style={{ boxShadow: fabVisible ? "0 8px 28px rgba(0,0,0,0.22), 0 0 0 1px rgba(255,255,255,0.06)" : undefined }}
      aria-label={tr.aiChat.openLabel}
      aria-hidden={!fabVisible}
    >
      <MessageSquare className="size-5 shrink-0 text-[#77d14d]" aria-hidden />
      <span className="hidden max-w-[200px] text-left text-[10px] font-700 uppercase leading-tight tracking-[0.14em] text-white/95 sm:max-w-[220px] sm:inline">
        {tr.aiChat.fabLine}
      </span>
    </motion.button>
  );

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:items-end lg:justify-end lg:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            role="presentation"
            className="absolute inset-0 bg-[#0a0a09]/55 backdrop-blur-md lg:bg-[#0a0a09]/35 lg:backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="ai-widget-title"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "relative z-10 flex max-h-[min(34rem,88dvh)] w-full max-w-md flex-col overflow-hidden rounded-[12px] bg-white",
              "lg:max-h-[min(32rem,calc(100dvh-5rem))] lg:w-[min(100%,24rem)]",
            )}
            style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.2)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-between gap-3 px-4 py-3.5 sm:px-5"
              style={{
                background: "linear-gradient(135deg, #77d14d 0%, #5cb82e 48%, #4e9a28 100%)",
              }}
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/30 ring-1 ring-[#131311]/10">
                  <Sparkles className="size-5 text-[#131311]" aria-hidden />
                </div>
                <div className="min-w-0">
                  <h2 id="ai-widget-title" className="truncate text-sm font-700 tracking-tight text-[#131311]">
                    {tr.aiChat.title}
                  </h2>
                  <p className="text-[11px] font-500 text-[#131311]/75">{tr.aiChat.online}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex size-10 shrink-0 items-center justify-center rounded-[8px] text-[#131311]/75 transition-colors hover:bg-white/25 hover:text-[#131311]"
                aria-label={tr.form.close}
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4 sm:px-5">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[88%] rounded-[10px] px-3.5 py-2.5 text-[13px] leading-relaxed",
                      message.role === "user"
                        ? "bg-[#131311] text-white"
                        : "bg-[#f4f6f0] text-[#3a3a38] ring-1 ring-[#e8e8e5]",
                    )}
                  >
                    <span className="whitespace-pre-line">{message.content}</span>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-[10px] bg-[#f4f6f0] px-4 py-3 ring-1 ring-[#e8e8e5]">
                    <span className="size-2 animate-bounce rounded-full bg-[#a8a8a3] [animation-delay:-0.2s]" />
                    <span className="size-2 animate-bounce rounded-full bg-[#a8a8a3] [animation-delay:-0.1s]" />
                    <span className="size-2 animate-bounce rounded-full bg-[#a8a8a3]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length <= 2 && (
              <div className="border-t border-[#e8e8e5] px-4 py-3 sm:px-5">
                <div className="flex flex-wrap gap-2">
                  {tr.aiChat.suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => setInputValue(suggestion)}
                      className="rounded-full border border-[#e8e8e5] bg-white px-3 py-1.5 text-left text-[11px] font-500 text-[#5a5a56] transition-colors hover:border-[#77d14d]/50 hover:bg-[#f4fce8] hover:text-[#131311]"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="border-t border-[#e8e8e5] bg-[#fafaf8] p-3 sm:p-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={tr.aiChat.placeholder}
                  disabled={isTyping}
                  className="min-w-0 flex-1 rounded-[8px] border border-[#e8e8e5] bg-white px-3.5 py-2.5 text-[13px] text-[#131311] placeholder:text-[#a8a8a3] focus:border-[#77d14d] focus:outline-none focus:ring-2 focus:ring-[#77d14d]/25"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="flex size-11 shrink-0 items-center justify-center rounded-[8px] bg-[#77d14d] text-white shadow-[0_4px_14px_rgba(119,209,77,0.35)] transition-opacity hover:bg-[#4e8f31] disabled:pointer-events-none disabled:opacity-40"
                  aria-label={tr.aiChat.send}
                >
                  <Send className="size-4" />
                </button>
              </div>
            </form>

            <div className="bg-[#f9f9f8] px-4 py-2 text-center">
              <p className="text-[10px] text-[#a8a8a3]">{tr.aiChat.disclaimer}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (slideFromBottom) {
    return (
      <>
        <motion.div
          className={ROOT_CLASS}
          initial={false}
          animate={{
            y: slideOpen ? 0 : "100%",
            opacity: slideOpen ? 1 : 0,
          }}
          transition={{ duration: CHROME_SLIDE_DURATION, ease: CHROME_SLIDE_EASE }}
          style={{ pointerEvents: slideOpen ? "auto" : "none" }}
        >
          {fab}
        </motion.div>
        {modal}
      </>
    );
  }

  return (
    <>
      <div className={ROOT_CLASS} style={overlayStyle}>
        {fab}
      </div>
      {modal}
    </>
  );
}
