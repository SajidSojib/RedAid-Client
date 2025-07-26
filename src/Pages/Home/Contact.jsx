import React from 'react';
import { toast } from 'react-toastify';
import Lottie from "lottie-react";
import contactLottie from "../../assets/contact-lottie.json";
const Contact = () => {
    return (
      <div className="py-16 mx-auto lg:py-20 lg:pt-18 rounded-2xl ">
        <section className="">
          <div className="max-w-xl mb-10 md:mx-auto text-center lg:max-w-2xl md:mb-12">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-base-content sm:text-4xl md:mx-auto">
              Need <span className="text-primary">Assistance?</span>?
            </h2>
            <p className="text-base text-base-content md:text-lg">
              Have questions, feedback, or need assistance? Reach out to our
              support team anytime—we’re here to help!
            </p>
          </div>
          <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
            <div data-aos="fade-right" data-aos-delay="100" className="py-6 md:py-0 md:px-6">
              <Lottie animationData={contactLottie} loop={true} />
            </div>

            <form
              noValidate=""
              className="flex flex-col py-6 space-y-6 md:py-0 md:px-6"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Message sent successfully");
              }}
            >
              <div>
                <h1 className="text-3xl font-bold">Get in touch</h1>
                <p className="pt-2 pb-4">Fill in the form to connect with us</p>
              </div>
              <label className="block">
                <span className="mb-1 text-base-300">Full name</span>
                <label
                  data-aos="fade-down"
                  data-aos-delay="100"
                  data-aos-duration="400"
                  data-aos-easing="ease-in-out"
                  className="input input-primary border-none shadow-md shadow-accent bg-base-100 w-full"
                >
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </g>
                  </svg>
                  <input
                    type="text"
                    required
                    placeholder="Username"
                    pattern="[A-Za-z][A-Za-z0-9\-]*"
                    minLength="3"
                    maxLength="30"
                    title="Only letters, numbers or dash"
                  />
                </label>
              </label>
              <label
                data-aos-delay="100"
                data-aos="fade-down"
                data-aos-duration="600"
                data-aos-easing="ease-in-out"
                className="block"
              >
                <span className="mb-1">Email address</span>
                <label className="input shadow-md shadow-accent input-primary border-none bg-base-100 w-full validator">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </g>
                  </svg>
                  <input type="email" placeholder="Enter Email" required />
                </label>
              </label>
              <label
                data-aos-delay="100"
                data-aos="fade-down"
                data-aos-duration="800"
                data-aos-easing="ease-in-out"
                className="block"
              >
                <span className="mb-1">Message</span>
                <textarea
                  rows="3"
                  className="block w-full rounded-md shadow-md shadow-accent textarea border-none textarea-primary bg-base-100 py-2 px-3"
                  placeholder="Your message"
                ></textarea>
              </label>
              <button
                data-aos="fade-down"
                data-aos-delay="100"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                type="submit"
                className="self-center px-8 py-3 text-lg rounded focus:ring hover:ring focus:ring-opacity-75 btn btn-primary focus:dark:ring-violet-600 hover:dark:ring-violet-600"
              >
                Submit
              </button>
            </form>
          </div>
        </section>
      </div>
    );
};

export default Contact;