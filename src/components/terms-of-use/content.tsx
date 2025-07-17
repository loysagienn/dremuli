import React from "react";
import styles from "./content.module.css";

export function Content() {
  return (
    <div className={styles.content}>
      <p>
        <em>Last updated: 17.07.2025</em>
      </p>

      <p>
        These Terms of Use ("Terms") govern your use of our non-commercial sleep
        tracking service ("the Service"). By accessing or using the Service, you
        agree to be bound by these Terms.
      </p>

      <h2 className={styles.subtitle}>1. Eligibility</h2>
      <p>
        You must be at least 18 years old to use this Service. You may not use
        the Service on behalf of a child or allow a child to access the Service
        directly.
      </p>

      <h2 className={styles.subtitle}>2. Description of the Service</h2>
      <p>
        The Service allows you to manually log and view time intervals related
        to infant sleep. It is intended for personal informational use only and
        is not a medical or diagnostic tool.
      </p>

      <h2 className={styles.subtitle}>3. Account and Security</h2>
      <p>
        To use the Service, you must register with a valid email and password.
        You are responsible for maintaining the confidentiality of your login
        credentials.
      </p>

      <h2 className={styles.subtitle}>4. Prohibited Use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the Service for commercial purposes;</li>
        <li>Attempt to reverse engineer, hack, or disrupt the Service;</li>
        <li>Input malicious or false data;</li>
        <li>Use the Service to collect data on others without consent.</li>
      </ul>

      <h2 className={styles.subtitle}>5. Disclaimer</h2>
      <p>
        This Service does <strong>not</strong> provide medical advice or
        recommendations. You should consult a qualified healthcare professional
        for concerns related to your child’s health or sleep behavior.
      </p>

      <h2 className={styles.subtitle}>6. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, we are not liable for any
        indirect or consequential damages arising from your use of the Service.
      </p>
      <p>The Service is provided "as is" without warranty of any kind.</p>

      <h2 className={styles.subtitle}>7. Termination</h2>
      <p>
        You may delete your account at any time. We reserve the right to suspend
        or terminate access to the Service for violations of these Terms.
      </p>

      <h2 className={styles.subtitle}>8. Language</h2>
      <p>
        These Terms are available in English and Russian. In case of conflict,
        the <strong>English version shall prevail</strong>.
      </p>

      <hr />

      <p>
        By using the Service, you confirm that you have read and accepted these
        Terms.
      </p>
    </div>
  );
}

export default Content;
