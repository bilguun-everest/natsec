"use client";

import {
  createElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

/**
 * Motion here is deliberately quiet: one easing curve, short durations, and a
 * single vertical direction. Everything degrades to "already visible" without
 * JavaScript and switches off entirely under `prefers-reduced-motion`.
 */

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = () => setReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/** Fires once, when the element first scrolls into the viewport. */
export function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || inView) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      // Trigger a little before the element is fully on screen, so the motion
      // finishes about when the reader's eye arrives.
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [inView]);

  return { ref, inView };
}

type RevealProps = {
  children?: ReactNode;
  /** Element to render — the reveal wrapper *is* the card, not an extra div. */
  as?: ElementType;
  /** Stagger, in milliseconds. */
  delay?: number;
  /** `up` lifts as it fades; `fade` holds position (use inside grids/tables). */
  variant?: "up" | "fade";
  className?: string;
  style?: CSSProperties;
} & Record<string, unknown>;

export function Reveal({
  children,
  as = "div",
  delay = 0,
  variant = "up",
  className,
  style,
  ...rest
}: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();

  const classes = [
    "reveal",
    variant === "fade" ? "reveal-fade" : null,
    inView ? "is-visible" : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return createElement(
    as,
    {
      ...rest,
      ref,
      className: classes,
      style: delay ? { ...style, transitionDelay: `${delay}ms` } : style,
    },
    children,
  );
}

/**
 * Counts a headline figure up once it is on screen. Keeps the original
 * formatting — "18,400+" counts to 18,400 and keeps its plus.
 */
export function useCountUp(value: string, active: boolean): string {
  const reduced = usePrefersReducedMotion();
  const parsed = parseFigure(value);
  const [display, setDisplay] = useState(() => (parsed ? format(0, parsed) : value));

  useEffect(() => {
    if (!parsed) return;
    if (!active || reduced) {
      setDisplay(value);
      return;
    }

    const DURATION = 1100;
    let frame = 0;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / DURATION, 1);
      // easeOutCubic — fast out of the gate, settles rather than stops.
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(format(Math.round(parsed.amount * eased), parsed));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
    // `parsed` is derived from `value`; tracking the string is enough.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, active, reduced]);

  return parsed ? display : value;
}

interface Figure {
  prefix: string;
  amount: number;
  suffix: string;
  grouped: boolean;
}

function parseFigure(value: string): Figure | null {
  const match = /^(\D*)([\d,]+)(.*)$/.exec(value);
  if (!match) return null;
  const digits = match[2];
  return {
    prefix: match[1],
    amount: Number(digits.replace(/,/g, "")),
    suffix: match[3],
    grouped: digits.includes(","),
  };
}

function format(amount: number, figure: Figure): string {
  const body = figure.grouped
    ? amount.toLocaleString("en-US")
    : String(amount);
  return `${figure.prefix}${body}${figure.suffix}`;
}
