import { useRef, useState } from "react";

import { useForm } from "react-hook-form";

import emailjs from "@emailjs/browser";

import { images } from "../../constants";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Footer.scss";

const Footer = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const form = useRef();

  const onSubmit = () => {
    setLoading(true);

    emailjs
      .sendForm(
        "service_shal8ho",
        "template_z4fxm39",
        form.current,
        "frw9wN4zpY-axT1k2"
      )
      .then(
        (result) => {
          console.log(result.text);
          setLoading(false);
          setIsFormSubmitted(true);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <>
      <h2 className="head-text">Take a coffee & chat with me</h2>

      <div className="app__footer-cards">
        <a href="mailto:azizrakhim17@gmail.com" className="app__footer-card">
          <img src={images.email} alt="email" />
          <span className="p-text">azizrakhim17@gmail.com</span>
        </a>
        <a href="tel: +998 95 011 36 33" className="app__footer-card">
          <img src={images.mobile} alt="mobile" />
          <span className="p-text">+998 95 011 36 33</span>
        </a>
      </div>

      {!isFormSubmitted ? (
        <form
          className="app__footer-form app__flex"
          onSubmit={handleSubmit(onSubmit)}
          ref={form}
        >
          <div className="app__flex">
            <input
              className={errors.name ? "has-error" : "p-text"}
              placeholder="Your Name"
              {...register("name", {
                required: true,
                maxLength: 20,
                className: "p-text",
              })}
            />
          </div>
          <div className="app__flex">
            <input
              className={errors.email ? "has-error" : "p-text"}
              placeholder="Your Email"
              {...register("email", {
                required: true,
                pattern:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              })}
            />
          </div>
          <div>
            <textarea
              className={errors.message ? "has-error" : "p-text"}
              placeholder="Your Message"
              {...register("message", {
                required: true,
              })}
            />
          </div>
          <button
            type="submit"
            className="p-text footer-btn"
            disabled={loading}
          >
            {loading ? "Sending" : "Send Message"}
          </button>
        </form>
      ) : (
        <div>
          <h3 className="head-text">Thank you for getting in touch!</h3>
        </div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__whitebg"
);
