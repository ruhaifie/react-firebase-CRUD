//db is firestore instance
import { db } from "../firebase-config";

//firebase/firestore methods from firebase-config. using at return inside method created
import {
  collection,
  getDocs,  //get all doc
  getDoc,   //get individual doc
  addDoc,
  updateDoc,
  deleteDoc,
  doc,      //doc
} from "firebase/firestore";

//connect with the firebase/firestore. 
//books is the name of the collection inside firebase. get collection reference
const bookCollectionRef = collection(db, "books");

//class contain list of methods Create Read Update Delete
class BookDataService {

  addBooks = (newBook) => {
    //reference is bookCollectionRef | newBook is new document we want to add
    return addDoc(bookCollectionRef, newBook);
  };

  updateBook = (id, updatedBook) => {
    //to check book exist or not
    const bookDoc = doc(db, "books", id);
    //if exist then update
    return updateDoc(bookDoc, updatedBook);
  };

  deleteBook = (id) => {
    //to check book exist or not
    const bookDoc = doc(db, "books", id);
    return deleteDoc(bookDoc);
  };

  //fetch all book
  getAllBooks = () => {
    return getDocs(bookCollectionRef);
  };

  getBook = (id) => {
    //to check book exist or not
    const bookDoc = doc(db, "books", id);
    return getDoc(bookDoc);
  };
}

export default new BookDataService();
