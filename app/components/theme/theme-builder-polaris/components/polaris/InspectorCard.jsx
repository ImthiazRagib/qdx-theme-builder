import React from 'react';
import { Card, BlockStack, Button, TextField, InlineStack } from '@shopify/polaris';
import { PaintBrushFlatIcon, ColorIcon, RotateLeftIcon } from '@shopify/polaris-icons';
import { FieldRenderer } from './FieldRenderer';
import { fieldConfigByType } from '../../config/constants';
import { generateSectionMarkup } from '../../libs/methods';

export function InspectorCard({ selectedSection, updateSetting, updateStyleOverride, applyThemeToSection, clearStyleOverrides }) {
  if (!selectedSection) {
    return (
      <Card>
        <BlockStack gap="300">
          <span style={{ fontWeight: 600 }}>Inspector</span>
          <div style={{ padding: 32, textAlign: 'center', color: 'var(--p-color-text-subdued)', border: '1px dashed var(--p-color-border)' }}>
            Select a section to edit its fields.
          </div>
        </BlockStack>
      </Card>
    );
  }

  const overrides = selectedSection.styleOverrides || {};

  return (
    <Card>
      <BlockStack gap="400">
        <span style={{ fontWeight: 600 }}>Inspector</span>
        <div style={{ padding: 16, background: 'var(--p-color-bg-surface-secondary)', borderRadius: 8 }}>
          <span style={{ fontWeight: 600, display: 'block' }}>{selectedSection.label}</span>
          <span style={{ fontSize: 12, color: 'var(--p-color-text-subdued)' }}>{selectedSection.type}</span>
        </div>
        <BlockStack gap="300">
          <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--p-color-text-subdued)' }}>Colors</span>
          <InlineStack gap="200" wrap>
            <Button variant="tertiary" icon={PaintBrushFlatIcon} onClick={() => applyThemeToSection(selectedSection.id, 'primary')} accessibilityLabel="Apply Primary" />
            <Button variant="tertiary" icon={ColorIcon} onClick={() => applyThemeToSection(selectedSection.id, 'secondary')} accessibilityLabel="Apply Secondary" />
            {Object.keys(overrides).length > 0 && (
              <Button variant="plain" icon={RotateLeftIcon} onClick={() => clearStyleOverrides(selectedSection.id)} accessibilityLabel="Reset colors" />
            )}
          </InlineStack>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <TextField label="Background" value={overrides.background ?? ''} onChange={(v) => updateStyleOverride(selectedSection.id, 'background', v)} placeholder="Use theme" />
              <div style={{ marginTop: 8 }}>
                <input type="color" value={overrides.background || '#ffffff'} onChange={(e) => updateStyleOverride(selectedSection.id, 'background', e.target.value)} style={{ height: 36, width: '100%', padding: 0, border: '1px solid var(--p-color-border)' }} />
              </div>
            </div>
            <div>
              <TextField label="Text" value={overrides.textColor ?? ''} onChange={(v) => updateStyleOverride(selectedSection.id, 'textColor', v)} placeholder="Use theme" />
              <div style={{ marginTop: 8 }}>
                <input type="color" value={overrides.textColor || '#171717'} onChange={(e) => updateStyleOverride(selectedSection.id, 'textColor', e.target.value)} style={{ height: 36, width: '100%', padding: 0, border: '1px solid var(--p-color-border)' }} />
              </div>
            </div>
          </div>
        </BlockStack>
        {(fieldConfigByType[selectedSection.type] || []).map((field) => (
          <div key={field.key}>
            <FieldRenderer field={field} value={selectedSection.settings[field.key]} onChange={(value) => updateSetting(selectedSection.id, field.key, value)} />
          </div>
        ))}
      </BlockStack>
    </Card>
  );
}
