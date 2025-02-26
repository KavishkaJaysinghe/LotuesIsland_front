
import div02cover from "../../images/div02-cover.png";

export default function Section02() {
  return (
    <section className="my-12">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="hidden sm:block md:flex justify-center rounded-md">
          <img
            src={div02cover}
            alt="cover.img"
            className="lg:w-full md:w-1/2"
          />
        </div>
        <div className="text-center lg:text-left lg:mb-0 pr-4 px-8">
          <p className="text-[#F4AC20] pb-4">What we serve</p>
          <h2 className="text-5xl font-Aclonica pb-4">
            The Best And Most trusted
            <span className="text-[#F4AC20]"> Service</span>
          </h2>
          <p className="text-gray-700 text-lg text-center lg:text-left pb-4">
            For more than a decade, we’ve been proudly serving hundreds of
            travelers, providing exceptional experiences across Sri Lanka. Our
            latest platform is designed to make planning your perfect trip
            easier than ever, offering tailored services for everyone looking to
            explore the beauty of Sri Lanka.
          </p>

          <div className="flex justify-between md:justify-center lg:justify-start">
            <div className="md:pr-16 ">
              <h2 className="text-[#F4AC20] text-4xl font-semibold w-24 text-center">
                100+
              </h2>
              <div className="w-24 text-gray-400 text-center">
                Customer & partners
              </div>
            </div>
            <div className="md:pr-16">
              <h2 className="text-[#F4AC20] text-4xl font-semibold w-24 text-center">
                10+
              </h2>
              <div className="w-24 text-gray-400 text-center">
                Years of Experience
              </div>
            </div>
            <div className="md:pr-16">
              <h2 className="text-[#F4AC20] text-4xl font-semibold w-24 text-center">
                50+
              </h2>
              <div className="w-24 text-gray-400 text-center">
                Success Journey
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
