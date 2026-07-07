/* ============================================================
   بهینه‌ساز تصویر (Image Optimizer) — Single-file bundle
   No ES modules, works with file:// too.
   ============================================================ */
(function () {
  'use strict';

  /* ========== i18n dictionary ========== */
  const dictionaries = {
    fa: {
      'opt.title': 'بهینه‌ساز تصویر',
      'opt.name': 'بهینه‌ساز تصویر',
      'opt.tagline': 'بهینه‌سازی و تبدیل فرمت تصاویر در مرورگر',
      'nav.placement': 'جایگذاری قالب',
      'nav.optimizer': 'بهینه‌ساز تصویر',
      'opt.hero.title': 'بهینه‌سازی هوشمند تصاویر، با حفظ کیفیت',
      'opt.hero.subtitle': 'تبدیل فرمت، فشرده‌سازی و تغییر ابعاد تصاویر JPEG، PNG، WebP و AVIF در یک ابزار سریع و امن — تمام پردازش در مرورگر شما انجام می‌شود و فایل‌ها هرگز به سرور ارسال نمی‌شوند.',
      'opt.drop.cta': 'یک تصویر رو اینجا بنداز یا کلیک کن',
      'opt.drop.hint': 'JPEG, PNG, WebP, AVIF — حداکثر ۲۰ مگابایت',
      'opt.mode.single.title': 'یک تصویر',
      'opt.mode.single.hint': 'مقایسه قبل/بعد با zoom و دانلود تکی',
      'opt.mode.batch.title': 'دسته‌ای',
      'opt.mode.batch.hint': 'چندتا با هم — خروجی ZIP (تا ۵۰ تصویر)',
      'opt.batch.step.images': 'تصاویر',
      'opt.batch.step.process': 'پردازش و دانلود',
      'opt.batch.added': 'افزوده شد:',
      'opt.batch.addMore': 'افزودن بیشتر',
      'opt.batch.clearAll': 'پاک کردن همه',
      'opt.batch.process': 'پردازش و دانلود ZIP',
      'opt.batch.processing': 'در حال پردازش…',
      'opt.batch.removeOne': 'حذف',
      'opt.batch.progressLabel': 'پردازش {i} از {n}',
      'opt.batch.encoding': 'پردازش {i}/{n} — {name}',
      'opt.batch.zipping': 'ساخت فایل ZIP…',
      'opt.batch.done': 'انجام شد — ZIP در حال دانلود',
      'opt.batch.tooMany': 'حداکثر ۵۰ تصویر مجاز است',
      'opt.batch.totals.original': 'حجم اصلی کل',
      'opt.batch.totals.compressed': 'حجم فشرده‌شده',
      'opt.batch.totals.saved': 'صرفه‌جویی',
      'opt.batch.compressed.title': 'تصاویر فشرده‌شده',
      'opt.batch.compressed.hint': 'برای دانلود تک‌تک، روی هر تصویر کلیک کن',
      'opt.batch.downloadOne': 'دانلود این تصویر',
      'opt.batch.noFiles': 'هیچ تصویری اضافه نشده',
      'opt.batch.stats.title': 'خلاصه فشرده‌سازی',
      'opt.batch.stats.totalOriginal': 'حجم اصلی کل',
      'opt.batch.stats.totalCompressed': 'حجم فشرده‌شده',
      'opt.batch.stats.totalSaved': 'صرفه‌جویی',
      'opt.batch.stats.processed': '{n} فایل پردازش شد',
      'opt.batch.stats.processedFailed': '{n} فایل موفق، {f} ناموفق',
      'opt.batch.compress': 'فشرده‌سازی و پیش‌نمایش',
      'opt.batch.recompress': 'فشرده‌سازی مجدد',
      'opt.batch.downloadZip': 'دانلود ZIP',
      'opt.batch.zipping2': 'در حال ساخت ZIP…',
      'opt.batch.filesDetails': 'جزئیات هر فایل ({n})',
      'opt.batch.staleNotice': 'تنظیمات تغییر کرد — برای دیدن نتیجه‌ی جدید دوباره «فشرده‌سازی» رو بزن',
      'opt.step.settings': 'تنظیمات خروجی',
      'opt.step.compare': 'مقایسه',
      'opt.step.download': 'دانلود',
      'opt.settings.reset': 'انتخاب تصویر دیگر',
      'opt.codec.label': 'فرمت خروجی',
      'opt.codec.webp': 'WebP — فشرده‌سازی هوشمند (پیشنهادی)',
      'opt.codec.jpeg': 'JPEG — مرورگر',
      'opt.codec.png': 'PNG — مرورگر (lossless)',
      'opt.codec.avif': 'AVIF — بهترین فشرده‌سازی',
      'opt.quality.label': 'کیفیت',
      'opt.resize.label': 'تغییر ابعاد (اختیاری)',
      'opt.resize.lock': 'حفظ نسبت',
      'opt.edit.label': 'ویرایش تصویر',
      'opt.edit.crop': 'برش',
      'opt.edit.removeBg': 'حذف پس‌زمینه',
      'opt.edit.reset': 'بازگردانی',
      'opt.edit.bgProcessing': 'در حال حذف پس‌زمینه…',
      'opt.edit.bgLoading': 'بارگذاری مدل هوش مصنوعی…',
      'opt.edit.bgProgress': 'پردازش… {p}٪',
      'opt.edit.bgDone': 'پس‌زمینه حذف شد ✓',
      'opt.edit.bgFailed': 'حذف پس‌زمینه ناموفق بود — اتصال اینترنت رو چک کن',
      'opt.crop.title': 'برش تصویر',
      'opt.crop.free': 'آزاد',
      'opt.crop.orig': 'نسبت تصویر',
      'opt.crop.cancel': 'لغو',
      'opt.crop.apply': 'اعمال برش',
      'opt.pane.original': 'اصل',
      'opt.pane.compressed': 'فشرده‌شده',
      'opt.pane.compressing': 'در حال پردازش…',
      'opt.zoom.fit': 'جا کن',
      'opt.zoom.actual': '۱:۱',
      'opt.zoom.hint': 'با اسکرول zoom، با درگ pan',
      'opt.stats.savings': 'کاهش حجم:',
      'opt.stats.ratio': 'نسبت:',
      'opt.download': 'دانلود',
      'opt.savingsPill': 'کاهش {n}%',
      'footer.credit': 'ساخته شده به وسیله',
      'toast.invalidFile': 'فایل پشتیبانی نمی‌شه',
      'toast.fileTooLarge': 'فایل از ۲۰ مگابایت بزرگ‌تره',
      'toast.decodeFailed': 'باز کردن این تصویر ممکن نشد',
      'toast.encodeFailed': 'فشرده‌سازی ناموفق بود — یه فرمت دیگه رو امتحان کن',
    },
    en: {
      'opt.title': 'Image Optimizer',
      'opt.name': 'Image Optimizer',
      'opt.tagline': 'Image optimization & format conversion in your browser',
      'nav.placement': 'Frame Tool',
      'nav.optimizer': 'Image Optimizer',
      'opt.hero.title': 'Smart image optimization, quality preserved',
      'opt.hero.subtitle': 'Compress, convert and resize JPEG, PNG, WebP and AVIF in one fast, privacy-first tool — every step runs in your browser and your files never leave your device.',
      'opt.drop.cta': 'Drop an image here or click to browse',
      'opt.drop.hint': 'JPEG, PNG, WebP, AVIF — up to 20 MB',
      'opt.mode.single.title': 'Single image',
      'opt.mode.single.hint': 'Before/after compare with zoom and single download',
      'opt.mode.batch.title': 'Batch',
      'opt.mode.batch.hint': 'Many at once — ZIP output (up to 50 images)',
      'opt.batch.step.images': 'Images',
      'opt.batch.step.process': 'Process & download',
      'opt.batch.added': 'Added:',
      'opt.batch.addMore': 'Add more',
      'opt.batch.clearAll': 'Clear all',
      'opt.batch.process': 'Process & Download ZIP',
      'opt.batch.processing': 'Processing…',
      'opt.batch.removeOne': 'Remove',
      'opt.batch.progressLabel': 'Processing {i} of {n}',
      'opt.batch.encoding': 'Processing {i}/{n} — {name}',
      'opt.batch.zipping': 'Building ZIP…',
      'opt.batch.done': 'Done — ZIP is downloading',
      'opt.batch.tooMany': 'Maximum 50 images allowed',
      'opt.batch.totals.original': 'Total original',
      'opt.batch.totals.compressed': 'Total compressed',
      'opt.batch.totals.saved': 'Saved',
      'opt.batch.compressed.title': 'Compressed images',
      'opt.batch.compressed.hint': 'Click any image to download it individually',
      'opt.batch.downloadOne': 'Download this image',
      'opt.batch.noFiles': 'No images added',
      'opt.batch.stats.title': 'Compression summary',
      'opt.batch.stats.totalOriginal': 'Original total',
      'opt.batch.stats.totalCompressed': 'Compressed total',
      'opt.batch.stats.totalSaved': 'Saved',
      'opt.batch.stats.processed': '{n} files processed',
      'opt.batch.stats.processedFailed': '{n} succeeded, {f} failed',
      'opt.batch.compress': 'Compress & preview',
      'opt.batch.recompress': 'Recompress',
      'opt.batch.downloadZip': 'Download ZIP',
      'opt.batch.zipping2': 'Building ZIP…',
      'opt.batch.filesDetails': 'Per-file breakdown ({n})',
      'opt.batch.staleNotice': 'Settings changed — click "Compress" again to see updated results',
      'opt.step.settings': 'Output settings',
      'opt.step.compare': 'Compare',
      'opt.step.download': 'Download',
      'opt.settings.reset': 'Pick another image',
      'opt.codec.label': 'Output format',
      'opt.codec.webp': 'WebP — smart compression (recommended)',
      'opt.codec.jpeg': 'JPEG — browser',
      'opt.codec.png': 'PNG — browser (lossless)',
      'opt.codec.avif': 'AVIF — best compression',
      'opt.quality.label': 'Quality',
      'opt.resize.label': 'Resize (optional)',
      'opt.resize.lock': 'Lock ratio',
      'opt.edit.label': 'Edit image',
      'opt.edit.crop': 'Crop',
      'opt.edit.removeBg': 'Remove background',
      'opt.edit.reset': 'Undo edits',
      'opt.edit.bgProcessing': 'Removing background…',
      'opt.edit.bgLoading': 'Loading AI model…',
      'opt.edit.bgProgress': 'Processing… {p}%',
      'opt.edit.bgDone': 'Background removed ✓',
      'opt.edit.bgFailed': 'Background removal failed — check your connection',
      'opt.crop.title': 'Crop image',
      'opt.crop.free': 'Free',
      'opt.crop.orig': 'Original ratio',
      'opt.crop.cancel': 'Cancel',
      'opt.crop.apply': 'Apply crop',
      'opt.pane.original': 'Original',
      'opt.pane.compressed': 'Compressed',
      'opt.pane.compressing': 'Processing…',
      'opt.zoom.fit': 'Fit',
      'opt.zoom.actual': '1:1',
      'opt.zoom.hint': 'Wheel to zoom, drag to pan',
      'opt.stats.savings': 'Savings:',
      'opt.stats.ratio': 'Ratio:',
      'opt.download': 'Download',
      'opt.savingsPill': 'Saved {n}%',
      'footer.credit': 'Made by',
      'toast.invalidFile': 'Unsupported file',
      'toast.fileTooLarge': 'File exceeds 20 MB',
      'toast.decodeFailed': 'Could not open this image',
      'toast.encodeFailed': 'Compression failed — try a different format',
    }
  };

  const LS_LANG = 'frame-studio.lang';
  const LS_THEME = 'frame-studio.theme';
  let currentLang = 'fa';

  function t(key, params) {
    const dict = dictionaries[currentLang] || dictionaries.fa;
    let str = dict[key] ?? key;
    if (params) {
      for (const k in params) str = str.replace('{' + k + '}', String(params[k]));
    }
    return str;
  }

  function detectInitialLang() {
    const saved = localStorage.getItem(LS_LANG);
    if (saved && dictionaries[saved]) return saved;
    // Walk through browser's preferred language list and match the first supported one.
    const supported = Object.keys(dictionaries);
    const list = (navigator.languages && navigator.languages.length)
      ? navigator.languages
      : [navigator.language || ''];
    for (const item of list) {
      const code = String(item).toLowerCase().split(/[-_]/)[0];
      if (supported.includes(code)) return code;
    }
    return 'fa';
  }

  function applyI18nDom() {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'fa' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-option]').forEach((el) => {
      el.textContent = t(el.getAttribute('data-i18n-option'));
    });
    document.title = t('opt.title');
    document.querySelectorAll('[data-lang-btn]').forEach((b) => {
      b.classList.toggle('active', b.getAttribute('data-lang-btn') === currentLang);
    });
  }

  function setLang(lang) {
    if (!dictionaries[lang]) return;
    currentLang = lang;
    localStorage.setItem(LS_LANG, lang);
    applyI18nDom();
  }

  /* ========== Theme ========== */
  function detectInitialTheme() {
    const saved = localStorage.getItem(LS_THEME);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(LS_THEME, theme);
  }

  function toggleTheme() {
    const cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    applyTheme(cur === 'dark' ? 'light' : 'dark');
  }

  /* ========== Toast ========== */
  function toast(msg, type, ttl) {
    type = type || 'info';
    ttl = ttl || 3000;
    const root = document.getElementById('toast-container');
    if (!root) return;
    const el = document.createElement('div');
    el.className = 'toast-item glass-card pointer-events-auto px-4 py-2.5 text-sm font-semibold';
    if (type === 'error') el.style.borderColor = 'rgba(244, 63, 94, 0.5)';
    el.textContent = msg;
    root.appendChild(el);
    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transition = 'opacity .3s ease';
      setTimeout(() => el.remove(), 300);
    }, ttl);
  }

  /* ========== State ========== */
  const MAX_FILE_BYTES = 20 * 1024 * 1024;

  const els = {};
  let originalFile = null;
  let originalBitmap = null;      // pristine decoded source (never mutated)
  let originalNaturalSize = { w: 0, h: 0 };
  let originalUrl = null;
  // "Working" image = the current source fed into compression. Starts equal to the
  // original, then diverges when the user crops or removes the background.
  let workingBitmap = null;
  let workingBlob = null;         // blob of the working image (bg-removal input + size)
  let workingUrl = null;          // object URL for the original-pane preview after an edit
  let lastCompressedBlob = null;
  let lastCompressedUrl = null;
  let compressGen = 0;
  let compressDebounceTimer = null;
  let avifWasmModule = null;
  let bgModule = null;            // cached @imgly/background-removal module
  let bgProcessing = false;

  const EXT_BY_CODEC = { webp: 'webp', jpeg: 'jpg', png: 'png', avif: 'avif' };
  const MAX_BATCH = 50;

  /* ========== Batch state ========== */
  let batchItems = []; // { id, file, thumbUrl }
  let batchIdCounter = 1;
  let batchProcessing = false;
  let encodedBatch = []; // { name, blob, origSize, origName }

  /* ========== Zoom/Pan view state (synced between both panes) ========== */
  const view = { scale: 1, x: 0, y: 0 };
  const MIN_SCALE = 0.5;
  const MAX_SCALE = 12;

  function applyTransform() {
    const tr = `translate(${view.x}px, ${view.y}px) scale(${view.scale})`;
    if (els.originalImg) els.originalImg.style.transform = tr;
    if (els.compressedImg) els.compressedImg.style.transform = tr;
    if (els.zoomVal) {
      els.zoomVal.textContent = Math.round(view.scale * 100) + '%';
    }
    const zoomed = view.scale !== 1 || view.x !== 0 || view.y !== 0;
    if (els.originalCanvas) els.originalCanvas.classList.toggle('zoomed', zoomed);
    if (els.compressedCanvas) els.compressedCanvas.classList.toggle('zoomed', zoomed);
  }

  function resetView() {
    view.scale = 1;
    view.x = 0;
    view.y = 0;
    applyTransform();
  }

  function setScale(newScale, anchorX, anchorY) {
    newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale));
    if (anchorX != null && anchorY != null) {
      // Adjust pan so the point under the cursor stays fixed
      const ratio = newScale / view.scale;
      view.x = anchorX - (anchorX - view.x) * ratio;
      view.y = anchorY - (anchorY - view.y) * ratio;
    }
    view.scale = newScale;
    applyTransform();
  }

  function setActualPixels() {
    // 1:1 = each natural pixel = 1 CSS pixel
    if (!els.originalImg || !els.originalImg.naturalWidth) return;
    const rect = els.originalImg.getBoundingClientRect();
    if (rect.width <= 0) return;
    const targetScale = els.originalImg.naturalWidth / rect.width;
    setScale(targetScale);
  }

  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  }

  /* ========== Workspace show/hide + file load ========== */
  function showWorkspace() {
    els.emptyState.classList.add('hidden');
    if (els.hero) els.hero.classList.add('hidden');
    if (els.batchWorkspace) els.batchWorkspace.classList.add('hidden');
    els.workspace.classList.remove('hidden');
  }

  function hideWorkspace() {
    els.emptyState.classList.remove('hidden');
    if (els.hero) els.hero.classList.remove('hidden');
    els.workspace.classList.add('hidden');
    resetView();
    originalFile = null;
    if (workingBitmap && workingBitmap !== originalBitmap && workingBitmap.close) workingBitmap.close();
    if (originalBitmap && originalBitmap.close) originalBitmap.close();
    originalBitmap = null;
    workingBitmap = null;
    workingBlob = null;
    originalNaturalSize = { w: 0, h: 0 };
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (workingUrl) URL.revokeObjectURL(workingUrl);
    if (lastCompressedUrl) URL.revokeObjectURL(lastCompressedUrl);
    originalUrl = null;
    workingUrl = null;
    lastCompressedBlob = null;
    lastCompressedUrl = null;
    if (els.editReset) els.editReset.classList.add('hidden');
    els.originalImg.removeAttribute('src');
    els.compressedImg.removeAttribute('src');
    els.originalInfo.textContent = '—';
    els.compressedInfo.textContent = '—';
    if (els.savingsPill) {
      els.savingsPill.classList.add('hidden');
      els.savingsPill.textContent = '—';
    }
    els.download.disabled = true;
    els.input.value = '';
  }

  async function loadFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      toast(t('toast.invalidFile'), 'error');
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      toast(t('toast.fileTooLarge'), 'error');
      return;
    }
    try {
      originalFile = file;
      if (workingBitmap && workingBitmap !== originalBitmap && workingBitmap.close) workingBitmap.close();
      if (originalBitmap && originalBitmap.close) originalBitmap.close();
      originalBitmap = await createImageBitmap(file);
      // Fresh load → working image starts as the pristine original
      workingBitmap = originalBitmap;
      workingBlob = file;
      if (workingUrl) { URL.revokeObjectURL(workingUrl); workingUrl = null; }
      if (els.editReset) els.editReset.classList.add('hidden');
      originalNaturalSize = { w: originalBitmap.width, h: originalBitmap.height };

      if (originalUrl) URL.revokeObjectURL(originalUrl);
      originalUrl = URL.createObjectURL(file);
      els.originalImg.src = originalUrl;
      els.originalInfo.textContent =
        `${originalNaturalSize.w}×${originalNaturalSize.h} · ${formatBytes(file.size)}`;
      els.resizeW.value = originalNaturalSize.w;
      els.resizeH.value = originalNaturalSize.h;
      els.compressedImg.removeAttribute('src');
      els.compressedInfo.textContent = '—';
      els.download.disabled = true;
      if (els.savingsPill) els.savingsPill.classList.add('hidden');

      showWorkspace();
      resetView();
      runCompression();
    } catch (err) {
      console.error(err);
      toast(t('toast.decodeFailed'), 'error');
    }
  }

  /* ========== Encoder pipeline ========== */
  function canvasToBlob(canvas, mime, quality) {
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error('toBlob returned null'))),
        mime,
        quality
      );
    });
  }

  async function encodeAvifNativeOrWasm(canvas, quality) {
    // 1) Try browser-native AVIF
    try {
      const blob = await canvasToBlob(canvas, 'image/avif', quality / 100);
      if (blob && blob.type === 'image/avif' && blob.size > 0) return blob;
    } catch (_) {}
    // 2) Fallback to @jsquash/avif from CDN
    if (!avifWasmModule) {
      avifWasmModule = await import(
        /* @vite-ignore */ 'https://cdn.jsdelivr.net/npm/@jsquash/avif@1.4.0/+esm'
      );
    }
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const buffer = await avifWasmModule.encode(imageData, { quality });
    return new Blob([buffer], { type: 'image/avif' });
  }

  async function compressBitmap(bitmap, options) {
    const { codec, quality, width, height } = options;
    const outW = Math.max(1, Math.floor(width || bitmap.width));
    const outH = Math.max(1, Math.floor(height || bitmap.height));

    const canvas = document.createElement('canvas');
    canvas.width = outW;
    canvas.height = outH;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(bitmap, 0, 0, outW, outH);

    if (codec === 'png') return await canvasToBlob(canvas, 'image/png');
    if (codec === 'webp') return await canvasToBlob(canvas, 'image/webp', quality / 100);
    if (codec === 'jpeg') return await canvasToBlob(canvas, 'image/jpeg', quality / 100);
    if (codec === 'avif') return await encodeAvifNativeOrWasm(canvas, quality);
    throw new Error('Unknown codec: ' + codec);
  }

  function currentOptions() {
    return {
      codec: els.codec.value,
      quality: parseInt(els.quality.value, 10) || 75,
      width: parseInt(els.resizeW.value, 10) || originalNaturalSize.w,
      height: parseInt(els.resizeH.value, 10) || originalNaturalSize.h,
    };
  }

  async function runCompression() {
    if (!workingBitmap || !originalFile) return;
    const myGen = ++compressGen;

    els.compressedPlaceholder.classList.remove('hidden');
    els.compressedPlaceholder.textContent = t('opt.pane.compressing');
    els.compressedImg.style.opacity = '0.35';
    els.download.disabled = true;

    try {
      const opts = currentOptions();
      const blob = await compressBitmap(workingBitmap, opts);
      if (myGen !== compressGen) return;

      if (lastCompressedUrl) URL.revokeObjectURL(lastCompressedUrl);
      lastCompressedBlob = blob;
      lastCompressedUrl = URL.createObjectURL(blob);

      els.compressedImg.src = lastCompressedUrl;
      els.compressedImg.style.opacity = '1';
      els.compressedPlaceholder.classList.add('hidden');

      els.compressedInfo.textContent =
        `${opts.width}×${opts.height} · ${formatBytes(blob.size)}`;

      const orig = originalFile.size;
      const ratio = blob.size / orig;
      const savings = Math.max(0, (1 - ratio) * 100);
      els.statSavings.textContent = savings.toFixed(1) + '%';
      els.statRatio.textContent = (ratio * 100).toFixed(0) + '%';
      if (els.savingsPill) {
        els.savingsPill.textContent = t('opt.savingsPill', { n: savings.toFixed(0) });
        els.savingsPill.classList.remove('hidden');
      }

      els.download.disabled = false;
    } catch (err) {
      if (myGen !== compressGen) return;
      console.error(err);
      els.compressedPlaceholder.classList.remove('hidden');
      els.compressedPlaceholder.textContent = t('toast.encodeFailed');
      els.compressedImg.style.opacity = '0.35';
      toast(t('toast.encodeFailed'), 'error');
    }
  }

  function debounceRecompress(delay) {
    delay = delay || 250;
    if (compressDebounceTimer) clearTimeout(compressDebounceTimer);
    compressDebounceTimer = setTimeout(() => {
      compressDebounceTimer = null;
      runCompression();
    }, delay);
  }

  /* ========== Codec/quality UI ========== */
  function updateCodecUI() {
    const codec = els.codec.value;
    // PNG is lossless — fade out the quality slider
    if (codec === 'png') {
      els.qualityRow.style.opacity = '0.4';
      els.quality.disabled = true;
    } else {
      els.qualityRow.style.opacity = '1';
      els.quality.disabled = false;
    }
  }

  function updateQualityVal() {
    els.qualityVal.textContent = els.quality.value;
  }

  /* ========== Resize ratio lock ========== */
  function bindResize() {
    let aspect = 1;
    const updateAspect = () => {
      if (originalNaturalSize.w && originalNaturalSize.h) {
        aspect = originalNaturalSize.w / originalNaturalSize.h;
      }
    };
    els.resizeW.addEventListener('input', () => {
      updateAspect();
      if (els.resizeLock.checked && aspect) {
        const w = parseInt(els.resizeW.value, 10);
        if (w > 0) els.resizeH.value = Math.round(w / aspect);
      }
    });
    els.resizeH.addEventListener('input', () => {
      updateAspect();
      if (els.resizeLock.checked && aspect) {
        const h = parseInt(els.resizeH.value, 10);
        if (h > 0) els.resizeW.value = Math.round(h * aspect);
      }
    });
  }

  /* ========== Drop zone ========== */
  function bindDropZone() {
    const dz = els.drop;
    if (!dz) return;
    dz.addEventListener('click', () => els.input.click());
    dz.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        els.input.click();
      }
    });
    ['dragenter', 'dragover'].forEach((ev) => {
      dz.addEventListener(ev, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dz.classList.add('drag-over');
      });
    });
    ['dragleave', 'drop'].forEach((ev) => {
      dz.addEventListener(ev, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dz.classList.remove('drag-over');
      });
    });
    dz.addEventListener('drop', (e) => {
      const file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
      if (file) loadFile(file);
    });
    els.input.addEventListener('change', () => {
      const file = els.input.files && els.input.files[0];
      if (file) loadFile(file);
    });
  }

  /* ========== Zoom + Pan (synced between both panes) ========== */
  function bindZoomPan() {
    const canvases = [els.originalCanvas, els.compressedCanvas].filter(Boolean);
    if (canvases.length === 0) return;

    canvases.forEach((canvas) => {
      // Mouse wheel → zoom around cursor
      canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const ax = e.clientX - rect.left - rect.width / 2;
        const ay = e.clientY - rect.top - rect.height / 2;
        const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
        setScale(view.scale * factor, ax, ay);
      }, { passive: false });

      // Pointer drag → pan
      let dragging = false;
      let startX = 0, startY = 0, startVX = 0, startVY = 0;
      canvas.addEventListener('pointerdown', (e) => {
        // Only primary button / touch
        if (e.button && e.button !== 0) return;
        dragging = true;
        canvas.setPointerCapture(e.pointerId);
        canvas.classList.add('dragging');
        startX = e.clientX;
        startY = e.clientY;
        startVX = view.x;
        startVY = view.y;
      });
      canvas.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        view.x = startVX + (e.clientX - startX);
        view.y = startVY + (e.clientY - startY);
        applyTransform();
      });
      const endDrag = () => {
        dragging = false;
        canvas.classList.remove('dragging');
      };
      canvas.addEventListener('pointerup', endDrag);
      canvas.addEventListener('pointercancel', endDrag);
      canvas.addEventListener('pointerleave', endDrag);

      // Double-click → reset
      canvas.addEventListener('dblclick', (e) => {
        e.preventDefault();
        resetView();
      });
    });

    // Toolbar buttons
    if (els.zoomIn) {
      els.zoomIn.addEventListener('click', () => setScale(view.scale * 1.25));
    }
    if (els.zoomOut) {
      els.zoomOut.addEventListener('click', () => setScale(view.scale / 1.25));
    }
    if (els.zoomFit) {
      els.zoomFit.addEventListener('click', resetView);
    }
    if (els.zoom100) {
      els.zoom100.addEventListener('click', setActualPixels);
    }
  }

  /* ========== Batch workspace + processing ========== */
  function showBatchWorkspace() {
    if (els.emptyState) els.emptyState.classList.add('hidden');
    if (els.hero) els.hero.classList.add('hidden');
    if (els.workspace) els.workspace.classList.add('hidden');
    if (els.batchWorkspace) els.batchWorkspace.classList.remove('hidden');
  }

  function hideBatchWorkspace() {
    if (els.emptyState) els.emptyState.classList.remove('hidden');
    if (els.hero) els.hero.classList.remove('hidden');
    if (els.batchWorkspace) els.batchWorkspace.classList.add('hidden');
    clearBatch(true);
  }

  function clearBatch(silent) {
    batchItems.forEach((it) => {
      if (it.thumbUrl) URL.revokeObjectURL(it.thumbUrl);
    });
    batchItems = [];
    encodedBatch = [];
    clearCompressedGrid();
    renderBatchGrid();
    if (els.batchInput) els.batchInput.value = '';
    if (els.batchProgress) els.batchProgress.classList.add('hidden');
    if (els.batchStats) els.batchStats.classList.add('hidden');
    if (els.batchStaleNotice) els.batchStaleNotice.classList.add('hidden');
    if (els.batchProcess) {
      els.batchProcess.classList.remove('is-loading');
      if (els.batchProcessLabel) els.batchProcessLabel.textContent = t('opt.batch.compress');
    }
    if (!silent) updateBatchProcessBtn();
  }

  function markBatchStale() {
    if (encodedBatch.length === 0) return;
    if (els.batchStaleNotice) els.batchStaleNotice.classList.remove('hidden');
    if (els.batchProcessLabel) els.batchProcessLabel.textContent = t('opt.batch.recompress');
  }

  function addBatchFiles(fileList) {
    if (!fileList || fileList.length === 0) return;
    const arr = Array.from(fileList);
    let added = 0;
    for (const file of arr) {
      if (batchItems.length >= MAX_BATCH) {
        toast(t('opt.batch.tooMany'), 'error');
        break;
      }
      if (!file.type.startsWith('image/')) continue;
      if (file.size > MAX_FILE_BYTES) {
        toast(t('toast.fileTooLarge') + ' (' + file.name + ')', 'error');
        continue;
      }
      const item = {
        id: batchIdCounter++,
        file,
        thumbUrl: URL.createObjectURL(file),
      };
      batchItems.push(item);
      added++;
    }
    renderBatchGrid();
    updateBatchProcessBtn();
    if (added > 0 && els.batchWorkspace.classList.contains('hidden')) {
      showBatchWorkspace();
    }
  }

  function removeBatchItem(id) {
    const idx = batchItems.findIndex((it) => it.id === id);
    if (idx < 0) return;
    const it = batchItems[idx];
    if (it.thumbUrl) URL.revokeObjectURL(it.thumbUrl);
    batchItems.splice(idx, 1);
    renderBatchGrid();
    updateBatchProcessBtn();
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function renderBatchGrid() {
    const grid = els.batchGrid;
    if (!grid) return;
    grid.innerHTML = '';
    const frag = document.createDocumentFragment();
    batchItems.forEach((it) => {
      const encoded = encodedBatch.find((e) => e.id === it.id);
      const wrap = document.createElement('div');
      wrap.className = 'thumb-item';
      const sizesInner = encoded
        ? '<span class="thumb-size-orig">' + formatBytes(it.file.size) + '</span>' +
          '<span class="thumb-size-comp">' + formatBytes(encoded.blob.size) + '</span>'
        : '<span class="thumb-size-orig">' + formatBytes(it.file.size) + '</span>';
      wrap.innerHTML =
        '<img src="' + escapeHtml(it.thumbUrl) + '" alt="" loading="lazy" />' +
        '<button class="thumb-remove" data-id="' + it.id + '" aria-label="' + escapeHtml(t('opt.batch.removeOne')) + '">' +
        '<svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>' +
        '</button>' +
        '<div class="thumb-sizes' + (encoded ? ' has-comp' : '') + '">' + sizesInner + '</div>';
      wrap.querySelector('.thumb-remove').addEventListener('click', (e) => {
        e.stopPropagation();
        removeBatchItem(Number(e.currentTarget.dataset.id));
      });
      frag.appendChild(wrap);
    });
    grid.appendChild(frag);
    if (els.batchAdded) els.batchAdded.textContent = String(batchItems.length);
    if (els.batchCount) els.batchCount.textContent = batchItems.length + ' / ' + MAX_BATCH;
    updateBatchTotals();
  }

  function updateBatchTotals() {
    if (!els.batchTotals) return;
    if (batchItems.length === 0) {
      els.batchTotals.classList.add('hidden');
      return;
    }
    const totalOrig = batchItems.reduce((s, it) => s + it.file.size, 0);
    const totalComp = encodedBatch.reduce((s, e) => s + e.blob.size, 0);
    els.batchTotals.classList.remove('hidden');
    if (els.batchTotalsOrig) els.batchTotalsOrig.textContent = formatBytes(totalOrig);
    if (encodedBatch.length > 0 && encodedBatch.length === batchItems.length) {
      const saved = totalOrig - totalComp;
      const pct = totalOrig > 0 ? (saved / totalOrig) * 100 : 0;
      if (els.batchTotalsComp) els.batchTotalsComp.textContent = formatBytes(totalComp);
      if (els.batchTotalsSaved) els.batchTotalsSaved.textContent = (saved < 0 ? '+' : '') + formatBytes(Math.abs(saved));
      if (els.batchTotalsPct) {
        els.batchTotalsPct.textContent = (pct >= 0 ? '-' : '+') + Math.abs(pct).toFixed(1) + '%';
        els.batchTotalsPct.classList.remove('hidden');
      }
    } else {
      if (els.batchTotalsComp) els.batchTotalsComp.textContent = '—';
      if (els.batchTotalsSaved) els.batchTotalsSaved.textContent = '—';
      if (els.batchTotalsPct) { els.batchTotalsPct.textContent = '—'; els.batchTotalsPct.classList.add('hidden'); }
    }
  }

  function updateBatchProcessBtn() {
    if (!els.batchProcess) return;
    els.batchProcess.disabled = batchItems.length === 0 || batchProcessing;
  }

  function batchCurrentOptions() {
    return {
      codec: els.bCodec.value,
      quality: parseInt(els.bQuality.value, 10) || 75,
      width: parseInt(els.bResizeW.value, 10) || null,
      height: parseInt(els.bResizeH.value, 10) || null,
      lockRatio: !!(els.bResizeLock && els.bResizeLock.checked),
    };
  }

  function updateBatchCodecUI() {
    const codec = els.bCodec.value;
    if (codec === 'png') {
      els.bQualityRow.style.opacity = '0.4';
      els.bQuality.disabled = true;
    } else {
      els.bQualityRow.style.opacity = '1';
      els.bQuality.disabled = false;
    }
  }

  function updateBatchQualityVal() {
    els.bQualityVal.textContent = els.bQuality.value;
  }

  function batchProgressUpdate(i, n, label) {
    if (!els.batchProgress) return;
    els.batchProgress.classList.remove('hidden');
    const pct = n > 0 ? Math.round((i / n) * 100) : 0;
    if (els.batchProgressFill) els.batchProgressFill.style.width = pct + '%';
    if (els.batchProgressPct) els.batchProgressPct.textContent = pct + '%';
    if (els.batchProgressLabel)
      els.batchProgressLabel.textContent = label || t('opt.batch.progressLabel', { i: i, n: n });
  }

  function yieldToUI() {
    return new Promise((resolve) => setTimeout(resolve, 0));
  }

  function showBatchStats(succeeded, failed, totalOrig, totalComp) {
    if (!els.batchStats) return;
    els.batchStats.classList.remove('hidden');
    if (els.batchStatOriginal) els.batchStatOriginal.textContent = formatBytes(totalOrig);
    if (els.batchStatCompressed) els.batchStatCompressed.textContent = formatBytes(totalComp);
    const saved = totalOrig - totalComp;
    const pct = totalOrig > 0 ? (saved / totalOrig) * 100 : 0;
    const sign = saved < 0 ? '+' : '';
    if (els.batchStatSaved) els.batchStatSaved.textContent = sign + formatBytes(Math.abs(saved));
    if (els.batchStatSavedPct) {
      const pctText = (pct >= 0 ? '-' : '+') + Math.abs(pct).toFixed(1) + '%';
      els.batchStatSavedPct.textContent = pctText;
    }
    if (els.batchStatProcessed) {
      els.batchStatProcessed.textContent = failed > 0
        ? t('opt.batch.stats.processedFailed', { n: succeeded, f: failed })
        : t('opt.batch.stats.processed', { n: succeeded });
    }
  }

  function downloadSingleCompressed(idx) {
    const item = encodedBatch[idx];
    if (!item) return;
    const url = URL.createObjectURL(item.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = item.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  function clearCompressedGrid() {
    if (!els.batchCompressedGrid) return;
    els.batchCompressedGrid.querySelectorAll('img[data-blob-url]').forEach((img) => {
      try { URL.revokeObjectURL(img.dataset.blobUrl); } catch (_) {}
    });
    els.batchCompressedGrid.innerHTML = '';
    if (els.batchCompressedSection) els.batchCompressedSection.classList.add('hidden');
  }

  function renderCompressedGrid() {
    if (!els.batchCompressedGrid || !els.batchCompressedSection) return;
    // Revoke old blob URLs
    els.batchCompressedGrid.querySelectorAll('img[data-blob-url]').forEach((img) => {
      try { URL.revokeObjectURL(img.dataset.blobUrl); } catch (_) {}
    });
    els.batchCompressedGrid.innerHTML = '';
    if (encodedBatch.length === 0) {
      els.batchCompressedSection.classList.add('hidden');
      return;
    }
    const frag = document.createDocumentFragment();
    encodedBatch.forEach((item, idx) => {
      const url = URL.createObjectURL(item.blob);
      const saved = item.origSize - item.blob.size;
      const pct = item.origSize > 0 ? (saved / item.origSize) * 100 : 0;
      const pctText = (pct >= 0 ? '-' : '+') + Math.abs(pct).toFixed(0) + '%';
      const wrap = document.createElement('div');
      wrap.className = 'comp-thumb-item';
      wrap.setAttribute('role', 'button');
      wrap.setAttribute('tabindex', '0');
      wrap.title = t('opt.batch.downloadOne') + ' — ' + item.name;
      wrap.innerHTML =
        '<img src="' + url + '" data-blob-url="' + url + '" alt="" loading="lazy" />' +
        '<div class="comp-thumb-overlay">' +
          '<span class="comp-thumb-name">' + escapeHtml(item.name) + '</span>' +
          '<div class="comp-thumb-meta">' +
            '<span class="comp-thumb-size">' + formatBytes(item.blob.size) + '</span>' +
            '<span class="comp-thumb-savings">' + pctText + '</span>' +
          '</div>' +
        '</div>' +
        '<button class="comp-thumb-dl" aria-label="' + escapeHtml(t('opt.batch.downloadOne')) + '">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>' +
          '</svg>' +
        '</button>';
      const trigger = () => downloadSingleCompressed(idx);
      wrap.addEventListener('click', trigger);
      wrap.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          trigger();
        }
      });
      frag.appendChild(wrap);
    });
    els.batchCompressedGrid.appendChild(frag);
    els.batchCompressedSection.classList.remove('hidden');
  }

  function renderBatchFilesList() {
    if (!els.batchFilesList) return;
    els.batchFilesList.innerHTML = '';
    const frag = document.createDocumentFragment();
    encodedBatch.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'opt-batch-file-row';
      const saved = item.origSize - item.blob.size;
      const pct = item.origSize > 0 ? (saved / item.origSize) * 100 : 0;
      let cls = 'neutral';
      if (pct > 5) cls = 'good';
      else if (pct < -1) cls = 'bad';
      const pctText = (pct >= 0 ? '-' : '+') + Math.abs(pct).toFixed(0) + '%';
      const nm = document.createElement('span');
      nm.className = 'opt-batch-file-name';
      nm.textContent = item.name;
      nm.title = item.origName + ' → ' + item.name;
      const sz = document.createElement('span');
      sz.className = 'opt-batch-file-sizes';
      sz.textContent = formatBytes(item.origSize) + ' → ' + formatBytes(item.blob.size);
      const sv = document.createElement('span');
      sv.className = 'opt-batch-file-savings ' + cls;
      sv.textContent = pctText;
      row.appendChild(nm);
      row.appendChild(sz);
      row.appendChild(sv);
      frag.appendChild(row);
    });
    els.batchFilesList.appendChild(frag);
    if (els.batchFilesSummary) {
      els.batchFilesSummary.textContent = t('opt.batch.filesDetails', { n: encodedBatch.length });
    }
  }

  async function processBatch() {
    if (batchProcessing) return;
    if (batchItems.length === 0) {
      toast(t('opt.batch.noFiles'), 'error');
      return;
    }
    batchProcessing = true;
    updateBatchProcessBtn();
    els.batchProcess.classList.add('is-loading');
    if (els.batchStats) els.batchStats.classList.add('hidden');
    if (els.batchStaleNotice) els.batchStaleNotice.classList.add('hidden');

    // Reset cached blobs and compressed gallery
    encodedBatch = [];
    clearCompressedGrid();

    const opts = batchCurrentOptions();
    const total = batchItems.length;
    const usedNames = new Set();
    let succeeded = 0;
    let failed = 0;
    let totalOrig = 0;
    let totalComp = 0;

    batchProgressUpdate(0, total, t('opt.batch.encoding', { i: 1, n: total, name: batchItems[0].file.name || '' }));
    await yieldToUI();

    try {
      for (let i = 0; i < total; i++) {
        const it = batchItems[i];
        batchProgressUpdate(
          i,
          total,
          t('opt.batch.encoding', { i: i + 1, n: total, name: it.file.name || '' })
        );
        await yieldToUI();

        try {
          const bitmap = await createImageBitmap(it.file);
          let outW = opts.width || bitmap.width;
          let outH = opts.height || bitmap.height;
          if (opts.lockRatio && (opts.width || opts.height)) {
            const aspect = bitmap.width / bitmap.height;
            if (opts.width && !opts.height) outH = Math.round(opts.width / aspect);
            else if (opts.height && !opts.width) outW = Math.round(opts.height * aspect);
          }
          const blob = await compressBitmap(bitmap, {
            codec: opts.codec,
            quality: opts.quality,
            width: outW,
            height: outH,
          });
          if (bitmap.close) bitmap.close();

          const noResize = !opts.width && !opts.height;
          const useOriginal = noResize && blob.size >= it.file.size;
          const finalBlob = useOriginal ? it.file : blob;

          const baseName = (it.file.name || 'image').replace(/\.[^.]+$/, '');
          const origExt = ((it.file.name || '').match(/\.([^.]+)$/) || [, ''])[1] || 'bin';
          const ext = useOriginal ? origExt : (EXT_BY_CODEC[opts.codec] || 'bin');
          let name = baseName + '.' + ext;
          let counter = 2;
          while (usedNames.has(name)) {
            name = baseName + '-' + counter + '.' + ext;
            counter++;
          }
          usedNames.add(name);

          encodedBatch.push({
            id: it.id,
            name,
            origName: it.file.name || 'image',
            origSize: it.file.size,
            blob: finalBlob,
          });

          totalOrig += it.file.size;
          totalComp += finalBlob.size;
          succeeded++;
        } catch (err) {
          console.error('Batch item failed:', it.file.name, err);
          failed++;
        }

        batchProgressUpdate(
          i + 1,
          total,
          i + 1 < total
            ? t('opt.batch.encoding', { i: i + 2, n: total, name: (batchItems[i + 1].file.name || '') })
            : ''
        );
        await yieldToUI();
      }

      // Hide progress, show stats panel for preview
      if (els.batchProgress) els.batchProgress.classList.add('hidden');

      if (succeeded > 0) {
        showBatchStats(succeeded, failed, totalOrig, totalComp);
        renderBatchFilesList();
        renderBatchGrid();
        renderCompressedGrid();
        if (els.batchProcessLabel) els.batchProcessLabel.textContent = t('opt.batch.recompress');
        toast(t('opt.batch.stats.processed', { n: succeeded }));
      } else {
        toast(t('toast.encodeFailed'), 'error');
      }
    } catch (err) {
      console.error(err);
      toast(t('toast.encodeFailed'), 'error');
    } finally {
      batchProcessing = false;
      els.batchProcess.classList.remove('is-loading');
      updateBatchProcessBtn();
    }
  }

  async function downloadBatchZip() {
    if (encodedBatch.length === 0) {
      toast(t('opt.batch.noFiles'), 'error');
      return;
    }
    if (typeof JSZip === 'undefined') {
      toast('JSZip not loaded', 'error');
      return;
    }
    els.batchDownload.classList.add('is-loading');
    els.batchDownload.disabled = true;
    try {
      const zip = new JSZip();
      encodedBatch.forEach((it) => zip.file(it.name, it.blob));
      const zipBlob = await zip.generateAsync({ type: 'blob', compression: 'STORE' });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'optimizer-batch.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 5000);
      toast(t('opt.batch.done'));
    } catch (err) {
      console.error(err);
      toast(t('toast.encodeFailed'), 'error');
    } finally {
      els.batchDownload.classList.remove('is-loading');
      els.batchDownload.disabled = false;
    }
  }

  function bindBatch() {
    // Card click → open multi-file picker
    if (els.batchDrop && els.batchInput) {
      const openPicker = () => els.batchInput.click();
      els.batchDrop.addEventListener('click', openPicker);
      els.batchDrop.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openPicker();
        }
      });
      ['dragenter', 'dragover'].forEach((ev) => {
        els.batchDrop.addEventListener(ev, (e) => {
          e.preventDefault();
          e.stopPropagation();
          els.batchDrop.classList.add('drag-over');
        });
      });
      ['dragleave', 'drop'].forEach((ev) => {
        els.batchDrop.addEventListener(ev, (e) => {
          e.preventDefault();
          e.stopPropagation();
          els.batchDrop.classList.remove('drag-over');
        });
      });
      els.batchDrop.addEventListener('drop', (e) => {
        if (e.dataTransfer && e.dataTransfer.files.length) {
          addBatchFiles(e.dataTransfer.files);
        }
      });
      els.batchInput.addEventListener('change', () => {
        if (els.batchInput.files && els.batchInput.files.length) {
          addBatchFiles(els.batchInput.files);
          els.batchInput.value = '';
        }
      });
    }

    if (els.batchAddMore) {
      els.batchAddMore.addEventListener('click', () => els.batchInput.click());
    }
    if (els.batchClear) {
      els.batchClear.addEventListener('click', () => clearBatch());
    }
    if (els.batchReset) {
      els.batchReset.addEventListener('click', hideBatchWorkspace);
    }
    if (els.batchProcess) {
      els.batchProcess.addEventListener('click', processBatch);
    }
    if (els.batchDownload) {
      els.batchDownload.addEventListener('click', downloadBatchZip);
    }

    // Settings event handlers — also mark cached encoding as stale
    if (els.bCodec) {
      els.bCodec.addEventListener('change', () => { updateBatchCodecUI(); markBatchStale(); });
    }
    if (els.bQuality) {
      els.bQuality.addEventListener('input', () => { updateBatchQualityVal(); markBatchStale(); });
    }
    if (els.bResizeW || els.bResizeH) {
      let aspect = 1;
      const computeAspect = () => {
        if (batchItems.length > 0) {
          // Use first file's aspect as the lock reference
          const first = batchItems[0];
          const img = new Image();
          img.onload = () => {
            aspect = img.naturalWidth / img.naturalHeight;
          };
          img.src = first.thumbUrl;
        }
      };
      computeAspect();
      if (els.bResizeW) {
        els.bResizeW.addEventListener('input', () => {
          if (els.bResizeLock && els.bResizeLock.checked && aspect) {
            const w = parseInt(els.bResizeW.value, 10);
            if (w > 0) els.bResizeH.value = Math.round(w / aspect);
          }
          markBatchStale();
        });
      }
      if (els.bResizeH) {
        els.bResizeH.addEventListener('input', () => {
          if (els.bResizeLock && els.bResizeLock.checked && aspect) {
            const h = parseInt(els.bResizeH.value, 10);
            if (h > 0) els.bResizeW.value = Math.round(h * aspect);
          }
          markBatchStale();
        });
      }
    }
  }

  /* ========== Working image (crop / bg-removal results) ========== */
  // Replace the compression source with an edited canvas, refresh the preview,
  // resize inputs and re-run compression.
  async function applyWorkingImage(canvas) {
    const blob = await new Promise((res) => canvas.toBlob(res, 'image/png'));
    if (!blob) { toast(t('toast.encodeFailed'), 'error'); return; }
    if (workingBitmap && workingBitmap !== originalBitmap && workingBitmap.close) workingBitmap.close();
    workingBitmap = await createImageBitmap(canvas);
    workingBlob = blob;
    originalNaturalSize = { w: workingBitmap.width, h: workingBitmap.height };
    if (workingUrl) URL.revokeObjectURL(workingUrl);
    workingUrl = URL.createObjectURL(blob);
    els.originalImg.src = workingUrl;
    els.originalInfo.textContent =
      `${originalNaturalSize.w}×${originalNaturalSize.h} · ${formatBytes(blob.size)}`;
    els.resizeW.value = originalNaturalSize.w;
    els.resizeH.value = originalNaturalSize.h;
    if (els.editReset) els.editReset.classList.remove('hidden');
    resetView();
    runCompression();
  }

  function resetEdits() {
    if (!originalBitmap || !originalFile) return;
    if (workingBitmap && workingBitmap !== originalBitmap && workingBitmap.close) workingBitmap.close();
    workingBitmap = originalBitmap;
    workingBlob = originalFile;
    originalNaturalSize = { w: originalBitmap.width, h: originalBitmap.height };
    if (workingUrl) { URL.revokeObjectURL(workingUrl); workingUrl = null; }
    els.originalImg.src = originalUrl;
    els.originalInfo.textContent =
      `${originalNaturalSize.w}×${originalNaturalSize.h} · ${formatBytes(originalFile.size)}`;
    els.resizeW.value = originalNaturalSize.w;
    els.resizeH.value = originalNaturalSize.h;
    if (els.editReset) els.editReset.classList.add('hidden');
    resetView();
    runCompression();
  }

  /* ========== Background removal (client-side, @imgly, private) ========== */
  async function removeBackground() {
    if (!workingBlob || bgProcessing) return;
    bgProcessing = true;
    els.bgBtn.classList.add('is-loading');
    els.bgBtn.disabled = true;
    if (els.cropBtn) els.cropBtn.disabled = true;
    try {
      if (!bgModule) {
        if (els.bgProgress) els.bgProgress.textContent = t('opt.edit.bgLoading');
        bgModule = await import(
          /* @vite-ignore */ 'https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.5.5/+esm'
        );
      }
      const remove = bgModule.removeBackground || (bgModule.default && bgModule.default.removeBackground);
      if (typeof remove !== 'function') throw new Error('removeBackground export not found');
      const config = {
        progress: (key, current, total) => {
          if (!els.bgProgress) return;
          const pct = total ? Math.round((current / total) * 100) : 0;
          els.bgProgress.textContent = t('opt.edit.bgProgress', { p: pct });
        },
      };
      const resultBlob = await remove(workingBlob, config);
      const bmp = await createImageBitmap(resultBlob);
      const canvas = document.createElement('canvas');
      canvas.width = bmp.width;
      canvas.height = bmp.height;
      canvas.getContext('2d').drawImage(bmp, 0, 0);
      if (bmp.close) bmp.close();
      // Transparency needs an alpha-capable codec — JPEG would flatten it to black/white.
      if (els.codec.value === 'jpeg') {
        els.codec.value = 'png';
        updateCodecUI();
      }
      await applyWorkingImage(canvas);
      toast(t('opt.edit.bgDone'));
    } catch (err) {
      console.error('Background removal failed:', err);
      toast(t('opt.edit.bgFailed'), 'error');
    } finally {
      bgProcessing = false;
      els.bgBtn.classList.remove('is-loading');
      els.bgBtn.disabled = false;
      if (els.cropBtn) els.cropBtn.disabled = false;
      if (els.bgProgress) els.bgProgress.textContent = t('opt.edit.bgProcessing');
    }
  }

  /* ========== Crop tool (interactive, client-side) ========== */
  const crop = {
    ratio: 'free',                    // 'free' | 'orig' | number-string (w/h)
    box: { x: 0, y: 0, w: 0, h: 0 },  // display px, relative to the crop image top-left
    imgW: 0,
    imgH: 0,
  };
  const CROP_MIN = 24;

  function clampNum(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  function cropRatioNumber() {
    if (crop.ratio === 'free') return null;
    if (crop.ratio === 'orig') {
      return originalNaturalSize.h ? originalNaturalSize.w / originalNaturalSize.h : null;
    }
    const n = parseFloat(crop.ratio);
    return isFinite(n) && n > 0 ? n : null;
  }

  function renderCropBox() {
    const b = crop.box;
    els.cropBox.style.left = b.x + 'px';
    els.cropBox.style.top = b.y + 'px';
    els.cropBox.style.width = b.w + 'px';
    els.cropBox.style.height = b.h + 'px';
    if (els.cropDims && crop.imgW > 0) {
      const scale = originalNaturalSize.w / crop.imgW;
      els.cropDims.textContent = Math.round(b.w * scale) + ' × ' + Math.round(b.h * scale) + ' px';
    }
  }

  function fitBoxToRatio(keepCenter) {
    const r = cropRatioNumber();
    if (!r) return;
    let { x, y, w, h } = crop.box;
    const cx = x + w / 2, cy = y + h / 2;
    if (w / h > r) w = h * r; else h = w / r;
    if (w > crop.imgW) { w = crop.imgW; h = w / r; }
    if (h > crop.imgH) { h = crop.imgH; w = h * r; }
    if (keepCenter) {
      x = clampNum(cx - w / 2, 0, crop.imgW - w);
      y = clampNum(cy - h / 2, 0, crop.imgH - h);
    } else {
      x = clampNum(x, 0, crop.imgW - w);
      y = clampNum(y, 0, crop.imgH - h);
    }
    crop.box = { x, y, w, h };
  }

  function setCropRatio(r) {
    crop.ratio = r;
    els.cropRatios.forEach((btn) => btn.classList.toggle('active', btn.dataset.ratio === String(r)));
    els.cropBox.classList.toggle('ratio-locked', cropRatioNumber() != null);
    fitBoxToRatio(true);
    renderCropBox();
  }

  function anchorFor(handle, b) {
    // opposite corner of the dragged corner handle
    return {
      x: handle.indexOf('w') >= 0 ? b.x + b.w : b.x,
      y: handle.indexOf('n') >= 0 ? b.y + b.h : b.y,
    };
  }

  function beginCropDrag(handle, ev) {
    ev.preventDefault();
    ev.stopPropagation();
    const startBox = { ...crop.box };
    const wrapRect = els.cropImgWrap.getBoundingClientRect();
    const startX = ev.clientX, startY = ev.clientY;
    const r = cropRatioNumber();

    function onMove(e) {
      const px = clampNum(e.clientX - wrapRect.left, 0, crop.imgW);
      const py = clampNum(e.clientY - wrapRect.top, 0, crop.imgH);
      let { x, y, w, h } = startBox;

      if (handle === 'move') {
        const nx = clampNum(startBox.x + (e.clientX - startX), 0, crop.imgW - startBox.w);
        const ny = clampNum(startBox.y + (e.clientY - startY), 0, crop.imgH - startBox.h);
        crop.box = { x: nx, y: ny, w: startBox.w, h: startBox.h };
      } else if (handle.length === 2) {
        // corner handle
        const a = anchorFor(handle, startBox);
        let nw = Math.abs(px - a.x);
        let nh = Math.abs(py - a.y);
        if (r) { if (nw / nh > r) nw = nh * r; else nh = nw / r; }
        nw = Math.max(CROP_MIN, nw);
        nh = Math.max(CROP_MIN, nh);
        const nx = px < a.x ? a.x - nw : a.x;
        const ny = py < a.y ? a.y - nh : a.y;
        crop.box = {
          x: clampNum(nx, 0, crop.imgW - nw),
          y: clampNum(ny, 0, crop.imgH - nh),
          w: nw, h: nh,
        };
      } else {
        // edge handle (free ratio only)
        const right = x + w, bottom = y + h;
        if (handle === 'e') w = clampNum(px - x, CROP_MIN, crop.imgW - x);
        else if (handle === 's') h = clampNum(py - y, CROP_MIN, crop.imgH - y);
        else if (handle === 'w') { const nx2 = clampNum(px, 0, right - CROP_MIN); w = right - nx2; x = nx2; }
        else if (handle === 'n') { const ny2 = clampNum(py, 0, bottom - CROP_MIN); h = bottom - ny2; y = ny2; }
        crop.box = { x, y, w, h };
      }
      renderCropBox();
    }
    function onUp() {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    }
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }

  function initCropBox() {
    crop.imgW = els.cropImg.clientWidth;
    crop.imgH = els.cropImg.clientHeight;
    const w = crop.imgW * 0.8, h = crop.imgH * 0.8;
    crop.box = { x: (crop.imgW - w) / 2, y: (crop.imgH - h) / 2, w, h };
    if (cropRatioNumber() != null) fitBoxToRatio(true);
    renderCropBox();
  }

  function openCrop() {
    if (!workingBitmap) return;
    setCropRatio('free');
    els.cropImg.src = workingUrl || originalUrl;
    els.cropModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (els.cropImg.complete && els.cropImg.naturalWidth) {
      requestAnimationFrame(initCropBox);
    } else {
      const onReady = () => { initCropBox(); els.cropImg.removeEventListener('load', onReady); };
      els.cropImg.addEventListener('load', onReady);
    }
  }

  function closeCrop() {
    els.cropModal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  async function applyCrop() {
    if (!workingBitmap || crop.imgW <= 0) return;
    const scale = originalNaturalSize.w / crop.imgW;
    const sx = clampNum(Math.round(crop.box.x * scale), 0, originalNaturalSize.w - 1);
    const sy = clampNum(Math.round(crop.box.y * scale), 0, originalNaturalSize.h - 1);
    const sw = clampNum(Math.round(crop.box.w * scale), 1, originalNaturalSize.w - sx);
    const sh = clampNum(Math.round(crop.box.h * scale), 1, originalNaturalSize.h - sy);
    const canvas = document.createElement('canvas');
    canvas.width = sw;
    canvas.height = sh;
    canvas.getContext('2d').drawImage(workingBitmap, sx, sy, sw, sh, 0, 0, sw, sh);
    closeCrop();
    await applyWorkingImage(canvas);
  }

  function bindEditTools() {
    if (els.cropBtn) els.cropBtn.addEventListener('click', openCrop);
    if (els.bgBtn) els.bgBtn.addEventListener('click', removeBackground);
    if (els.editReset) els.editReset.addEventListener('click', resetEdits);

    if (els.cropClose) els.cropClose.addEventListener('click', closeCrop);
    if (els.cropCancel) els.cropCancel.addEventListener('click', closeCrop);
    if (els.cropBackdrop) els.cropBackdrop.addEventListener('click', closeCrop);
    if (els.cropApply) els.cropApply.addEventListener('click', applyCrop);

    els.cropRatios.forEach((btn) => {
      btn.addEventListener('click', () => setCropRatio(btn.dataset.ratio));
    });

    if (els.cropBox) {
      els.cropBox.addEventListener('pointerdown', (e) => {
        const handle = e.target.classList.contains('opt-crop-handle') ? e.target.dataset.h : 'move';
        beginCropDrag(handle, e);
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && els.cropModal && !els.cropModal.classList.contains('hidden')) closeCrop();
    });
  }

  /* ========== Download ========== */
  function triggerDownload() {
    if (!lastCompressedBlob || !originalFile) return;
    const codec = els.codec.value;
    const ext = EXT_BY_CODEC[codec] || 'bin';
    const baseName = (originalFile.name || 'image').replace(/\.[^.]+$/, '');
    const a = document.createElement('a');
    a.href = lastCompressedUrl;
    a.download = `${baseName}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  /* ========== Init ========== */
  function cacheEls() {
    els.input = document.getElementById('opt-input');
    els.drop = document.getElementById('opt-drop');
    els.emptyState = document.getElementById('opt-empty-state');
    els.hero = document.getElementById('opt-hero');
    els.workspace = document.getElementById('opt-workspace');
    els.originalImg = document.getElementById('opt-original-img');
    els.originalInfo = document.getElementById('opt-original-info');
    els.compressedImg = document.getElementById('opt-compressed-img');
    els.compressedInfo = document.getElementById('opt-compressed-info');
    els.compressedPlaceholder = document.getElementById('opt-compressed-placeholder');
    els.reset = document.getElementById('opt-reset');
    els.codec = document.getElementById('opt-codec');
    els.quality = document.getElementById('opt-quality');
    els.qualityVal = document.getElementById('opt-quality-val');
    els.qualityRow = document.getElementById('opt-quality-row');
    els.resizeW = document.getElementById('opt-resize-w');
    els.resizeH = document.getElementById('opt-resize-h');
    els.resizeLock = document.getElementById('opt-resize-lock');
    els.download = document.getElementById('opt-download');
    els.statSavings = document.getElementById('opt-stat-savings');
    els.statRatio = document.getElementById('opt-stat-ratio');
    els.savingsPill = document.getElementById('opt-savings-pill');
    els.originalCanvas = document.getElementById('opt-original-canvas');
    els.compressedCanvas = document.getElementById('opt-compressed-canvas');
    els.zoomIn = document.getElementById('opt-zoom-in');
    els.zoomOut = document.getElementById('opt-zoom-out');
    els.zoomVal = document.getElementById('opt-zoom-val');
    els.zoomFit = document.getElementById('opt-zoom-fit');
    els.zoom100 = document.getElementById('opt-zoom-100');

    // Edit tools (crop + background removal)
    els.cropBtn = document.getElementById('opt-crop-btn');
    els.bgBtn = document.getElementById('opt-bg-btn');
    els.bgProgress = document.getElementById('opt-bg-progress');
    els.editReset = document.getElementById('opt-edit-reset');
    els.cropModal = document.getElementById('opt-crop-modal');
    els.cropBackdrop = document.getElementById('opt-crop-backdrop');
    els.cropImg = document.getElementById('opt-crop-img');
    els.cropImgWrap = document.getElementById('opt-crop-imgwrap');
    els.cropBox = document.getElementById('opt-crop-box');
    els.cropClose = document.getElementById('opt-crop-close');
    els.cropCancel = document.getElementById('opt-crop-cancel');
    els.cropApply = document.getElementById('opt-crop-apply');
    els.cropDims = document.getElementById('opt-crop-dims');
    els.cropRatios = Array.from(document.querySelectorAll('.opt-crop-ratio'));

    // Batch elements
    els.batchInput = document.getElementById('opt-batch-input');
    els.batchDrop = document.getElementById('opt-batch-drop');
    els.batchWorkspace = document.getElementById('opt-batch-workspace');
    els.batchGrid = document.getElementById('opt-batch-grid');
    els.batchCount = document.getElementById('opt-batch-count');
    els.batchAdded = document.getElementById('opt-batch-added');
    els.batchTotals = document.getElementById('opt-batch-totals');
    els.batchTotalsOrig = document.getElementById('opt-batch-totals-orig');
    els.batchTotalsComp = document.getElementById('opt-batch-totals-comp');
    els.batchTotalsSaved = document.getElementById('opt-batch-totals-saved');
    els.batchTotalsPct = document.getElementById('opt-batch-totals-pct');
    els.batchCompressedSection = document.getElementById('opt-batch-compressed-section');
    els.batchCompressedGrid = document.getElementById('opt-batch-compressed-grid');
    els.batchAddMore = document.getElementById('opt-batch-add-more');
    els.batchClear = document.getElementById('opt-batch-clear');
    els.batchReset = document.getElementById('opt-batch-reset');
    els.batchProcess = document.getElementById('opt-batch-process');
    els.batchProcessLabel = document.getElementById('opt-batch-process-label');
    els.batchDownload = document.getElementById('opt-batch-download');
    els.batchStaleNotice = document.getElementById('opt-batch-stale-notice');
    els.batchFilesDetails = document.getElementById('opt-batch-files-details');
    els.batchFilesSummary = document.getElementById('opt-batch-files-summary');
    els.batchFilesList = document.getElementById('opt-batch-files-list');
    els.batchProgress = document.getElementById('opt-batch-progress');
    els.batchProgressFill = document.getElementById('opt-batch-progress-fill');
    els.batchProgressPct = document.getElementById('opt-batch-progress-pct');
    els.batchProgressLabel = document.getElementById('opt-batch-progress-label');
    els.batchStats = document.getElementById('opt-batch-stats');
    els.batchStatProcessed = document.getElementById('opt-batch-stat-processed');
    els.batchStatOriginal = document.getElementById('opt-batch-stat-original');
    els.batchStatCompressed = document.getElementById('opt-batch-stat-compressed');
    els.batchStatSaved = document.getElementById('opt-batch-stat-saved');
    els.batchStatSavedPct = document.getElementById('opt-batch-stat-saved-pct');
    els.bCodec = document.getElementById('opt-b-codec');
    els.bQuality = document.getElementById('opt-b-quality');
    els.bQualityVal = document.getElementById('opt-b-quality-val');
    els.bQualityRow = document.getElementById('opt-b-quality-row');
    els.bResizeW = document.getElementById('opt-b-resize-w');
    els.bResizeH = document.getElementById('opt-b-resize-h');
    els.bResizeLock = document.getElementById('opt-b-resize-lock');
  }

  function init() {
    cacheEls();

    currentLang = detectInitialLang();
    applyI18nDom();
    applyTheme(detectInitialTheme());

    bindDropZone();
    bindResize();
    bindZoomPan();
    bindEditTools();
    bindBatch();
    updateBatchCodecUI();
    updateBatchQualityVal();
    applyTransform();

    els.codec.addEventListener('change', () => {
      updateCodecUI();
      runCompression();
    });
    els.quality.addEventListener('input', () => {
      updateQualityVal();
      debounceRecompress(250);
    });
    els.resizeW.addEventListener('input', () => debounceRecompress(400));
    els.resizeH.addEventListener('input', () => debounceRecompress(400));
    els.resizeLock.addEventListener('change', () => debounceRecompress(100));

    updateCodecUI();
    updateQualityVal();

    els.reset.addEventListener('click', hideWorkspace);
    els.download.addEventListener('click', triggerDownload);

    document.querySelectorAll('[data-lang-btn]').forEach((b) => {
      b.addEventListener('click', () => setLang(b.getAttribute('data-lang-btn')));
    });
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
