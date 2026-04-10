import { useEffect, useState } from "react";

export default function App() {
  const [step, setStep] = useState(1);
  const [page, setPage] = useState<"onboarding" | "home" | "detail" | "focus" | "leaderboard" | "profile">("onboarding");
  const [activeTab, setActiveTab] = useState("home");
  const [timeLeft, setTimeLeft] = useState("");
  const [energy, setEnergy] = useState(20);
  const [mascotImageFailed, setMascotImageFailed] = useState(false);

const getCompanionState = (e: number) => {
  if (e >= 90) return { emoji: "🤩", status: "Thriving!", sub: "You're absolutely killing it!" };
  if (e >= 70) return { emoji: "😊", status: "Content & encouraging", sub: "You're doing well, keep it up!" };
  if (e >= 50) return { emoji: "😟", status: "Worried & fidgeting...", sub: "You're falling behind a little..." };
  if (e >= 30) return { emoji: "😢", status: "Sad & withdrawn", sub: "I'm not happy with this..." };
  return { emoji: "😵", status: "Exhausted & depressed", sub: "Please... do something..." };
};

const companion = getCompanionState(energy);
const mascotMood = energy > 50 ? "happy" : "sad";
const mascotImageSrc = mascotMood === "happy" ? "/mascot-happy.png" : "/mascot-sad.png";

useEffect(() => {
  setMascotImageFailed(false);
}, [mascotMood]);

useEffect(() => {
  const update = () => {
    const now = new Date();
    const due = new Date();
    due.setHours(17, 0, 0, 0);
    const diff = due.getTime() - now.getTime();
    if (diff <= 0) {
      setTimeLeft("Overdue!");
      return;
    }
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    setTimeLeft(`${h}h ${m}m ${s}s`);
  };
  update();
  const timer = setInterval(update, 1000);
  return () => clearInterval(timer);
}, []);

if (page === "leaderboard") {
  const players = [
    { name: "Anderson Chan", energy: 95, emoji: "🤩" },
    { name: "Hailey Zheng", energy: 72, emoji: "😊" },
    { name: "Megan Chen", energy: 68, emoji: "😊" },
    { name: "Ying Yi Li", energy: 45, emoji: "😟" },
    { name: "Daniel Chen", energy: 28, emoji: "😢" },
  ].sort((a, b) => b.energy - a.energy);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 to-blue-950 flex flex-col max-w-md mx-auto">

      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <p className="text-white font-semibold text-xl">Leaderboard 🏆</p>
        <p className="text-slate-400 text-xs mt-1">CSE 300 — Group 6</p>
      </div>

      {/* List */}
      <div className="mx-6 space-y-3">
        {players.map((player, index) => (
          <div key={player.name}
            className={`flex items-center gap-4 rounded-2xl px-4 py-4 border ${player.name === "Hailey Zheng" ? "bg-blue-500/20 border-blue-500/50" : "bg-slate-800/60 border-slate-700/50"}`}>
            
            {/* Rank */}
            <p className={`text-lg font-bold w-6 text-center ${index === 0 ? "text-yellow-400" : index === 1 ? "text-slate-300" : index === 2 ? "text-orange-400" : "text-slate-500"}`}>
              {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
            </p>

            {/* Emoji */}
            <span className="text-2xl">{player.emoji}</span>

            {/* Name + Bar */}
            <div className="flex-1">
              <p className={`text-sm font-medium ${player.name === "Hailey Zheng" ? "text-blue-300" : "text-white"}`}>
                {player.name} {player.name === "Hailey Zheng" ? "👈" : ""}
              </p>
              <div className="w-full h-2 bg-slate-700 rounded-full mt-1 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  style={{ width: `${player.energy}%` }}></div>
              </div>
            </div>

            {/* Energy */}
            <p className="text-white text-sm font-semibold">{player.energy}%</p>
          </div>
        ))}
      </div>

      {/* Bottom Nav */}
      <div className="mt-auto border-t border-slate-700/50 bg-slate-900/80 px-6 py-4 flex justify-around">
        {[
          { id: "home", icon: "🏠", label: "Home", action: () => { setActiveTab("home"); setPage("home"); } },
          { id: "deadlines", icon: "🏆", label: "Leaderboard", action: () => { setActiveTab("deadlines"); setPage("leaderboard"); } },
          { id: "focus", icon: "📷", label: "Focus", action: () => { setActiveTab("focus"); setPage("focus"); } },
          { id: "profile", icon: "👤", label: "Profile", action: () => {
          setActiveTab("profile");
          setPage("profile");
        } },
        ].map((tab) => (
          <button key={tab.id} onClick={tab.action}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === tab.id ? "text-blue-400" : "text-slate-500"}`}>
            <span className="text-xl">{tab.icon}</span>
            <span className="text-xs">{tab.label}</span>
          </button>
        ))}
      </div>

    </div>
  );
}

if (page === "focus") {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 to-blue-950 flex flex-col max-w-md mx-auto">
      <div className="flex items-center gap-4 px-4 pt-8 pb-4">
        <button
          onClick={() => {
            setPage("home");
            setActiveTab("home");
          }}
          className="text-slate-300 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div>
          <p className="text-white font-semibold text-lg">Focus Mode</p>
          <p className="text-slate-400 text-xs mt-0.5">Powered by LOCK IN</p>
        </div>
      </div>

      <div className="flex-1 px-4 pb-4">
        <iframe
          src="https://lock-in-aggressive-study-timer-73864895442.us-west1.run.app"
          title="LOCK IN Focus Timer"
          className="w-full h-full min-h-[80vh] rounded-2xl border border-slate-700/60 bg-black"
          allow="camera; microphone; autoplay; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>
  );
}

if (page === "profile") {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 to-blue-950 flex flex-col max-w-md mx-auto">
      <div className="px-6 pt-12 pb-6">
        <p className="text-white font-semibold text-xl">Profile</p>
        <p className="text-slate-400 text-xs mt-1">Your account and settings</p>
      </div>

      <div className="mx-6 space-y-3">
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl px-4 py-4">
          <p className="text-white text-sm font-medium">Name</p>
          <p className="text-slate-300 text-sm mt-1">Hailey Zheng</p>
        </div>
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl px-4 py-4">
          <p className="text-white text-sm font-medium">Email</p>
          <p className="text-slate-300 text-sm mt-1">hailey@stonybrook.edu</p>
        </div>
      </div>

      <div className="mt-auto border-t border-slate-700/50 bg-slate-900/80 px-6 py-4 flex justify-around">
        {[
          { id: "home", icon: "🏠", label: "Home", action: () => { setActiveTab("home"); setPage("home"); } },
          { id: "deadlines", icon: "🏆", label: "Leaderboard", action: () => { setActiveTab("deadlines"); setPage("leaderboard"); } },
          { id: "focus", icon: "📷", label: "Focus", action: () => { setActiveTab("focus"); setPage("focus"); } },
          { id: "profile", icon: "👤", label: "Profile", action: () => {
            setActiveTab("profile");
            setPage("profile");
          } },
        ].map((tab) => (
          <button key={tab.id} onClick={tab.action}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === tab.id ? "text-blue-400" : "text-slate-500"}`}>
            <span className="text-xl">{tab.icon}</span>
            <span className="text-xs">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

if (page === "detail") {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 to-blue-950 flex flex-col max-w-md mx-auto">
      
      {/* Header */}
      <div className="flex items-center gap-4 px-6 pt-12 pb-6">
        <button onClick={() => setPage("home")} className="text-slate-400 hover:text-white transition-colors">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div>
          <p className="text-white font-semibold text-lg">CSE 300 Annotated Bibliography</p>
          <p className="text-orange-400 text-xs mt-0.5">⚠️ Due in 2 days</p>
        </div>
      </div>

      {/* Links */}
      <div className="mx-6">
        <p className="text-slate-400 text-xs uppercase tracking-widest mb-3">Quick Links</p>
        <div className="space-y-3">
          
          <a href="https://brightspace.stonybrook.edu" target="_blank" rel="noreferrer"
            className="flex items-center gap-4 bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-4 hover:border-blue-500/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-xl">📚</div>
            <div>
              <p className="text-white text-sm font-medium">Brightspace Page</p>
              <p className="text-slate-400 text-xs">Course materials & announcements</p>
            </div>
            <span className="ml-auto text-slate-400">›</span>
          </a>

          <a href="https://brightspace.stonybrook.edu" target="_blank" rel="noreferrer"
            className="flex items-center gap-4 bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-4 hover:border-blue-500/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center text-xl">📤</div>
            <div>
              <p className="text-white text-sm font-medium">Assignment Submission</p>
              <p className="text-slate-400 text-xs">Submit your work here</p>
            </div>
            <span className="ml-auto text-slate-400">›</span>
          </a>

          <a href="https://discord.com" target="_blank" rel="noreferrer"
            className="flex items-center gap-4 bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-4 hover:border-indigo-500/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-xl">💬</div>
            <div>
              <p className="text-white text-sm font-medium">Discord</p>
              <p className="text-slate-400 text-xs">Class discussion & help</p>
            </div>
            <span className="ml-auto text-slate-400">›</span>
          </a>

          <a href="https://chatgpt.com" target="_blank" rel="noreferrer"
            className="flex items-center gap-4 bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-4 hover:border-purple-500/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-xl">🤖</div>
            <div>
              <p className="text-white text-sm font-medium">ChatGPT</p>
              <p className="text-slate-400 text-xs">AI writing assistant</p>
            </div>
            <span className="ml-auto text-slate-400">›</span>
          </a>

        </div>
      </div>

    </div>
  );
}

  if (page === "home") {
    return (
      <div className="h-[100dvh] w-full overflow-hidden bg-gradient-to-br from-slate-900 to-blue-950 flex flex-col max-w-md mx-auto">

        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 pt-12 pb-4">
          <div>
            <p className="text-slate-400 text-sm">Good morning,</p>
            <p className="text-white text-xl font-semibold">Hailey 👋</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-slate-300 hover:text-white transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 17H20L18.595 15.595A1 1 0 0118 14.88V11a6 6 0 10-12 0v3.88a1 1 0 01-.405.715L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto pb-4">
        {/* Character Card */}
<div className="mx-6 mb-6 rounded-2xl bg-slate-800/60 border border-slate-700/50 p-6 flex flex-col items-center">
  
  {/* Energy Bar */}
  <div className="w-full mb-4">
    <div className="flex justify-between items-center mb-1">
      <p className="text-slate-400 text-xs uppercase tracking-widest">Energy</p>
      <p className="text-white text-xs font-semibold">{energy}%</p>
    </div>
    <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
      <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500" style={{ width: `${energy}%` }}></div>
    </div>
  </div>

  {/* Mascot Image Placeholder */}
<div className="mb-3 w-36 h-36 rounded-2xl border border-slate-600/60 bg-slate-900/70 flex items-center justify-center overflow-hidden">
  {!mascotImageFailed ? (
    <img
      src={mascotImageSrc}
      alt={`Mascot ${mascotMood}`}
      className="w-full h-full object-cover"
      onError={() => setMascotImageFailed(true)}
    />
  ) : (
    <div className="text-center px-3">
      <div className="text-5xl mb-2">{companion.emoji}</div>
      <p className="text-[10px] uppercase tracking-widest text-slate-400">Add {mascotImageSrc}</p>
    </div>
  )}
</div>

{/* Status Text */}
<p className="text-white text-base text-center font-medium">{companion.status}</p>
<p className="text-slate-400 text-sm text-center mt-1">{companion.sub}</p>

</div>
<div className="mx-6 mb-4">
  <input 
    type="range" 
    min="0" 
    max="100" 
    value={energy}
    onChange={(e) => setEnergy(Number(e.target.value))}
    className="w-full"
  />
</div>
        {/* Deadlines */}
        <div className="mx-6 mb-6">
          <p className="text-white font-semibold text-base mb-3">Upcoming Deadlines</p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3">
              <span className="text-lg">✅</span>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">CSE 300 Project Memo</p>
                <p className="text-green-400 text-xs">Completed</p>
              </div>
            </div>
            <div 
  onClick={() => setPage("detail")}
  className="flex items-center gap-3 bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3 cursor-pointer hover:border-blue-500/50 transition-colors">
  <span className="text-lg">⚠️</span>
  <div className="flex-1">
    <p className="text-white text-sm font-medium">CSE 300 Annotated Bibliography</p>
    <p className="text-orange-400 text-xs">Due in 2 days</p>
  </div>
  <span className="text-slate-400 text-sm">›</span>
</div>
            <div className="flex items-center gap-3 bg-slate-800/60 border border-red-500/30 rounded-xl px-4 py-3">
  <span className="text-lg">🔴</span>
  <div className="flex-1">
    <p className="text-white text-sm font-medium">CSE 300 Supporting Materials</p>
    <p className="text-red-400 text-xs">Due today at 5pm</p>
  </div>
  <div className="bg-red-500/20 px-2 py-1 rounded-lg">
    <p className="text-red-400 text-xs font-mono">{timeLeft}</p>
  </div>
</div>
          </div>
        </div>

        {/* Stats */}
        <div className="mx-6 mb-6 flex gap-4">
          <div className="flex-1 bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3">
            <p className="text-slate-400 text-xs mb-1">Focus time today</p>
            <p className="text-white font-semibold text-sm">1h 23m</p>
          </div>
          <div className="flex-1 bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3">
            <p className="text-slate-400 text-xs mb-1">Streak</p>
            <p className="text-orange-400 font-semibold text-sm">3 days 🔥</p>
          </div>
        </div>
        </div>

        {/* Bottom Nav */}
        <div className="border-t border-slate-700/50 bg-slate-900/80 px-6 py-4 flex justify-around">
  {[
    { id: "home", icon: "🏠", label: "Home", action: () => { setActiveTab("home"); setPage("home"); } },
    { id: "deadlines", icon: "🏆", label: "Leaderboard", action: () => { setActiveTab("deadlines"); setPage("leaderboard"); } },
    { id: "focus", icon: "📷", label: "Focus", action: () => { setActiveTab("focus"); setPage("focus"); } },
    { id: "profile", icon: "👤", label: "Profile", action: () => {
        setActiveTab("profile");
        setPage("profile");
      } },
  ].map((tab) => (
    <button
      key={tab.id}
      onClick={tab.action}
      className={`flex flex-col items-center gap-1 transition-colors ${activeTab === tab.id ? "text-blue-400" : "text-slate-500"}`}
    >
      <span className="text-xl">{tab.icon}</span>
      <span className="text-xs">{tab.label}</span>
    </button>
  ))}
</div>

      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-950">
      <div className="w-full max-w-md px-8 py-12 flex flex-col items-center">

        {/* Top: Logo + Name */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-white text-3xl">StopSigh</h1>
        </div>

        {/* Middle: Animated Triangle */}
        <div className="mb-8 flex items-center justify-center">
          <svg className="w-24 h-24 animate-spin" viewBox="0 0 24 24" fill="none" stroke="url(#grad)" strokeWidth="1.5">
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" stopColor="#60a5fa" />
  <stop offset="100%" stopColor="#a855f7" />
</linearGradient>
            </defs>
            <path d="M12 4L22 20H2L12 4z" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Step Content */}
        {step === 1 && (
          <>
            <p className="text-white text-xl mb-12 text-center">Let's get you set up</p>
            <div className="w-full space-y-4 mb-8">
              <button className="w-full py-4 px-6 bg-white text-slate-900 rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
                Connect Brightspace / Calendar
              </button>
              <button className="w-full py-4 px-6 bg-white text-slate-900 rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
                Choose Accountability Contact
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-white text-xl mb-4 text-center">Allow permissions</p>
            <p className="text-slate-400 text-sm mb-8 text-center">StopSigh needs these to keep you accountable</p>
            <div className="w-full space-y-4 mb-8">
              <button className="w-full py-4 px-6 bg-white text-slate-900 rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
                🔔 Allow Notifications
              </button>
              <button className="w-full py-4 px-6 bg-white text-slate-900 rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
                📷 Allow Camera Access
              </button>
              <button className="w-full py-4 px-6 bg-white text-slate-900 rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
                📱 Allow Screen Time Monitoring
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <p className="text-white text-xl mb-4 text-center">Meet StopSigh 👋</p>
            <p className="text-slate-400 text-sm mb-8 text-center px-4">
              StopSigh is your brutally honest productivity partner. It has feelings —
              stay on track and it'll be happy. Slack off and it'll let you know. 😤
            </p>
          </>
        )}

        {/* Next / Let's go Button */}
        <div className="w-full mb-8">
          <button
            onClick={() => {
              if (step < 3) setStep(step + 1);
              else setPage("home");
            }}
            className="w-full py-4 px-6 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors shadow-lg text-lg font-semibold"
          >
            {step === 3 ? "Let's go! 🚀" : "Next →"}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full">
          <div className="flex gap-2 mb-2">
            <div className={`flex-1 h-2 rounded-full ${step >= 1 ? "bg-blue-500" : "bg-slate-700"}`}></div>
            <div className={`flex-1 h-2 rounded-full ${step >= 2 ? "bg-blue-500" : "bg-slate-700"}`}></div>
            <div className={`flex-1 h-2 rounded-full ${step >= 3 ? "bg-blue-500" : "bg-slate-700"}`}></div>
          </div>
          <p className="text-slate-400 text-sm text-center">Step {step} of 3</p>
        </div>

      </div>
    </div>
  );
}