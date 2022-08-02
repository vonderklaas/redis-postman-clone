const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { createClient } = require('redis');

const app = express();
app.use(cors());

// Init Redis
const EXPIRATION = 3600;

const redisClient = createClient({
  legacyMode: true,
});
(async () => {
  await redisClient.connect();
})();

app.get('/photos', async (req, res) => {
  const albumId = req.query.albumId;
  const photos = await getOrSetCache(`photos?albumId=${albumId}`, async () => {
    const { data } = await axios.get(
      'https://jsonplaceholder.typicode.com/photos',
      {
        params: { albumId },
      }
    );
    return data;
  });
  res.json(photos);
});

app.get('/photos/:id', async (req, res) => {
  const photo = await getOrSetCache(`photos:${req.params.id}`, async () => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/photos/${req.params.id}`
    );
    return data;
  });
  res.json(photo);
});

function getOrSetCache(key, cb) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, async (error, data) => {
      // If we have Cache
      if (error) {
        return reject(error);
      }
      if (data != null) {
        return resolve(JSON.parse(data));
      }
      // If we don't have Cache
      const freshData = await cb();
      redisClient.setex(key, EXPIRATION, JSON.stringify(freshData));
      resolve(freshData);
    });
  });
}

app.listen(3000, () => {
  console.log('Server is running on :3000');
});
