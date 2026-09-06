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
      'rbg.edit.label': 'ویرایش',
      'rbg.edit.crop': 'برش',
      'rbg.edit.flipH': 'قرینه افقی',
      'rbg.edit.flipV': 'قرینه عمودی',
      'rbg.crop.title': 'برش تصویر',
      'rbg.crop.free': 'آزاد',
      'rbg.crop.orig': 'نسبت تصویر',
      'rbg.crop.cancel': 'لغو',
      'rbg.crop.apply': 'اعمال برش',
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
      'rbg.edit.label': 'Edit',
      'rbg.edit.crop': 'Crop',
      'rbg.edit.flipH': 'Flip horizontal',
      'rbg.edit.flipV': 'Flip vertical',
      'rbg.crop.title': 'Crop image',
      'rbg.crop.free': 'Free',
      'rbg.crop.orig': 'Original ratio',
      'rbg.crop.cancel': 'Cancel',
      'rbg.crop.apply': 'Apply crop',
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
    return 'dark'; // default to dark
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
    document.body.classList.add('rbg-has-bar');
  }

  function resetAll() {
    els.emptyState.classList.remove('hidden');
    els.hero.classList.remove('hidden');
    els.workspace.classList.add('hidden');
    document.body.classList.remove('rbg-has-bar');
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
    if (els.cropBtn) els.cropBtn.disabled = v;
    if (els.flipHBtn) els.flipHBtn.disabled = v;
    if (els.flipVBtn) els.flipVBtn.disabled = v;
  }

  /* ========== Source editing (flip / crop) — operates on the ORIGINAL ==========
     Flip and crop change the source image itself, so any previous background
     result is invalidated and the user re-runs removal on the edited source. */
  async function applySourceCanvas(canvas) {
    const blob = await new Promise((res) => canvas.toBlob(res, 'image/png'));
    if (!blob) return;
    if (sourceBitmap && sourceBitmap.close) sourceBitmap.close();
    sourceBitmap = await createImageBitmap(canvas);
    sourceBlob = blob;
    const base = (sourceFile && sourceFile.name ? sourceFile.name : 'image').replace(/\.[^.]+$/, '');
    sourceFile = new File([blob], base + '.png', { type: 'image/png' });
    if (sourceUrl) URL.revokeObjectURL(sourceUrl);
    sourceUrl = URL.createObjectURL(blob);
    els.originalImg.src = sourceUrl;
    els.originalInfo.textContent = `${sourceBitmap.width}×${sourceBitmap.height} · ${formatBytes(blob.size)}`;
    // Invalidate previous result — the source has changed.
    if (resultUrl) { URL.revokeObjectURL(resultUrl); resultUrl = null; }
    resultBlob = null;
    els.resultImg.removeAttribute('src');
    els.resultInfo.textContent = '—';
    els.resultPlaceholder.classList.remove('hidden');
    els.download.disabled = true;
  }

  // axis: 'h' = horizontal (left↔right), 'v' = vertical (top↕bottom)
  async function flipSource(axis) {
    if (!sourceBitmap || busy) return;
    const w = sourceBitmap.width, h = sourceBitmap.height;
    const canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (axis === 'v') { ctx.translate(0, h); ctx.scale(1, -1); }
    else { ctx.translate(w, 0); ctx.scale(-1, 1); }
    ctx.drawImage(sourceBitmap, 0, 0);
    await applySourceCanvas(canvas);
  }

  /* ========== Crop tool (interactive) — ported from the optimizer ========== */
  const crop = { ratio: 'free', box: { x: 0, y: 0, w: 0, h: 0 }, imgW: 0, imgH: 0 };
  const CROP_MIN = 24;
  function clampNum(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function srcW() { return sourceBitmap ? sourceBitmap.width : 0; }
  function srcH() { return sourceBitmap ? sourceBitmap.height : 0; }

  function cropRatioNumber() {
    if (crop.ratio === 'free') return null;
    if (crop.ratio === 'orig') return srcH() ? srcW() / srcH() : null;
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
      const scale = srcW() / crop.imgW;
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
    return { x: handle.indexOf('w') >= 0 ? b.x + b.w : b.x, y: handle.indexOf('n') >= 0 ? b.y + b.h : b.y };
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
        const a = anchorFor(handle, startBox);
        let nw = Math.abs(px - a.x);
        let nh = Math.abs(py - a.y);
        if (r) { if (nw / nh > r) nw = nh * r; else nh = nw / r; }
        nw = Math.max(CROP_MIN, nw);
        nh = Math.max(CROP_MIN, nh);
        const nx = px < a.x ? a.x - nw : a.x;
        const ny = py < a.y ? a.y - nh : a.y;
        crop.box = { x: clampNum(nx, 0, crop.imgW - nw), y: clampNum(ny, 0, crop.imgH - nh), w: nw, h: nh };
      } else {
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
    if (!sourceBitmap || busy) return;
    setCropRatio('free');
    els.cropImg.src = sourceUrl;
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
    if (!sourceBitmap || crop.imgW <= 0) return;
    const scale = srcW() / crop.imgW;
    const sx = clampNum(Math.round(crop.box.x * scale), 0, srcW() - 1);
    const sy = clampNum(Math.round(crop.box.y * scale), 0, srcH() - 1);
    const sw = clampNum(Math.round(crop.box.w * scale), 1, srcW() - sx);
    const sh = clampNum(Math.round(crop.box.h * scale), 1, srcH() - sy);
    const canvas = document.createElement('canvas');
    canvas.width = sw; canvas.height = sh;
    canvas.getContext('2d').drawImage(sourceBitmap, sx, sy, sw, sh, 0, 0, sw, sh);
    closeCrop();
    await applySourceCanvas(canvas);
  }

  function bindEditTools() {
    if (els.cropBtn) els.cropBtn.addEventListener('click', openCrop);
    if (els.flipHBtn) els.flipHBtn.addEventListener('click', () => flipSource('h'));
    if (els.flipVBtn) els.flipVBtn.addEventListener('click', () => flipSource('v'));
    if (els.cropClose) els.cropClose.addEventListener('click', closeCrop);
    if (els.cropCancel) els.cropCancel.addEventListener('click', closeCrop);
    if (els.cropBackdrop) els.cropBackdrop.addEventListener('click', closeCrop);
    if (els.cropApply) els.cropApply.addEventListener('click', applyCrop);
    els.cropRatios.forEach((btn) => btn.addEventListener('click', () => setCropRatio(btn.dataset.ratio)));
    if (els.cropBox) {
      els.cropBox.addEventListener('pointerdown', (e) => {
        const handle = e.target.classList.contains('rbg-crop-handle') ? e.target.dataset.h : 'move';
        beginCropDrag(handle, e);
      });
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && els.cropModal && !els.cropModal.classList.contains('hidden')) closeCrop();
    });
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
    // Edit tools
    els.cropBtn = document.getElementById('rbg-crop-btn');
    els.flipHBtn = document.getElementById('rbg-flip-h-btn');
    els.flipVBtn = document.getElementById('rbg-flip-v-btn');
    // Crop modal
    els.cropModal = document.getElementById('rbg-crop-modal');
    els.cropBackdrop = document.getElementById('rbg-crop-backdrop');
    els.cropImg = document.getElementById('rbg-crop-img');
    els.cropImgWrap = document.getElementById('rbg-crop-imgwrap');
    els.cropBox = document.getElementById('rbg-crop-box');
    els.cropClose = document.getElementById('rbg-crop-close');
    els.cropCancel = document.getElementById('rbg-crop-cancel');
    els.cropApply = document.getElementById('rbg-crop-apply');
    els.cropDims = document.getElementById('rbg-crop-dims');
    els.cropRatios = Array.from(document.querySelectorAll('.rbg-crop-ratio'));
  }

  function init() {
    cacheEls();
    currentLang = detectInitialLang();
    applyI18nDom();
    applyTheme(detectInitialTheme());

    bindDropZone();
    bindEditTools();
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
