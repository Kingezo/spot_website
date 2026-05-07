"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const IOS_TESTFLIGHT_URL = "https://testflight.apple.com/join/Ack2ueKr";
const ANDROID_INTERNAL_TEST_URL =
  "https://play.google.com/apps/internaltest/4701253101690181780";

function getPlatform() {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "other";
}

function JoinPageContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const [platform, setPlatform] = useState(null);
  const [appNotFound, setAppNotFound] = useState(false);

  // Android email form state
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState(""); // "sending" | "sent" | "error"

  const deepLink = code
    ? `spot://join?code=${encodeURIComponent(code)}`
    : null;

  useEffect(() => {
    setPlatform(getPlatform());
  }, []);

  useEffect(() => {
    if (!code || platform === null) return;

    // Attempt deep link immediately
    window.location.href = deepLink;

    const timer = setTimeout(() => {
      if (platform === "ios") {
        // iOS: send straight to TestFlight
        window.location.href = IOS_TESTFLIGHT_URL;
      } else {
        // Android & desktop: stay on page and show instructions
        setAppNotFound(true);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [code, platform, deepLink]);

  const handleEmailSubmit = async () => {
    if (!email) return;
    setEmailStatus("sending");
    try {
      await addDoc(collection(db, "spot_android_testers"), {
        email,
        code: code ?? null,
        createdAt: new Date(),
      });
      setEmailStatus("sent");
      setEmail("");
    } catch {
      setEmailStatus("error");
    }
  };

  // ── Invalid link ──────────────────────────────────────────────────────────
  if (!code) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
        <div className="max-w-sm w-full">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: "#007260" }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Invalid Invite Link
          </h1>
          <p className="text-gray-500 mb-8">
            Please check the code and try again.
          </p>
          <button
            onClick={() => window.history.back()}
            className="w-full py-3 rounded-xl font-semibold text-white transition active:opacity-80"
            style={{ backgroundColor: "#007260" }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // ── Main page ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      <div className="max-w-sm w-full">
        {/* Logo mark */}
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: "#007260" }}
        >
          <span className="text-white text-3xl font-extrabold tracking-tight">
            S
          </span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          You&rsquo;re Invited to Spot
        </h1>
        <p className="text-gray-500 mb-8">
          {appNotFound && platform === "android"
            ? "Looks like you don\u2019t have the app yet."
            : "Opening the app for your savings group invite\u2026"}
        </p>

        {/* Invite code */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 mb-6">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-1 font-medium">
            Invite Code
          </p>
          <p
            className="text-2xl font-bold tracking-widest"
            style={{ color: "#007260" }}
          >
            {code}
          </p>
        </div>

        {/* Open in App button — always visible */}
        <a
          href={deepLink}
          className="block w-full py-3 rounded-xl font-semibold text-white mb-6 transition active:opacity-80"
          style={{ backgroundColor: "#007260" }}
        >
          Open in App
        </a>

        {/* ── Don't have the app? Always visible ── */}
        <div className="mt-2 space-y-3">
          {/* Android card */}
          {platform !== "ios" && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-5 text-left">
              <p className="text-sm font-semibold text-gray-900 mb-1">
                Get Spot on Android
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Spot is currently in private testing on Android. Enter your
                email and we&rsquo;ll add you to the testers list — you&rsquo;ll
                get access within 24&nbsp;hours.
              </p>

              {emailStatus === "sent" ? (
                <p className="text-sm font-medium" style={{ color: "#007260" }}>
                  Got it! We&rsquo;ll send you access soon.
                </p>
              ) : (
                <>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm mb-3 focus:outline-none focus:ring-2"
                  />
                  <button
                    onClick={handleEmailSubmit}
                    disabled={emailStatus === "sending"}
                    className="w-full py-2 rounded-lg text-sm font-semibold text-white transition active:opacity-80 disabled:opacity-50"
                    style={{ backgroundColor: "#007260" }}
                  >
                    {emailStatus === "sending" ? "Sending…" : "Request Access"}
                  </button>
                  {emailStatus === "error" && (
                    <p className="text-xs text-red-500 mt-2">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </>
              )}

              <p className="text-xs text-gray-400 mt-4">
                Already been added?{" "}
                <a
                  href={ANDROID_INTERNAL_TEST_URL}
                  className="underline font-medium"
                  style={{ color: "#007260" }}
                >
                  Install via Google Play
                </a>
              </p>
            </div>
          )}

          {/* iOS TestFlight */}
          {platform !== "android" && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-left">
              <p className="text-sm font-semibold text-gray-900 mb-1">
                Get Spot on iOS
              </p>
              <p className="text-sm text-gray-500 mb-3">
                Download Spot via TestFlight to join your group.
              </p>
              <a
                href={IOS_TESTFLIGHT_URL}
                className="block w-full text-center py-2 rounded-lg text-sm font-semibold text-white transition active:opacity-80"
                style={{ backgroundColor: "#007260" }}
              >
                Join via TestFlight
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function JoinPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div
            className="w-8 h-8 rounded-full border-4 animate-spin"
            style={{ borderColor: "#007260", borderTopColor: "transparent" }}
          />
        </div>
      }
    >
      <JoinPageContent />
    </Suspense>
  );
}
