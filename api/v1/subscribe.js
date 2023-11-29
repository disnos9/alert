navigator.serviceWorker.ready.then(function(registration) {
  if (!registration.pushManager) {
    alert('Push manager unavailable.');
    return;
  }

  registration.pushManager.getSubscription().then(function(existedSubscription) {
    if (existedSubscription === null) {
      console.log('No subscription detected, make a request.');
      registration.pushManager.subscribe({
        applicationServerKey: urlBase64ToUint8Array('BPmF6PRCB0xPKjhuT2Dub7hpTuI_MFUuJ1Qp2ciBVs6CAy8lr3ZPeQuMcHHE81ESOFyo6RGX5T58N_A8IMPVg0Q'),
        userVisibleOnly: true,
      }).then(function(newSubscription) {
        console.log('New subscription added.');
        fetch('/api/v1/subscribe', {
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
