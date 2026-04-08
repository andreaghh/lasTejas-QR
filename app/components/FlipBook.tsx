"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import HTMLFlipBook from "react-pageflip";

// ── Single page wrapper — forwardRef required by react-pageflip ───────────────
const FlipPage = React.forwardRef<HTMLDivElement, { children?: React.ReactNode }>(
  ({ children }, ref) => (
    <div
      ref={ref}
      style={{ width: "100%", height: "100%", overflow: "hidden", backgroundColor: "#fff" }}
    >
      {children}
    </div>
  )
);
FlipPage.displayName = "FlipPage";

// ── Dimensions hook — tracks exact pixel size of the viewport ─────────────────
function useViewport() {
  const [vp, setVp] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const update = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    screen.orientation?.addEventListener?.("change", update);
    return () => {
      window.removeEventListener("resize", update);
      screen.orientation?.removeEventListener?.("change", update);
    };
  }, []);

  return vp;
}

// ── Main component ─────────────────────────────────────────────────────────────
export function FlipBook({ pages }: { pages: React.ReactNode[] }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bookRef  = useRef<any>(null);
  const [current, setCurrent] = useState(0);
  const isFlipping = useRef(false);
  const { w: vw, h: vh } = useViewport();

  // Portrait breakpoint: phone/tablet in portrait
  const isPortrait = vw > 0 && vw < vh;

  // Each page takes exactly half the screen width (landscape) or full (portrait)
  // No nav bar reserved — nav overlays the book
  const pageW = vw > 0 ? (isPortrait ? vw : Math.floor(vw / 2)) : 580;
  const pageH = vh > 0 ? Math.floor(vh * 0.95) : 760;

  // ── Navigation ───────────────────────────────────────────────────────────────
  const getBook = useCallback(() => bookRef.current?.pageFlip?.(), []);

  const goNext = useCallback(() => {
    if (!isFlipping.current) {
      isFlipping.current = true;
      getBook()?.flipNext();
      setTimeout(() => { isFlipping.current = false; }, 900);
    }
  }, [getBook]);

  const goPrev = useCallback(() => {
    if (!isFlipping.current) {
      isFlipping.current = true;
      getBook()?.flipPrev();
      setTimeout(() => { isFlipping.current = false; }, 900);
    }
  }, [getBook]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goNext();
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  // Wheel / scroll
  useEffect(() => {
    let last = 0;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - last < 900) return;
      last = now;
      if (e.deltaY > 0) goNext(); else goPrev();
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [goNext, goPrev]);

  const onFlip = (e: { data: number }) => {
    setCurrent(e.data);
    isFlipping.current = false;
  };

  // Number of "spread" steps for the dot indicator
  const totalSpreads = Math.ceil(pages.length / 2);
  const currentSpread = Math.floor(current / 2);

  // Don't render until we have real dimensions
  if (vw === 0 || vh === 0) {
    return (
      <div style={{
        position: "fixed", inset: 0,
        background: "linear-gradient(160deg,#1a0800,#2e0e00)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <p style={{ color: "rgba(220,155,50,0.5)", fontFamily: "Arial, sans-serif", fontSize: "0.8rem" }}>Cargando menú…</p>
      </div>
    );
  }

  return (
    // Full-screen fixed container
    <div style={{
      position: "fixed",
      inset: 0,
      width: "100vw",
      height: "100dvh",
      overflow: "hidden",
      background: "linear-gradient(160deg,#1a0800 0%,#2e0e00 50%,#1a0800 100%)",
    }}>
      {/* Subtle glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(220,140,40,0.07) 0%, transparent 70%)",
      }} />

      {/* The book — fills all available space */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {/*
          key={`${pageW}-${pageH}`} forces a full remount when dimensions change
          (required by react-pageflip to accept new width/height)
        */}
        <HTMLFlipBook
          key={`${pageW}-${pageH}`}
          ref={bookRef}
          width={pageW}
          height={pageH}
          size="fixed"
          minWidth={200}
          maxWidth={2560}
          minHeight={300}
          maxHeight={2560}
          maxShadowOpacity={0.55}
          showCover={true}
          mobileScrollSupport={true}
          flippingTime={750}
          usePortrait={isPortrait}
          startPage={0}
          drawShadow={true}
          autoSize={false}
          startZIndex={0}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
          onFlip={onFlip}
          style={{ display: "block" }}
          className=""
        >
          {pages.map((page, i) => (
            <FlipPage key={i}>{page}</FlipPage>
          ))}
        </HTMLFlipBook>
      </div>

      {/* ── Nav overlay — floats above the book ─────────────────────────────── */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        height: 52,
        background: "linear-gradient(to top, rgba(15,5,0,0.75) 0%, transparent 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(10px, 3vw, 24px)",
        pointerEvents: "none",   // pass-through clicks to book
      }}>
        {/* Prev */}
        <button
          onClick={goPrev}
          aria-label="Página anterior"
          style={{
            pointerEvents: "auto",
            width: 36, height: 36, borderRadius: "50%",
            background: "rgba(200,130,40,0.18)",
            border: "1px solid rgba(200,130,40,0.4)",
            color: "rgba(230,170,60,0.9)",
            fontSize: "1.15rem", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(200,130,40,0.35)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(200,130,40,0.18)")}
        >‹</button>

        {/* Dots */}
        <div style={{ display: "flex", gap: 5, pointerEvents: "auto" }}>
          {Array.from({ length: totalSpreads }).map((_, i) => (
            <div
              key={i}
              onClick={() => {
                const targetPage = i * 2;
                getBook()?.flip(targetPage);
              }}
              style={{
                width:  i === currentSpread ? 20 : 6,
                height: 6,
                borderRadius: 3,
                cursor: "pointer",
                background: i === currentSpread ? "#e8b248" : "rgba(200,130,40,0.35)",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* Next */}
        <button
          onClick={goNext}
          aria-label="Página siguiente"
          style={{
            pointerEvents: "auto",
            width: 36, height: 36, borderRadius: "50%",
            background: "rgba(200,130,40,0.18)",
            border: "1px solid rgba(200,130,40,0.4)",
            color: "rgba(230,170,60,0.9)",
            fontSize: "1.15rem", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(200,130,40,0.35)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(200,130,40,0.18)")}
        >›</button>
      </div>

      {/* Page counter */}
      <p style={{
        position: "absolute", bottom: 16, right: 12,
        fontFamily: "Arial, sans-serif", fontSize: "0.55rem",
        color: "rgba(200,130,40,0.45)", letterSpacing: "0.08em",
        pointerEvents: "none",
      }}>{current + 1} / {pages.length}</p>
    </div>
  );
}
