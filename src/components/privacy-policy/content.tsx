import React from "react";
import styles from "./content.module.css";

export function Content() {
  return (
    <div className={styles.content}>
      <p>
        This document is also available in Russian:{" "}
        <a href="/legal/privacy-policy/ru" className={styles.link}>
          Перейти к русской версии
        </a>
      </p>

      <p>
        <em>Last updated: 31.07.2025</em>
      </p>

      <p>
        This Privacy Policy describes how we collect, use, and protect your
        personal data when you use our service ("the Service") for tracking
        infant sleep intervals.
      </p>

      <h2 className={styles.subtitle}>1. Who we are</h2>
      <p>
        We operate a non-commercial service for tracking infant sleep intervals.
        The Service is intended for personal use by adults only. If you have any
        questions about this Privacy Policy, please contact us at:{" "}
        <a href="mailto:hello@dremuli.com" className={styles.link}>
          hello@dremuli.com
        </a>
      </p>

      <h2 className={styles.subtitle}>2. What data we collect</h2>
      <p>We collect the following data:</p>
      <ul>
        <li>Email address (provided during registration)</li>
        <li>Password hash (we never store your plain password)</li>
        <li>Sleep intervals you manually enter</li>
        <li>
          Optional information about the child's gender (used only to
          grammatically personalize sleep-related phrases in the interface)
        </li>
        <li>
          Technical metadata such as:
          <ul>
            <li>IP address</li>
            <li>Browser user-agent</li>
            <li>Timestamp of last activity</li>
          </ul>
        </li>
      </ul>

      <p>
        We do not collect any data that directly identifies your child (e.g.,
        name, birthdate, or photos).
      </p>

      <h2 className={styles.subtitle}>3. Why we collect this data</h2>
      <p>We collect and use your data to:</p>
      <ul>
        <li>Provide and maintain access to the Service</li>
        <li>Store and sync your sleep interval entries across devices</li>
        <li>
          Personalize the interface (e.g., gendered phrasing in some languages)
        </li>
        <li>Improve security and diagnose technical issues</li>
      </ul>

      <p>
        We do not use your data for advertising, profiling, or behavioral
        analytics.
      </p>

      <h2 className={styles.subtitle}>4. Legal basis for processing</h2>
      <p>For users in the European Union, we rely on:</p>
      <ul>
        <li>
          Your consent for storing and processing your email, sleep data, and
          child’s gender
        </li>
        <li>
          Our legitimate interest in collecting technical metadata (IP,
          user-agent, etc.) for security
        </li>
      </ul>

      <p>
        For users in the Russian Federation, processing of personal data is
        based on Article 6 of Federal Law No. 152-FZ, with your explicit
        consent.
      </p>

      <h2 className={styles.subtitle}>5. Data storage and transfers</h2>
      <p>
        Your data is stored on secure servers located in Amsterdam, Netherlands.
        Data may be transferred across borders solely for infrastructure
        purposes and in compliance with applicable data protection laws
        including GDPR and Russian law. We use trusted third-party hosting
        providers that process your data only as needed for technical operation
        of the Service.
      </p>

      <p>All passwords are stored as secure cryptographic hashes.</p>

      <h2 className={styles.subtitle}>6. Your rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access your personal data</li>
        <li>Request deletion of your account and associated data</li>
        <li>Withdraw your consent at any time</li>
        <li>
          Contact us with any questions at{" "}
          <a href="mailto:hello@dremuli.com" className={styles.link}>
            hello@dremuli.com
          </a>
        </li>
      </ul>

      <h2 className={styles.subtitle}>7. Data retention</h2>
      <p>
        We retain your data for as long as your account remains active. If you
        delete your account, we will permanently erase your data from our
        systems within a reasonable timeframe (typically within 3 days).
      </p>

      <h2 className={styles.subtitle}>8. Children's data</h2>
      <p>
        This Service is intended for adults. Although the data may relate to
        infants' sleep, we do not collect identifiable personal data about
        children.
      </p>

      <h2 className={styles.subtitle}>9. Changes to this policy</h2>
      <p>
        We may update this Privacy Policy periodically. If significant changes
        are made, we will notify you via email or in-app message. Your continued
        use of the Service implies acceptance of the updated Privacy Policy.
      </p>

      <h2 className={styles.subtitle}>10. Language and jurisdiction</h2>
      <p>
        This Privacy Policy is available in English and Russian. In case of
        conflict, the English version takes precedence. It is governed by the
        laws of the State of Israel, unless applicable data protection laws
        specify otherwise.
      </p>

      <hr />
      <p>By using the Service, you agree to this Privacy Policy.</p>
    </div>
  );
}

export default Content;
