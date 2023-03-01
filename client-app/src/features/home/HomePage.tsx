import React from "react";
import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <Container style={{ marginTop: "7rem" }}>
      <h1>Home page</h1>
      <h2>
        Go to <Link to={"/activities"}>Activities</Link>
      </h2>
    </Container>
  );
};

export default HomePage;
