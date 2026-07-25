import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export async function saveAnalysis(userId, analysis) {
  await addDoc(
    collection(db, "users", userId, "history"),
    analysis
  );
}

export async function getHistory(userId) {
  const q = query(
    collection(db, "users", userId, "history"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function deleteHistory(userId, historyId) {
  await deleteDoc(
    doc(db, "users", userId, "history", historyId)
  );
}