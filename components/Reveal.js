"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createElement, useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const VARIANT_CONFIG = {
  rise: { x: 0, y: 42, scale: 0.985, blur: 0, duration: 0.88, ease: "power3.out" },
  left: { x: -72, y: 18, scale: 0.985, blur: 4, duration: 0.9, ease: "power3.out" },
  right: { x: 72, y: 18, scale: 0.985, blur: 4, duration: 0.9, ease: "power3.out" },
  zoom: { x: 0, y: 26, scale: 0.94, blur: 10, duration: 0.94, ease: "power3.out" },
  hero: { x: 0, y: 58, scale: 1, blur: 0, duration: 1.08, ease: "power3.out" }
};

const INTENSITY_MULTIPLIER = {
  sm: 0.8,
  md: 1,
  lg: 1.18
};

const REVEAL_GROUP_SELECTOR = "[data-reveal-group]";
const REVEAL_ITEM_SELECTOR = "[data-reveal-item]";

function getAnimationConfig(variant, intensity) {
  const base = VARIANT_CONFIG[variant] || VARIANT_CONFIG.rise;
  const multiplier = INTENSITY_MULTIPLIER[intensity] || INTENSITY_MULTIPLIER.md;

  return {
    ...base,
    x: base.x * multiplier,
    y: base.y * multiplier,
    blur: base.blur * multiplier,
    duration: base.duration + (multiplier - 1) * 0.14
  };
}

function toBlur(blur) {
  return blur > 0 ? `blur(${blur}px)` : "blur(0px)";
}

function isAnimatableElement(element) {
  return (
    element instanceof HTMLElement &&
    element.getAttribute("aria-hidden") !== "true" &&
    element.dataset.revealSkip !== "true" &&
    !element.classList.contains("hero-immersive__bg") &&
    !element.classList.contains("hero-immersive__overlay")
  );
}

function collectCascadeTargets(root) {
  const explicitItems = Array.from(root.querySelectorAll(REVEAL_ITEM_SELECTOR)).filter(
    isAnimatableElement
  );

  if (explicitItems.length) {
    return explicitItems;
  }

  const explicitGroups = Array.from(root.querySelectorAll(REVEAL_GROUP_SELECTOR)).filter(
    isAnimatableElement
  );

  if (explicitGroups.length) {
    return explicitGroups.flatMap((group) =>
      Array.from(group.children).filter(isAnimatableElement)
    );
  }

  return Array.from(root.children).filter(isAnimatableElement);
}

export function Reveal({
  as = "div",
  children,
  className = "",
  delay = 0,
  variant = "rise",
  intensity = "md",
  cascade = false,
  stagger = 90,
  start,
  once = true,
  style,
  ...props
}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const node = ref.current;

    if (!node) {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      return undefined;
    }

    const context = gsap.context(() => {
      const config = getAnimationConfig(variant, intensity);
      const delaySeconds = delay / 1000;
      const staggerSeconds = stagger / 1000;
      const triggerStart = start || (variant === "hero" ? "top 92%" : "top 84%");
      let scrollTrigger;
      const timeline = gsap.timeline({
        paused: true,
        defaults: {
          ease: config.ease,
          duration: config.duration
        }
      });

      if (cascade) {
        const cascadeTargets = collectCascadeTargets(node);

        if (variant === "hero") {
          const heroBackground = node.querySelector(".hero-immersive__bg");
          const heroOverlay = node.querySelector(".hero-immersive__overlay");

          if (heroBackground) {
            timeline.fromTo(
              heroBackground,
              { autoAlpha: 0.38, scale: 1.1 },
              { autoAlpha: 0.55, scale: 1, duration: 1.45, ease: "power2.out" },
              delaySeconds
            );
          }

          if (heroOverlay) {
            timeline.fromTo(
              heroOverlay,
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 0.95, ease: "power2.out" },
              delaySeconds + 0.06
            );
          }

          if (cascadeTargets.length) {
            timeline.fromTo(
              cascadeTargets,
              {
                autoAlpha: 0,
                y: 30,
                scale: 0.985
              },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                stagger: staggerSeconds,
                duration: 0.72
              },
              delaySeconds + 0.14
            );
          }
        } else if (cascadeTargets.length) {
          timeline.fromTo(
            cascadeTargets,
            {
              autoAlpha: 0,
              x: config.x * 0.18,
              y: Math.max(config.y * 0.52, 22),
              scale: 0.985,
              filter: toBlur(Math.max(config.blur * 0.55, 0))
            },
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              stagger: staggerSeconds,
              duration: Math.max(0.56, config.duration * 0.76)
            },
            delaySeconds
          );
        }
      } else {
        timeline.fromTo(
          node,
          {
            autoAlpha: 0,
            x: config.x,
            y: config.y,
            scale: config.scale,
            filter: toBlur(config.blur)
          },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            filter: "blur(0px)"
          },
          delaySeconds
        );
      }

      scrollTrigger = ScrollTrigger.create({
        trigger: node,
        start: triggerStart,
        once,
        invalidateOnRefresh: true,
        toggleActions: once ? "play none none none" : "play none none reverse",
        animation: timeline
      });

      requestAnimationFrame(() => {
        scrollTrigger?.refresh();
      });
    }, node);

    return () => {
      context?.revert();
    };
  }, [cascade, delay, intensity, once, stagger, start, variant]);

  return createElement(
    as,
    {
      ref,
      ...props,
      className: [
        className,
        "motion-reveal",
        `motion-reveal--${variant}`,
        `motion-reveal--intensity-${intensity}`,
        cascade ? "motion-reveal--cascade" : ""
      ]
        .filter(Boolean)
        .join(" "),
      style: {
        ...style,
        "--motion-stagger": `${stagger}ms`
      },
      "data-motion-variant": variant,
      "data-motion-cascade": cascade ? "true" : "false"
    },
    children
  );
}
