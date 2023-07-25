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

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const isAuthenticated = false;

  const firestore = getFirestore(app);

  const signOut = () => {
    try {
      // destroyCookie(undefined, "@gymcityauth.token");
      localStorage.removeItem("@gymcityauth.token");
      navigate("/");
    } catch {
      // toast.error("Erro ao deslogar");
    }
  };

  const signIn = async (usuario) => {
    try {

      const treinoQuery = query(collection(firestore, "treinos"), where("usuario", "==", usuario));
      const treinoSnapshot = await getDocs(treinoQuery);
    
      if (!treinoSnapshot.empty) {
        const treinoDocs = treinoSnapshot.docs.map((doc) => doc.data());
        localStorage.setItem("treino", JSON.stringify(treinoDocs))
        navigate("/treino");

        // if (treinoDocs) {
        //   setCookie(undefined, "@gymcityauth.token", accessToken, {
        //     maxAge: 60 * 60 * 24 * 30,
        //     path: "/",
        //   });
  
        //   localStorage.setItem("@gymcityauth.token", accessToken);
  
  
        //   toast.success("Logado com sucesso");
        
        // } else {
        //   toast.error("E-mail ou Senha inválidos");
        // }
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