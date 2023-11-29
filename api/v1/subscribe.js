navigator.serviceWorker.ready.then(function(registration) {
  if (!registration.pushManager) {
    alert('Push manager unavailable.');
    return;
  }

  registration.pushManager.getSubscription().then(function(existedSubscription) {
    if (existedSubscription === null) {
      console.log('No subscription detected, make a request.');
      registration.pushManager.subscribe({
        applicationServerKey: urlBase64ToUint8Array('BEcD7XFTiPgOOuAxM-GzZj2v0Ckb6epb1Ckjm0J87MjoopuoE8uCrG0mml3aC1UlkbcGFR3NKcUOrsUSNoq_e88'),
        userVisibleOnly: true,
      }).then(function(newSubscription) {
        console.log('New subscription added.');
        fetch('/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newSubscription),
        });
      }).catch(function(e) {
        if (Notification.permission !== 'granted') {
          console.log('Permission was not granted.');
        } else {
          console.error('An error ocurred during the subscription process.', e);
        }
      });
    } else {
      console.log('Existed subscription detected.');
    }
  });
})
