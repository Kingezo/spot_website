"use client";
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions correctly
import React, { useState, useRef } from "react";
import { Button } from "./componenents/Button";  // ✅ Fixed typo in import
import { db } from "./firebaseConfig";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); // ✅ Added useState for status
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
