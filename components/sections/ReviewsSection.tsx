"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { reviews } from "@/data/reviews";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/hooks/useLocale";

export function ReviewsSection() {
  const { tr } = useLocale();

  return (
    <section id="reviews" className="section-padding bg-[#131311]">
      <div className="container-wide">
        <SectionHeader
          label="Відгуки"
          title={tr.sections.reviews}
          subtitle={tr.sections.reviewsSub}
          className="[&_h2]:text-white [&_.section-label]:text-[#95dc6a] [&_p]:text-white/50"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white/5 border border-white/8 rounded-[6px] p-6 md:p-7 hover:bg-white/8 transition-colors duration-300"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} size={13} className="text-[#77d14d] fill-[#77d14d]" />
                ))}
              </div>

              {/* Text */}
              <p className="text-white/75 text-[14px] leading-relaxed mb-6">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-[#2e3b1e]">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="text-white text-sm font-500">{review.name}</p>
                  <p className="text-white/40 text-[12px]">
                    {review.location} · {review.houseModel} · {review.date}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
