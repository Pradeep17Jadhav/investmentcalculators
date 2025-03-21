import styles from "./PrivacyPolicyPage.module.css";

const privacyPolicyData = {
  introduction:
    "At Investment Calculators, we are committed to safeguarding the privacy of our users. This Privacy Policy outlines the types of personal information we collect, how we use it, and the steps we take to protect your information.",
  informationCollected: [
    "Personal Identification Information: When you visit our website or use our calculators, we may collect personal details such as your name, email address, and phone number if you voluntarily provide them for support or contact purposes.",
    "At Investment Calculators, our mission is to empower individuals across India to take charge of their financial future by providing easy-to-use and reliable tools to estimate investment returns and assist in their savings and investment journey. We believe that financial literacy is the first step toward making informed decisions, and our platform is dedicated to making such tools accessible to everyone.",
  ],
  informationUsedTo: [
    "To provide you with a personalized experience.",
    "To improve our website and calculators based on user feedback.",
    "To communicate with you regarding updates, changes, or offers related to our services.",
  ],
  dataProtection:
    "We implement a variety of security measures to ensure the protection of your personal information when you access or use our website. However, please note that no method of transmission over the internet is 100% secure.",
  cookies:
    "We may use cookies to enhance the user experience on our website. Cookies are small files stored on your device that help us understand how you interact with our site.",
  tplinks:
    "Our website may contain links to third-party websites. Please note that we are not responsible for the privacy practices of those sites. We encourage you to review their privacy policies before sharing any personal information.",
  changesToPolicy:
    "We reserve the right to update this privacy policy at any time. Any changes will be posted on this page with the revised date.",
  contactUs:
    "Feel free to reach out to us for any inquiries, feedback, or support.",
};

const PrivacyPolicyPage = async () => {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h3>Introduction</h3>
        <p>{privacyPolicyData.introduction}</p>
      </div>
      <div className={styles.section}>
        <h3>Information We Might Collect</h3>
        <p>
          <ul>
            {privacyPolicyData.informationCollected.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </p>
      </div>
      <div className={styles.section}>
        <h3>How We Use Your Information</h3>
        <p>
          <ul>
            {privacyPolicyData.informationUsedTo.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </p>
      </div>

      <div className={styles.section}>
        <h3>Data Protection</h3>
        <p>{privacyPolicyData.dataProtection}</p>
      </div>

      <div className={styles.section}>
        <h3>Cookies</h3>
        <p>{privacyPolicyData.cookies}</p>
      </div>

      <div className={styles.section}>
        <h3>Third-Party Links</h3>
        <p>{privacyPolicyData.tplinks}</p>
      </div>

      <div className={styles.section}>
        <h3>Changes to the Privacy Policy</h3>
        <p>{privacyPolicyData.changesToPolicy}</p>
      </div>
      <div className={styles.section}>
        <h3>Contact Us</h3>
        <p>{privacyPolicyData.contactUs}</p>
        <p>
          Email:{" "}
          <a href="mailto:contact@pradeepjadhav.com">
            contact@pradeepjadhav.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
