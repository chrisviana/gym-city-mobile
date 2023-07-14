import React, { useState, useEffect } from "react";
import InstallAppBanner from "./components/InstallAppBanner";
import Login from "./Page/Login";

const App = () => {
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    // Verificar se o aplicativo está instalado
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone
    ) {
      setIsAppInstalled(true);
    }

    // Verificar se é um dispositivo Android
    if (/Android/i.test(navigator.userAgent)) {
      setIsAndroid(true);
    }
  }, []);

  return (
    <div className="App">
      {isAndroid ? <InstallAppBanner /> : isAppInstalled && <Login />}
    </div>
  );
};

export default App;
