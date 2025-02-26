import "../index.css";

import Section01 from "../components/homePage/section01.jsx";
import Section02 from "../components/homePage/section02.jsx";
import Section03 from "../components/homePage/section03.jsx";
import Section04 from "../components/homePage/section04.jsx";
import ReviewsSection from "../components/Review/ReviewComp.jsx";

export default function NewHomePage() {
  return (
    <section>
      {/* basic-structure is the style for making the width of the page maximum-7xl and centered*/}
      <div className="basic-struture">
        <Section01 />
      </div>
      <div className="bg-blue-50 my-12 p-0">
        <div className="basic-struture">
          <Section02 />
        </div>
      </div>
      <div className="basic-struture">
        <Section03 />
      </div>
      <div className="basic-struture">
        <Section04 />
      </div>
      <div className="basic-struture">
        <ReviewsSection />
      </div>
    </section>
  );
}
