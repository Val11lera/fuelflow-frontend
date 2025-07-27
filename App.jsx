// Template: FuelFlow Login + Registration + Dashboard (React + Supabase + hCaptcha)

import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const supabase = createClient("https://YOUR_PROJECT.supabase.co", "e5506244-923e-4f92-995a-bfd64decf216");

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
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">FuelFlow {mode === "login" ? "Login" : "Register"}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border p-2"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <HCaptcha
          sitekey="YOUR_HCAPTCHA_SITE_KEY"
          onVerify={(token) => setToken(token)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          {mode === "login" ? "Login" : "Register"}
        </button>
        <p className="text-sm text-red-600">{message}</p>
      </form>
      <button
        className="mt-4 text-blue-500 underline"
        onClick={() => setMode(mode === "login" ? "register" : "login")}
      >
        Switch to {mode === "login" ? "Register" : "Login"}
      </button>
    </div>
  );
}
