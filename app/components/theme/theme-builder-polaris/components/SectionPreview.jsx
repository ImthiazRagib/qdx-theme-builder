import React from 'react';
import { getContrastColor } from '../libs/methods';
import { TestimonialSlider } from './TestimonialSlider';
import { TEXT_ON_LIGHT, TEXT_MUTED } from '../config/constants';

export function SectionPreview({ section, themeColors = { primary: '#E94D4D', secondary: '#FDF8EE' } }) {
  const { type, settings, styleOverrides = {} } = section;
  const primary = themeColors.primary || '#E94D4D';
  const secondary = themeColors.secondary || '#FDF8EE';
  const textOnPrimary = getContrastColor(primary);
  const bg = styleOverrides.background?.trim() || undefined;
  const textColor = styleOverrides.textColor?.trim() || undefined;

  const resolveBg = (themeBg) => bg ?? themeBg;
  const resolveText = (themeText) => textColor ?? themeText;

  if (type === 'announcement-bar') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 16px', fontSize: 14, fontWeight: 500, background: resolveBg(primary), color: resolveText(textOnPrimary) }}>
        <span style={{ textAlign: 'center' }}>{settings.text}</span>
      </div>
    );
  }

  if (type === 'header') {
    const hasLogo = settings.logoUrl && String(settings.logoUrl).trim().length > 0;
    return (
      <div style={{ borderBottom: '1px solid #e4e4e7', padding: '16px 20px', background: resolveBg('#ffffff') }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <a href="/" style={{ display: 'flex', flexShrink: 0, textDecoration: 'none' }}>
            {hasLogo ? (
              <img src={settings.logoUrl} alt={settings.logoText || 'Logo'} style={{ height: 40, width: 'auto', maxWidth: 140, objectFit: 'contain' }} />
            ) : (
              <span style={{ fontSize: 18, fontWeight: 600, color: resolveText(TEXT_ON_LIGHT) }}>{settings.logoText}</span>
            )}
          </a>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 14, color: resolveText(TEXT_MUTED) }}>
            {String(settings.menu).split(',').map((item) => item.trim()).filter(Boolean).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'hero') {
    const alignMap = { center: { alignItems: 'center', textAlign: 'center' }, right: { alignItems: 'flex-end', textAlign: 'right' }, left: { alignItems: 'flex-start', textAlign: 'left' } };
    const align = alignMap[settings.align] || alignMap.left;
    const hasImage = settings.imageUrl && String(settings.imageUrl).trim().length > 0;
    const headingColor = hasImage ? '#ffffff' : resolveText(TEXT_ON_LIGHT);
    const subColor = hasImage ? 'rgba(255,255,255,0.9)' : resolveText(TEXT_MUTED);

    return (
      <div
        style={{
          position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 260, overflow: 'hidden', padding: 32,
          background: hasImage ? `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${settings.imageUrl}) center/cover` : resolveBg(secondary),
          ...align,
        }}
      >
        <h2 style={{ position: 'relative', maxWidth: 672, fontSize: '1.875rem', fontWeight: 700, margin: 0, color: headingColor }}>{settings.heading}</h2>
        <p style={{ position: 'relative', marginTop: 12, maxWidth: 672, fontSize: 14, color: subColor }}>{settings.subheading}</p>
        <button style={{ position: 'relative', marginTop: 24, padding: '12px 20px', fontSize: 14, fontWeight: 600, background: primary, color: textOnPrimary, border: 'none', cursor: 'pointer' }}>
          {settings.buttonText}
        </button>
      </div>
    );
  }

  if (type === 'rich-text') {
    return (
      <div style={{ borderBottom: '1px solid #e4e4e7', padding: 32, background: resolveBg('#ffffff') }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0, color: resolveText(TEXT_ON_LIGHT) }}>{settings.heading}</h3>
        <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.6, color: resolveText(TEXT_MUTED) }}>{settings.body}</p>
      </div>
    );
  }

  if (type === 'image-with-text') {
    const hasImage = settings.imageUrl && String(settings.imageUrl).trim().length > 0;
    return (
      <div style={{ display: 'grid', gap: 16, borderBottom: '1px solid #e4e4e7', padding: 24, background: resolveBg('#ffffff'), gridTemplateColumns: '1fr 1fr' }}>
        {hasImage ? <img src={settings.imageUrl} alt={settings.heading} style={{ height: 256, width: '100%', objectFit: 'cover' }} /> : <div style={{ height: 256, width: '100%', background: '#f4f4f5' }} />}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0, color: resolveText(TEXT_ON_LIGHT) }}>{settings.heading}</h3>
          <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.6, color: resolveText(TEXT_MUTED) }}>{settings.body}</p>
        </div>
      </div>
    );
  }

  if (type === 'featured-collection' || type === 'product-grid') {
    const count = Math.max(1, Math.min(Number(settings.productsToShow || 4), 8));
    return (
      <div style={{ borderBottom: '1px solid #e4e4e7', padding: 24, background: resolveBg('#ffffff') }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0, color: resolveText(TEXT_ON_LIGHT) }}>{settings.heading}</h3>
        <div style={{ marginTop: 20, display: 'grid', gap: 16, gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {Array.from({ length: count }).map((_, idx) => (
            <div key={idx} style={{ border: '1px solid #e4e4e7', padding: 12 }}>
              <div style={{ height: 112, background: '#f4f4f5' }} />
              <div style={{ marginTop: 12, height: 16, width: '66%', background: '#e4e4e7', borderRadius: 4 }} />
              <div style={{ marginTop: 8, height: 12, width: '33%', background: '#f4f4f5', borderRadius: 4 }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'product-page') {
    const layout = settings.layout || 'gallery-left';
    const images = Array.isArray(settings.images) ? settings.images.filter(Boolean) : [];
    const primaryImage = images[0] || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop';
    const thumbs = images.slice(1);
    const showThumbnails = settings.showThumbnails !== false && thumbs.length > 0;
    const showBuyButtons = settings.showBuyButtons !== false;

    const baseGrid = {
      display: 'grid',
      gap: 24,
      padding: 32,
      borderBottom: '1px solid #e4e4e7',
      background: resolveBg('#ffffff'),
      gridTemplateColumns: layout === 'gallery-stacked' ? 'minmax(0, 1.3fr) minmax(0, 1.3fr)' : 'minmax(0, 1.4fr) minmax(0, 1.2fr)',
      alignItems: 'flex-start',
    };

    const galleryFirst = layout === 'gallery-right' ? { order: 2 } : { order: 1 };
    const detailsFirst = layout === 'gallery-right' ? { order: 1 } : { order: 2 };

    return (
      <div style={baseGrid}>
        <div style={{ ...galleryFirst, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div
            style={{
              borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid #e4e4e7',
              background: '#f4f4f5',
            }}
          >
            <img
              src={primaryImage}
              alt={settings.title}
              style={{ width: '100%', height: 380, objectFit: 'cover', display: 'block' }}
            />
          </div>
          {showThumbnails && (
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
              {thumbs.map((src, idx) => (
                <div
                  key={src || idx}
                  style={{
                    flex: '0 0 72px',
                    height: 72,
                    borderRadius: 10,
                    overflow: 'hidden',
                    border: '1px solid #e4e4e7',
                    background: '#f4f4f5',
                  }}
                >
                  {src ? (
                    <img
                      src={src}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ ...detailsFirst, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h1 style={{ fontSize: '1.75rem', margin: 0, fontWeight: 600, color: resolveText(TEXT_ON_LIGHT) }}>
            {settings.title}
          </h1>
          <p style={{ fontSize: 18, fontWeight: 600, margin: 0, color: resolveText(TEXT_ON_LIGHT) }}>
            {settings.price}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 14,
              lineHeight: 1.7,
              color: resolveText(TEXT_MUTED),
              maxWidth: 520,
            }}
          >
            {settings.description}
          </p>

          {showBuyButtons && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 4 }}>
              <button
                style={{
                  padding: '12px 20px',
                  fontSize: 14,
                  fontWeight: 600,
                  borderRadius: 999,
                  border: 'none',
                  background: primary,
                  color: textOnPrimary,
                  cursor: 'pointer',
                }}
              >
                Add to cart
              </button>
              <button
                style={{
                  padding: '12px 20px',
                  fontSize: 14,
                  fontWeight: 500,
                  borderRadius: 999,
                  border: '1px solid #e4e4e7',
                  background: '#ffffff',
                  color: resolveText(TEXT_ON_LIGHT),
                  cursor: 'pointer',
                }}
              >
                Buy now
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (type === 'testimonial') {
    const testimonials = Array.isArray(settings.testimonials) ? settings.testimonials : [{ quote: settings.quote || '', author: settings.author || '' }];
    return (
      <TestimonialSlider
        heading={settings.heading}
        testimonials={testimonials}
        resolveBg={resolveBg}
        resolveText={resolveText}
        TEXT_MUTED={TEXT_MUTED}
        TEXT_ON_LIGHT={TEXT_ON_LIGHT}
      />
    );
  }

  if (type === 'newsletter') {
    return (
      <div
        style={{
          padding: 24,
          background: resolveBg('#ffffff'),
          borderBottom: '1px solid #e4e4e7',
        }}
      >
        <h3
          style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            margin: 0,
            color: resolveText(TEXT_ON_LIGHT),
          }}
        >
          {settings.heading}
        </h3>
        <p
          style={{
            marginTop: 8,
            maxWidth: 420,
            fontSize: 13,
            color: resolveText(TEXT_MUTED),
          }}
        >
          {settings.body}
        </p>
        <div
          style={{
            marginTop: 16,
            display: 'flex',
            gap: 8,
            alignItems: 'stretch',
            maxWidth: 360,
          }}
        >
          <input
            disabled
            style={{
              flex: 1,
              minWidth: 0,
              height: 40,
              padding: '0 12px',
              borderRadius: 999,
              border: '1px solid #e5e7eb',
              background: '#f9fafb',
              color: '#6b7280',
              fontSize: 13,
            }}
            placeholder={settings.placeholder}
            readOnly
          />
          <button
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              border: 'none',
              background: '#111827',
              color: '#ffffff',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              lineHeight: 0,
              cursor: 'pointer',
            }}
            aria-label="Subscribe"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="3"
                y="4"
                width="14"
                height="12"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M4 6.5L10 10.5L16 6.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div
          style={{
            marginTop: 14,
            display: 'flex',
            gap: 10,
            alignItems: 'center',
          }}
        >
          {settings.facebookUrl && String(settings.facebookUrl).trim().length > 0 && (
            <a
              href={settings.facebookUrl}
              style={{
                width: 32,
                height: 32,
                borderRadius: 999,
                border: '1px solid #e5e7eb',
                background: '#111827',
                color: '#ffffff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                textDecoration: 'none',
              }}
              aria-label="Facebook"
            >
              f
            </a>
          )}
          {settings.instagramUrl && String(settings.instagramUrl).trim().length > 0 && (
            <a
              href={settings.instagramUrl}
              style={{
                width: 32,
                height: 32,
                borderRadius: 999,
                border: '1px solid #e5e7eb',
                background: '#111827',
                color: '#ffffff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                textDecoration: 'none',
              }}
              aria-label="Instagram"
            >
              IG
            </a>
          )}
          {settings.twitterUrl && String(settings.twitterUrl).trim().length > 0 && (
            <a
              href={settings.twitterUrl}
              style={{
                width: 32,
                height: 32,
                borderRadius: 999,
                border: '1px solid #e5e7eb',
                background: '#111827',
                color: '#ffffff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                textDecoration: 'none',
              }}
              aria-label="Twitter"
            >
              X
            </a>
          )}
        </div>
      </div>
    );
  }

  if (type === 'footer') {
    const hasLogo = settings.logoUrl && String(settings.logoUrl).trim().length > 0;
    return (
      <div style={{ borderTop: '1px solid #e4e4e7', padding: 24, background: resolveBg('#ffffff') }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start', width: '100%' }}>
            {hasLogo && (
              <a href="/" style={{ display: 'inline-block' }}>
                <img src={settings.logoUrl} alt="Logo" style={{ height: 32, width: 'auto', maxWidth: 100, objectFit: 'contain' }} />
              </a>
            )}
            <p style={{ fontSize: 14, margin: 0, color: resolveText(TEXT_MUTED) }}>{settings.copyright}</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 14, color: resolveText(TEXT_MUTED) }}>
            {String(settings.links).split(',').map((item) => item.trim()).filter(Boolean).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'social-links') {
    const hasFacebook = settings.facebookUrl && String(settings.facebookUrl).trim().length > 0;
    const hasInstagram = settings.instagramUrl && String(settings.instagramUrl).trim().length > 0;
    const hasTwitter = settings.twitterUrl && String(settings.twitterUrl).trim().length > 0;

    return (
      <div
        style={{
          padding: 24,
          background: resolveBg('#ffffff'),
          borderTop: '1px solid #e4e4e7',
          borderBottom: '1px solid #e4e4e7',
        }}
      >
        <h3
          style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            margin: 0,
            color: resolveText(TEXT_ON_LIGHT),
          }}
        >
          {settings.heading}
        </h3>
        <p
          style={{
            marginTop: 8,
            maxWidth: 420,
            fontSize: 13,
            color: resolveText(TEXT_MUTED),
          }}
        >
          {settings.body}
        </p>
        <div
          style={{
            marginTop: 16,
            display: 'flex',
            gap: 10,
            alignItems: 'center',
          }}
        >
          {hasFacebook && (
            <a
              href={settings.facebookUrl}
              style={{
                width: 36,
                height: 36,
                borderRadius: 999,
                border: '1px solid #e5e7eb',
                background: '#111827',
                color: '#ffffff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                textDecoration: 'none',
              }}
              aria-label="Facebook"
            >
              f
            </a>
          )}
          {hasInstagram && (
            <a
              href={settings.instagramUrl}
              style={{
                width: 36,
                height: 36,
                borderRadius: 999,
                border: '1px solid #e5e7eb',
                background: '#111827',
                color: '#ffffff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                textDecoration: 'none',
              }}
              aria-label="Instagram"
            >
              IG
            </a>
          )}
          {hasTwitter && (
            <a
              href={settings.twitterUrl}
              style={{
                width: 36,
                height: 36,
                borderRadius: 999,
                border: '1px solid #e5e7eb',
                background: '#111827',
                color: '#ffffff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                textDecoration: 'none',
              }}
              aria-label="Twitter"
            >
              X
            </a>
          )}
        </div>
      </div>
    );
  }

  return null;
}
