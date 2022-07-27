import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";

//import the methods -> book.services CRUD -> firebase/firestore
import BookDataService from "../services/book.services";

//receive the props:getBookId from App.js
const BooksList = ({ getBookId }) => {
  const [books, setBooks] = useState([]);

  //when 1st open app grab all books available 
  useEffect(() => {
    getBooks();
  }, []);

  //grab all books available 
  const getBooks = async () => {
    const data = await BookDataService.getAllBooks();
    console.log(data.docs);
    //update the state. reminder: setState when to update, to use: state eg.console.log(state)
    //spread operator
    setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  //since using firebase/API need to use async await
  //id as param then pass the id to methods deleteBook()
  const deleteHandler = async (id) => {
    await BookDataService.deleteBook(id);
    //refresh list
    getBooks();
  };

  return (
    <>
      <div className="mb-2">
        <Button variant="dark edit" onClick={getBooks}>
          Refresh List
        </Button>
      </div>

      {/* <pre>{JSON.stringify(books, undefined, 2)}</pre>} */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Book Title</th>
            <th>Book Author</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {books.map((doc, index) => {  
            //cycle content inside state | index start with 0, so add 1 to start with 1
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.title}</td>
                <td>{doc.author}</td>
                <td>{doc.status}</td>
                <td>
                  <Button
                    variant="secondary"
                    className="edit"
                    //when click, grab the id
                    onClick={(e) => getBookId(doc.id)}
                  >Edit</Button>
                  <Button
                    variant="danger"
                    className="delete"
                    onClick={(e) => deleteHandler(doc.id)}
                  >Delete</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
        
      </Table>
    </>
  );
};

export default BooksList;
