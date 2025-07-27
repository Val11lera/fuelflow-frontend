// Template: FuelFlow Login + Registration + Dashboard (React + Supabase + hCaptcha)

import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import HCaptcha from "@hcaptcha/react-hcaptcha";

// Supabase credentials
const supabase = createClient(
  "https://fakxpzoliryhtzmdmozw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZha3hwem9saXJ5aHR6bWRtb3p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMTU4MTUsImV4cCI6MjA2ODU5MTgxNX0.nWgX8mLILBzXgeQfm8R2xfUsa3TqmsPVfQuRDe1Xyzw"
);

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [mode, setMode] = useState("login");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!token) return setMessage("Please complete the captcha");

    const authFn =
      mode === "login"
        ? supabase.auth.signInWithPassword
        : supabase.auth.signUp;

    const { error } = await authFn({
      email,
      password,
      options: { captchaToken: token },
    });

    if (error) setMessage(error.message);
    else setMessage("Success!");
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">
        {mode === "login" ? "Login" : "Register"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          onChange={(e) => setPassword(e.target.value)}
        />
        <HCaptcha
          sitekey="e5506244-923e-4f92-995a-bfd64decf216"
          onVerify={(token) => setToken(token)}
        />
        <button type="submit" className="bg-blue-600 text-white p-2 w-full">
          {mode === "login" ? "Login" : "Register"}
        </button>
        <button
          type="button"
          onClick={() =>
            setMode((prev) => (prev === "login" ? "register" : "login"))
          }
          className="text-sm text-blue-500 underline mt-2"
        >
          {mode === "login"
            ? "Need to register? Click here"
            : "Already have an account? Login"}
        </button>
        <p className="text-red-500 text-sm">{message}</p>
      </form>
    </div>
  );
}
