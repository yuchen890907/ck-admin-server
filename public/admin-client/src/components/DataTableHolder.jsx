import React from "react";
import { Card, Placeholder } from "react-bootstrap";

const DataTableHolder = () => {
  return (
    <Card className="shadow border-0 my-3">
      <Card.Header className="px-4 py-2 pt-3 fs-5">
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={3} />
        </Placeholder>
      </Card.Header>
      <Card.Body>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={8} />
          <br />
          <Placeholder xs={7} />
          <br />
          <Placeholder xs={5} />
          <br />
          <Placeholder xs={5} />
          <br />
          <Placeholder xs={4} />
          <br />
          <Placeholder xs={4} />
          <br />
          <Placeholder xs={6} />
        </Placeholder>
      </Card.Body>
    </Card>
  );
};

export default DataTableHolder;
