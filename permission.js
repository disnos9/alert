Notification.requestPermission().then(function(permission) {
  if (permission === 'granted') {
    var notification = new Notification('This is an example notification');
  }
});
