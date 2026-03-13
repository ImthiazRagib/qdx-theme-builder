import React from 'react';
import { Card, BlockStack, Button } from '@shopify/polaris';
import { PlusIcon } from '@shopify/polaris-icons';
import { COMPONENT_LIBRARY } from '../../config/constants';

export function ComponentLibraryCard({ addSection, mode = 'home' }) {
  const groups = ['Header', 'Content', 'Commerce', 'Social Proof', 'Marketing', 'Footer'];

  const filterForMode = (items) => {
    if (mode === 'product') {
      // For the product page view, only show product-detail building blocks.
      return items.filter((item) => item.type === 'product-page');
    }
    // Home / default view: show everything except dedicated product page sections.
    return items.filter((item) => item.type !== 'product-page');
  };

  const filtered = filterForMode(COMPONENT_LIBRARY);

  // For product mode, keep a shorter list and label.
  const title = mode === 'product' ? 'Product Page Library' : 'Component Library';

  const visibleGroups =
    mode === 'product'
      ? ['Commerce']
      : groups;

  return (
    <Card>
      <BlockStack gap="400">
        <span style={{ fontWeight: 600 }}>{title}</span>
        {visibleGroups.map((group) => {
          const itemsForGroup = filtered.filter((item) => item.category === group);
          if (itemsForGroup.length === 0) return null;
          return (
            <BlockStack key={group} gap="200">
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--p-color-text-subdued)' }}>{group}</span>
              <BlockStack gap="200">
                {itemsForGroup.map((component) => (
                  <Button
                    key={component.type}
                    variant="plain"
                    fullWidth
                    onClick={() => addSection(component)}
                    icon={PlusIcon}
                  >
                    {component.label}
                  </Button>
                ))}
              </BlockStack>
            </BlockStack>
          );
        })}
      </BlockStack>
    </Card>
  );
}
