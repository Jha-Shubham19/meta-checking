import http from 'node:http';
import {URL} from 'node:url';
import {handleRandom, handleDefineQueryWord} from './request_handlers.js';


const host = 'localhost';
const port = process.env.PORT || 8000;

const requestListener = async function (req, res) {
    const parsedUrl = new URL(req.url, 'http://localhost');
    const queryWord = parsedUrl.searchParams.get('q');
    const fullUrl = parsedUrl.href;

    console.log(req.url.substring(1), parsedUrl, queryWord, parsedUrl.href);

    if(parsedUrl.pathname === '/random' || parsedUrl.pathname === '/') {
        handleRandom(res,fullUrl);
    }
    else if (parsedUrl.pathname === '/define' && queryWord) {
        handleDefineQueryWord(res, fullUrl, queryWord);
    }
    else {
        res.writeHead(404);
        res.end("Nothing there");
    }

    
};

const server = http.createServer(requestListener);
server.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}`);
});