import React, { useState, useEffect } from 'react';

const InstallAppBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault();
      setShowBanner(true);
    });
  }, []);

  const handleInstallClick = async () => {
    const deferredPrompt = await window.deferredPrompt;
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      if (result.outcome === 'accepted') {
        setShowBanner(false);
      }
      deferredPrompt = null;
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