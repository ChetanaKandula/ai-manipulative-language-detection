import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();
  const handleRegister = async () => {
  try {
    await register(email, password);
    navigate("/analyze");
  } catch (error) {
    alert(error.message);
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#160d33] via-[#090b1d] to-[#0b2538] flex items-center justify-center px-6">

      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl p-10">

        <div className="text-center">

          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 text-3xl shadow-[0_0_35px_rgba(168,85,247,0.45)]">
            🛡️
          </div>

          <h1 className="text-3xl font-bold text-white">
            Manipulens AI
          </h1>

          <p className="mt-2 text-xl font-semibold text-slate-200">
            Create Account ✨
          </p>

          <Link
  to="/login"
  className="font-semibold text-cyan-400 transition hover:text-cyan-300"
>
  Sign In
</Link>

          <div className="mt-10 space-y-5">

  <input
  type="email"
  placeholder="Email address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
/>

  <input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
/>

</div>
<div className="mt-5 flex items-center justify-between text-sm">

  <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
    <input
      type="checkbox"
      className="h-4 w-4 rounded border-white/20 bg-white/10 accent-cyan-400"
    />
    Remember me
  </label>

  <button
    type="button"
    className="text-cyan-400 transition hover:text-cyan-300"
  >
    Forgot Password?
  </button>

</div>
<button
  onClick={handleRegister}
  className="mt-8 w-full rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-500/40 active:scale-95"
>
  🚀 Create Account
</button>
<div className="my-8 flex items-center gap-4">
  <div className="h-px flex-1 bg-white/10"></div>

  <span className="text-sm uppercase tracking-widest text-slate-500">
    OR
  </span>

  <div className="h-px flex-1 bg-white/10"></div>
</div>
<button
  className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 py-4 text-white transition-all duration-300 hover:border-cyan-400 hover:bg-white/10"
>
  <span className="text-xl">🌐</span>
  Continue with Google
</button>
<p className="mt-8 text-center text-slate-400">
  Don't have an account?{" "}
  <button className="font-semibold text-cyan-400 transition hover:text-cyan-300">
    Create Account
  </button>
</p>

        </div>

      </div>

    </div>
  )
}

export default Register