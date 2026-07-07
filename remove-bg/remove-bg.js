/* ============================================================
   حذف پس‌زمینه (Background Remover) — standalone page.
   Non-AI edge flood-fill by default, optional in-browser AI (@imgly).
   No ES modules; works with file:// too.
   ============================================================ */
(function () {
  'use strict';

  /* ========== i18n ========== */
  const dictionaries = {
    fa: {
      'rbg.title': 'حذف پس‌زمینه تصویر آنلاین — رایگان و در مرورگر',
      'rbg.name': 'حذف پس‌زمینه',
      'rbg.tagline': 'پاک کردن پس‌زمینه‌ی تصویر در مرورگر',
      'nav.placement': 'جایگذاری قالب',
      'nav.optimizer': 'بهینه‌ساز تصویر',
      'nav.removebg': 'حذف پس‌زمینه',
      'rbg.hero.title': 'حذف پس‌زمینه‌ی تصویر با یک کلیک',
      'rbg.hero.subtitle': 'عکست رو بنداز و پس‌زمینه رو بردار — حالت سریع و بدون هوش مصنوعی برای پس‌زمینه‌های یکدست، یا حالت هوش مصنوعی برای عکس‌های پیچیده. خروجی PNG شفاف، تمام پردازش در مرورگر شما.',
      'rbg.drop.cta': 'یک تصویر رو اینجا بنداز یا کلیک کن',
      'rbg.drop.hint': 'JPEG, PNG, WebP — حداکثر ۲۰ مگابایت',
      'rbg.step.preview': 'پیش‌نمایش',
      'rbg.reset': 'انتخاب تصویر دیگر',
      'rbg.pane.original': 'اصل',
      'rbg.pane.result': 'بدون پس‌زمینه',
      'rbg.pane.empty': 'دکمه‌ی «حذف پس‌زمینه» رو بزن',
      'rbg.remove': 'حذف پس‌زمینه',
      'rbg.removeAi': 'با هوش مصنوعی',
      'rbg.aiTitle': 'اگه حالت ساده نتونست پس‌زمینه رو برداره، با هوش مصنوعی امتحان کن',
      'rbg.busy': 'در حال پردازش…',
      'rbg.download': 'دانلود PNG',
      'rbg.tip': 'نکته: برای عکس‌هایی که پس‌زمینه‌شون یکدست و ساده‌ست (مثل عکس محصول روی سفید)، حالت بدون هوش مصنوعی سریع‌تره. برای سوژه‌های پیچیده «با هوش مصنوعی» رو بزن.',
      'rbg.localStart': 'در حال حذف پس‌زمینه…',
      'rbg.localDone': 'پس‌زمینه حذف شد ✓',
      'rbg.localWeak': 'پس‌زمینه‌ی یکدست پیدا نشد — دکمه‌ی «با هوش مصنوعی» رو امتحان کن',
      'rbg.aiLoading': 'بارگذاری مدل هوش مصنوعی…',
      'rbg.aiStart': 'حذف پس‌زمینه با هوش مصنوعی…',
      'rbg.aiProgress': 'هوش مصنوعی… {p}٪',
      'rbg.aiDone': 'پس‌زمینه با هوش مصنوعی حذف شد ✓',
      'rbg.failed': 'حذف پس‌زمینه ناموفق بود — اتصال اینترنت رو چک کن',
      'rbg.invalidFile': 'فایل پشتیبانی نمی‌شه',
      'rbg.tooLarge': 'فایل از ۲۰ مگابایت بزرگ‌تره',
      'rbg.decodeFailed': 'باز کردن این تصویر ممکن نشد',
      'footer.credit': 'ساخته شده به وسیله',
    },
    en: {
      'rbg.title': 'Online Background Remover — Free, In-Browser',
      'rbg.name': 'Remove Background',
      'rbg.tagline': 'Erase image backgrounds in your browser',
      'nav.placement': 'Frame Tool',
      'nav.optimizer': 'Image Optimizer',
      'nav.removebg': 'Remove Background',
      'rbg.hero.title': 'Remove image backgrounds in one click',
      'rbg.hero.subtitle': 'Drop an image and clear the background — a fast non-AI mode for solid backgrounds, or an AI mode for complex photos. Transparent PNG output, all in your browser.',
      'rbg.drop.cta': 'Drop an image here or click to browse',
      'rbg.drop.hint': 'JPEG, PNG, WebP — up to 20 MB',
      'rbg.step.preview': 'Preview',
      'rbg.reset': 'Pick another image',
      'rbg.pane.original': 'Original',
      'rbg.pane.result': 'No background',
      'rbg.pane.empty': 'Press “Remove background”',
      'rbg.remove': 'Remove background',
      'rbg.removeAi': 'With AI',
      'rbg.aiTitle': 'If the simple mode can\'t detect the background, try AI',
      'rbg.busy': 'Processing…',
      'rbg.download': 'Download PNG',
      'rbg.tip': 'Tip: for images with a solid, simple background (like a product on white) the non-AI mode is faster. For complex subjects use “With AI”.',
      'rbg.localStart': 'Removing background…',
      'rbg.localDone': 'Background removed ✓',
      'rbg.localWeak': 'No solid background found — try the “With AI” button',
      'rbg.aiLoading': 'Loading AI model…',
      'rbg.aiStart': 'Removing background with AI…',
      'rbg.aiProgress': 'AI… {p}%',
      'rbg.aiDone': 'Background removed with AI ✓',
      'rbg.failed': 'Background removal failed — check your connection',
      'rbg.invalidFile': 'Unsupported file',
      'rbg.tooLarge': 'File exceeds 20 MB',
      'rbg.decodeFailed': 'Could not open this image',
      'footer.credit': 'Made by',
    }
  };

  const LS_LANG = 'frame-studio.lang';
  const LS_THEME = 'frame-studio.theme';
  let currentLang = 'fa';

  function t(key, params) {
    const dict = dictionaries[currentLang] || dictionaries.fa;
    let str = dict[key] ?? key;
    if (params) for (const k in params) str = str.replace('{' + k + '}', String(params[k]));
    return str;
  }

  function detectInitialLang() {
    const saved = localStorage.getItem(LS_LANG);
    if (saved && dictionaries[saved]) return saved;
    const supported = Object.keys(dictionaries);
    const list = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || ''];
    for (const item of list) {
      const code = String(item).toLowerCase().split(/[-_]/)[0];
      if (supported.includes(code)) return code;
    }
    return 'fa';
  }

  function applyI18nDom() {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'fa' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-i18n-title]').forEach((el) => { el.title = t(el.getAttribute('data-i18n-title')); });
    document.title = t('rbg.title');
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

  function toastSticky(msg) {
    const root = document.getElementById('toast-container');
    if (!root) return { update() {}, close() {} };
    const el = document.createElement('div');
    el.className = 'toast-item glass-card pointer-events-auto px-4 py-2.5 text-sm font-semibold flex items-center gap-2.5';
    const sp = document.createElement('span');
    sp.className = 'spinner-sm';
    const txt = document.createElement('span');
    txt.textContent = msg;
    el.appendChild(sp); el.appendChild(txt);
    root.appendChild(el);
    return {
      update(m) { txt.textContent = m; },
      close() { el.style.opacity = '0'; el.style.transition = 'opacity .3s ease'; setTimeout(() => el.remove(), 300); },
    };
  }

  /* ========== State ========== */
  const MAX_FILE_BYTES = 20 * 1024 * 1024;
  const els = {};
  let sourceFile = null;
  let sourceBitmap = null;
  let sourceUrl = null;
  let sourceBlob = null;
  let resultBlob = null;
  let resultUrl = null;
  let bgModule = null;
  let busy = false;

  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  }

  function showWorkspace() {
    els.emptyState.classList.add('hidden');
    els.hero.classList.add('hidden');
    els.workspace.classList.remove('hidden');
  }

  function resetAll() {
    els.emptyState.classList.remove('hidden');
    els.hero.classList.remove('hidden');
    els.workspace.classList.add('hidden');
    sourceFile = null;
    if (sourceBitmap && sourceBitmap.close) sourceBitmap.close();
    sourceBitmap = null;
    sourceBlob = null;
    if (sourceUrl) URL.revokeObjectURL(sourceUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    sourceUrl = null; resultBlob = null; resultUrl = null;
    els.originalImg.removeAttribute('src');
    els.resultImg.removeAttribute('src');
    els.originalInfo.textContent = '—';
    els.resultInfo.textContent = '—';
    els.resultPlaceholder.classList.remove('hidden');
    els.download.disabled = true;
    els.input.value = '';
  }

  async function loadFile(file) {
    if (!file || !file.type.startsWith('image/')) { toast(t('rbg.invalidFile'), 'error'); return; }
    if (file.size > MAX_FILE_BYTES) { toast(t('rbg.tooLarge'), 'error'); return; }
    try {
      sourceFile = file;
      sourceBlob = file;
      if (sourceBitmap && sourceBitmap.close) sourceBitmap.close();
      sourceBitmap = await createImageBitmap(file);
      if (sourceUrl) URL.revokeObjectURL(sourceUrl);
      sourceUrl = URL.createObjectURL(file);
      els.originalImg.src = sourceUrl;
      els.originalInfo.textContent = `${sourceBitmap.width}×${sourceBitmap.height} · ${formatBytes(file.size)}`;
      if (resultUrl) { URL.revokeObjectURL(resultUrl); resultUrl = null; }
      resultBlob = null;
      els.resultImg.removeAttribute('src');
      els.resultInfo.textContent = '—';
      els.resultPlaceholder.classList.remove('hidden');
      els.download.disabled = true;
      showWorkspace();
    } catch (err) {
      console.error(err);
      toast(t('rbg.decodeFailed'), 'error');
    }
  }

  function setBusy(v) {
    busy = v;
    els.removeBtn.disabled = v;
    els.removeAiBtn.disabled = v;
    els.reset.disabled = v;
  }

  function showResult(canvasOrBlobUrl, blob) {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    resultBlob = blob;
    resultUrl = URL.createObjectURL(blob);
    els.resultImg.src = resultUrl;
    els.resultPlaceholder.classList.add('hidden');
    els.resultInfo.textContent = `${sourceBitmap.width}×${sourceBitmap.height} · ${formatBytes(blob.size)}`;
    els.download.disabled = false;
  }

  /* ========== Method 1: non-AI edge flood-fill ========== */
  function floodRemoveBackground(imgData, w, h) {
    const data = imgData.data;
    let br = 0, bg = 0, bb = 0, count = 0;
    const add = (x, y) => { const i = (y * w + x) * 4; br += data[i]; bg += data[i + 1]; bb += data[i + 2]; count++; };
    for (let x = 0; x < w; x++) { add(x, 0); add(x, h - 1); }
    for (let y = 0; y < h; y++) { add(0, y); add(w - 1, y); }
    br = br / count; bg = bg / count; bb = bb / count;

    const T2 = 62 * 62;
    const N = w * h;
    const visited = new Uint8Array(N);
    const stack = [];
    for (let x = 0; x < w; x++) { stack.push(x); stack.push(x + (h - 1) * w); }
    for (let y = 0; y < h; y++) { stack.push(y * w); stack.push(w - 1 + y * w); }

    let removed = 0;
    while (stack.length) {
      const idx = stack.pop();
      if (visited[idx]) continue;
      visited[idx] = 1;
      const p = idx * 4;
      const dr = data[p] - br, dg = data[p + 1] - bg, db = data[p + 2] - bb;
      if (dr * dr + dg * dg + db * db > T2) continue;
      if (data[p + 3] !== 0) removed++;
      data[p + 3] = 0;
      const x = idx % w, y = (idx / w) | 0;
      if (x > 0) stack.push(idx - 1);
      if (x < w - 1) stack.push(idx + 1);
      if (y > 0) stack.push(idx - w);
      if (y < h - 1) stack.push(idx + w);
    }
    return removed;
  }

  async function removeLocal() {
    if (!sourceBitmap || busy) return;
    setBusy(true);
    els.removeBtn.classList.add('is-loading');
    const note = toastSticky(t('rbg.localStart'));
    await new Promise((r) => setTimeout(r, 30));
    try {
      const w = sourceBitmap.width, h = sourceBitmap.height;
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(sourceBitmap, 0, 0);
      const imgData = ctx.getImageData(0, 0, w, h);
      const removed = floodRemoveBackground(imgData, w, h);
      note.close();
      if (removed / (w * h) < 0.02) {
        toast(t('rbg.localWeak'), 'info', 5000);
        els.removeAiBtn.classList.add('rbg-pulse');
        setTimeout(() => els.removeAiBtn.classList.remove('rbg-pulse'), 4000);
        return;
      }
      ctx.putImageData(imgData, 0, 0);
      const blob = await new Promise((res) => canvas.toBlob(res, 'image/png'));
      showResult(null, blob);
      toast(t('rbg.localDone'));
    } catch (err) {
      console.error('Local removal failed:', err);
      note.close();
      toast(t('rbg.failed'), 'error');
    } finally {
      els.removeBtn.classList.remove('is-loading');
      setBusy(false);
    }
  }

  /* ========== Method 2: in-browser AI (@imgly) ========== */
  async function removeAI() {
    if (!sourceBlob || busy) return;
    setBusy(true);
    els.removeAiBtn.classList.add('is-loading');
    els.removeAiBtn.classList.remove('rbg-pulse');
    const note = toastSticky(t('rbg.aiLoading'));
    try {
      if (!bgModule) {
        bgModule = await import(/* @vite-ignore */ 'https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.5.5/+esm');
      }
      const remove = bgModule.removeBackground || (bgModule.default && bgModule.default.removeBackground);
      if (typeof remove !== 'function') throw new Error('removeBackground export not found');
      note.update(t('rbg.aiStart'));
      const config = {
        progress: (key, current, total) => {
          const pct = total ? Math.round((current / total) * 100) : 0;
          note.update(t('rbg.aiProgress', { p: pct }));
        },
      };
      const out = await remove(sourceBlob, config);
      note.close();
      showResult(null, out);
      toast(t('rbg.aiDone'));
    } catch (err) {
      console.error('AI removal failed:', err);
      note.close();
      toast(t('rbg.failed'), 'error');
    } finally {
      els.removeAiBtn.classList.remove('is-loading');
      setBusy(false);
    }
  }

  function downloadResult() {
    if (!resultBlob || !sourceFile) return;
    const base = (sourceFile.name || 'image').replace(/\.[^.]+$/, '');
    const a = document.createElement('a');
    a.href = resultUrl;
    a.download = base + '-no-bg.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  /* ========== Drop zone ========== */
  function bindDropZone() {
    const dz = els.drop;
    dz.addEventListener('click', () => els.input.click());
    dz.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); els.input.click(); }
    });
    ['dragenter', 'dragover'].forEach((ev) => dz.addEventListener(ev, (e) => {
      e.preventDefault(); e.stopPropagation(); dz.classList.add('drag-over');
    }));
    ['dragleave', 'drop'].forEach((ev) => dz.addEventListener(ev, (e) => {
      e.preventDefault(); e.stopPropagation(); dz.classList.remove('drag-over');
    }));
    dz.addEventListener('drop', (e) => {
      const file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
      if (file) loadFile(file);
    });
    els.input.addEventListener('change', () => {
      const file = els.input.files && els.input.files[0];
      if (file) loadFile(file);
    });
  }

  /* ========== Init ========== */
  function cacheEls() {
    els.input = document.getElementById('rbg-input');
    els.drop = document.getElementById('rbg-drop');
    els.emptyState = document.getElementById('rbg-empty-state');
    els.hero = document.getElementById('rbg-hero');
    els.workspace = document.getElementById('rbg-workspace');
    els.originalImg = document.getElementById('rbg-original-img');
    els.originalInfo = document.getElementById('rbg-original-info');
    els.resultImg = document.getElementById('rbg-result-img');
    els.resultInfo = document.getElementById('rbg-result-info');
    els.resultPlaceholder = document.getElementById('rbg-result-placeholder');
    els.reset = document.getElementById('rbg-reset');
    els.removeBtn = document.getElementById('rbg-remove-btn');
    els.removeAiBtn = document.getElementById('rbg-remove-ai-btn');
    els.download = document.getElementById('rbg-download');
  }

  function init() {
    cacheEls();
    currentLang = detectInitialLang();
    applyI18nDom();
    applyTheme(detectInitialTheme());

    bindDropZone();
    els.removeBtn.addEventListener('click', removeLocal);
    els.removeAiBtn.addEventListener('click', removeAI);
    els.download.addEventListener('click', downloadResult);
    els.reset.addEventListener('click', resetAll);

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
