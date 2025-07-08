import React from "react";
import { Link } from "react-router-dom";
import routes from "../routes/route";
import BottomFooter from "../layouts/footer/BottomFooter";
import Footer from "../layouts/footer/Footer";
import StickyHeader from "../layouts/Header/Header";

function ResponsibleGaming() {
  return (
    <>
      <StickyHeader />
      <div className="container pt-40 text-white">
        <div className="pt-3 pb-2">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item text-white">
                <Link to={routes.home} className="text-white fw-600">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active text-white" aria-current="page">
                Responsible Gaming
              </li>
            </ol>
          </nav>
        </div>

        <section className="responsible_gaming_content mt-2">
          <h1 className="mb-4">Responsible Gaming</h1>

          <h2>Responsible Gaming and Player Protection Policy – Jiboomba.in</h2>
          <p>
            At <strong>Jiboomba.in</strong>, we are fully committed to promoting responsible gaming and ensuring our players
            are protected from the potential risks associated with gambling. Our Responsible Gaming Policy is designed to foster a
            safe, secure, and supportive environment by helping players make informed decisions and offering the tools needed to
            maintain control over their gaming activities.
          </p>

          <h2>Our Commitment to Responsible Gaming</h2>
          <p>
            We believe that online gaming should be a source of entertainment, not stress. To support this, we provide resources and
            protections to prevent problematic behavior and promote positive gaming habits. Our team is trained in responsible
            gambling practices and is always ready to assist.
          </p>
          <p>Our platform includes:</p>
          <ul>
            <li>Customizable loss and betting limits</li>
            <li>Self-exclusion features upon request via Customer Support</li>
            <li>Links to support organizations like GamCare, Gambling Therapy, and SICAD</li>
            <li>Account protection tools to prevent underage access and unauthorized use</li>
            <li>Self-assessment tools and awareness resources for players and their families</li>
          </ul>

          <h2>Account Closure and Self-Exclusion</h2>
          <p>If at any point you feel the need to take a break or stop playing, you can:</p>
          <ul>
            <li>Access <strong>Profile &gt; Player Protection</strong> to request temporary or permanent exclusion</li>
            <li>Contact our Customer Support at <a href="mailto:support@jiboomba.in" className="text-info">support@jiboomba.in</a></li>
          </ul>
          <p>
            Once activated, your exclusion or account block will be effective immediately. Revoking a restriction will require
            confirmation via email and may take up to 7 days once the exclusion period has passed.
          </p>

          <h2>Tips to Maintain Control</h2>
          <p>To keep your gaming fun and within your limits, consider the following:</p>
          <ul>
            <li>Treat gambling as entertainment, not a way to earn income</li>
            <li>Never try to chase losses</li>
            <li>Keep track of the time and money you spend</li>
            <li>Set loss limits through your account settings or with help from our team</li>
            <li>Take regular breaks and use self-exclusion tools when needed</li>
          </ul>
          <p>
            You can monitor your activity (deposits, withdrawals, and betting history) via <strong>History &gt; Transactions</strong> in
            your account. For any suspicious activity, immediately contact us and update your password. You are solely responsible for
            keeping your login details secure.
          </p>

          <h2>Do You Have a Gambling Problem?</h2>
          <p>If you're unsure whether your gambling habits are healthy, consider the following questions:</p>
          <ul>
            <li>Has gambling interfered with work, school, or personal responsibilities?</li>
            <li>Do you gamble to avoid boredom or loneliness?</li>
            <li>Are you playing for extended periods alone?</li>
            <li>Have friends or family expressed concern?</li>
            <li>Have you lost interest in things you used to enjoy?</li>
            <li>Have you lied, borrowed, or stolen money to gamble?</li>
            <li>Do you feel anxious or depressed due to gambling?</li>
            <li>Do you keep playing to recover your losses?</li>
          </ul>
          <p>
            If you answered "yes" to several of these, you might benefit from seeking professional help. Reach out to support services
            like <a href="https://www.gamblingtherapy.org" target="_blank" rel="noopener noreferrer" className="text-info">Gambling Therapy</a>,
            <a href="https://www.gamcare.org.uk" target="_blank" rel="noopener noreferrer" className="text-info"> GamCare</a>, or your local health provider.
          </p>

          <h2>Underage Gaming Prevention</h2>
          <p>Gambling on Jiboomba.in is strictly prohibited for individuals under 18. To prevent underage access, we have implemented:</p>
          <ul>
            <li>Age verification checks for all new accounts</li>
            <li>Random verification audits for accounts using non-standard payment methods</li>
            <li>Any user found to be underage will have their account closed, any winnings forfeited, and may be reported to authorities.</li>
          </ul>
        </section>
      </div>
      <BottomFooter />
      <div className="h-50 w-100 mb-5"></div>
      <Footer />
    </>
  );
}

export default ResponsibleGaming;
