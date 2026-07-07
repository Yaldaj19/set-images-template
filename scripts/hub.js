/* ============================================================
   Home hub — theme, language and i18n for the landing page.
   Standalone classic script (no ES modules).
   ============================================================ */
(function () {
  'use strict';

  const dictionaries = {
    fa: {
      'hub.title': 'ابزارهای تصویر YJ19 — جایگذاری قالب، بهینه‌سازی و حذف پس‌زمینه',
      'hub.name': 'ابزارهای تصویر',
      'hub.tagline': 'مجموعه ابزار تصویر، همه در مرورگر شما',
      'nav.placement': 'جایگذاری قالب',
      'nav.optimizer': 'بهینه‌ساز تصویر',
      'nav.removebg': 'حذف پس‌زمینه',
      'pwa.install': 'نصب اپ',
      'hub.hero.title': 'ابزارهای رایگان تصویر، هر آنچه برای تصویرهات لازم داری',
      'hub.hero.subtitle': 'جایگذاری قالب و واترمارک، بهینه‌سازی و تبدیل فرمت، و حذف پس‌زمینه — همه رایگان، بدون نصب و کاملاً در مرورگر شما. تصاویرتان هرگز آپلود نمی‌شوند.',

      'hub.place.title': 'جایگذاری قالب روی تصاویر',
      'hub.place.desc': 'قالب، واترمارک یا امضات رو یک‌بار آپلود کن و به‌صورت دسته‌ای روی ده‌ها تصویر بنداز؛ خروجی یک فایل ZIP تمیز.',
      'hub.place.how': 'قالب رو بنداز ← تصاویر رو اضافه کن ← فرمت و اندازه رو تنظیم کن ← ZIP بگیر',
      'hub.place.f1': 'درگ‌اند‌دراپ چند تصویر (تا ۳۰۰ تا)',
      'hub.place.f2': 'تنظیم روش جای‌گذاری و فرمت خروجی',
      'hub.place.f3': 'خروجی دسته‌ای ZIP',
      'hub.place.cta': 'باز کردن ابزار جایگذاری',

      'hub.opt.title': 'بهینه‌سازی و تبدیل فرمت',
      'hub.opt.desc': 'یک عکس یا چندین عکس رو یکجا فشرده کن. کراپ، تغییر ابعاد و کیفیت، و تبدیل به WebP، JPEG، PNG یا AVIF.',
      'hub.opt.f1': 'یک تصویر یا دسته‌ای (تا ۵۰ تصویر)',
      'hub.opt.f2': 'کراپ دلخواه + تغییر سایز و کیفیت',
      'hub.opt.f3': 'تبدیل پسوند: WebP / JPEG / PNG / AVIF',
      'hub.opt.f4': 'مقایسه‌ی قبل/بعد و دانلود تکی یا ZIP',
      'hub.opt.cta': 'باز کردن بهینه‌ساز',

      'hub.bg.title': 'حذف پس‌زمینه‌ی تصویر',
      'hub.bg.desc': 'پس‌زمینه‌ی عکس رو حذف کن و خروجی PNG شفاف بگیر — حالت سریع و بدون هوش مصنوعی برای پس‌زمینه‌های ساده، یا حالت هوش مصنوعی برای عکس‌های پیچیده.',
      'hub.bg.f1': 'حالت سریع بدون AI (پس‌زمینه‌ی یکدست)',
      'hub.bg.f2': 'حالت هوش مصنوعی برای سوژه‌های پیچیده',
      'hub.bg.f3': 'خروجی PNG با پس‌زمینه‌ی شفاف',
      'hub.bg.cta': 'حذف پس‌زمینه‌ی تصویر',

      'hub.badge': 'رایگان',
      'hub.privacy': 'تصاویر شما هرگز آپلود نمی‌شوند — همه‌ی پردازش داخل مرورگر خودتان انجام می‌شود.',
      'footer.credit': 'ساخته شده به وسیله',
    },
    en: {
      'hub.title': 'YJ19 Image Tools — Framing, Optimizer & Background Remover',
      'hub.name': 'Image Tools',
      'hub.tagline': 'An image toolkit, all in your browser',
      'nav.placement': 'Frame Tool',
      'nav.optimizer': 'Image Optimizer',
      'nav.removebg': 'Remove Background',
      'pwa.install': 'Install',
      'hub.hero.title': 'Free image tools — everything your images need',
      'hub.hero.subtitle': 'Frame & watermark placement, optimization & format conversion, and background removal — all free, no install, entirely in your browser. Your images are never uploaded.',

      'hub.place.title': 'Frame & Watermark Placement',
      'hub.place.desc': 'Upload your frame, watermark or signature once and batch-apply it across dozens of images — output is one clean ZIP.',
      'hub.place.how': 'Drop frame → add images → set format & fit → download ZIP',
      'hub.place.f1': 'Drag-and-drop many images (up to 300)',
      'hub.place.f2': 'Choose fit mode and output format',
      'hub.place.f3': 'Batch ZIP output',
      'hub.place.cta': 'Open Frame Tool',

      'hub.opt.title': 'Optimize & Convert',
      'hub.opt.desc': 'Compress one image or many at once. Crop, resize, adjust quality, and convert to WebP, JPEG, PNG or AVIF.',
      'hub.opt.f1': 'Single image or batch (up to 50)',
      'hub.opt.f2': 'Freeform crop + resize & quality',
      'hub.opt.f3': 'Convert format: WebP / JPEG / PNG / AVIF',
      'hub.opt.f4': 'Before/after compare, single or ZIP download',
      'hub.opt.cta': 'Open Optimizer',

      'hub.bg.title': 'Background Remover',
      'hub.bg.desc': 'Remove the background and get a transparent PNG — a fast non-AI mode for solid backgrounds, or an AI mode for complex photos.',
      'hub.bg.f1': 'Fast non-AI mode (solid backgrounds)',
      'hub.bg.f2': 'AI mode for complex subjects',
      'hub.bg.f3': 'Transparent PNG output',
      'hub.bg.cta': 'Remove Background',

      'hub.badge': 'Free',
      'hub.privacy': 'Your images are never uploaded — everything runs in your own browser.',
      'footer.credit': 'Made by',
    }
  };

  const LS_LANG = 'frame-studio.lang';
  const LS_THEME = 'frame-studio.theme';
  let currentLang = 'fa';

  function t(key) {
    const dict = dictionaries[currentLang] || dictionaries.fa;
    return dict[key] ?? key;
  }

  function detectInitialLang() {
    const saved = localStorage.getItem(LS_LANG);
    if (saved && dictionaries[saved]) return saved;
    const supported = Object.keys(dictionaries);
    const list = (navigator.languages && navigator.languages.length)
      ? navigator.languages : [navigator.language || ''];
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
    document.title = t('hub.title');
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

  /* ---- Theme ---- */
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

  function init() {
    currentLang = detectInitialLang();
    applyI18nDom();
    applyTheme(detectInitialTheme());

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
