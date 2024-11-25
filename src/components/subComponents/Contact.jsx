import React, { useState } from "react";
import emailjs from "emailjs-com";

function Contact() {
  const [formData, setFormData] = useState({
    fname: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_7kuwwao",
        "template_crnjvef",
        formData,
        "Hb3JDJoZ7dCRPEB_P"
      )
      .then((response) => {
        console.log("Email sent successfully", response);
        setFormData({
          fname: "",
          email: "",
          message: "",
        });
        alert("Message sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending email", error);
        alert("Failed to send the message. Please try again.");
      });
  };

  return (
    <div id="Contact" className="Contact">
      <h1 className="SHeaderAlternate">contact.</h1>
      <div className="ContactSection">
        <div className="SectionContext">
          <h2 style={{ margin: "10px 0px" }}>
            Interested in collaborating with me?
          </h2>
          <span>
            Let's catch up some time to discuss further, who could say no to a
            good cup of hot chocolate and pleasant day's chat.
          </span>
        </div>
        <div className="ContactCard">
          <h2>Send me an email</h2>
          <form className="ContactInfoContainer" onSubmit={handleSubmit}>
            <div className="align-cloumn">
              <label htmlFor="fname">Name</label>
              <input
                type="text"
                id="fname"
                name="fname"
                className="txtInput"
                value={formData.fname}
                onChange={handleChange}
                required
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="txtInput"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="align-cloumn">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="10"
                cols="40"
                className="txtInput"
                value={formData.message}
                onChange={handleChange}
                maxLength="2000"
              />
              <button className="btnSubmit" type="submit">
                <span>Send email</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
