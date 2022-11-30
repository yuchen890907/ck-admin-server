import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function LoginFooter() {
  return (
    <footer className="text-center text-lg-start" id="loginFooter">
      <Container className="p-4">
        <Row className="py-4 footerText">
        </Row>
      </Container>

      <div className="text-center p-3 copyright">© 2022 Copyright：Cook Assistant - 營運管理系統</div>
    </footer>
  );
}
