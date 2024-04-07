import { providePhoto } from './making_photo.js';
import fetch from 'node-fetch';

async function handleDefineQueryWord(res, fullUrl, queryWord) {
  const photo = await providePhoto(queryWord);

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
    <html>
      <head>
        <meta property="og:description" content="Meaning of ${queryWord}" />
        <meta property="og:site_name" content="_site_name" />
        <meta property="og:title" content="${queryWord}" />
        <meta property="og:url" content="${fullUrl}" />
        <meta property="og:image" content="${photo}" />
        <meta property="og:type" content="website" />
      </head>
      <body>
        <h1>This is ${queryWord}</h1>
        <img src="${photo}" alt="not_found" />
      </body>
    </html>
  `);
}

async function handleRandom(res, fullUrl) {
  let randomWord = await fetch('https://random-word-api.herokuapp.com/word');
  randomWord = await randomWord.json();

  const queryWord = randomWord[0];
  handleDefineQueryWord(res, fullUrl, queryWord);
}

export { handleRandom, handleDefineQueryWord };