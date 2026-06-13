import { createShortLink, getStats, globalStats } from './sdk.js';

// Example: Get site stats
globalStats().then((stats) => {
  console.log('Sayt statistikasi:', stats);
});
