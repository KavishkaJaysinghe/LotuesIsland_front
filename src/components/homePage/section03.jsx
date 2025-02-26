import badge from "../../images/icons/badge.png";
import coin from "../../images/icons/coin.png";
import globe from "../../images/icons/globe.png";

export default function Section03() {
  return (
    <section className="p-4">
      {/* column01 */}
      <div className="grid grid-cols-1 sm:grid-rows-4 md:grid-rows-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
        <div className="md:p-4">
          <h2 className="text-3xl md:mb-8 lg:mb-8 font-Aclonica text-center md:text-left">
            Why <span className="text-[#F4AC20]">Choose</span> Us
          </h2>
          <p className="text-gray-700 text-md text-center md:text-left">
            We ensure that you’ll embark on a perfectly planned, safe vacation
            at a price you can afford.
          </p>
          <div className="py-4 lg:py-6 sm:flex sm:justify-center md:justify-start">
            <a href="/about">
              <button className="text-[#F4AC20] py-2 px-4 border border-[#F4AC20] rounded-lg">
                <b className="text-sm">Learn More</b>
              </button>
            </a>
          </div>
        </div>
        {/* column02 */}
        <div className="md:p-4 md:border-l border-gray-300">
          <div className="sm:flex sm:justify-center md:justify-start">
            <img src={badge} alt="" className="h-14" />
          </div>
          <h3 className="text-xl md:mb-2 md:mt-2 font-Aclonica text-center md:text-left">
            Best Travel Agency
          </h3>
          <p className="text-gray-700 text-sm text-center md:text-left">
            Travel agencies that provide round trip, one way, and multi trip
            services.
          </p>
        </div>
        {/* column03 */}
        <div className="md:p-4 md:border-l border-gray-300">
          <div className="sm:flex sm:justify-center md:justify-start">
            <img src={coin} alt="" className="h-14" />
          </div>
          <h3 className="text-xl md:mb-2 md:mt-2 font-Aclonica text-center md:text-left">
            Competitive Price
          </h3>
          <p className="text-gray-700 text-sm text-center md:text-left">
            The price offered are affordable starting from the ordinary to the
            exclusive.
          </p>
        </div>
        {/* column04 */}
        <div className="md:p-4 md:border-l border-gray-300">
          <div className="sm:flex sm:justify-center md:justify-start">
            <img src={globe} alt="" className="h-14" />
          </div>
          <h3 className="text-xl md:mb-2 md:mt-2 font-Aclonica text-center md:text-left">
            Global Coverage
          </h3>
          <p className="text-gray-700 text-sm text-center md:text-left">
            There are many tourist attractions, hotels and interesting
            entertainment.
          </p>
        </div>
      </div>
    </section>
  );
}
