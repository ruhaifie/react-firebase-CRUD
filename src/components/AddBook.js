import React, { useState, useEffect } from "react";

//bootStrap
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
//components
import BookDataService from "../services/book.services";

const AddBook = ({ id, setBookId }) => {

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("Available");

  const [flag, setFlag] = useState(true);
  //object error & msg
  //state with object with multiple properties
  const [message, setMessage] = useState({ error: false, msg: "" });

  //whenever handle with firestore always return promise
  const handleSubmit = async (e) => {
    //prevent refresh when click submit
    e.preventDefault();
    //set to empty/reset. as pre-caution
    setMessage("");

    //if empty title & author
    if (title === "" || author === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    //but if dont have empty title & author
    //want to add newbook, add new record
    const newBook = {
      title,
      author,
      status, //at the button below: setStatus(available/not available)
    };
    console.log(newBook);

    //get from book.services
    try {
      //not equal to undefine & not empty
      if (id !== undefined && id !== "") {
        //update
        await BookDataService.updateBook(id, newBook);
        setBookId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        //add
        await BookDataService.addBooks(newBook);
        setMessage({ error: false, msg: "New Book added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    //empty the fields after process
    setTitle("");
    setAuthor("");
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await BookDataService.getBook(id);
      console.log("the record is :", docSnap.data());
      //using fire instance to grab id, then set new info
      setTitle(docSnap.data().title);
      setAuthor(docSnap.data().author);
      setStatus(docSnap.data().status);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  //run whenever id changes value, id as dependencay
  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);

  //if have message?.msg *state then display alert msg 
  return (
    <>
      <div className="p-4 box">
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            //when close reset/empty the message. JSX
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBookTitle">
            <InputGroup>
              <InputGroup.Text id="formBookTitle">B</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Book Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBookAuthor">
            <InputGroup>
              <InputGroup.Text id="formBookAuthor">A</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Book Author"
                value={author}
                //set(grab value)
                onChange={(e) => setAuthor(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <ButtonGroup aria-label="Basic example" className="mb-3">
            <Button
              disabled={flag}
              variant="success"
              onClick={(e) => {
                setStatus("Available");
                setFlag(true);
              }}
            >
              Available
            </Button>
            <Button
              variant="danger"
              disabled={!flag}
              onClick={(e) => {
                setStatus("Not Available");
                setFlag(false);
              }}
            >
              Not Available
            </Button>
          </ButtonGroup>
          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Add/ Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddBook;
