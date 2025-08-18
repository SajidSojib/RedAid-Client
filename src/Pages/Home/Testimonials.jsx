
const Testimonials = () => {
  return (
    <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:pt-24">
      <h1 className="text-center text-primary max-w-lg mb-5 font-sans text-3xl font-bold leading-none tracking-tight lg:text-4xl md:mx-auto">
        Testimonials
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
        {/* card 1 */}
        <div className="card h-[100%] bg-base-100 cursor-pointer  px-4 shadow-xl rounded-lg">
          <div className="flex justify-center pt-3">
            <img
              className="w-20 h-20 object-cover rounded-full"
              src="https://i.ibb.co.com/L8My9q9/azharul.jpg"
              alt=""
            />
          </div>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-base-content">Shohidul Islam</h2>
            <p className="text-base-content/80">
              It was my very first time donating blood, and I was nervous at
              first. RedAid guided me through the whole process, and within
              minutes I was connected to someone in need. Knowing my blood
              helped save a life is the best feeling I’ve ever had.
            </p>
          </div>
        </div>
        {/* card 2 */}
        <div className="card h-[100%] bg-base-100 cursor-pointer px-4 shadow-xl rounded-lg">
          <div className="flex justify-center pt-3">
            <img
              className="w-20 h-20 object-cover rounded-full"
              src="https://i.ibb.co.com/BLVmqsq/sabbir.jpg"
              alt=""
            />
          </div>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-base-content">Sabbir Hossain</h2>
            <p className="text-base-content/80">
              My father needed an urgent transfusion, and we were running out of
              time. Through RedAid, we found a donor the same day. This platform
              didn’t just help my father — it gave my family hope when we needed
              it the most.
            </p>
          </div>
        </div>
        {/* card 3 */}
        <div className="card h-[100%] bg-base-100 cursor-pointer px-4 shadow-xl rounded-lg">
          <div className="flex justify-center pt-3">
            <img
              className="w-20 h-20 object-cover rounded-full"
              src="https://i.ibb.co.com/4sGM8d7/istiak.jpg"
              alt=""
            />
          </div>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-base-content">Istiak Ahmed</h2>
            <p className="text-base-content/80">
              I’ve donated blood a few times before, but RedAid made it so easy
              to stay updated and track requests nearby. Last month, I donated
              to a child in critical condition, and knowing that I could help
              extend someone’s life motivates me to keep giving.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
