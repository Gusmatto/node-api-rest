import fs from 'fs';
import path from 'path';

const __dirname = import.meta.dirname;
const jsonPath = path.join(__dirname, './products.json');
const json = fs.readFileSync(jsonPath, 'utf8');
const products = JSON.parse(json);

import { db } from '../data/data.js';
import { collection, getDocs, getDoc, addDoc, deleteDoc, doc } from 'firebase/firestore';

const productsCollection = collection(db, 'products');

export async function getProductById(id) {
    try {
        const productRef = doc(productsCollection, id);
        const snapshot = await getDoc(productRef);
        return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
    } catch (error) {
        console.log(error);
    }
};

export async function getAllProducts() {
    console.log("🟡 Executing getAllProducts()");
    try {
      const querySnapshot = await getDocs(productsCollection);
      console.log("📦 Amount of documents:", querySnapshot.size);
  
      const products = [];
      querySnapshot.forEach((doc) => {
        console.log("🟢 Document found:", doc.id, doc.data());
        products.push({ id: doc.id, ...doc.data() });
      });
  
      return products;
    } catch (error) {
      console.error("🔴 Error in getAllProducts:", error);
      return [];
    }
  }

export async function createProduct(data) {
    try {
        const docRef = await addDoc(productsCollection, data);
        return { id: docRef.id, ...data };
    } catch (error) {
        console.log(error);
    }
    
};

export async function deleteProduct(id) {
    try {
        const productRef = doc(productsCollection, id);
        const snapshot = await getDoc(productRef);

        if (!snapshot.exists()) {
            return false;
        }
        await deleteDoc(productRef);
        return true
    } catch (error) {
        console.log(error);
    }
} 