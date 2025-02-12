import React from "react";

export function Button({ children, onClick }) {
  return (
    <button 
      onClick={onClick} // ✅ This makes the button work!
      className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition"
    >
      {children}
    </button>
  );
}
