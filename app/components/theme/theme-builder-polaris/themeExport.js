import JSZip from 'jszip';

// ── Helpers ───────────────────────────────────────────────────────────────────

function getContrastColor(hex) {
  if (!hex || hex.length < 7) return '#ffffff';
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 0.5 ? '#171717' : '#ffffff';
}

const TEXT_ON_LIGHT = '#171717';
const TEXT_MUTED = '#525252';

// ── Settings that are valid in the Shopify section {% schema %} ───────────────
// Only these keys will be written to the exported template JSON.
// Preview-only keys like title/price/description/images (used in the app
// builder) are stripped — the actual product page uses Shopify's `product`
// Liquid object at render time.
const VALID_EXPORT_SETTINGS = {
  'announcement-bar': ['text', 'background', 'color'],
  header: ['logoText', 'logoUrl', 'menu', 'sticky', 'background', 'text_color'],
  hero: ['heading', 'subheading', 'imageUrl', 'buttonText', 'buttonLink', 'align', 'background', 'text_color'],
  'rich-text': ['heading', 'body', 'background', 'text_color'],
  'image-with-text': ['heading', 'body', 'imageUrl', 'background', 'text_color'],
  'featured-collection': ['heading', 'collectionHandle', 'productsToShow', 'background', 'text_color'],
  'product-grid': ['heading', 'columns', 'productsToShow', 'background', 'text_color'],
  'product-page': ['layout', 'showThumbnails', 'showBuyButtons', 'background', 'text_color'],
  testimonial: ['heading', 'testimonials', 'background', 'text_color'],
  newsletter: ['heading', 'body', 'placeholder', 'buttonText', 'background', 'text_color'],
  footer: ['copyright', 'logoUrl', 'links', 'background', 'text_color'],
  'social-links': ['heading', 'body', 'facebookUrl', 'instagramUrl', 'twitterUrl', 'background', 'text_color'],
};

// ── Section schemas (for {% schema %} blocks) ─────────────────────────────────
const SECTION_SCHEMAS = {
  'announcement-bar': {
    name: 'Announcement Bar',
    settings: [
      { type: 'textarea', id: 'text', label: 'Announcement text', default: 'Free shipping on all orders over $50' },
      { type: 'color', id: 'background', label: 'Background color', default: '#111827' },
      { type: 'color', id: 'color', label: 'Text color', default: '#ffffff' },
    ],
    presets: [{ name: 'Announcement Bar' }],
  },
  header: {
    name: 'Header',
    settings: [
      { type: 'text', id: 'logoText', label: 'Logo text (fallback)', default: 'Your Store' },
      { type: 'image_picker', id: 'logoUrl', label: 'Logo image' },
      { type: 'textarea', id: 'menu', label: 'Menu items (comma-separated)', default: 'Home, Shop, About, Contact' },
      { type: 'checkbox', id: 'sticky', label: 'Sticky header', default: true },
      { type: 'color', id: 'background', label: 'Background color', default: '#ffffff' },
      { type: 'color', id: 'text_color', label: 'Text color', default: '#171717' },
    ],
    presets: [{ name: 'Header' }],
  },
  hero: {
    name: 'Hero Banner',
    settings: [
      { type: 'text', id: 'heading', label: 'Heading', default: 'Welcome to our store' },
      { type: 'textarea', id: 'subheading', label: 'Subheading', default: 'Shop the latest arrivals' },
      { type: 'image_picker', id: 'imageUrl', label: 'Banner image' },
      { type: 'text', id: 'buttonText', label: 'Button text', default: 'Shop now' },
      { type: 'url', id: 'buttonLink', label: 'Button link', default: '/collections/all' },
      { type: 'select', id: 'align', label: 'Text alignment', default: 'left', options: [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' },
      ]},
      { type: 'color', id: 'background', label: 'Background color', default: '#FDF8EE' },
      { type: 'color', id: 'text_color', label: 'Text color', default: '#171717' },
    ],
    presets: [{ name: 'Hero Banner' }],
  },
  'rich-text': {
    name: 'Rich Text',
    settings: [
      { type: 'text', id: 'heading', label: 'Heading', default: 'Tell your brand story' },
      { type: 'richtext', id: 'body', label: 'Body', default: '<p>Use this area to explain your brand, campaign, or featured collection.</p>' },
      { type: 'color', id: 'background', label: 'Background color', default: '#ffffff' },
      { type: 'color', id: 'text_color', label: 'Text color', default: '#171717' },
    ],
    presets: [{ name: 'Rich Text' }],
  },
  'image-with-text': {
    name: 'Image With Text',
    settings: [
      { type: 'text', id: 'heading', label: 'Heading', default: 'Crafted for modern commerce' },
      { type: 'richtext', id: 'body', label: 'Body', default: '<p>Pair strong content with visual merchandising.</p>' },
      { type: 'image_picker', id: 'imageUrl', label: 'Image' },
      { type: 'color', id: 'background', label: 'Background color', default: '#ffffff' },
      { type: 'color', id: 'text_color', label: 'Text color', default: '#171717' },
    ],
    presets: [{ name: 'Image With Text' }],
  },
  'featured-collection': {
    name: 'Featured Collection',
    settings: [
      { type: 'text', id: 'heading', label: 'Heading', default: 'Featured collection' },
      { type: 'text', id: 'collectionHandle', label: 'Collection handle', default: 'frontpage' },
      { type: 'range', id: 'productsToShow', label: 'Products to show', min: 1, max: 8, step: 1, default: 4 },
      { type: 'color', id: 'background', label: 'Background color', default: '#ffffff' },
      { type: 'color', id: 'text_color', label: 'Text color', default: '#171717' },
    ],
    presets: [{ name: 'Featured Collection' }],
  },
  'product-grid': {
    name: 'Product Grid',
    settings: [
      { type: 'text', id: 'heading', label: 'Heading', default: 'Best sellers' },
      { type: 'range', id: 'columns', label: 'Columns', min: 2, max: 4, step: 1, default: 4 },
      { type: 'range', id: 'productsToShow', label: 'Products to show', min: 2, max: 12, step: 1, default: 8 },
      { type: 'color', id: 'background', label: 'Background color', default: '#ffffff' },
      { type: 'color', id: 'text_color', label: 'Text color', default: '#171717' },
    ],
    presets: [{ name: 'Product Grid' }],
  },
  'product-page': {
    name: 'Product Page',
    settings: [
      { type: 'select', id: 'layout', label: 'Gallery layout', default: 'gallery-left', options: [
        { value: 'gallery-left', label: 'Gallery left' },
        { value: 'gallery-right', label: 'Gallery right' },
        { value: 'gallery-stacked', label: 'Gallery stacked' },
      ]},
      { type: 'checkbox', id: 'showThumbnails', label: 'Show image thumbnails', default: true },
      { type: 'checkbox', id: 'showBuyButtons', label: 'Show buy button', default: true },
      { type: 'color', id: 'background', label: 'Background color', default: '#ffffff' },
      { type: 'color', id: 'text_color', label: 'Text color', default: '#171717' },
    ],
  },
  testimonial: {
    name: 'Testimonials',
    settings: [
      { type: 'text', id: 'heading', label: 'Section heading', default: 'What customers say' },
      { type: 'textarea', id: 'testimonials', label: 'Testimonials (JSON array)', default: '[{"quote":"Great product!","author":"Happy Customer"}]' },
      { type: 'color', id: 'background', label: 'Background color', default: '#ffffff' },
      { type: 'color', id: 'text_color', label: 'Text color', default: '#171717' },
    ],
    presets: [{ name: 'Testimonials' }],
  },
  newsletter: {
    name: 'Newsletter',
    settings: [
      { type: 'text', id: 'heading', label: 'Heading', default: 'Stay in the loop' },
      { type: 'textarea', id: 'body', label: 'Body text', default: 'Subscribe for offers, product drops, and store updates.' },
      { type: 'text', id: 'placeholder', label: 'Input placeholder', default: 'Enter your email' },
      { type: 'text', id: 'buttonText', label: 'Button text', default: 'Subscribe' },
      { type: 'color', id: 'background', label: 'Background color', default: '#E94D4D' },
      { type: 'color', id: 'text_color', label: 'Text color', default: '#ffffff' },
    ],
    presets: [{ name: 'Newsletter' }],
  },
  footer: {
    name: 'Footer',
    settings: [
      { type: 'text', id: 'copyright', label: 'Copyright text', default: '© 2026 Your Store' },
      { type: 'image_picker', id: 'logoUrl', label: 'Footer logo' },
      { type: 'textarea', id: 'links', label: 'Footer links (comma-separated)', default: 'Privacy Policy, Terms of Service, Contact' },
      { type: 'color', id: 'background', label: 'Background color', default: '#ffffff' },
      { type: 'color', id: 'text_color', label: 'Text color', default: '#525252' },
    ],
    presets: [{ name: 'Footer' }],
  },
  'social-links': {
    name: 'Social Links',
    settings: [
      { type: 'text', id: 'heading', label: 'Heading', default: 'Follow us' },
      { type: 'textarea', id: 'body', label: 'Body text', default: 'Stay connected on social media.' },
      { type: 'url', id: 'facebookUrl', label: 'Facebook URL', default: '' },
      { type: 'url', id: 'instagramUrl', label: 'Instagram URL', default: '' },
      { type: 'url', id: 'twitterUrl', label: 'Twitter / X URL', default: '' },
      { type: 'color', id: 'background', label: 'Background color', default: '#ffffff' },
      { type: 'color', id: 'text_color', label: 'Text color', default: '#171717' },
    ],
    presets: [{ name: 'Social Links' }],
  },
};

// ── Liquid section file generator ─────────────────────────────────────────────

function buildSectionLiquid(type) {
  const schema = SECTION_SCHEMAS[type];
  if (!schema) return `<section class="section-${type}"><div class="page-width"><!-- ${type} --></div></section>\n\n{% schema %}\n{ "name": "${type}" }\n{% endschema %}`;

  const schemaJson = JSON.stringify(schema, null, 2);

  const templates = {
    'announcement-bar': `<div class="announcement-bar" style="background: {{ section.settings.background }}; color: {{ section.settings.color }};">
  <div class="page-width announcement-bar__inner">
    <p class="announcement-bar__text">{{ section.settings.text }}</p>
  </div>
</div>`,

    header: `{%- assign sticky_class = '' -%}
{%- if section.settings.sticky -%}{%- assign sticky_class = ' section-header--sticky' -%}{%- endif -%}
<header class="section-header{{ sticky_class }}"{% if section.settings.background != blank %} style="background: {{ section.settings.background }};"{% endif %}>
  <div class="page-width">
    <div class="header__inner"{% if section.settings.text_color != blank %} style="color: {{ section.settings.text_color }};"{% endif %}>
      <a href="{{ routes.root_url }}" class="header__logo">
        {%- if section.settings.logoUrl != blank -%}
          <img src="{{ section.settings.logoUrl }}" alt="{{ section.settings.logoText | default: shop.name | escape }}" class="header__logo-img" loading="eager" width="180" height="48">
        {%- else -%}
          <span class="header__logo-text">{{ section.settings.logoText | default: shop.name }}</span>
        {%- endif -%}
      </a>
      <nav class="header__nav" aria-label="Main navigation">
        {%- assign menu_items = section.settings.menu | split: ',' -%}
        {%- for item in menu_items -%}
          <a href="#" class="header__link">{{ item | strip }}</a>
        {%- endfor -%}
      </nav>
    </div>
  </div>
</header>`,

    hero: `<section class="hero hero--{{ section.settings.align }}"
  {%- if section.settings.imageUrl != blank -%}
    style="background: linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url({{ section.settings.imageUrl }}) center/cover no-repeat;"
  {%- elsif section.settings.background != blank -%}
    style="background: {{ section.settings.background }};"
  {%- endif -%}
>
  <div class="page-width">
    <div class="hero__content">
      <h1 class="hero__heading"{% if section.settings.text_color != blank %} style="color: {{ section.settings.text_color }};"{% endif %}>
        {{ section.settings.heading }}
      </h1>
      <p class="hero__subheading"{% if section.settings.text_color != blank %} style="color: {{ section.settings.text_color }}; opacity: 0.85;"{% endif %}>
        {{ section.settings.subheading }}
      </p>
      {%- if section.settings.buttonText != blank -%}
        <a href="{{ section.settings.buttonLink | default: routes.all_products_collection_url }}" class="hero__button button">
          {{ section.settings.buttonText }}
        </a>
      {%- endif -%}
    </div>
  </div>
</section>`,

    'rich-text': `<section class="rich-text"{% if section.settings.background != blank %} style="background: {{ section.settings.background }};"{% endif %}>
  <div class="page-width"{% if section.settings.text_color != blank %} style="color: {{ section.settings.text_color }};"{% endif %}>
    <h2 class="rich-text__heading">{{ section.settings.heading }}</h2>
    <div class="rich-text__body">{{ section.settings.body }}</div>
  </div>
</section>`,

    'image-with-text': `<section class="image-with-text"{% if section.settings.background != blank %} style="background: {{ section.settings.background }};"{% endif %}>
  <div class="page-width">
    <div class="image-with-text__grid">
      <div class="image-with-text__media">
        {%- if section.settings.imageUrl != blank -%}
          <img src="{{ section.settings.imageUrl }}" alt="{{ section.settings.heading | escape }}" loading="lazy" width="800" height="600">
        {%- else -%}
          {{ 'image' | placeholder_svg_tag: 'placeholder' }}
        {%- endif -%}
      </div>
      <div class="image-with-text__content"{% if section.settings.text_color != blank %} style="color: {{ section.settings.text_color }};"{% endif %}>
        <h2 class="image-with-text__heading">{{ section.settings.heading }}</h2>
        <div class="image-with-text__body">{{ section.settings.body }}</div>
      </div>
    </div>
  </div>
</section>`,

    'featured-collection': `{%- assign col = collections[section.settings.collectionHandle] | default: collections.frontpage -%}
<section class="featured-collection"{% if section.settings.background != blank %} style="background: {{ section.settings.background }};"{% endif %}>
  <div class="page-width"{% if section.settings.text_color != blank %} style="color: {{ section.settings.text_color }};"{% endif %}>
    <h2 class="section-heading">{{ section.settings.heading }}</h2>
    <div class="product-grid">
      {%- for product in col.products limit: section.settings.productsToShow -%}
        {% render 'product-card', product: product %}
      {%- endfor -%}
      {%- assign fetched = col.products | size -%}
      {%- if fetched < section.settings.productsToShow -%}
        {%- assign placeholders = section.settings.productsToShow | minus: fetched -%}
        {%- for i in (1..placeholders) -%}
          {% render 'product-card-placeholder' %}
        {%- endfor -%}
      {%- endif -%}
    </div>
  </div>
</section>`,

    'product-grid': `{%- assign col = collections.all -%}
<section class="product-grid-section"{% if section.settings.background != blank %} style="background: {{ section.settings.background }};"{% endif %}>
  <div class="page-width"{% if section.settings.text_color != blank %} style="color: {{ section.settings.text_color }};"{% endif %}>
    <h2 class="section-heading">{{ section.settings.heading }}</h2>
    <div class="product-grid product-grid--{{ section.settings.columns }}-col">
      {%- for product in col.products limit: section.settings.productsToShow -%}
        {% render 'product-card', product: product %}
      {%- endfor -%}
      {%- assign fetched = col.products | size -%}
      {%- if fetched < section.settings.productsToShow -%}
        {%- assign placeholders = section.settings.productsToShow | minus: fetched -%}
        {%- for i in (1..placeholders) -%}
          {% render 'product-card-placeholder' %}
        {%- endfor -%}
      {%- endif -%}
    </div>
  </div>
</section>`,

    // product-page: uses Shopify's `product` object — settings are style overrides only
    'product-page': `{%- assign current_variant = product.selected_or_first_available_variant -%}
<section class="product-page product-page--{{ section.settings.layout | default: 'gallery-left' }}"{% if section.settings.background != blank %} style="background: {{ section.settings.background }};"{% endif %}>
  <div class="page-width">
    <div class="product-page__grid"{% if section.settings.text_color != blank %} style="color: {{ section.settings.text_color }};"{% endif %}>

      {%- comment -%} Media gallery {%- endcomment -%}
      <div class="product-page__media">
        {%- if product.featured_image -%}
          <div class="product-page__main-image">
            <img
              src="{{ product.featured_image | image_url: width: 1200 }}"
              alt="{{ product.featured_image.alt | default: product.title | escape }}"
              width="1200"
              height="1200"
              loading="eager"
            >
          </div>
          {%- if section.settings.showThumbnails and product.images.size > 1 -%}
            <div class="product-page__thumbs">
              {%- for image in product.images -%}
                <button
                  type="button"
                  class="product-page__thumb{% if forloop.first %} active{% endif %}"
                  data-src="{{ image | image_url: width: 1200 }}"
                  aria-label="View image {{ forloop.index }}"
                >
                  <img src="{{ image | image_url: width: 120 }}" alt="{{ image.alt | default: product.title | escape }}" width="120" height="120" loading="lazy">
                </button>
              {%- endfor -%}
            </div>
          {%- endif -%}
        {%- else -%}
          {{ 'product-1' | placeholder_svg_tag: 'placeholder' }}
        {%- endif -%}
      </div>

      {%- comment -%} Product info {%- endcomment -%}
      <div class="product-page__content">
        <p class="product-page__vendor">{{ product.vendor }}</p>
        <h1 class="product-page__title">{{ product.title }}</h1>
        <p class="product-page__price">
          <span class="price">{{ current_variant.price | money }}</span>
          {%- if current_variant.compare_at_price > current_variant.price -%}
            <s class="price--compare">{{ current_variant.compare_at_price | money }}</s>
          {%- endif -%}
        </p>
        <div class="product-page__description">{{ product.description }}</div>

        {%- if section.settings.showBuyButtons -%}
          {%- form 'product', product, id: 'product-form', novalidate: 'novalidate' -%}
            <input type="hidden" name="id" value="{{ current_variant.id }}">
            {%- unless product.has_only_default_variant -%}
              <div class="product-page__variants">
                {%- for option in product.options_with_values -%}
                  <label class="variant-label">{{ option.name }}</label>
                  <select name="options[{{ option.name | escape }}]" class="variant-select">
                    {%- for value in option.values -%}
                      <option value="{{ value | escape }}"{% if option.selected_value == value %} selected{% endif %}>
                        {{ value }}
                      </option>
                    {%- endfor -%}
                  </select>
                {%- endfor -%}
              </div>
            {%- endunless -%}
            <div class="product-page__quantity">
              <label for="qty-{{ section.id }}">Quantity</label>
              <input id="qty-{{ section.id }}" type="number" name="quantity" value="1" min="1" class="qty-input">
            </div>
            <button type="submit" class="button product-page__add"{% unless current_variant.available %} disabled{% endunless %}>
              {%- if current_variant.available -%}Add to cart{%- else -%}Sold out{%- endif -%}
            </button>
          {%- endform -%}
        {%- endif -%}
      </div>

    </div>
  </div>
</section>

<script>
  (function () {
    var section = document.querySelector('.product-page');
    if (!section) return;
    var mainImg = section.querySelector('.product-page__main-image img');
    var thumbs = section.querySelectorAll('.product-page__thumb');
    thumbs.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (mainImg) mainImg.src = btn.dataset.src;
        thumbs.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
      });
    });
    var variantSelects = section.querySelectorAll('.variant-select');
    variantSelects.forEach(function (sel) {
      sel.addEventListener('change', function () {
        var form = section.querySelector('#product-form');
        if (!form) return;
        var params = new URLSearchParams(new FormData(form)).toString();
        fetch(window.location.pathname + '?' + params, { headers: { 'Accept': 'application/json' } })
          .then(function (r) { return r.json(); })
          .catch(function () {});
      });
    });
  })();
</script>`,

    testimonial: `<section class="testimonial testimonial-slider" id="testimonial-{{ section.id }}"{% if section.settings.background != blank %} style="background: {{ section.settings.background }};"{% endif %}>
  <div class="page-width testimonial-slider__inner"{% if section.settings.text_color != blank %} style="color: {{ section.settings.text_color }};"{% endif %}>
    <p class="testimonial__label">{{ section.settings.heading }}</p>
    <div class="testimonial-slider__content">
      <blockquote class="testimonial__quote testimonial-slider__quote"></blockquote>
      <p class="testimonial__author testimonial-slider__author"></p>
    </div>
    <div class="testimonial-slider__nav" style="display:none">
      <button type="button" class="testimonial-slider__prev" aria-label="Previous testimonial">&#8249;</button>
      <button type="button" class="testimonial-slider__next" aria-label="Next testimonial">&#8250;</button>
    </div>
    <div class="testimonial-slider__dots"></div>
  </div>
  {%- comment -%}
    Testimonials are stored as a JSON string in a textarea setting.
    We output it directly (no | json filter) so the browser receives valid JSON.
  {%- endcomment -%}
  <script type="application/json" id="t-data-{{ section.id }}">{{ section.settings.testimonials | default: '[]' }}</script>
  <script>
    (function () {
      var dataEl = document.getElementById('t-data-{{ section.id }}');
      var sectionEl = dataEl && dataEl.closest('section');
      if (!dataEl || !sectionEl) return;
      var testimonials;
      try {
        var raw = JSON.parse(dataEl.textContent);
        testimonials = typeof raw === 'string' ? JSON.parse(raw) : (Array.isArray(raw) ? raw : []);
      } catch (e) { testimonials = []; }
      var inner = sectionEl.querySelector('.testimonial-slider__inner');
      var quoteEl = inner.querySelector('.testimonial-slider__quote');
      var authorEl = inner.querySelector('.testimonial-slider__author');
      if (!testimonials.length) {
        quoteEl.textContent = '\u201cAdd your testimonials in the theme editor.\u201d';
        authorEl.textContent = '\u2014';
        return;
      }
      var idx = 0;
      function show() {
        var t = testimonials[idx] || {};
        quoteEl.textContent = '\u201c' + (t.quote || '') + '\u201d';
        authorEl.textContent = '\u2014 ' + (t.author || '');
      }
      function updateDots() {
        sectionEl.querySelectorAll('.testimonial-slider__dot').forEach(function (d, i) {
          d.classList.toggle('active', i === idx);
        });
      }
      if (testimonials.length > 1) {
        inner.querySelector('.testimonial-slider__nav').style.display = 'flex';
        inner.querySelector('.testimonial-slider__prev').onclick = function () {
          idx = (idx - 1 + testimonials.length) % testimonials.length; show(); updateDots();
        };
        inner.querySelector('.testimonial-slider__next').onclick = function () {
          idx = (idx + 1) % testimonials.length; show(); updateDots();
        };
        var dotsEl = inner.querySelector('.testimonial-slider__dots');
        dotsEl.innerHTML = testimonials.map(function (_, i) {
          return '<button type="button" class="testimonial-slider__dot' + (i === 0 ? ' active' : '') + '" aria-label="Slide ' + (i + 1) + '"></button>';
        }).join('');
        dotsEl.querySelectorAll('.testimonial-slider__dot').forEach(function (btn, i) {
          btn.onclick = function () { idx = i; show(); updateDots(); };
        });
      }
      show(); updateDots();
    })();
  </script>
</section>`,

    newsletter: `<section class="newsletter"{% if section.settings.background != blank %} style="background: {{ section.settings.background }};"{% endif %}>
  <div class="page-width"{% if section.settings.text_color != blank %} style="color: {{ section.settings.text_color }};"{% endif %}>
    <h2 class="newsletter__heading">{{ section.settings.heading }}</h2>
    <p class="newsletter__body">{{ section.settings.body }}</p>
    {%- form 'customer', class: 'newsletter__form' -%}
      <input type="hidden" name="contact[tags]" value="newsletter">
      <input
        type="email"
        name="contact[email]"
        id="newsletter-email-{{ section.id }}"
        placeholder="{{ section.settings.placeholder }}"
        class="newsletter__input"
        autocomplete="email"
        aria-label="{{ section.settings.placeholder }}"
        required
      >
      <button type="submit" class="newsletter__button button">
        {{ section.settings.buttonText | default: 'Subscribe' }}
      </button>
    {%- endform -%}
  </div>
</section>`,

    footer: `<footer class="section-footer"{% if section.settings.background != blank %} style="background: {{ section.settings.background }};"{% endif %}>
  <div class="page-width">
    <div class="footer__inner"{% if section.settings.text_color != blank %} style="color: {{ section.settings.text_color }};"{% endif %}>
      <div class="footer__brand">
        {%- if section.settings.logoUrl != blank -%}
          <a href="{{ routes.root_url }}" class="footer__logo-link">
            <img src="{{ section.settings.logoUrl }}" alt="{{ shop.name | escape }}" class="footer__logo-img" loading="lazy" width="120" height="40">
          </a>
        {%- endif -%}
        <p class="footer__copyright">{{ section.settings.copyright }}</p>
      </div>
      <div class="footer__links">
        {%- assign link_items = section.settings.links | split: ',' -%}
        {%- for item in link_items -%}
          <a href="#" class="footer__link">{{ item | strip }}</a>
        {%- endfor -%}
      </div>
    </div>
  </div>
</footer>`,

    'social-links': `<section class="social-links"{% if section.settings.background != blank %} style="background: {{ section.settings.background }};"{% endif %}>
  <div class="page-width"{% if section.settings.text_color != blank %} style="color: {{ section.settings.text_color }};"{% endif %}>
    <h2 class="section-heading">{{ section.settings.heading }}</h2>
    <p class="social-links__body">{{ section.settings.body }}</p>
    <div class="social-links__icons">
      {%- if section.settings.facebookUrl != blank -%}
        <a href="{{ section.settings.facebookUrl }}" class="social-links__link" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a>
      {%- endif -%}
      {%- if section.settings.instagramUrl != blank -%}
        <a href="{{ section.settings.instagramUrl }}" class="social-links__link" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
      {%- endif -%}
      {%- if section.settings.twitterUrl != blank -%}
        <a href="{{ section.settings.twitterUrl }}" class="social-links__link" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X">Twitter</a>
      {%- endif -%}
    </div>
  </div>
</section>`,
  };

  const body = templates[type] || `<section class="section-${type}"><div class="page-width"><!-- ${type} --></div></section>`;
  return `${body}\n\n{% schema %}\n${schemaJson}\n{% endschema %}`;
}

// ── layout/theme.liquid ───────────────────────────────────────────────────────
const LAYOUT_THEME = `<!DOCTYPE html>
<html lang="{{ request.locale.iso_code }}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="{{ page_description | escape }}">
  <title>
    {{ page_title }}
    {%- if current_tags %} &ndash; {{ 'general.meta.tags' | t: tags: current_tags | join: ', ' }}{% endif -%}
    {%- if current_page != 1 %} &ndash; {{ 'general.meta.page' | t: page: current_page }}{% endif -%}
    {%- unless page_title contains shop.name %} &ndash; {{ shop.name }}{% endunless -%}
  </title>
  {{ content_for_header }}
  {{ 'base.css' | asset_url | stylesheet_tag }}
</head>
<body class="template-{{ template.name }}">
  {{ content_for_layout }}
</body>
</html>`;

// ── assets/base.css (pure CSS — no Liquid, so no .liquid extension) ───────────
const ASSETS_BASE_CSS = `/* ============================================================
   Theme Creator — Base Stylesheet
   ============================================================ */

/* Reset & base */
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #111827; }
img, video { max-width: 100%; display: block; }
a { color: inherit; }
button { cursor: pointer; font: inherit; }

/* Page width container */
.page-width { max-width: 1200px; margin: 0 auto; padding: 0 20px; }

/* ── Utility button ──────────────────────────────────────── */
.button {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: opacity .15s, transform .1s;
}
.button:hover { opacity: .88; transform: translateY(-1px); }
.button:active { transform: translateY(0); }

/* ── Announcement bar ────────────────────────────────────── */
.announcement-bar { padding: 10px 0; font-size: 13px; font-weight: 500; text-align: center; }
.announcement-bar__inner { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 8px; }

/* ── Header ──────────────────────────────────────────────── */
.section-header { border-bottom: 1px solid rgba(0,0,0,.08); }
.section-header--sticky { position: sticky; top: 0; z-index: 100; }
.header__inner { display: flex; justify-content: space-between; align-items: center; padding: 14px 0; gap: 16px; }
.header__logo { font-size: 1.2rem; font-weight: 700; text-decoration: none; color: inherit; }
.header__logo-text { letter-spacing: -.02em; }
.header__logo-img { height: 40px; width: auto; max-width: 160px; object-fit: contain; }
@media (min-width: 768px) { .header__logo-img { height: 48px; max-width: 200px; } }
.header__nav { display: flex; gap: 24px; flex-wrap: wrap; align-items: center; }
.header__link { font-size: 14px; font-weight: 500; text-decoration: none; opacity: .8; transition: opacity .15s; }
.header__link:hover { opacity: 1; }

/* ── Hero ────────────────────────────────────────────────── */
.hero { padding: 80px 0; display: flex; align-items: center; min-height: 340px; background-size: cover; background-position: center; }
.hero--center .hero__content { text-align: center; }
.hero--right .hero__content { text-align: right; }
.hero__heading { font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 800; margin: 0; line-height: 1.15; letter-spacing: -.03em; }
.hero__subheading { margin: 16px 0 0; font-size: 1rem; opacity: .75; max-width: 520px; }
.hero--center .hero__subheading { margin-left: auto; margin-right: auto; }
.hero__button { margin-top: 28px; background: #111827; color: #fff; }

/* ── Rich text ───────────────────────────────────────────── */
.rich-text { padding: 60px 0; }
.rich-text__heading { font-size: 1.6rem; font-weight: 700; margin: 0 0 14px; }
.rich-text__body { font-size: 15px; line-height: 1.7; opacity: .85; }

/* ── Image with text ─────────────────────────────────────── */
.image-with-text { padding: 60px 0; }
.image-with-text__grid { display: grid; gap: 32px; }
@media (min-width: 768px) { .image-with-text__grid { grid-template-columns: 1fr 1fr; align-items: center; } }
.image-with-text__media img { width: 100%; height: 320px; object-fit: cover; border-radius: 12px; }
.image-with-text__heading { font-size: 1.5rem; font-weight: 700; margin: 0 0 14px; }
.image-with-text__body { font-size: 15px; line-height: 1.7; opacity: .85; }

/* ── Section heading ─────────────────────────────────────── */
.section-heading { font-size: 1.35rem; font-weight: 700; margin: 0 0 24px; letter-spacing: -.01em; }

/* ── Product grid / featured collection ──────────────────── */
.featured-collection,
.product-grid-section { padding: 60px 0; }
.product-grid { display: grid; gap: 20px; grid-template-columns: repeat(2, 1fr); }
@media (min-width: 640px) { .product-grid--3-col { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 768px) {
  .product-grid--2-col { grid-template-columns: repeat(2, 1fr); }
  .product-grid--3-col { grid-template-columns: repeat(3, 1fr); }
  .product-grid--4-col { grid-template-columns: repeat(4, 1fr); }
}

/* ── Product card ────────────────────────────────────────── */
.product-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; transition: box-shadow .2s, transform .2s; }
.product-card:hover { box-shadow: 0 12px 28px rgba(0,0,0,.1); transform: translateY(-2px); }
.product-card__media-link { display: block; text-decoration: none; color: inherit; }
.product-card__media { position: relative; aspect-ratio: 1; overflow: hidden; background: #f8fafc; }
.product-card__image { width: 100%; height: 100%; object-fit: cover; display: block; }
.product-card__placeholder { width: 100%; height: 100%; display: block; }
.product-card__badge { position: absolute; top: 8px; left: 8px; background: #111827; color: #fff; border-radius: 999px; padding: 3px 10px; font-size: 11px; font-weight: 700; }
.product-card__content { padding: 12px; display: flex; flex-direction: column; gap: 4px; }
.product-card__eyebrow { margin: 0; color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: .06em; }
.product-card__title { margin: 0; font-size: 14px; font-weight: 600; line-height: 1.3; }
.product-card__title a { text-decoration: none; color: inherit; }
.product-card__title a:hover { text-decoration: underline; }
.product-card__price-row { display: flex; align-items: center; gap: 8px; margin-top: 4px; flex-wrap: wrap; }
.product-card__price { font-size: 14px; font-weight: 700; }
.product-card__compare { font-size: 13px; color: #9ca3af; text-decoration: line-through; }
/* Placeholder card */
.product-card--placeholder { pointer-events: none; }
.product-card__image-placeholder { width: 100%; height: 100%; background: linear-gradient(110deg, #e5e7eb 30%, #f3f4f6 50%, #e5e7eb 70%); background-size: 200% 100%; animation: shimmer 1.4s infinite; }
.product-card__title-placeholder { height: 14px; border-radius: 999px; background: #e5e7eb; width: 75%; }
.product-card__price-placeholder { height: 13px; border-radius: 999px; background: #e5e7eb; width: 50px; }
.product-card__compare-placeholder { height: 12px; border-radius: 999px; background: #f3f4f6; width: 40px; }
@keyframes shimmer { to { background-position: -200% 0; } }

/* ── Product page ────────────────────────────────────────── */
.product-page { padding: 48px 0; }
.product-page__grid { display: grid; gap: 40px; }
@media (min-width: 768px) {
  .product-page--gallery-left .product-page__grid,
  .product-page--gallery-right .product-page__grid { grid-template-columns: 1fr 1fr; align-items: flex-start; }
  .product-page--gallery-right .product-page__media { order: 2; }
  .product-page--gallery-right .product-page__content { order: 1; }
}
.product-page__main-image img { width: 100%; border-radius: 12px; }
.product-page__thumbs { display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap; }
.product-page__thumb { padding: 0; border: 2px solid transparent; border-radius: 8px; overflow: hidden; cursor: pointer; background: none; transition: border-color .15s; }
.product-page__thumb.active,
.product-page__thumb:hover { border-color: #111827; }
.product-page__thumb img { width: 64px; height: 64px; object-fit: cover; display: block; }
.product-page__vendor { margin: 0 0 8px; font-size: 12px; text-transform: uppercase; letter-spacing: .08em; color: #9ca3af; }
.product-page__title { font-size: clamp(1.4rem, 2.5vw, 2rem); font-weight: 800; margin: 0 0 12px; letter-spacing: -.02em; }
.product-page__price { display: flex; align-items: baseline; gap: 10px; margin: 0 0 18px; }
.product-page__price .price { font-size: 1.4rem; font-weight: 700; }
.product-page__price .price--compare { font-size: 1rem; color: #9ca3af; text-decoration: line-through; }
.product-page__description { font-size: 15px; line-height: 1.7; color: #374151; margin-bottom: 24px; }
.product-page__variants { margin-bottom: 20px; }
.variant-label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; }
.variant-select { width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; background: #fff; margin-bottom: 14px; }
.product-page__quantity { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
.product-page__quantity label { font-size: 13px; font-weight: 600; }
.qty-input { width: 72px; padding: 10px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; text-align: center; }
.product-page__add { width: 100%; padding: 16px; font-size: 16px; font-weight: 700; background: #111827; color: #fff; border-radius: 10px; border: none; }
.product-page__add:disabled { background: #d1d5db; cursor: not-allowed; }

/* ── Testimonials ────────────────────────────────────────── */
.testimonial { padding: 60px 0; }
.testimonial-slider__inner { position: relative; padding: 0 44px; }
.testimonial__label { font-size: 11px; text-transform: uppercase; letter-spacing: .18em; color: #6b7280; margin: 0 0 20px; }
.testimonial__quote { font-size: 1.15rem; font-weight: 500; line-height: 1.55; margin: 0 0 14px; }
.testimonial__author { font-size: 13px; color: #6b7280; margin: 0; }
.testimonial-slider__nav { display: flex; gap: 8px; position: absolute; top: 50%; left: 0; right: 0; transform: translateY(-50%); justify-content: space-between; pointer-events: none; padding: 0 4px; }
.testimonial-slider__nav button { pointer-events: auto; width: 36px; height: 36px; border: 1px solid #e5e7eb; background: #fff; border-radius: 50%; font-size: 1.2rem; cursor: pointer; transition: background .15s; display: flex; align-items: center; justify-content: center; }
.testimonial-slider__nav button:hover { background: #f9fafb; }
.testimonial-slider__dots { display: flex; justify-content: center; gap: 6px; margin-top: 20px; }
.testimonial-slider__dot { width: 7px; height: 7px; border: none; border-radius: 50%; background: #d1d5db; cursor: pointer; padding: 0; transition: background .2s; }
.testimonial-slider__dot.active { background: #111827; }

/* ── Newsletter ──────────────────────────────────────────── */
.newsletter { padding: 60px 0; }
.newsletter__heading { font-size: 1.5rem; font-weight: 700; margin: 0 0 10px; }
.newsletter__body { font-size: 15px; margin: 0 0 20px; opacity: .85; }
.newsletter__form { display: flex; gap: 10px; flex-wrap: wrap; max-width: 480px; }
.newsletter__input { flex: 1; min-width: 200px; padding: 12px 16px; border-radius: 8px; border: 1px solid rgba(255,255,255,.25); background: rgba(255,255,255,.12); color: inherit; font-size: 14px; }
.newsletter__input::placeholder { opacity: .65; }
.newsletter__button { padding: 12px 22px; background: #fff; color: #111; border: none; border-radius: 8px; font-weight: 700; font-size: 14px; }

/* ── Footer ──────────────────────────────────────────────── */
.section-footer { padding: 32px 0; border-top: 1px solid #e5e7eb; }
.footer__inner { display: flex; flex-direction: column; gap: 16px; }
@media (min-width: 640px) { .footer__inner { flex-direction: row; justify-content: space-between; align-items: center; } }
.footer__brand { display: flex; flex-direction: column; gap: 8px; }
.footer__logo-link { display: inline-block; }
.footer__logo-img { height: 32px; width: auto; max-width: 110px; object-fit: contain; }
.footer__copyright { font-size: 13px; opacity: .6; margin: 0; }
.footer__links { display: flex; gap: 18px; flex-wrap: wrap; }
.footer__link { font-size: 13px; text-decoration: none; opacity: .7; transition: opacity .15s; }
.footer__link:hover { opacity: 1; }

/* ── Social links ────────────────────────────────────────── */
.social-links { padding: 40px 0; }
.social-links__body { font-size: 14px; opacity: .8; margin: 8px 0 18px; }
.social-links__icons { display: flex; gap: 14px; flex-wrap: wrap; }
.social-links__link { font-size: 14px; font-weight: 600; text-decoration: none; opacity: .75; transition: opacity .15s; }
.social-links__link:hover { opacity: 1; }
`;

// ── Snippets ──────────────────────────────────────────────────────────────────

const SNIPPET_PRODUCT_CARD = `{%- comment -%} snippets/product-card.liquid — Generated by Theme Creator {%- endcomment -%}
<article class="product-card">
  <a class="product-card__media-link" href="{{ product.url | within: collection }}">
    <div class="product-card__media">
      {%- if product.featured_image -%}
        <img
          class="product-card__image"
          src="{{ product.featured_image | image_url: width: 720 }}"
          alt="{{ product.featured_image.alt | default: product.title | escape }}"
          loading="lazy"
          width="720"
          height="720"
        >
      {%- else -%}
        {{ 'product-1' | placeholder_svg_tag: 'product-card__placeholder' }}
      {%- endif -%}
      {%- if product.compare_at_price > product.price -%}
        <span class="product-card__badge">Sale</span>
      {%- endif -%}
    </div>
  </a>
  <div class="product-card__content">
    <p class="product-card__eyebrow">{{ product.vendor }}</p>
    <h3 class="product-card__title">
      <a href="{{ product.url | within: collection }}">{{ product.title }}</a>
    </h3>
    <div class="product-card__price-row">
      <span class="product-card__price">{{ product.price | money }}</span>
      {%- if product.compare_at_price > product.price -%}
        <s class="product-card__compare">{{ product.compare_at_price | money }}</s>
      {%- endif -%}
    </div>
  </div>
</article>`;

const SNIPPET_PRODUCT_CARD_PLACEHOLDER = `{%- comment -%} snippets/product-card-placeholder.liquid {%- endcomment -%}
<article class="product-card product-card--placeholder" aria-hidden="true">
  <div class="product-card__media">
    <div class="product-card__image-placeholder"></div>
  </div>
  <div class="product-card__content">
    <p class="product-card__eyebrow" style="visibility:hidden">—</p>
    <div class="product-card__title-placeholder"></div>
    <div class="product-card__price-row" style="margin-top: 8px;">
      <div class="product-card__price-placeholder"></div>
      <div class="product-card__compare-placeholder"></div>
    </div>
  </div>
</article>`;

// ── Color resolution ──────────────────────────────────────────────────────────

function getEffectiveColors(section, themeColors = {}) {
  const primary = themeColors.primary || '#E94D4D';
  const secondary = themeColors.secondary || '#FDF8EE';
  const textOnPrimary = getContrastColor(primary);
  const overrides = section.styleOverrides || {};
  const bg = overrides.background?.trim() || undefined;
  const textColor = overrides.textColor?.trim() || undefined;

  let background, text;
  switch (section.type) {
    case 'announcement-bar':
    case 'newsletter':
      background = bg ?? primary;
      text = textColor ?? textOnPrimary;
      break;
    case 'hero': {
      const hasImage = section.settings?.imageUrl && String(section.settings.imageUrl).trim().length > 0;
      background = bg ?? secondary;
      text = textColor ?? (hasImage ? '#ffffff' : TEXT_ON_LIGHT);
      break;
    }
    case 'footer':
      background = bg ?? '#ffffff';
      text = textColor ?? TEXT_MUTED;
      break;
    default:
      background = bg ?? '#ffffff';
      text = textColor ?? TEXT_ON_LIGHT;
  }
  return { background, text };
}

// ── locales/en.default.json ───────────────────────────────────────────────────
const LOCALE_EN = JSON.stringify({
  general: {
    meta: {
      tags: 'Tagged with {{ tags }}',
      page: 'Page {{ page }}',
    },
    password_page: {
      login_form_heading: 'Enter store using password',
      login_form_password_label: 'Password',
      login_form_password_placeholder: 'Your password',
      login_form_submit: 'Enter',
    },
  },
  products: {
    product: {
      add_to_cart: 'Add to cart',
      sold_out: 'Sold out',
      unavailable: 'Unavailable',
    },
  },
}, null, 2);

// ── config/settings_schema.json ───────────────────────────────────────────────
function buildSettingsSchema(themeColors = {}) {
  return JSON.stringify([
    {
      name: 'theme_info',
      theme_name: 'Theme Creator',
      theme_author: 'Theme Creator App',
      theme_version: '1.0.0',
      theme_documentation_url: '',
      theme_support_url: '',
    },
    {
      name: 'Colors',
      settings: [
        { type: 'color', id: 'color_primary', label: 'Primary color', default: themeColors.primary || '#E94D4D' },
        { type: 'color', id: 'color_secondary', label: 'Secondary / background color', default: themeColors.secondary || '#FDF8EE' },
        { type: 'color', id: 'color_text', label: 'Body text color', default: '#111827' },
        { type: 'color', id: 'color_border', label: 'Border color', default: '#e5e7eb' },
      ],
    },
    {
      name: 'Typography',
      settings: [
        { type: 'font_picker', id: 'type_header_font', label: 'Heading font', default: 'helvetica_neue_n7' },
        { type: 'font_picker', id: 'type_body_font', label: 'Body font', default: 'helvetica_neue_n4' },
        { type: 'range', id: 'type_body_size', label: 'Body font size', min: 13, max: 20, step: 1, unit: 'px', default: 16 },
      ],
    },
    {
      name: 'Layout',
      settings: [
        { type: 'range', id: 'page_width', label: 'Page width', min: 900, max: 1600, step: 100, unit: 'px', default: 1200 },
      ],
    },
  ], null, 2);
}

// ── config/settings_data.json ─────────────────────────────────────────────────
function buildSettingsData(themeColors = {}) {
  return JSON.stringify({
    current: {
      color_primary: themeColors.primary || '#E94D4D',
      color_secondary: themeColors.secondary || '#FDF8EE',
      color_text: '#111827',
      color_border: '#e5e7eb',
      type_header_font: 'helvetica_neue_n7',
      type_body_font: 'helvetica_neue_n4',
      type_body_size: 16,
      page_width: 1200,
    },
    presets: {},
  }, null, 2);
}

// ── Main export function ──────────────────────────────────────────────────────

const ALL_SECTION_TYPES = [
  'announcement-bar', 'header', 'hero', 'rich-text', 'image-with-text',
  'featured-collection', 'product-grid', 'product-page',
  'testimonial', 'newsletter', 'footer', 'social-links',
];

export async function exportThemeAsZip({ homeSections = [], productSections = [], themeColors = {}, selectedProduct = null }) {
  const zip = new JSZip();

  // ── Static files ────────────────────────────────────────
  zip.file('layout/theme.liquid', LAYOUT_THEME);
  zip.file('config/settings_schema.json', buildSettingsSchema(themeColors));
  zip.file('config/settings_data.json', buildSettingsData(themeColors));
  zip.file('locales/en.default.json', LOCALE_EN);

  // base.css — pure CSS, no Liquid, referenced as 'base.css' in theme.liquid
  zip.file('assets/base.css', ASSETS_BASE_CSS);

  // Snippets
  zip.file('snippets/product-card.liquid', SNIPPET_PRODUCT_CARD);
  zip.file('snippets/product-card-placeholder.liquid', SNIPPET_PRODUCT_CARD_PLACEHOLDER);

  // Section liquid files — one per section type
  ALL_SECTION_TYPES.forEach((type) => {
    zip.file(`sections/${type}.liquid`, buildSectionLiquid(type));
  });

  // ── JSON template builder ───────────────────────────────
  const toTemplateJson = (sections) => {
    const result = { sections: {}, order: [] };

    sections.forEach((section, index) => {
      const { background, text } = getEffectiveColors(section, themeColors);
      const sectionId = `${section.type.replace(/[^a-z0-9]/gi, '_')}_${index + 1}`;

      // Start with raw section settings, then apply resolved colors
      const rawSettings = { ...section.settings, background, text_color: text };

      // announcement-bar uses `color` (not text_color) in its Liquid + schema
      if (section.type === 'announcement-bar') {
        rawSettings.color = text;
        delete rawSettings.text_color;
      }

      // testimonials: ensure value is a JSON string (not an object/array)
      if (section.type === 'testimonial') {
        const t = rawSettings.testimonials;
        rawSettings.testimonials = Array.isArray(t)
          ? JSON.stringify(t)
          : (typeof t === 'string' ? t : '[]');
      }

      // Strip preview-only / invalid keys — only keep schema-defined setting ids
      const validKeys = VALID_EXPORT_SETTINGS[section.type] || [];
      const cleanSettings = {};
      validKeys.forEach((key) => {
        if (rawSettings[key] !== undefined) cleanSettings[key] = rawSettings[key];
      });

      result.sections[sectionId] = { type: section.type, settings: cleanSettings };
      result.order.push(sectionId);
    });

    return JSON.stringify(result, null, 2);
  };

  zip.file('templates/index.json', toTemplateJson(homeSections));
  zip.file('templates/product.json', toTemplateJson(productSections));

  // ── Generate and download ───────────────────────────────
  const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 6 } });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'shopify-theme.zip';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
