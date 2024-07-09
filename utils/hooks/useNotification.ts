import { NotificationAdd } from "@/types";
import { db } from "@/utils/firebase";
import { collection, addDoc } from "firebase/firestore";

export const addNotification = async (notification: NotificationAdd) => {
  return await addDoc(collection(db, "notifications"), notification);
};
