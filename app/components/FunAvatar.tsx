"use client";

export default function FunAvatar() {
  return (
    <div className="flex flex-col items-center gap-3 animate-float">
      {/* AVATAR */}
      <div className="relative w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center">
        {/* FACE */}
        <div className="w-16 h-16 rounded-full bg-white flex flex-col items-center justify-center">
          {/* EYES */}
          <div className="flex gap-2 mb-1">
            <span className="w-2 h-2 bg-black rounded-full animate-blink" />
            <span className="w-2 h-2 bg-black rounded-full animate-blink" />
          </div>
          {/* MOUTH */}
          <div className="w-6 h-1 rounded-full bg-gray-700" />
        </div>

        {/* WAVE HAND */}
        <span className="absolute -right-3 top-6 text-2xl animate-wave">
          👋
        </span>
      </div>

      {/* SPEECH */}
      <div className="text-sm text-gray-600 bg-white border rounded-xl px-4 py-2 shadow-sm">
        Hi! I’m ToolStack 🤖  
        <br />
        Drop us a message!
      </div>
    </div>
  );
}
