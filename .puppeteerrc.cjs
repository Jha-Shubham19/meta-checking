import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { Configuration } from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * @type {Configuration}
 */
const configuration = {
  // Changes the cache location for Puppeteer.
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};

export default configuration;
