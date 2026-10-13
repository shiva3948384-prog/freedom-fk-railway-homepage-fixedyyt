import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = '0.0.0.0';

const ROOT_DIR = __dirname;
const FREEDOM_DIR = path.join(ROOT_DIR, 'freedom-fk');
const PRODUCTS_DIR = path.join(FREEDOM_DIR, 'products');

// Map of product IDs to static product file names
const PRODUCT_MAP: Record<string, string> = {
  'b360f7bd633df': 'index.html',
  'd3ae32bfa5521': 'index-1.html',
  'a7ebec5ac987b': 'index-2.html',
  'a77f4d8cdcc21': 'index-3.html',
  '3c7095e46b323': 'index-4.html',
  '57de2486b28f2': 'index-5.html',
  '051622ce4fc31': 'index-6.html',
  'cc814d239bcae': 'index-7.html',
  'ea0583c5b9ae3': 'index-8.html',
  'iphone17': 'index-9.html',
  'iphone16': 'index-10.html',
  '48dc90ee60e84': 'index-11.html',
  '25d20c2b1dc5c': 'index-12.html',
  '3d56e5edf6f38': 'index-13.html',
  '0616698f3836c': 'index-14.html',
  'fe98d1b39b938': 'index-15.html',
  '1b127c7e3ff53': 'index-16.html',
  '2bc6ece01411b': 'index-17.html',
  'f0c4f2268d872': 'index-18.html',
  '2ce01e777f0ff': 'index-19.html',
  '03bec70674cef': 'index-20.html',
  '92787842293f6': 'index-21.html',
  '49a62e6801665': 'index-22.html',
  '3d137704666aa': 'index-23.html',
  '17437576b5e8f': 'index-24.html',
  '0467e5a892406': 'index-25.html',
  'dac72273679cb': 'index-26.html',
  'b2f01fa8aaf09': 'index-27.html',
  '4ab42480d26ab': 'index-28.html',
  'ed572399d7ed0': 'index-29.html',
  '373f04b573c81': 'index-30.html',
  '156b72f954ad8': 'index-31.html',
  '571dd48a19540': 'index-32.html',
  '923d3541c3f98': 'index-33.html',
  'b327846273eae': 'index-34.html',
  '000f3dabc1f59': 'index-35.html',
  '6771088295a8e': 'index-36.html',
  'a69a084d6f401': 'index-37.html',
};

const PRODUCT_HEAD_SNIPPET = `
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Freedom Sale - Product Details</title>
  <meta name="description" content="Freedom sale special offer product deals, discounts, and verified specifications.">
  <meta property="og:title" content="Freedom Sale - Product Details">
  <meta property="og:description" content="Freedom sale special offer product deals, discounts, and verified specifications.">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #f1f2f4;
      color: #212121;
      padding-bottom: 70px;
    }
    ._1fhgRH {
      max-width: 600px;
      margin: 0 auto;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
    }
    .menu-icon {
      cursor: pointer;
      display: flex;
      align-items: center;
    }
    .product-slider {
      position: relative;
      background: #fff;
    }
    .love-icon, .share-icon {
      position: absolute;
      top: 12px;
      z-index: 10;
      width: 36px;
      height: 36px;
      background: rgba(255,255,255,0.95);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 1px 4px rgba(0,0,0,0.15);
    }
    .love-icon { right: 12px; }
    .share-icon { right: 54px; }
    .carousel-item img {
      width: 100%;
      height: 330px;
      object-fit: contain;
      background: #fff;
    }
    .floating-btns {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 52px;
      display: flex;
      z-index: 1000;
      box-shadow: 0 -2px 10px rgba(0,0,0,0.12);
      max-width: 600px;
      margin: 0 auto;
    }
    .floating-btns button {
      flex: 1;
      border: none;
      font-weight: 700;
      font-size: 15px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    .btn-cart {
      background: #ff9f00;
      color: #fff;
    }
    .btn-buy {
      background: #fb641b;
      color: #fff;
    }
    .similar-scroll {
      display: flex;
      overflow-x: auto;
      gap: 12px;
      padding: 12px;
      -webkit-overflow-scrolling: touch;
    }
    .similar-card {
      min-width: 150px;
      max-width: 150px;
      border: 1px solid #f0f0f0;
      border-radius: 6px;
      background: #fff;
      flex-shrink: 0;
    }
    .sim-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .detail-heading {
      font-size: 15px;
      font-weight: 700;
      padding: 12px 16px;
      margin: 0;
      border-bottom: 1px solid #f0f0f0;
    }
    .seofooter {
      background: #fff;
      margin-top: 16px;
      border-top: 1px solid #eee;
    }
    .footer-container {
      padding: 20px 14px;
      text-align: center;
    }
    .footer-links a {
      color: #878787;
      font-size: 12px;
      margin: 0 8px;
      text-decoration: none;
    }
    .footer-copy {
      font-size: 11px;
      color: #878787;
      margin: 10px 0;
    }
    .toast-notice {
      position: fixed;
      top: 60px;
      left: 50%;
      transform: translateX(-50%);
      background: #212121;
      color: #fff;
      padding: 10px 18px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 600;
      z-index: 2000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
      animation: fadeInOut 2.8s forwards;
    }
    @keyframes fadeInOut {
      0% { opacity: 0; transform: translate(-50%, -10px); }
      15% { opacity: 1; transform: translate(-50%, 0); }
      85% { opacity: 1; transform: translate(-50%, 0); }
      100% { opacity: 0; transform: translate(-50%, -10px); }
    }
  </style>
</head>
`;

const PRODUCT_FOOTER_SNIPPET = `
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script>
  (function() {
    // Back navigation
    const backBtn = document.getElementById('back_btn');
    if (backBtn) {
      backBtn.addEventListener('click', function() {
        if (window.history.length > 1) {
          window.history.back();
        } else {
          window.location.href = '/';
        }
      });
    }

    // Toast utility
    function showToast(msg) {
      const existing = document.querySelector('.toast-notice');
      if (existing) existing.remove();
      const t = document.createElement('div');
      t.className = 'toast-notice';
      t.textContent = msg;
      document.body.appendChild(t);
      setTimeout(() => t.remove(), 2800);
    }

    document.querySelectorAll('.btn-cart').forEach(btn => {
      btn.addEventListener('click', () => showToast('Item added to cart!'));
    });
    document.querySelectorAll('.btn-buy').forEach(btn => {
      btn.addEventListener('click', () => showToast('Proceeding to order placement...'));
    });
    document.querySelectorAll('.love-icon').forEach(btn => {
      btn.addEventListener('click', () => showToast('Added to wishlist!'));
    });
    document.querySelectorAll('.share-icon').forEach(btn => {
      btn.addEventListener('click', () => {
        if (navigator.share) {
          navigator.share({ title: document.title, url: window.location.href }).catch(() => {});
        } else {
          navigator.clipboard?.writeText(window.location.href);
          showToast('Product link copied to clipboard!');
        }
      });
    });

    // Offer timer countdown
    const timerEl = document.getElementById('timer');
    if (timerEl) {
      let durationSeconds = 910;
      setInterval(() => {
        if (durationSeconds > 0) durationSeconds--;
        const m = Math.floor(durationSeconds / 60);
        const s = durationSeconds % 60;
        timerEl.textContent = m + 'm ' + (s < 10 ? '0' + s : s) + 's';
      }, 1000);
    }
  })();
</script>
`;

// Helper to serve product page HTML with injected head & interactive scripts
function serveProductHtml(filePath: string, res: Response) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');

    // If head tag is missing, prepend it
    if (!content.includes('<head>') && !content.includes('<head ')) {
      content = content.replace('<html lang="en-IN" class="">', '<html lang="en-IN" class="">' + PRODUCT_HEAD_SNIPPET);
      if (!content.includes(PRODUCT_HEAD_SNIPPET)) {
        content = content.replace('<!DOCTYPE html>', '<!DOCTYPE html>' + PRODUCT_HEAD_SNIPPET);
      }
    }

    // Inject footer scripts before </body>
    if (!content.includes('bootstrap.bundle.min.js')) {
      content = content.replace('</body>', PRODUCT_FOOTER_SNIPPET + '</body>');
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(content);
  } catch (err) {
    console.error('Error serving product file:', err);
    res.status(500).send('Internal Server Error');
  }
}

// Serve homepage
function serveHomepage(res: Response) {
  const homepagePath = path.join(FREEDOM_DIR, 'index.html');
  if (fs.existsSync(homepagePath)) {
    res.sendFile(homepagePath);
  } else {
    res.sendFile(path.join(ROOT_DIR, 'index.html'));
  }
}

// Routes
app.get(['/', '/index.php', '/index.html'], (_req: Request, res: Response) => {
  serveHomepage(res);
});

app.get(['/freedom-fk', '/freedom-fk/', '/freedom-fk/index.html', '/freedom-fk/index.php'], (_req: Request, res: Response) => {
  serveHomepage(res);
});

// Product page router
app.get(['/freedom-fk/products/index.php', '/freedom-fk/products/index.html', '/freedom-fk/products'], (req: Request, res: Response) => {
  const id = typeof req.query.id === 'string' ? req.query.id.trim() : '';

  if (id && PRODUCT_MAP[id]) {
    const targetFile = PRODUCT_MAP[id];
    const fullPath = path.join(PRODUCTS_DIR, targetFile);
    if (fs.existsSync(fullPath)) {
      return serveProductHtml(fullPath, res);
    }
  }

  // If no ID or ID not found, default to first product snapshot if available
  const defaultPath = path.join(PRODUCTS_DIR, 'index.html');
  if (fs.existsSync(defaultPath)) {
    return serveProductHtml(defaultPath, res);
  }

  res.status(404).send('Product not found');
});

// Serve direct product files if requested by filename
app.get('/freedom-fk/products/:fileName', (req: Request, res: Response) => {
  const rawName = Array.isArray(req.params.fileName) ? req.params.fileName[0] : req.params.fileName;
  const safeName = path.basename(rawName || '');
  const targetHtml = safeName.replace(/\.php$/, '.html');
  const fullPath = path.join(PRODUCTS_DIR, targetHtml);

  if (fs.existsSync(fullPath)) {
    return serveProductHtml(fullPath, res);
  }

  res.status(404).send('Product file not found');
});

// Static assets from freedom-fk directory and root
app.use('/freedom-fk', express.static(FREEDOM_DIR));
app.use(express.static(ROOT_DIR));

// Catch-all fallback to homepage
app.get('*', (_req: Request, res: Response) => {
  serveHomepage(res);
});

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
