"use client";

import React, { useState } from "react";
import { Button } from "./componenents/Button";  // ✅ Fixed typo in import
import { db, collection, addDoc } from "./firebaseConfig";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); // ✅ Added useState for status

  const handleSignUp = async () => {
    console.log("Sign-up button clicked!"); // Debugging log
    if (!email) {
      console.log("No email entered!");
      setStatus("Please enter an email!");
      return;
    }

    try {
      // ✅ Ensure collection name is valid
      console.log("Attempting to add email:", email);
      await addDoc(collection(db, "spot_waitlist"), { email });
      
      console.log("Email successfully added to Firestore!");
      setStatus("Success! You’ve joined the waitlist.");
      setEmail(""); // Clear input after success
    } catch (error) {
      console.error("Error signing up:", error);
      setStatus("Error signing up. Please try again.");
    }
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
          onClick={handleSignUp}
          className="bg-white text-green-600 px-8 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition"
        >
          Join the Waitlist
        </Button>
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

      {/* Join Waitlist */}
      <section className="text-center py-16 bg-gray-100 w-full">
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
