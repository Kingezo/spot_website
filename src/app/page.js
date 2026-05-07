"use client";
import { collection, addDoc } from "firebase/firestore";
import React, { useState, useRef } from "react";
import { Button } from "./componenents/Button";
import { db } from "./firebaseConfig";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  // Android email request state
  const [androidOpen, setAndroidOpen] = useState(false);
  const [androidEmail, setAndroidEmail] = useState("");
  const [androidStatus, setAndroidStatus] = useState(""); // "" | "sending" | "sent" | "error"

  const handleAndroidRequest = async () => {
    if (!androidEmail) return;
    setAndroidStatus("sending");
    try {
      await addDoc(collection(db, "spot_android_testers"), {
        email: androidEmail,
        createdAt: new Date(),
      });
      setAndroidStatus("sent");
      setAndroidEmail("");
    } catch {
      setAndroidStatus("error");
    }
  };
  const handleSignUp = async () => {
    console.log("✅ Sign-up button clicked!"); 
  
    if (!email) {
      console.log("⚠️ No email entered!");
      setStatus("Please enter an email!");
      return;
    }
  
    try {
      console.log("📡 Attempting Firestore write:", email);
      
      const docRef = await addDoc(collection(db, "spot_waitlist"), {
        email: email,
        createdAt: new Date()
      });
  
      console.log("🎉 Success! Document ID:", docRef.id);
      setStatus("Success! You’ve joined the waitlist.");
      setEmail(""); 
    } catch (error) {
      console.error("🔥 Firestore error:", error.code, error.message);
      setStatus("Error signing up. Please try again.");
    }
  };
  
  const waitlistRef = useRef(null);

  const scrollToWaitlist = () => {
    console.log("✅ scrollToWaitList clicked"); // This should always appear when clicking the button
    waitlistRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full text-center py-20 bg-green-600 text-white px-6">
        <h1 className="text-5xl font-extrabold mb-4">Spot</h1>
        <p className="text-lg max-w-2xl mx-auto mb-6">
          Save Money and Build Credit Today!
        </p>
        <Button
          onClick={scrollToWaitlist}
          className="bg-white text-green-600 px-8 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition"
        >
          Join the Waitlist
        </Button>
      </section>

      {/* Social Proof */}
      <section className="w-full bg-white border-b border-gray-100 py-5 px-6">
        <div className="flex justify-center gap-10 flex-wrap">
          <div className="text-center">
            <p className="text-2xl font-extrabold text-green-700">100+</p>
            <p className="text-sm text-gray-500">Active Users</p>
          </div>
          <div className="w-px bg-gray-200 self-stretch hidden sm:block" />
          <div className="text-center">
            <p className="text-2xl font-extrabold text-green-700">$5,000+</p>
            <p className="text-sm text-gray-500">Saved by Members</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-8 w-full max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-green-700">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-green-700">Join a Pool</h3>
            <p className="text-gray-700">
              Create a pool of people you know to start saving, or jump into a pool with people with similar saving goals.
            </p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-green-700">Contribute & Receive</h3>
            <p className="text-gray-700">
              Each cycle, contribute your set amount and receive a lump sum when it’s your turn.
            </p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-green-700">Build Credit</h3>
            <p className="text-gray-700">
              Subscribe to report payments to the 3 major credit bureaus and grow your credit score.
            </p>
          </div>
        </div>
      </section>

      {/* Credit Building */}
      <section className="bg-green-600 py-16 px-8 text-center text-white w-full">
        <h2 className="text-3xl font-bold mb-4">Build Your Credit with On-Time Payments</h2>
        <p className="text-lg max-w-2xl mx-auto">
          Spot helps users improve their credit by reporting on-time payments to major credit bureaus.
        </p>
      </section>

      {/* Security & Trust */}
      <section className="py-16 px-8 text-center w-full max-w-5xl">
        <h2 className="text-3xl font-bold mb-4 text-green-700">Security & Trust</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Your transactions are protected with the latest security measures. We ensure your money and data are safe.
        </p>
      </section>

      {/* Demo Video */}
      <section className="py-16 px-8 w-full max-w-4xl text-center">
        <h2 className="text-3xl font-bold mb-6 text-green-700">See Spot in Action</h2>
        <div className="relative w-full overflow-hidden rounded-2xl shadow-lg" style={{ paddingTop: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/rqZkkxpVd94"
            title="Spot Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      {/* Join Today */}
      <section className="w-full bg-gray-50 py-16 px-6 text-center border-t border-gray-100">
        <h2 className="text-3xl font-bold mb-2 text-green-700">Join Today!</h2>
        <p className="text-gray-500 mb-10 text-lg">Available on iOS and Android.</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-sm mx-auto">
          {/* iOS button */}
          <a
            href="https://testflight.apple.com/join/Ack2ueKr"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-semibold text-white shadow-md transition active:opacity-80"
            style={{ backgroundColor: "#007260" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            iOS
          </a>

          {/* Android button */}
          <button
            onClick={() => setAndroidOpen((o) => !o)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-semibold text-white shadow-md transition active:opacity-80"
            style={{ backgroundColor: "#007260" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.523 15.341a.75.75 0 0 1-.75.75H7.227a.75.75 0 0 1-.75-.75V9.75h11.046v5.591ZM6.477 8.25V6.568a5.523 5.523 0 0 1 11.046 0V8.25H6.477Zm-1.5 0h-.75A1.5 1.5 0 0 0 2.727 9.75v3a1.5 1.5 0 0 0 1.5 1.5h.75V8.25Zm16.546 0h-.75v6h.75a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.5-1.5ZM9 5.25a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm6 0a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM8.25 18v1.5a.75.75 0 0 0 1.5 0V18h-1.5Zm6 0v1.5a.75.75 0 0 0 1.5 0V18h-1.5Z" />
            </svg>
            Android
          </button>
        </div>

        {/* Android email drop-down */}
        {androidOpen && (
          <div className="mt-6 max-w-sm mx-auto bg-white border border-gray-200 rounded-2xl px-6 py-6 shadow-md text-left">
            <p className="text-sm font-semibold text-gray-900 mb-1">Get early access on Android</p>
            <p className="text-sm text-gray-500 mb-4">
              Spot is in private testing on Android. Drop your email and we&rsquo;ll
              add you to the list — you&rsquo;ll hear back within 24&nbsp;hours.
            </p>

            {androidStatus === "sent" ? (
              <p className="text-sm font-semibold" style={{ color: "#007260" }}>
                You&rsquo;re on the list! We&rsquo;ll be in touch soon.
              </p>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={androidEmail}
                  onChange={(e) => setAndroidEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAndroidRequest()}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <button
                  onClick={handleAndroidRequest}
                  disabled={androidStatus === "sending"}
                  className="w-full py-2 rounded-lg text-sm font-semibold text-white transition active:opacity-80 disabled:opacity-50"
                  style={{ backgroundColor: "#007260" }}
                >
                  {androidStatus === "sending" ? "Sending…" : "Request Access"}
                </button>
                {androidStatus === "error" && (
                  <p className="text-xs text-red-500 mt-2">Something went wrong. Please try again.</p>
                )}
              </>
            )}
          </div>
        )}
      </section>

      {/* Join Waitlist */}
<section ref={waitlistRef} className="text-center py-16 bg-gray-100 w-full">
  <h2 className="text-3xl font-bold mb-4 text-green-700">Join the Waitlist</h2>
  <p className="text-lg text-gray-700 mb-6">Be the first to experience Spot. Enter your email below.</p>
  <div className="flex justify-center">
    <input
      type="email"
      placeholder="Your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="px-4 py-2 border rounded-lg shadow-md w-72"
    />
    <Button
      onClick={handleSignUp}
      className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg ml-2 hover:bg-green-700 transition"
    >
      Join Waitlist
    </Button>
  </div>
  {status && <p className="mt-4 text-green-600">{status}</p>}
</section>
    </div>
  );
}
