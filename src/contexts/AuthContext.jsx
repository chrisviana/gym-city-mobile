import React, { createContext, useState } from "react";
import app from "../service/firebase";
// import { setCookie } from "nookies";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { destroyCookie } from "nookies/dist";

import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  getDocs,
  deleteDoc,
  updateDoc,
  query,
  where,
  getDoc,
} from "firebase/firestore"
import { toast } from "react-toastify";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const isAuthenticated = false;

  const firestore = getFirestore(app);

  const signOut = () => {
    try {
      localStorage.removeItem("treino");
      navigate("/");
    } catch {
    }
  };

  const signIn = async (usuario) => {
    try {

      const treinoQuery = query(collection(firestore, "treinos"), where("usuario", "==", usuario));
      const treinoSnapshot = await getDocs(treinoQuery);
    
      if (!treinoSnapshot.empty) {
        toast.success("Logado com sucesso", {
          position: toast.POSITION.TOP_CENTER
        });

        const treinoDocs = treinoSnapshot.docs.map((doc) => doc.data());
        localStorage.setItem("treino", JSON.stringify(treinoDocs))
        
        navigate("/treino");
      } else {
        return null;
      }
    } catch (err) {
     console.log(err);
    }
  };

  const authContextData = {
    user,
    isAuthenticated,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };