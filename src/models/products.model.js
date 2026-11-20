import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../config/firebase.js";

const productsCollection = collection(db, "products");

// Obtener todos los productos 
export const findAll = async (categoryId) => {
  const snapshot = await getDocs(productsCollection);
  const products = snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));

  if (!categoryId) {
    return products;
  }

  return products.filter((p) => Number(p.categoryId) === Number(categoryId));
};

// Buscar por ID
export const findById = async (id) => {
  const docRef = doc(productsCollection, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  return { id: docSnap.id, ...docSnap.data() };
};

// Crear un producto
export const create = async (productData) => {
  const docRef = await addDoc(productsCollection, productData);

  return {
    id: docRef.id,
    ...productData,
  };
};

// Actualizar un producto
export const update = async (id, productData) => {
  const docRef = doc(productsCollection, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  await updateDoc(docRef, productData);

  return {
    id: docSnap.id,
    ...productData,
  };
};

// Eliminar un producto
export const remove = async (id) => {
  const docRef = doc(productsCollection, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  const deletedData = docSnap.data();
  await deleteDoc(docRef);

  return {
    id: docSnap.id,
    ...deletedData,
  };
};