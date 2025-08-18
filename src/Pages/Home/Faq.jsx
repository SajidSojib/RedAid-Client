import React from "react";
import faqPic from "../../assets/faq-lottie.json";
import Lottie from "lottie-react";
const Faq = ({ questions }) => {
  return (
    // <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 rounded-2xl ">
    <div className="px-4 mx-auto pt-16 lg:pt-24 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8  rounded-2xl ">
      <h1 className="max-w-lg mb-12 font-sans text-3xl font-bold leading-none tracking-tight text-base-content lg:text-4xl md:mx-auto">
        Frequently Asked <span className="text-primary">Questions</span>
      </h1>

      <div className="flex flex-col gap-8 lg:flex-row items-center justify-between">
        <div
          data-aos="fade-right"
          data-aos-once="true"
          data-aos-duration="500"
          className="flex-7/12"
        >
          <Lottie
            animationData={faqPic}
            loop={true}
            style={{ filter: "hue-rotate(70deg)" }}
          />
        </div>
        <div className="space-y-3">
          {questions?.map((q, i) => (
            <div
              data-aos="fade-down"
              data-aos-delay="100"
              data-aos-easing="ease-in-out"
              data-aos-duration={q.id * 200}
              key={i}
              className="collapse collapse-arrow bg-base-100"
            >
              {q.id == 1 ? (
                <input type="radio" name="my-accordion-2" defaultChecked />
              ) : (
                <input type="radio" name="my-accordion-2" />
              )}
              <div className="collapse-title text-base-content text-lg font-semibold">
                {q.question}
              </div>
              <div className="collapse-content text-base-content text-base">
                {q.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
