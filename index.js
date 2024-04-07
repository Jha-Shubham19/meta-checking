import express from 'express';
import { URL } from 'url';
import { handleRandom, handleDefineQueryWord } from './request_handlers.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  handleRandom(res, fullUrl);
});

app.get('/random', (req, res) => {
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  handleRandom(res, fullUrl);
});

app.get('/define', (req, res) => {
  const queryWord = req.query.q;
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

  if (queryWord) {
    handleDefineQueryWord(res, fullUrl, queryWord);
  } else {
    res.status(400).send('Query word is missing');
  }
});

app.use((req, res) => {
  res.status(404).send('Nothing there');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
