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

/**

## firebase 🔥
npm run build //before deployed
npm i firebase-tools -D     //within this file scope not global
firebase deploy --only hosting
- if not using ANY framework then
* ? Configure as a single-page app (rewrite all urls to /index.html)? No
- Make sure your public folder (define in your firebase.json) ‘dist’ containing the index.html hasn’t been modified by firebase init command, if yes replace it with your original project index.html
if ter replace, just type: npm run build again, then firebase init. 
dont replace
* ? File build/index.html already exists. Overwrite? No 

 */