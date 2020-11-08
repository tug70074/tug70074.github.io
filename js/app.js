
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then((reg) => console.log('SW registered',reg))
    .catch((err) => console.log('service worker not registered',err));
}