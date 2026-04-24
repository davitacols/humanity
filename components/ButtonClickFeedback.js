"use client";

import { useEffect } from "react";

const CLICK_FEEDBACK_DURATION = 620;

function findInteractiveButton(target) {
  if (!(target instanceof Element)) {
    return null;
  }

  return target.closest(".button");
}

function canShowFeedback(button) {
  return (
    button &&
    !button.matches("[disabled], [aria-disabled='true']") &&
    !button.classList.contains("is-loading")
  );
}

export function ButtonClickFeedback() {
  useEffect(() => {
    const timers = new Map();

    function showFeedback(button) {
      if (!canShowFeedback(button)) {
        return;
      }

      const existingTimer = timers.get(button);
      if (existingTimer) {
        window.clearTimeout(existingTimer);
      }

      button.classList.remove("is-clicked");
      void button.offsetWidth;
      button.classList.add("is-clicked");

      const timer = window.setTimeout(() => {
        button.classList.remove("is-clicked");
        timers.delete(button);
      }, CLICK_FEEDBACK_DURATION);

      timers.set(button, timer);
    }

    function handlePointerDown(event) {
      if (event.button && event.button !== 0) {
        return;
      }

      showFeedback(findInteractiveButton(event.target));
    }

    function handleKeyDown(event) {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      showFeedback(findInteractiveButton(event.target));
    }

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
      timers.forEach((timer, button) => {
        window.clearTimeout(timer);
        button.classList.remove("is-clicked");
      });
      timers.clear();
    };
  }, []);

  return null;
}
