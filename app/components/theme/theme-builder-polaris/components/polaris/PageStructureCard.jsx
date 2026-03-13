import React from 'react';
import { Card, BlockStack, Button, Badge, InlineStack } from '@shopify/polaris';
import { DragHandleIcon, ChevronUpIcon, ChevronDownIcon, DeleteIcon, ClipboardIcon } from '@shopify/polaris-icons';
import { SectionPreview } from '../SectionPreview';
import { copyText } from '../../libs/methods';

export function PageStructureCard({
  sections, selectedSection, selectedId, themeColors, viewMode, liquidTemplate, jsonTemplate,
  setSelectedId, onDragStart, onDrop, moveSection, removeSection,
}) {
  return (
    <BlockStack gap="400">
      <Card>
        <BlockStack gap="300">
          <span style={{ fontWeight: 600 }}>Page Structure</span>
          <BlockStack gap="200">
            {sections.map((section, index) => (
              <div
                key={section.id}
                draggable
                onDragStart={() => onDragStart(section.id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => onDrop(section.id)}
                onClick={() => setSelectedId(section.id)}
                style={{
                  padding: 12, borderRadius: 8, cursor: 'pointer',
                  border: `1px solid ${selectedSection?.id === section.id ? 'var(--p-color-border-emphasized)' : 'var(--p-color-border)'}`,
                  background: selectedSection?.id === section.id ? 'var(--p-color-bg-surface-secondary)' : 'var(--p-color-bg-surface)',
                }}
              >
                <InlineStack gap="300" blockAlign="center" align="space-between">
                  <InlineStack gap="200" blockAlign="center">
                    <span style={{ cursor: 'grab', color: 'var(--p-color-icon-subdued)' }} title="Drag to reorder"><DragHandleIcon /></span>
                    <BlockStack gap="100">
                      <InlineStack gap="200" blockAlign="center">
                        <span style={{ fontWeight: 600, fontSize: 14 }}>{section.label}</span>
                        <Badge tone="info">#{index + 1}</Badge>
                      </InlineStack>
                      <span style={{ fontSize: 12, color: 'var(--p-color-text-subdued)' }}>{section.type}</span>
                    </BlockStack>
                  </InlineStack>
                  <InlineStack gap="100">
                    <Button variant="plain" icon={ChevronUpIcon} onClick={(e) => { e.stopPropagation(); moveSection(section.id, 'up'); }} accessibilityLabel="Move up" />
                    <Button variant="plain" icon={ChevronDownIcon} onClick={(e) => { e.stopPropagation(); moveSection(section.id, 'down'); }} accessibilityLabel="Move down" />
                    <Button variant="plain" icon={DeleteIcon} tone="critical" onClick={(e) => { e.stopPropagation(); removeSection(section.id); }} accessibilityLabel="Remove" />
                  </InlineStack>
                </InlineStack>
              </div>
            ))}
          </BlockStack>
        </BlockStack>
      </Card>

      <Card>
        <BlockStack gap="300">
          <span style={{ fontWeight: 600 }}>{viewMode === 'preview' ? 'Live Preview' : 'Generated Code'}</span>
          {viewMode === 'preview' ? (
            <div style={{ border: '1px solid var(--p-color-border)', borderRadius: 8, background: themeColors.secondary }}>
              {sections.length === 0 ? (
                <div style={{ padding: 40, textAlign: 'center', color: 'var(--p-color-text-subdued)', border: '1px dashed var(--p-color-border)' }}>
                  Add components from the left panel to start building your page.
                </div>
              ) : (
                sections.map((section) => <SectionPreview key={section.id} section={section} themeColors={themeColors} />)
              )}
            </div>
          ) : (
            <BlockStack gap="400">
              <div>
                <InlineStack gap="200" blockAlign="center" align="space-between" wrap={false}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>Liquid Template</span>
                  <Button variant="tertiary" icon={ClipboardIcon} onClick={() => copyText(liquidTemplate)} accessibilityLabel="Copy Liquid" />
                </InlineStack>
                <pre style={{ overflow: 'auto', marginTop: 8, padding: 16, background: '#1a1a1a', color: '#e5e5e5', borderRadius: 8, fontSize: 12 }}>{liquidTemplate}</pre>
              </div>
              <div>
                <InlineStack gap="200" blockAlign="center" align="space-between" wrap={false}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>JSON Template</span>
                  <Button variant="tertiary" icon={ClipboardIcon} onClick={() => copyText(jsonTemplate)} accessibilityLabel="Copy JSON" />
                </InlineStack>
                <pre style={{ overflow: 'auto', marginTop: 8, padding: 16, background: '#1a1a1a', color: '#e5e5e5', borderRadius: 8, fontSize: 12 }}>{jsonTemplate}</pre>
              </div>
            </BlockStack>
          )}
        </BlockStack>
      </Card>
    </BlockStack>
  );
}
