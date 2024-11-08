"use client"

import clsx from "clsx"
import { TextReveal } from "@/components/TextReveal"

export default function Page() {
  const text =
    "How you design, align, and build matters. Create realistic prototypes that allow for quick iteration on flows and states. Test the full, interactive experience to get better feedback."

  return (
    <div className="min-h-screen w-screen px-8 py-12 md:px-0">
      <div className="pb-24 text-center text-sm text-white/30">Scroll down</div>

      <TextReveal body={text} className="relative mx-auto h-[200vh] w-full max-w-lg">
        {(tokens) => (
          <div className="sticky left-0 top-0 flex h-1/2 items-center text-3xl font-medium leading-tight text-white">
            <div>
              {tokens.map((token, index) => (
                <TextReveal.Token key={index} index={index}>
                  {(isActive) => (
                    <span
                      className={clsx(
                        {
                          "opacity-10": !isActive,
                        },
                        "transition",
                      )}>
                      {token}
                    </span>
                  )}
                </TextReveal.Token>
              ))}
            </div>
          </div>
        )}
      </TextReveal>
    </div>
  )
}
