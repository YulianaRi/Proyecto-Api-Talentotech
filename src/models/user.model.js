import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import {db} from "../config/firebase.js"; // ajusta según cómo lo importes en products.model.js

const usersCollection = collection(db, "users");

export const findByEmail = async (email) => {
  const q = query(usersCollection, where("email", "==", email));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  const docSnap = snapshot.docs[0];
  return { id: docSnap.id, ...docSnap.data() };
};

export const create = async ({ email, password }) => {
  const docRef = await addDoc(usersCollection, { email, password });
  return { id: docRef.id, email, password };
};