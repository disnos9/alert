const express = require('express');
const webpush = require('web-push');
const app = express();

app.use(require('body-parser').json());

const publicVapidKey = '...'; // These keys should be generated
const privateVapidKey = '...'; // You can use the web-push library to generate them

webpush.setVapidDetails('mailto:example@yourdomain.org', publicVapidKey, privateVapidKey);

let subscriptions = [];

app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({});
});

app.post('/sendNotification', (req, res) => {
  const notificationPayload = {
    notification: {
      title: 'New Notification',
      body: 'This is the body of the notification',
      icon: 'assets/icons/icon-512x512.png',
    },
  };

  const promises = [];
  subscriptions.forEach((subscription, i) => {
    promises.push(
      webpush.sendNotification(subscription, JSON.stringify(notificationPayload))
    );
  });

  Promise.all(promises).then(() => res.sendStatus(200));
});

app.listen(3000, () => console.log('Server started on port 3000'));
