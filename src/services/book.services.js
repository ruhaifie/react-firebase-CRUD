import { db } from "../firebase-config";

//firebase/firestore methods from firebase-config
import {
  collection,
  getDocs,  //get all doc
  getDoc,   //get individual doc
  addDoc,
  updateDoc,
  deleteDoc,
  doc,      //doc
} from "firebase/firestore";

//connect with the firebase/firestore. books is the name of the collection inside firebase
const bookCollectionRef = collection(db, "books");

//class of methods Create Read Update Delete
class BookDataService {
  addBooks = (newBook) => {
    return addDoc(bookCollectionRef, newBook);
  };

  updateBook = (id, updatedBook) => {
    const bookDoc = doc(db, "books", id);
    return updateDoc(bookDoc, updatedBook);
  };

  deleteBook = (id) => {
    const bookDoc = doc(db, "books", id);
    return deleteDoc(bookDoc);
  };

  getAllBooks = () => {
    return getDocs(bookCollectionRef);
  };

  getBook = (id) => {
    const bookDoc = doc(db, "books", id);
    return getDoc(bookDoc);
  };
}

export default new BookDataService();
