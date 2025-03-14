import styles from "./AboutUsPage.module.css";

const aboutUsData = {
  aboutUs:
    "Investment Calculators was founded in 2025 by Pradeep Jadhav, a software engineer with a passion for helping individuals make more informed financial decisions. Although not a certified financial advisor, Pradeep recognized that many people struggle with complex financial terms and calculations when planning for their future. This led him to create a platform that offers a range of calculators to estimate potential returns on various financial products such as SIPs, FDs, loans, and more.",
  goal: "Our goal is simple: To provide everyone, regardless of their financial background, with easy-to-use, trustworthy tools to estimate their financial outcomes and help them make smarter, more confident decisions about their savings and investments.",
  mission:
    "At Investment Calculators, our mission is to empower individuals across India to take charge of their financial future by providing easy-to-use and reliable tools to estimate investment returns and assist in their savings and investment journey. We believe that financial literacy is the first step toward making informed decisions, and our platform is dedicated to making such tools accessible to everyone.",
  vision:
    "To be a trusted platform that simplifies financial calculations and inspires individuals to start their journey towards financial security, fostering a culture of financial literacy across India.",
  disclaimer:
    "Please note that while our calculators provide estimates, they are not to be used for making real financial decisions. We recommend consulting a certified financial advisor or tax consultant for professional advice tailored to your specific situation.",
  contactUs:
    "Feel free to reach out to us for any inquiries, feedback, or support.",
};

const AboutUsPage = async () => {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h3>About Us</h3>
        <div>{aboutUsData.aboutUs}</div>
      </div>
      <div className={styles.section}>
        <h3>Our Goal</h3>
        <div>{aboutUsData.goal}</div>
      </div>
      <div className={styles.section}>
        <h3>Mission</h3>
        <div>{aboutUsData.mission}</div>
      </div>
      <div className={styles.section}>
        <h3>Vision</h3>
        <div>{aboutUsData.vision}</div>
      </div>
      <div className={styles.section}>
        <h3>Disclaimer</h3>
        <div>{aboutUsData.disclaimer}</div>
      </div>
      <div className={styles.section}>
        <h3>Contact Us</h3>
        <div>{aboutUsData.contactUs}</div>
        <div>
          Email:{" "}
          <a href="mailto:contact@pradeepjadhav.com">
            contact@pradeepjadhav.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
