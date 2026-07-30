"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Aperture, Camera, Mic, X } from "lucide-react";

/**
 * Looping preview of the camera assistant, built from a real under-sink photo.
 * The viewfinder pushes in as the captions advance, so the mock-up reads as a
 * short clip of the conversation rather than a still screenshot.
 */

const steps = [
  {
    caption: "Can you move the camera slightly closer to the pipe under the sink?",
    capture: false,
  },
  {
    caption:
      "Thank you. Can you show me where the water appears when the tap is running?",
    capture: false,
  },
  {
    caption: "It looks like water may be leaking near the tap connection.",
    capture: true,
  },
  {
    caption: "I've added that photo to your job brief. Let's finish the details.",
    capture: false,
  },
];

const STEP_MS = 3400;

export function PhoneMock() {
  const [step, setStep] = useState(0);
  const [flash, setFlash] = useState(false);
  const [shots, setShots] = useState(0);
  const stepRef = useRef(0);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    // Reduced motion keeps the first frame; the pulse classes are neutralised
    // by the global prefers-reduced-motion rules.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      const next = (stepRef.current + 1) % steps.length;
      stepRef.current = next;
      setStep(next);

      if (next === 0) {
        setShots(0);
      } else if (steps[next].capture) {
        setShots((count) => count + 1);
        setFlash(true);
        flashTimer.current = setTimeout(() => setFlash(false), 380);
      }
    }, STEP_MS);

    return () => {
      clearInterval(id);
      clearTimeout(flashTimer.current);
    };
  }, []);

  // Slow push-in across the loop, mirroring "move a little closer".
  const scale = 1.06 + step * 0.06;

  return (
    <div
      role="img"
      aria-label="Preview of the serviceman.ai camera assistant guiding a customer through a leak under a kitchen sink"
      className="mx-auto w-full max-w-[300px] rounded-[2.5rem] border-[10px] border-navy bg-camera shadow-lift"
    >
      <div
        className="relative flex aspect-[9/18] flex-col overflow-hidden rounded-[1.9rem]"
        aria-hidden
      >
        {/* Camera feed */}
        <Image
          src="/images/under-sink.jpg"
          alt=""
          fill
          // The landscape source is cropped into a tall portrait frame and then
          // scaled up, so request well above the 300px slot width.
          sizes="900px"
          className="object-cover transition-transform duration-[3400ms] ease-linear"
          style={{ transform: `scale(${scale})` }}
        />
        {/* Keeps the chrome legible without hiding the camera feed. */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/5 to-black/60" />
        {flash && <div className="absolute inset-0 z-20 bg-white/70" />}

        {/* Top bar */}
        <div className="relative z-10 flex items-center justify-between px-4 pt-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur">
            <span className="soft-pulse h-1.5 w-1.5 rounded-full bg-success" />
            AI agent connected
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur">
            <X className="h-3.5 w-3.5" />
          </span>
        </div>

        {/* Focus brackets */}
        <div className="relative z-10 mx-auto mt-14 h-28 w-36">
          <span className="absolute left-0 top-0 h-5 w-5 rounded-tl-lg border-l-2 border-t-2 border-white/80" />
          <span className="absolute right-0 top-0 h-5 w-5 rounded-tr-lg border-r-2 border-t-2 border-white/80" />
          <span className="absolute bottom-0 left-0 h-5 w-5 rounded-bl-lg border-b-2 border-l-2 border-white/80" />
          <span className="absolute bottom-0 right-0 h-5 w-5 rounded-br-lg border-b-2 border-r-2 border-white/80" />
        </div>

        {/* Captured thumbnails */}
        {shots > 0 && (
          <div className="relative z-10 mt-3 flex justify-center gap-1.5">
            {Array.from({ length: shots }).map((_, index) => (
              <span
                key={index}
                className="relative h-8 w-8 overflow-hidden rounded-md border border-white/40"
              >
                <Image
                  src="/images/under-sink.jpg"
                  alt=""
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </span>
            ))}
          </div>
        )}

        {/* AI caption */}
        <div className="relative z-10 mt-auto px-3">
          <div className="rounded-2xl bg-black/60 px-3.5 py-3 backdrop-blur">
            <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-white/50">
              AI agent
              <span className="soft-pulse h-1 w-1 rounded-full bg-success" />
            </p>
            <p
              key={step}
              className="rise-in mt-1 min-h-[2.5rem] text-xs leading-snug text-white"
            >
              {steps[step].caption}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="relative z-10 flex items-center justify-center gap-6 px-4 pb-6 pt-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur">
            <Mic className="h-4 w-4" />
          </span>
          <span
            className={`flex h-14 w-14 items-center justify-center rounded-full border-4 border-white text-white transition-colors ${
              flash ? "bg-white/70" : "bg-white/20"
            }`}
          >
            <Aperture className="h-6 w-6" />
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur">
            <Camera className="h-4 w-4" />
          </span>
        </div>
      </div>
    </div>
  );
}
