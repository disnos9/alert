const express = require('express');
const webpush = require('web-push');
const app = express();
const publicVapidKey = "BPmF6PRCB0xPKjhuT2Dub7hpTuI_MFUuJ1Qp2ciBVs6CAy8lr3ZPeQuMcHHE81ESOFyo6RGX5T58N_A8IMPVg0Q"
const privateVapidKey = "NV_z570kE1za01YzcRabXLxkrH_phHQR_tGexdYMw4Q"

app.use(require('body-parser').json());

const publicVapidKey = '...'; // These keys should be generated
const privateVapidKey = '...'; // You can use the web-push library to generate them

webpush.setVapidDetails('mailto:', publicVapidKey, privateVapidKey);

let subscriptions = [];

app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({});
});

app.post('/sendNotification', (req, res) => {
  const { title, body, icon, password } = req.body;

  // Check password
  if (password !== 'GoogleChrome1') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const notificationPayload = {
    notification: {
      title,
      body,
      icon,
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
