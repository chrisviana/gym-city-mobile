import React, { createContext } from "react";
import app from "../service/firebase";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore";

const TreinoContext = createContext({});

const TreinoProvaider = ({ children }) => {
  const firestore = getFirestore(app);

  const getTreinoByUsuario = async (usuario) => {
    const treinoRef = doc(firestore, "treinos", usuario);
    const treinoDoc = await getDoc(treinoRef);

    if (treinoDoc.exists()) {
      const treinoData = treinoDoc.data();
      return treinoData;
    } else {
      return null;
    }
  };

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

  const buscaTreinoAtualizado = async (usuario) => {
    try {

      const treinoQuery = query(collection(firestore, "treinos"), where("usuario", "==", usuario));
      const treinoSnapshot = await getDocs(treinoQuery);
    
      if (!treinoSnapshot.empty) {
        const treinoDocs = treinoSnapshot.docs.map((doc) => doc.data());
        localStorage.setItem("treino", JSON.stringify(treinoDocs))
      } else {
        return null;
      }

      
    } catch (err) {
     console.log(err);
    }
  };

  const authContextData = {
    getExercicioTreinoById,
    buscaTreinoAtualizado,
    getTreinoByUsuario

  };

  return (
    <TreinoContext.Provider value={authContextData}>
      {children}
    </TreinoContext.Provider>
  );
}


export { TreinoContext, TreinoProvaider };