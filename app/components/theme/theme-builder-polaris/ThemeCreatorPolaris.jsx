import React, { useMemo, useState } from 'react';
import { Page, Layout, BlockStack } from '@shopify/polaris';
import { createInstance, generateSectionMarkup, generateJsonTemplate, getContrastColor } from './libs/methods';
import { COMPONENT_LIBRARY, DEFAULT_THEME, TEXT_ON_LIGHT } from './config/constants';
import { ThemeColorsCard, ComponentLibraryCard, Toolbar, PageStructureCard, InspectorCard } from './components/polaris';

export function ThemeCreatorPolaris() {
  const [themeColors, setThemeColors] = useState(DEFAULT_THEME);
  const [sections, setSections] = useState([
    createInstance(COMPONENT_LIBRARY.find((x) => x.type === 'announcement-bar')),
    createInstance(COMPONENT_LIBRARY.find((x) => x.type === 'header')),
    createInstance(COMPONENT_LIBRARY.find((x) => x.type === 'hero')),
    createInstance(COMPONENT_LIBRARY.find((x) => x.type === 'featured-collection')),
    createInstance(COMPONENT_LIBRARY.find((x) => x.type === 'testimonial')),
    createInstance(COMPONENT_LIBRARY.find((x) => x.type === 'newsletter')),
    createInstance(COMPONENT_LIBRARY.find((x) => x.type === 'footer')),
  ]);
  const [selectedId, setSelectedId] = useState(null);
  const [draggedId, setDraggedId] = useState(null);
  const [viewMode, setViewMode] = useState('preview');

  const selectedSection = useMemo(() => sections.find((s) => s.id === selectedId) || sections[0] || null, [sections, selectedId]);

  const addSection = (component) => {
    const next = createInstance(component);
    setSections((prev) => [...prev, next]);
    setSelectedId(next.id);
  };

  const removeSection = (id) => {
    setSections((prev) => prev.filter((s) => s.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const updateSetting = (id, key, value) => {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, settings: { ...s.settings, [key]: value } } : s)));
  };

  const updateStyleOverride = (id, key, value) => {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, styleOverrides: { ...(s.styleOverrides || {}), [key]: value } } : s)));
  };

  const applyThemeToSection = (id, variant) => {
    const primary = themeColors.primary || '#E94D4D';
    const secondary = themeColors.secondary || '#FDF8EE';
    setSections((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const overrides = s.styleOverrides || {};
        if (variant === 'primary') return { ...s, styleOverrides: { ...overrides, background: primary, textColor: getContrastColor(primary) } };
        return { ...s, styleOverrides: { ...overrides, background: secondary, textColor: TEXT_ON_LIGHT } };
      })
    );
  };

  const clearStyleOverrides = (id) => {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, styleOverrides: {} } : s)));
  };

  const moveSection = (id, direction) => {
    setSections((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      if (index === -1) return prev;
      const nextIndex = direction === 'up' ? index - 1 : index + 1;
      if (nextIndex < 0 || nextIndex >= prev.length) return prev;
      const copy = [...prev];
      [copy[index], copy[nextIndex]] = [copy[nextIndex], copy[index]];
      return copy;
    });
  };

  const onDragStart = (id) => setDraggedId(id);

  const onDrop = (targetId) => {
    if (!draggedId || draggedId === targetId) return;
    setSections((prev) => {
      const draggedIndex = prev.findIndex((item) => item.id === draggedId);
      const targetIndex = prev.findIndex((item) => item.id === targetId);
      if (draggedIndex === -1 || targetIndex === -1) return prev;
      const next = [...prev];
      const [draggedItem] = next.splice(draggedIndex, 1);
      next.splice(targetIndex, 0, draggedItem);
      return next;
    });
    setDraggedId(null);
  };

  const liquidTemplate = useMemo(() => sections.map((s) => generateSectionMarkup(s)).join('\n\n'), [sections]);
  const jsonTemplate = useMemo(() => generateJsonTemplate(sections), [sections]);

  return (
    <Page title="Liquid Section Editor" subtitle="Drag sections top to bottom, edit settings, and export template-ready code.">
      <div style={{ marginBottom: 16 }}>
        <Toolbar viewMode={viewMode} setViewMode={setViewMode} liquidTemplate={liquidTemplate} sections={sections} themeColors={themeColors} />
      </div>
      <Layout>
        <Layout.Section variant="oneThird">
          <BlockStack gap="400">
            <ThemeColorsCard themeColors={themeColors} setThemeColors={setThemeColors} />
            <ComponentLibraryCard addSection={addSection} />
          </BlockStack>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <PageStructureCard
            sections={sections}
            selectedSection={selectedSection}
            selectedId={selectedId}
            themeColors={themeColors}
            viewMode={viewMode}
            liquidTemplate={liquidTemplate}
            jsonTemplate={jsonTemplate}
            setSelectedId={setSelectedId}
            onDragStart={onDragStart}
            onDrop={onDrop}
            moveSection={moveSection}
            removeSection={removeSection}
          />
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <InspectorCard
            selectedSection={selectedSection}
            updateSetting={updateSetting}
            updateStyleOverride={updateStyleOverride}
            applyThemeToSection={applyThemeToSection}
            clearStyleOverrides={clearStyleOverrides}
          />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
