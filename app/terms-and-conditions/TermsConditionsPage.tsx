import styles from "./TermsConditionsPage.module.css";

const termsData = {
  introduction:
    "By accessing and using Investment Calculators (located at www.investmentcalculators.in), you agree to comply with and be bound by these Terms and Conditions. Please read them carefully.",
  useOfWebsite: [
    "You agree to use our website solely for lawful purposes.",
    "You agree not to misuse our calculators or any other content available on the site for illegal, fraudulent, or malicious purposes.",
  ],
  disclaimers: [
    "Our calculators are provided to give you a general estimate of your financial outcomes. These results are not guaranteed, and we do not take responsibility for any decisions made based on these estimates.",
    "Since the calculations may involve assumptions and estimations, results should be used as a guideline and not as a final decision-making tool.",
    "Investment decisions should be made after consulting with certified financial advisors to ensure informed choices aligned with your financial goals.",
  ],
  intellectualProperty:
    "All content on Investment Calculators is protected by copyright laws. You may not use, copy, distribute, or modify any part of the website’s content without prior written consent from the website owner.",
  limitationOfLiability:
    "In no event will we be liable for any direct, indirect, incidental, special, or consequential damages arising from the use of our website or calculators.",
  laws: " These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising out of the use of the website will be subject to the exclusive jurisdiction of the courts in India.",
  changesToTerms:
    "We may update these terms from time to time. Any changes will be effective immediately upon posting on this page.",
  contactUs:
    "Feel free to reach out to us for any inquiries, feedback, or support.",
};

const TermsConditionsPage = async () => {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h3>Introduction</h3>
        <p>{termsData.introduction}</p>
      </div>
      <div className={styles.section}>
        <h3>Use of Website</h3>
        <p>
          <ul>
            {termsData.useOfWebsite.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </p>
      </div>
      <div className={styles.section}>
        <h3>Calculators Disclaimer</h3>
        <p>
          <ul>
            {termsData.disclaimers.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </p>
      </div>

      <div className={styles.section}>
        <h3>Intellectual Property</h3>
        <p>{termsData.intellectualProperty}</p>
      </div>

      <div className={styles.section}>
        <h3>Limitation of Liability</h3>
        <p>{termsData.limitationOfLiability}</p>
      </div>

      <div className={styles.section}>
        <h3>Governing Law</h3>
        <p>{termsData.laws}</p>
      </div>

      <div className={styles.section}>
        <h3>Changes to the Terms</h3>
        <p>{termsData.changesToTerms}</p>
      </div>
      <div className={styles.section}>
        <h3>Contact Us</h3>
        <p>{termsData.contactUs}</p>
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

export default TermsConditionsPage;
