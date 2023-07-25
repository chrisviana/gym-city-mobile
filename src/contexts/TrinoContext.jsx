import React, { createContext } from "react";
import app from "../service/firebase";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
} from "firebase/firestore";

const TreinoContext = createContext({});

const TreinoProvaider = ({ children }) => {
  const firestore = getFirestore(app);

  const getExercicioTreinoById = async (id) => {
    const treinoRef = doc(firestore, "exercicioTreino", id);
    const treinoDoc = await getDoc(treinoRef);
  
    if (treinoDoc.exists()) {
      const treinoData = treinoDoc.data();;
      return treinoData;
    } else {
      return null;
    }
  };

  const authContextData = {
    getExercicioTreinoById,

  };

  return (
    <TreinoContext.Provider value={authContextData}>
      {children}
    </TreinoContext.Provider>
  );
}


export { TreinoContext, TreinoProvaider };