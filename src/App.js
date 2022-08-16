//react
import { useState } from "react";

//bootstrap
import { Container, Navbar, Row, Col } from "react-bootstrap";

//components
import AddBook from "./components/AddBook";
import BooksList from "./components/BooksList";
//CSS
import "./App.css";

function App() {

  //send prop to AddBook.js 
  const [bookId, setBookId] = useState("");

  //send the props to BooksList.js named as getBookId
  //usually term Handler use for button. management tips
  const getBookIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setBookId(id);
    console.log({ setBookId });   //{}know where it come from
  };

  //react bootstrap
  return (
    <>
      <Navbar bg="dark" variant="dark" className="header">
        <Container>
          <Navbar.Brand href="#home">Library - Firebase CRUD</Navbar.Brand>
        </Container>
      </Navbar>

      <Container style={{ width: "400px" }}>
        <Row>
          <Col>
            <AddBook id={bookId} setBookId={setBookId} />
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col>
            <BooksList getBookId={getBookIdHandler} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
