import React from 'react';
import { Card, BlockStack, Button } from '@shopify/polaris';
import { PlusIcon } from '@shopify/polaris-icons';
import { COMPONENT_LIBRARY } from '../../config/constants';

export function ComponentLibraryCard({ addSection }) {
  const groups = ['Header', 'Content', 'Commerce', 'Social Proof', 'Marketing', 'Footer'];

  return (
    <Card>
      <BlockStack gap="400">
        <span style={{ fontWeight: 600 }}>Component Library</span>
        {groups.map((group) => (
          <BlockStack key={group} gap="200">
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--p-color-text-subdued)' }}>{group}</span>
            <BlockStack gap="200">
              {COMPONENT_LIBRARY.filter((item) => item.category === group).map((component) => (
                <Button key={component.type} variant="plain" fullWidth onClick={() => addSection(component)} icon={PlusIcon}>
                  {component.label}
                </Button>
              ))}
            </BlockStack>
          </BlockStack>
        ))}
      </BlockStack>
    </Card>
  );
}
