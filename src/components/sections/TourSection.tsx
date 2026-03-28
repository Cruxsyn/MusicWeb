"use client";

import { TOUR_DATES } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import TourDateCard from "@/components/ui/TourDateCard";

export default function TourSection() {
  return (
    <section id="tour" className="bg-warm-white py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Tour" />

        <div className="rounded-xl border border-gold-light/30 bg-white shadow-sm">
          {TOUR_DATES.map((tourDate, index) => (
            <TourDateCard
              key={tourDate.id}
              date={tourDate.date}
              city={tourDate.city}
              venue={tourDate.venue}
              ticketUrl={tourDate.ticketUrl}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
