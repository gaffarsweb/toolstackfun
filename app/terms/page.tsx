import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and Conditions for ToolStack.fun. Understand the rules, responsibilities, and usage policies for our free online developer tools.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      {/* HEADER */}
      <header className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-extrabold">
          Terms & Conditions
        </h1>
        <p className="text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </header>

      {/* INTRO */}
      <section className="space-y-4">
        <p>
          Welcome to <strong>ToolStack.fun</strong>. These Terms and Conditions
          outline the rules and regulations for using our website and online
          tools.
        </p>
        <p>
          By accessing this website, you agree to be bound by these Terms. If you
          do not agree with any part of the Terms, please discontinue use of the
          website.
        </p>
      </section>

      {/* 1 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          1. Use of the Website
        </h2>
        <p>
          ToolStack.fun provides free online utilities for developers, students,
          and professionals. You agree to use the website only for lawful
          purposes.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>You must not misuse or abuse any tool</li>
          <li>You must not attempt to disrupt services</li>
          <li>You must comply with all applicable laws</li>
        </ul>
      </section>

      {/* 2 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          2. No User Accounts
        </h2>
        <p>
          ToolStack.fun does not require user registration. We do not offer user
          accounts, profiles, or authentication services.
        </p>
      </section>

      {/* 3 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          3. Tool Usage Disclaimer
        </h2>
        <p>
          All tools on ToolStack.fun are provided on an “as-is” and “as-available”
          basis.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>No guarantee of accuracy or reliability</li>
          <li>Results should be verified before production use</li>
          <li>We are not responsible for data loss or errors</li>
        </ul>
      </section>

      {/* 4 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          4. Intellectual Property
        </h2>
        <p>
          All content, branding, design, and code on ToolStack.fun (excluding
          open-source libraries) is the intellectual property of ToolStack.fun.
        </p>
        <p>
          You may not copy, reproduce, or redistribute content without written
          permission.
        </p>
      </section>

      {/* 5 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          5. Advertisements
        </h2>
        <p>
          ToolStack.fun may display advertisements, including Google AdSense
          ads. Ads help support the platform and keep tools free.
        </p>
        <p>
          We do not control the content of third-party advertisements.
        </p>
      </section>

      {/* 6 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          6. External Links
        </h2>
        <p>
          Our website may include links to third-party websites. We are not
          responsible for the content or privacy practices of those websites.
        </p>
      </section>

      {/* 7 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          7. Limitation of Liability
        </h2>
        <p>
          ToolStack.fun and its team shall not be held liable for any direct,
          indirect, or incidental damages arising from the use of the website or
          tools.
        </p>
      </section>

      {/* 8 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          8. User Experience & Fair Usage
        </h2>
        <p>
          Users must not engage in excessive automated requests or activities
          that negatively affect website performance or other users.
        </p>
      </section>

      {/* 9 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          9. Changes to Services
        </h2>
        <p>
          ToolStack.fun reserves the right to modify, suspend, or discontinue
          any part of the website or tools at any time without notice.
        </p>
      </section>

      {/* 10 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          10. Governing Law
        </h2>
        <p>
          These Terms shall be governed and interpreted in accordance with
          applicable laws, without regard to conflict of law principles.
        </p>
      </section>

      {/* 11 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          11. Termination
        </h2>
        <p>
          We reserve the right to restrict or terminate access to ToolStack.fun
          for users who violate these Terms.
        </p>
      </section>

      {/* 12 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          12. Consent
        </h2>
        <p>
          By using ToolStack.fun, you acknowledge that you have read, understood,
          and agreed to these Terms and Conditions.
        </p>
      </section>

      {/* 13 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          13. Contact Information
        </h2>
        <p>
          For questions regarding these Terms, please contact us at:
        </p>
        <p className="font-medium">
          📧 Email:{" "}
          <span className="text-indigo-600">
            support@toolstack.fun
          </span>
        </p>
      </section>
    </div>
  );
}
