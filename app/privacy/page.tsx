import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for ToolStack.fun. Learn how we collect, use, and protect your data while using our free online developer tools.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      {/* TITLE */}
      <header className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-extrabold">
          Privacy Policy
        </h1>
        <p className="text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </header>

      {/* INTRO */}
      <section className="space-y-4">
        <p>
          Welcome to <strong>ToolStack.fun</strong>. Your privacy is important to
          us. This Privacy Policy explains how we collect, use, and protect
          information when you use our website and tools.
        </p>
        <p>
          By accessing or using ToolStack.fun, you agree to the terms outlined in
          this Privacy Policy.
        </p>
      </section>

      {/* 1 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          1. Information We Collect
        </h2>
        <p>
          ToolStack.fun does not require user registration and does not collect
          personal information such as names, email addresses, or phone numbers.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Non-personal data (browser type, device, OS)</li>
          <li>Log files (IP address, date/time, referring URLs)</li>
          <li>Anonymous usage statistics</li>
        </ul>
      </section>

      {/* 2 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          2. Tool Data & User Content
        </h2>
        <p>
          All tools on ToolStack.fun operate directly in your browser.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Data entered into tools is never uploaded to our servers</li>
          <li>No files, text, or tokens are stored</li>
          <li>Processing happens locally on your device</li>
        </ul>
      </section>

      {/* 3 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          3. Cookies & Tracking Technologies
        </h2>
        <p>
          ToolStack.fun may use cookies to improve user experience and analyze
          traffic patterns. Cookies help us understand how users interact with
          our site.
        </p>
        <p>
          You can disable cookies through your browser settings if you prefer.
        </p>
      </section>

      {/* 4 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          4. Google AdSense & Advertising
        </h2>
        <p>
          ToolStack.fun may display ads provided by Google AdSense. Google uses
          cookies, including the DoubleClick cookie, to serve ads based on user
          visits.
        </p>
        <p>
          Users may opt out of personalized advertising by visiting:
        </p>
        <a
          href="https://policies.google.com/technologies/ads"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 underline"
        >
          https://policies.google.com/technologies/ads
        </a>
      </section>

      {/* 5 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          5. Third-Party Privacy Policies
        </h2>
        <p>
          ToolStack.fun’s Privacy Policy does not apply to third-party websites or
          advertisers. Please review their policies separately.
        </p>
      </section>

      {/* 6 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          6. Data Security
        </h2>
        <p>
          We use industry-standard security practices. However, no online system
          is completely secure, and we cannot guarantee absolute protection.
        </p>
      </section>

      {/* 7 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          7. Children’s Information
        </h2>
        <p>
          ToolStack.fun does not knowingly collect personal information from
          children under the age of 13.
        </p>
      </section>

      {/* 8 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          8. User Experience & Performance
        </h2>
        <p>
          We continuously improve ToolStack.fun to provide a fast, smooth, and
          distraction-free experience for students and developers.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Responsive design for all devices</li>
          <li>Optimized loading speed</li>
          <li>Minimal intrusive elements</li>
        </ul>
      </section>

      {/* 9 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          9. Accessibility & Inclusivity
        </h2>
        <p>
          We aim to make ToolStack.fun accessible and usable for a diverse group
          of users, including beginners and professionals.
        </p>
      </section>

      {/* 10 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          10. Data Accuracy & Responsibility
        </h2>
        <p>
          ToolStack.fun provides utilities for convenience and learning. Users
          are responsible for verifying outputs before production use.
        </p>
      </section>

      {/* 11 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          11. Feedback & Improvements
        </h2>
        <p>
          We welcome feedback, bug reports, and suggestions that help us improve
          tools and user experience.
        </p>
      </section>

      {/* 12 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          12. Fair Use Policy
        </h2>
        <p>
          Users must not abuse tools, automate excessive usage, or use services
          for illegal or malicious activities.
        </p>
      </section>

      {/* 13 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          13. Policy Updates
        </h2>
        <p>
          This Privacy Policy may be updated periodically. Changes will be
          reflected on this page with a revised date.
        </p>
      </section>

      {/* 14 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          14. Consent
        </h2>
        <p>
          By using ToolStack.fun, you consent to this Privacy Policy and agree to
          its terms.
        </p>
      </section>

      {/* 15 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          15. Contact Us
        </h2>
        <p>
          If you have questions or concerns about this Privacy Policy, please
          contact us:
        </p>
        <p className="font-medium">
          📧 Email: <span className="text-indigo-600">support@toolstack.fun</span>
        </p>
      </section>
    </div>
  );
}
