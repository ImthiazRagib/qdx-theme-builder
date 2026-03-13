import React from 'react';
import { Button, InlineStack } from '@shopify/polaris';
import { ViewIcon, CodeIcon, ClipboardIcon, ExportIcon, PackageIcon } from '@shopify/polaris-icons';
import { copyText, downloadFile } from '../../libs/methods';
import { exportThemeAsZip } from '../../themeExport';

export function Toolbar({ viewMode, setViewMode, liquidTemplate, sections, themeColors }) {
  return (
    <InlineStack gap="200" wrap>
      <Button variant={viewMode === 'preview' ? 'primary' : 'tertiary'} icon={ViewIcon} onClick={() => setViewMode('preview')} accessibilityLabel="Preview" />
      <Button variant={viewMode === 'code' ? 'primary' : 'tertiary'} icon={CodeIcon} onClick={() => setViewMode('code')} accessibilityLabel="Code" />
      <Button variant="tertiary" icon={ClipboardIcon} onClick={() => copyText(liquidTemplate)} accessibilityLabel="Copy Liquid" />
      <Button variant="tertiary" icon={ExportIcon} onClick={() => downloadFile('page-template.liquid', liquidTemplate)} accessibilityLabel="Export Liquid" />
      <Button variant="primary" icon={PackageIcon} onClick={() => exportThemeAsZip(sections, themeColors)} accessibilityLabel="Export ZIP" />
    </InlineStack>
  );
}
