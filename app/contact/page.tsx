"use client";

import type { Metadata } from "next";
import { useState } from "react";
import FunAvatar from "../components/FunAvatar";

// export const metadata: Metadata = {
//   title: "Contact Us",
//   description:
//     "Contact ToolStack.fun for feedback, support, or questions about our free online developer tools.",
// };

export default function ContactPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 🚀 For now: frontend-only (AdSense safe)
        console.log("Contact form submitted:", form);

        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-14 space-y-12">
           
            {/* ---------- HEADER ---------- */}
            <header className="text-center space-y-3">
                <h1 className="text-3xl md:text-4xl font-extrabold">
                    Contact Us
                </h1>
                <p className="text-gray-600 max-w-xl mx-auto">
                    Have a question, feedback, or suggestion?
                    We’d love to hear from students and developers using ToolStack.fun.
                </p>
            </header>
 {/* <section className="flex justify-center">
                <FunAvatar />
            </section> */}
            {/* ---------- FORM ---------- */}
            <section className="max-w-xl mx-auto bg-white border rounded-3xl p-8 shadow-sm">
                {submitted ? (
                    <div className="text-center space-y-3">
                        <h2 className="text-xl font-semibold text-green-600">
                            ✅ Message Sent
                        </h2>
                        <p className="text-gray-600">
                            Thank you for contacting us. We’ll get back to you as soon as
                            possible.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* NAME */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                placeholder="Your name"
                                className="w-full rounded-xl border px-4 py-3 text-sm
                           focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* EMAIL */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                placeholder="your@email.com"
                                className="w-full rounded-xl border px-4 py-3 text-sm
                           focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* MESSAGE */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Message
                            </label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                placeholder="Write your message here..."
                                rows={5}
                                className="w-full rounded-xl border px-4 py-3 text-sm resize-none
                           focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* SUBMIT */}
                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl bg-indigo-600 text-white
                         hover:bg-indigo-700 active:scale-95 transition font-medium"
                        >
                            Send Message
                        </button>
                    </form>
                )}
            </section>

            {/* ---------- INFO ---------- */}
            <section className="text-center text-sm text-gray-600 space-y-2">
                <p>
                    📧 Email:{" "}
                    <span className="font-medium text-indigo-600">
                        support@toolstack.fun
                    </span>
                </p>
                <p>
                    We usually respond within 24–48 hours.
                </p>
            </section>

            {/* ---------- SEO CONTENT ---------- */}
            <section className="max-w-3xl mx-auto bg-gray-50 border rounded-2xl p-6 text-sm text-gray-700 space-y-3">
                <h2 className="font-semibold text-lg">
                    Get in Touch with ToolStack.fun
                </h2>
                <p>
                    ToolStack.fun is built for developers and students who need fast,
                    reliable online tools. Your feedback helps us improve features, fix
                    bugs, and add new utilities.
                </p>
                <p>
                    If you have suggestions, questions, or partnership inquiries, feel
                    free to contact us using the form above.
                </p>
            </section>

        </div>
    );
}
