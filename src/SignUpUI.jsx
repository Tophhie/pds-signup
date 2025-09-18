import React, { useState } from "react";
import { SimpleSignUp } from "./SimpleSignUp"; // if default export, use: import SimpleSignUp from "./SimpleSignUp";

export default function SignUpUI() {
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const handleRegex = /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/;
    if (!handleRegex.test(handle + ".tophhie.social")) {
      setStatus("Invalid username. Only letters, numbers, and hyphens are allowed.");
      return;
    }

    try {
      const signUp = new SimpleSignUp();
      await signUp.signUp(handle.toLowerCase(), email, password, setStatus);
      setIsSignedUp(true);
    } catch (err) {
      console.error(err);
      setStatus("Sign-up failed. Please try again.");
      setIsSignedUp(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#100235] flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl max-w-lg w-full p-10 space-y-6">
        <img
          src="https://blob.tophhie.cloud/tophhiecloud-resources/Logos/tophhiecloud-colour-padded.png"
          className="mx-auto w-auto"
          style={{ maxWidth: "40%", height: "auto" }}
          alt="Tophhie Cloud"
        />

        <h1 className="text-2xl font-bold text-gray-900">Sign up to Tophhie Social</h1>
        <p className="text-gray-600">
          Create your atproto (Bluesky) account on the Tophhie Social server!
        </p>

        {isSignedUp ? (
          <div className="text-center text-green-600 font-semibold">
            <p>Account created successfully! You can now log in.</p><br />
            <p>When logging into Bluesky (or any atproto app), make sure the server is set to <code>https://tophhie.social</code>.</p>
          </div>
        ) : (
          <>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Username + suffix */}
              <div className="flex rounded-lg shadow-sm border border-gray-300">
                <input
                  type="text"
                  placeholder="Username"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  className="flex-1 px-4 py-2 bg-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-r-lg border-l border-gray-300 select-none">
                  .tophhie.social
                </span>
              </div>

              {/* Email */}
              <div className="flex rounded-lg shadow-sm border border-gray-300">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Password */}
              <div className="flex rounded-lg shadow-sm border border-gray-300">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 px-4 py-2 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Create account
              </button>
            </form>

            {status && (
              <div className="text-sm text-center text-gray-700" role="status">
                {status}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}