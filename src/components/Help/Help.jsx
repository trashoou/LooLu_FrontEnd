import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/Profile.module.css";

const Help = () => {
  const { currentUser } = useSelector(({ user }) => user);
  const [feedback, setFeedback] = useState("");

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    // Здесь можно добавить логику отправки обратной связи, например, на сервер
    alert("Feedback submitted: " + feedback);
    setFeedback("");
  };

  return (
    <section className={styles.profile}>
      <div className={styles.formContainer}>
        <h2>Help Center</h2>
        <p>
          Welcome to our Help Center! Here you can find answers to frequently
          asked questions and get support for any issues you may encounter while
          using our service.
        </p>
        <p>
          If you need further assistance, please contact our support team at{" "}
          <a href={`mailto:support@example.com`}>support@example.com</a>.
        </p>

        <form className={styles.form} onSubmit={handleSubmitFeedback}>
          <div className={styles.group}>
            <textarea
              placeholder="Enter your feedback or question here"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={5}
              required
            />
          </div>
          <button type="submit" className={styles.submit}>
            Submit Feedback
          </button>
        </form>
      </div>
    </section>
  );
};

export default Help;
