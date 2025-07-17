import React from "react";
import styles from "./content.module.css";

export function Content() {
  return (
    <div className={styles.content}>
      <p>
        <em>Last updated: 17.07.2025</em>
      </p>

      <p>
        This Privacy Policy describes how we collect, use, and protect your
        personal data when you use our service ("the Service") for tracking
        infant sleep intervals.
      </p>

      <h2 className={styles.subtitle}>1. Who we are</h2>
      <p>
        We operate a non-commercial service for tracking infant sleep intervals.
        The Service is intended for personal use by adults only.
      </p>
      <p>
        If you have any questions about this Privacy Policy, please contact us
        at:{" "}
        <a href="mailto:hello@dremuli.com" className={styles.link}>
          hello@dremuli.com
        </a>
      </p>

      <h2 className={styles.subtitle}>2. What data we collect</h2>
      <p>We collect the following data:</p>
      <ul>
        <li>Email address (provided during registration)</li>
        <li>Password hash (we never store your plain password)</li>
        <li>Time intervals you manually enter related to infant sleep</li>
      </ul>
      <p>
        Additionally, we may collect basic technical metadata such as your IP
        address and browser user-agent for security and diagnostic purposes.
      </p>
      <p>
        We do <strong>not</strong> collect any data that directly identifies
        your child (e.g., name, birthdate, or photos).
      </p>

      <h2 className={styles.subtitle}>3. Why we collect this data</h2>
      <p>We use your data to:</p>
      <ul>
        <li>Provide access to the Service</li>
        <li>Store and sync your sleep interval entries</li>
        <li>Maintain account security</li>
      </ul>
      <p>We do not use your data for marketing, profiling, or analytics.</p>

      <h2 className={styles.subtitle}>4. Legal basis for processing</h2>
      <p>For users in the European Union, we rely on:</p>
      <ul>
        <li>
          <strong>Consent</strong> for collecting and storing your email and
          sleep data
        </li>
        <li>
          <strong>Legitimate interest</strong> for security-related metadata (IP
          address, etc.)
        </li>
      </ul>
      <p>
        For users in the Russian Federation, processing of personal data is
        based on <strong>Article 6 of Federal Law No. 152-FZ</strong>, with your
        explicit consent.
      </p>

      <h2 className={styles.subtitle}>5. Data storage and transfer</h2>
      <p>
        Your data is stored securely on servers located in Amsterdam,
        Netherlands. We may transfer data across borders if needed for hosting,
        in compliance with applicable laws including GDPR and Russian Federal
        Law 152-FZ.
      </p>
      <p>All passwords are stored as secure cryptographic hashes.</p>

      <h2 className={styles.subtitle}>6. Your rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access your data</li>
        <li>Request deletion of your account and all associated data</li>
        <li>Withdraw consent at any time</li>
        <li>
          Ask any questions via{" "}
          <a href="mailto:hello@dremuli.com" className={styles.link}>
            hello@dremuli.com
          </a>
        </li>
      </ul>

      <h2 className={styles.subtitle}>7. Data retention</h2>
      <p>
        We store your data for as long as your account remains active. You may
        delete your account at any time, which will result in complete removal
        of your data from our servers.
      </p>

      <h2 className={styles.subtitle}>8. Children’s data</h2>
      <p>
        This Service is intended for use by adults. Although sleep data may
        relate to infants, we do not knowingly collect identifiable data about
        children.
      </p>

      <h2 className={styles.subtitle}>9. Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you
        of major changes via email or within the app.
      </p>

      <hr />

      <p>By using the Service, you agree to this Privacy Policy.</p>
    </div>
  );
}

export default Content;
