import { Container, Row, Col } from "reactstrap";
import Subtitle from "../shared/Subtitle";
import "./section4.css";
import FeaturedTourList from "./FeaturedTourList";

export default function Section04() {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <Subtitle subtitle={"Explore"} />
            <h2 className="featured__tour-title">Our featured tours</h2>
          </Col>
        </Row>
        <FeaturedTourList />
      </Container>
    </section>
  );
}
