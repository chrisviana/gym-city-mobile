import React, { useState, useEffect } from 'react';

const InstallAppBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault();
      setDeferredPrompt(event);
      setShowBanner(true);
    });
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          console.log('O aplicativo foi instalado');
          setShowBanner(false);
        } else {
          console.log('O usuário optou por não instalar o aplicativo');
        }
        setDeferredPrompt(null);
      });
    }
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="install-app-banner">
      <p>Instale o aplicativo em seu celular</p>
      <button onClick={handleInstallClick}>Instalar</button>
    </div>
  );
};

export default InstallAppBanner;
