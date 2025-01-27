import "./App.css";

import Container from "react-bootstrap/Container";

import Row from "react-bootstrap/Row";

import Incidents from "./components/Incidents";

function App() {
  return (
    <div className="App">
      <Container>
        <Row className="Incident_Row">
          <Incidents />
        </Row>
      </Container>
    </div>
  );
}

export default App;
