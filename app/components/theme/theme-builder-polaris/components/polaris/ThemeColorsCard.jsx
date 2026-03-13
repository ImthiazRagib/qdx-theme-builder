import React from 'react';
import { Card, TextField, BlockStack, InlineStack, Text } from '@shopify/polaris';
import { COLOR_PALETTES } from '../../config/constants';

export function ThemeColorsCard({ themeColors, setThemeColors }) {
  return (
    <Card>
      <BlockStack gap="400">
        <Text as="h2" variant="headingMd">Theme Colors</Text>
        <BlockStack gap="300">
          <Text as="p" variant="bodySm" fontWeight="semibold" tone="subdued">Presets</Text>
          <InlineStack gap="200" wrap>
            {COLOR_PALETTES.map((palette) => {
              const isActive =
                themeColors.primary?.toLowerCase() === palette.primary.toLowerCase() &&
                themeColors.secondary?.toLowerCase() === palette.secondary.toLowerCase();
              return (
                <button
                  key={palette.name}
                  type="button"
                  onClick={() => setThemeColors({ primary: palette.primary, secondary: palette.secondary })}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px',
                    border: isActive ? '2px solid var(--p-color-border-emphasized)' : '1px solid var(--p-color-border)',
                    borderRadius: 8,
                    background: isActive ? 'var(--p-color-bg-surface-secondary)' : 'var(--p-color-bg-surface)',
                    cursor: 'pointer',
                  }}
                  title={palette.name}
                >
                  <span style={{ height: 16, width: 16, borderRadius: '50%', background: palette.primary }} />
                  <span style={{ height: 16, width: 16, borderRadius: '50%', background: palette.secondary }} />
                  <Text as="span" variant="bodySm" tone="subdued">{palette.name}</Text>
                </button>
              );
            })}
          </InlineStack>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="label" variant="bodySm" fontWeight="medium">Primary</Text>
          <InlineStack gap="200">
            <input
              type="color"
              value={themeColors.primary}
              onChange={(e) => setThemeColors((t) => ({ ...t, primary: e.target.value }))}
              style={{ height: 36, width: 56, padding: 0, border: '1px solid var(--p-color-border)' }}
            />
            <div style={{ flex: 1 }}>
              <TextField label="" labelHidden value={themeColors.primary} onChange={(v) => setThemeColors((t) => ({ ...t, primary: v }))} />
            </div>
          </InlineStack>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="label" variant="bodySm" fontWeight="medium">Secondary</Text>
          <InlineStack gap="200">
            <input
              type="color"
              value={themeColors.secondary}
              onChange={(e) => setThemeColors((t) => ({ ...t, secondary: e.target.value }))}
              style={{ height: 36, width: 56, padding: 0, border: '1px solid var(--p-color-border)' }}
            />
            <div style={{ flex: 1 }}>
              <TextField label="" labelHidden value={themeColors.secondary} onChange={(v) => setThemeColors((t) => ({ ...t, secondary: v }))} />
            </div>
          </InlineStack>
        </BlockStack>
      </BlockStack>
    </Card>
  );
}
