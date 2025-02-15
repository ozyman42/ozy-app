const express = require('express');
const fetch = require('node-fetch').default;

const app = express();
const port = 5000;

// Simple in-memory cache
const cache = {};

async function processResponse(res, responsePromise) {
  const response = await responsePromise;
  if (response.success) {
    res.send(response.text);
  } else {
    res.status(response.status).send(`Failed to fetch data from the target URL ${targetUrl}`);
  }
}

app.get('*', async (req, res) => {
    // Extract the target URL from a custom header
    const targetUrl = req.headers['x-target-url'];

    if (!targetUrl) {
        return res.status(400).send('No target URL specified in the X-Target-URL header');
    }

    try {
        // Check cache first
        if (cache[targetUrl]) {
            console.log('cache hit');
            await processResponse(res, cache[targetUrl]);
            return;
        }

        console.log(`cache miss for url ${targetUrl}`);

        // Forward the request to the target URL
        cache[targetUrl] = (async () => {
          const response = await fetch(targetUrl, {
            method: 'GET',
            headers: {
              'Authorization': req.headers['authorization']
            }
          });
          if (response.ok) {
            return {success: true, text: await response.text()};
          } else {
            return {success: false, status: response.status};
          }
        })();

        await processResponse(res, cache[targetUrl]);
        return;
    } catch (error) {
        console.error('Error fetching the target URL:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
