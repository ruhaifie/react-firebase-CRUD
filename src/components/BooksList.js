import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";

//import the methods -> book.services CRUD -> firebase/firestore
import BookDataService from "../services/book.services";

//receive the props:getBookId from App.js
const BooksList = ({ getBookId }) => {

  //store inside array state
  const [books, setBooks] = useState([]);

  //re-run whenever have changes | 1st time run when load 
  useEffect(() => {
    getBooks();
  }, []);

  //update
  //docs is firebase properties
  //grab all books available 
  const getBooks = async () => {
    //create instance to store process: fetch data from db using service method
    const data = await BookDataService.getAllBooks();
    console.log(data.docs);
    //update the state. reminder: setState when to update, to use: state eg.console.log(state)
    //spread operator data allBooks & its id into state
    setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  //delete
  //since using firebase/API return promise so need to use async await
  //id as param then pass the id to methods deleteBook()
  const deleteHandler = async (id) => {
    //delete based on id, firebase do it for us.no need to filter then put back inside array etc
    await BookDataService.deleteBook(id);
    //refresh list, trigger above func & useEffect()
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
