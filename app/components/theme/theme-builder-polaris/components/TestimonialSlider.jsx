import React, { useState } from 'react';
import { Icon } from '@shopify/polaris';
import { ChevronLeftIcon, ChevronRightIcon } from '@shopify/polaris-icons';

export function TestimonialSlider({ heading, testimonials, resolveBg, resolveText, TEXT_MUTED, TEXT_ON_LIGHT }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const list = testimonials.filter((t) => t && (t.quote || t.author));
  const count = list.length || 1;
  const current = list[activeIndex % count] || { quote: '', author: '' };

  const baseStyle = {
    padding: '16px 24px',
    background: resolveBg('#ffffff'),
    borderBottom: '1px solid #e4e4e7',
    position: 'relative',
    overflow: 'hidden',
  };

  return (
    <div style={baseStyle}>
      <p style={{ margin: 0, fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.2em', color: TEXT_MUTED }}>{heading}</p>
      <blockquote style={{ margin: '12px 0', fontSize: 16, fontWeight: 500, lineHeight: 1.6, minHeight: 48, color: TEXT_ON_LIGHT }}>
        &ldquo;{current.quote}&rdquo;
      </blockquote>
      <p style={{ margin: '12px 0 0', fontSize: 12, color: resolveText(TEXT_MUTED) }}>&mdash; {current.author}</p>
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => setActiveIndex((i) => (i - 1 + count) % count)}
            style={{
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              border: '1px solid #e4e4e7',
              background: '#fff',
              padding: 6,
              borderRadius: 999,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Previous"
          >
            <Icon source={ChevronLeftIcon} />
          </button>
          <button
            type="button"
            onClick={() => setActiveIndex((i) => (i + 1) % count)}
            style={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              border: '1px solid #e4e4e7',
              background: '#fff',
              padding: 6,
              borderRadius: 999,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Next"
          >
            <Icon source={ChevronRightIcon} />
          </button>
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center', gap: 8 }}>
            {list.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                style={{
                  width: 8, height: 8, borderRadius: '50%', border: 'none', padding: 0, cursor: 'pointer',
                  background: i === activeIndex ? '#18181b' : '#d4d4d8',
                }}
                title={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
