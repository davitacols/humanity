"use client";

import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function animateCount(element) {
  const text = element.textContent?.trim() || "";

  if (!/^\d+$/.test(text)) {
    return;
  }

  const endValue = Number(text);
  const counter = { value: 0 };

  ScrollTrigger.create({
    trigger: element,
    start: "top 88%",
    once: true,
    onEnter: () => {
      gsap.to(counter, {
        value: endValue,
        duration: 1.1,
        ease: "power2.out",
        onUpdate: () => {
          element.textContent = String(Math.round(counter.value));
        }
      });
    }
  });
}

function createScrubTween(target, animation, trigger) {
  if (!target || !trigger) {
    return;
  }

  gsap.to(target, {
    ...animation,
    ease: "none",
    scrollTrigger: {
      trigger,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.9,
      invalidateOnRefresh: true
    }
  });
}

function addIntroReveal(timeline, intro, startAt = 0) {
  if (!(intro instanceof HTMLElement)) {
    return;
  }

  const eyebrow = intro.querySelector(".section-intro__eyebrow");
  const title = intro.querySelector(".section-intro__title");
  const body = intro.querySelector(".section-intro__body");

  if (eyebrow) {
    timeline.fromTo(
      eyebrow,
      { autoAlpha: 0, y: 26 },
      { autoAlpha: 1, y: 0, duration: 0.44, ease: "power2.out" },
      startAt
    );
  }

  if (title) {
    timeline.fromTo(
      title,
      { autoAlpha: 0, y: 48 },
      { autoAlpha: 1, y: 0, duration: 0.74, ease: "power3.out" },
      startAt + 0.06
    );
  }

  if (body) {
    timeline.fromTo(
      body,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.52, ease: "power2.out" },
      startAt + 0.14
    );
  }
}

function createSectionReveal({
  trigger,
  intro,
  cards,
  cardStart = 0.18,
  from = {},
  to = {}
}) {
  if (!(trigger instanceof HTMLElement)) {
    return;
  }

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: "top 84%",
      once: true
    }
  });

  addIntroReveal(timeline, intro, 0);

  if (cards.length) {
    timeline.fromTo(
      cards,
      {
        autoAlpha: 0,
        y: 52,
        scale: 0.94,
        ...from
      },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.82,
        stagger: 0.12,
        ease: "power3.out",
        ...to
      },
      cardStart
    );
  }
}

export function HomeViewportMotion() {
  useLayoutEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const root = document.querySelector(".home-spline");

    if (!(root instanceof HTMLElement)) {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      return undefined;
    }

    const mm = gsap.matchMedia();
    const context = gsap.context(() => {
      const hero = root.querySelector(".home-spline__hero");
      const proofSection = root.querySelector(".home-spline__proof-section");
      const routesSection = root.querySelector(".home-spline__routes-section");
      const featureSection = root.querySelector(".home-spline__feature-section");
      const proofGrid = root.querySelector(".home-spline__proof-grid");
      const routeGrid = root.querySelector(".home-spline__routes");
      const proofCards = Array.from(root.querySelectorAll(".home-spline__proof-card"));
      const routeCards = Array.from(root.querySelectorAll(".home-spline__route"));
      const countTargets = Array.from(root.querySelectorAll(".home-spline__proof-value"));
      const proofIntro = proofSection?.querySelector(".home-spline__intro");
      const routesIntro = routesSection?.querySelector(".home-spline__intro");
      const featureIntro = featureSection?.querySelector(".home-spline__intro");
      const featureMedia = root.querySelector(".home-spline__feature-media");
      const featureCopy = root.querySelector(".home-spline__feature-copy");

      countTargets.forEach((target) => animateCount(target));

      createSectionReveal({
        trigger: proofSection,
        intro: proofIntro,
        cards: proofCards
      });

      createSectionReveal({
        trigger: routesSection,
        intro: routesIntro,
        cards: routeCards,
        from: {
          y: 78,
          scale: 0.95,
          clipPath: "inset(18% 0% 14% 0% round 28px)"
        },
        to: {
          clipPath: "inset(0% 0% 0% 0% round 28px)"
        }
      });

      createSectionReveal({
        trigger: featureSection,
        intro: featureIntro,
        cards: [featureMedia, featureCopy].filter(Boolean),
        from: {
          y: 66,
          scale: 0.96
        }
      });

      mm.add("(min-width: 901px)", () => {
        const copy = root.querySelector(".home-spline__copy");
        const stage = root.querySelector(".home-spline__background");
        const eyebrow = root.querySelector(".home-spline__eyebrow");
        const titleLines = Array.from(root.querySelectorAll(".home-spline__title-line > span"));
        const lede = root.querySelector(".home-spline__lede");
        const body = root.querySelector(".home-spline__body");
        const heroActions = Array.from(root.querySelectorAll(".home-spline__copy .hero-actions > *"));
        const signals = Array.from(root.querySelectorAll(".home-spline__signal"));
        const heroStats = Array.from(root.querySelectorAll(".home-spline__hero-stat"));
        const proofDesk = root.querySelector(".home-spline__proof-desk");
        const proofItems = Array.from(
          root.querySelectorAll(".home-spline__proof-point, .home-spline__proof-item")
        );
        const visualCard = root.querySelector(".home-spline__background-media");

        if (hero) {
          const heroEntry = gsap.timeline({
            scrollTrigger: {
              trigger: hero,
              start: "top 96%",
              once: true
            }
          });

          heroEntry
            .fromTo(
              eyebrow,
              { autoAlpha: 0, y: 18 },
              { autoAlpha: 1, y: 0, duration: 0.46, ease: "power2.out" }
            )
            .fromTo(
              titleLines,
              { autoAlpha: 0, yPercent: 108 },
              {
                autoAlpha: 1,
                yPercent: 0,
                duration: 0.82,
                stagger: 0.1,
                ease: "power4.out"
              },
              0.04
            )
            .fromTo(
              lede,
              { autoAlpha: 0, y: 22 },
              { autoAlpha: 1, y: 0, duration: 0.52, ease: "power2.out" },
              0.14
            )
            .fromTo(
              body,
              { autoAlpha: 0, y: 26 },
              { autoAlpha: 1, y: 0, duration: 0.54, ease: "power2.out" },
              0.2
            )
            .fromTo(
              heroActions,
              { autoAlpha: 0, y: 18 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.46,
                stagger: 0.06,
                ease: "power2.out"
              },
              0.28
            )
            .fromTo(
              signals,
              { autoAlpha: 0, y: 16, scale: 0.97 },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.44,
                stagger: 0.05,
                ease: "power2.out"
              },
              0.36
            );

          if (heroStats.length) {
            heroEntry.fromTo(
              heroStats,
              { autoAlpha: 0, y: 20, scale: 0.98 },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.48,
                stagger: 0.06,
                ease: "power2.out"
              },
              0.44
            );
          }

          if (visualCard) {
            heroEntry.fromTo(
              visualCard,
              {
                autoAlpha: 0,
                y: 28,
                scale: 1.04
              },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.78,
                ease: "power3.out"
              },
              0.12
            );
          }

          if (proofDesk) {
            heroEntry.fromTo(
              proofDesk,
              { autoAlpha: 0, x: 20, y: 18 },
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                duration: 0.62,
                ease: "power3.out"
              },
              0.24
            );
          }

          if (proofItems.length) {
            heroEntry.fromTo(
              proofItems,
              { autoAlpha: 0, y: 12 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.04,
                ease: "power2.out"
              },
              0.5
            );
          }

          const heroTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 0.85,
              invalidateOnRefresh: true
            }
          });

          heroTimeline.to(copy, { autoAlpha: 0.98 }, 0);

          if (stage) {
            heroTimeline.to(stage, { yPercent: -2 }, 0);
          }

          if (visualCard) {
            heroTimeline.to(visualCard, { yPercent: -5, scale: 1.03 }, 0);
          }

          if (proofDesk) {
            heroTimeline.to(proofDesk, { autoAlpha: 1 }, 0);
          }
        }

        proofCards.forEach((card, index) => {
          createScrubTween(
            card,
            {
              yPercent: index % 2 === 0 ? -2 : 2
            },
            proofGrid
          );
        });

        routeCards.forEach((card, index) => {
          const offsets = [
            { yPercent: -2 },
            { yPercent: 2 },
            { yPercent: -2 },
            { yPercent: 2 }
          ];

          createScrubTween(card, offsets[index % offsets.length], routeGrid);
        });

        if (featureSection) {
          const featureTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: featureSection,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.9,
              invalidateOnRefresh: true
            }
          });

          featureTimeline
            .to(featureMedia, { yPercent: -3, scale: 1.005 }, 0)
            .to(featureCopy, { yPercent: 3 }, 0);
        }
      });

      mm.add("(max-width: 900px)", () => {
        const eyebrow = root.querySelector(".home-spline__eyebrow");
        const titleLines = Array.from(root.querySelectorAll(".home-spline__title-line > span"));
        const lede = root.querySelector(".home-spline__lede");
        const body = root.querySelector(".home-spline__body");
        const heroActions = Array.from(root.querySelectorAll(".home-spline__copy .hero-actions > *"));
        const signals = Array.from(root.querySelectorAll(".home-spline__signal"));
        const heroStats = Array.from(root.querySelectorAll(".home-spline__hero-stat"));
        const proofDesk = root.querySelector(".home-spline__proof-desk");
        const visualCard = root.querySelector(".home-spline__background-media");

        if (hero) {
          const heroEntry = gsap.timeline({
            scrollTrigger: {
              trigger: hero,
              start: "top 96%",
              once: true
            }
          });

          heroEntry
            .fromTo(
              eyebrow,
              { autoAlpha: 0, y: 14 },
              { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }
            )
            .fromTo(
              titleLines,
              { autoAlpha: 0, yPercent: 102 },
              {
                autoAlpha: 1,
                yPercent: 0,
                duration: 0.72,
                stagger: 0.08,
                ease: "power4.out"
              },
              0.04
            )
            .fromTo(
              lede,
              { autoAlpha: 0, y: 18 },
              { autoAlpha: 1, y: 0, duration: 0.42, ease: "power2.out" },
              0.14
            )
            .fromTo(
              body,
              { autoAlpha: 0, y: 22 },
              { autoAlpha: 1, y: 0, duration: 0.46, ease: "power2.out" },
              0.18
            )
            .fromTo(
              [...heroActions, ...signals, ...heroStats],
              { autoAlpha: 0, y: 14 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.04,
                ease: "power2.out"
              },
              0.24
            );
          const visualTargets = [visualCard, proofDesk].filter(Boolean);

          if (visualTargets.length) {
            heroEntry.fromTo(
              visualTargets,
              { autoAlpha: 0, y: 24, scale: 1.04 },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.54,
                stagger: 0.06,
                ease: "power3.out"
              },
              0.18
            );
          }

          createScrubTween(visualCard, { yPercent: -4, scale: 1.005 }, hero);
        }
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, root);

    return () => {
      mm.revert();
      context.revert();
    };
  }, []);

  return null;
}
