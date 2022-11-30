import React from "react";
import { Container, Row } from "react-bootstrap";
import MyCard from "./MyCard";
import { v4 as uuidv4 } from "uuid";

export default function MyCardGroup(props) {
  let { data } = props;
  return (
    <Container className="my-5">
      <Row>
        {data.map((d) => {
          return (
            <MyCard key={uuidv4()} title={d.title} value={d.value}>
              {d.img()}
            </MyCard>
          );
        })}
      </Row>
    </Container>
  );
}
