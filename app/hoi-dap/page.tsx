"use client";
import { useState, useRef, useEffect } from "react";

function HeaderBackground() {
  const [videoFailed, setVideoFailed] = useState(false);
  useEffect(() => {
    
  }, []);

  if (!videoFailed) {
    return (
      <video autoPlay muted loop playsInline
        onError={() => setVideoFailed(true)}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
      >
        <source src="/hero.mp4" type="video/mp4" onError={() => setVideoFailed(true)} />
      </video>
    );
  }

  return <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "linear-gradient(to right, #6B1410, #B5261E)" }} />;
}
import Navbar from "../components/Navbar";

interface Msg { role: "user" | "assistant"; content: string; }
@@ -46,8 +66,12 @@ export default function HoiDapPage() {
<div style={{ minHeight: "100vh", background: "#F8F1E0", display: "flex", flexDirection: "column" }}>
<Navbar />

      <div style={{ background: "linear-gradient(to right, #6B1410, #B5261E)", padding: "48px 0 40px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
      <div style={{ position: "relative", padding: "48px 0 40px", overflow: "hidden" }}>
        <HeaderBackground />

        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to right, rgba(107,20,16,0.85), rgba(181,38,30,0.75))" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 760, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
<p style={{ ...F, fontWeight: 600, fontSize: "0.72rem", color: "rgba(240,188,74,0.8)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 12 }}>
Trí Tuệ Nhân Tạo
</p>
