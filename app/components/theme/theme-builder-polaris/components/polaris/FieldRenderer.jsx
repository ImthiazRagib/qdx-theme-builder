import React from 'react';
import { TextField, Select, Checkbox, Button, InlineStack, BlockStack } from '@shopify/polaris';
import { DeleteIcon, PlusIcon } from '@shopify/polaris-icons';

export function FieldRenderer({ field, value, onChange }) {
  const fileInputRef = React.useRef(null);

  if (field.type === 'textarea') {
    return <TextField label={field.label} value={value || ''} onChange={onChange} multiline={3} />;
  }
  if (field.type === 'boolean') {
    return <Checkbox label={field.label} checked={!!value} onChange={(checked) => onChange(checked)} />;
  }
  if (field.type === 'select') {
    const options = (field.options || []).map((opt) => typeof opt === 'string' ? { label: opt, value: opt } : { label: opt.label, value: opt.value });
    return <Select label={field.label} options={[{ label: 'Select...', value: '' }, ...options]} value={value ?? ''} onChange={onChange} />;
  }
  if (field.type === 'image') {
    const hasImage = value && String(value).trim().length > 0;
    return (
      <div>
        <TextField label={field.label} type="url" value={value || ''} onChange={onChange} placeholder="https://... or upload below" />
        <div style={{ marginTop: 8, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => { const file = e.target.files?.[0]; if (file) { const reader = new FileReader(); reader.onload = () => onChange(reader.result); reader.readAsDataURL(file); } e.target.value = ''; }} />
          <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>Upload</Button>
          {hasImage && (
            <>
              <img src={value} alt="Preview" style={{ height: 64, maxWidth: 120, objectFit: 'contain', border: '1px solid var(--p-color-border)' }} />
              <Button variant="plain" tone="critical" onClick={() => onChange('')}>Remove</Button>
            </>
          )}
        </div>
      </div>
    );
  }
  if (field.type === 'testimonials') {
    const list = Array.isArray(value) && value.length > 0 ? value : [{ quote: '', author: '' }];
    return (
      <div>
        <p style={{ marginBottom: 8, fontWeight: 500 }}>{field.label}</p>
        {list.map((item, i) => (
          <div key={i} style={{ padding: 12, marginBottom: 8, border: '1px solid var(--p-color-border)', borderRadius: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: 'var(--p-color-text-subdued)' }}>Testimonial {i + 1}</span>
              <Button variant="plain" tone="critical" icon={DeleteIcon} onClick={() => { const next = [...list]; next.splice(i, 1); onChange(next.length ? next : [{ quote: '', author: '' }]); }} accessibilityLabel="Remove" />
            </div>
            <TextField label="Quote" labelHidden value={item.quote || ''} onChange={(v) => { const next = [...list]; next[i] = { ...next[i], quote: v }; onChange(next); }} multiline={2} />
            <div style={{ marginTop: 8 }}>
              <TextField label="Author" labelHidden value={item.author || ''} onChange={(v) => { const next = [...list]; next[i] = { ...next[i], author: v }; onChange(next); }} />
            </div>
          </div>
        ))}
        <Button variant="secondary" icon={PlusIcon} onClick={() => onChange([...list, { quote: '', author: '' }])}>Add testimonial</Button>
      </div>
    );
  }
  if (field.type === 'image-list') {
    const list = Array.isArray(value) ? value : [];
    const handleChangeAt = (index, url) => {
      const next = [...list];
      next[index] = url;
      onChange(next);
    };
    const handleRemoveAt = (index) => {
      const next = [...list];
      next.splice(index, 1);
      onChange(next);
    };
    const handleMove = (index, direction) => {
      const nextIndex = direction === 'up' ? index - 1 : index + 1;
      if (nextIndex < 0 || nextIndex >= list.length) return;
      const next = [...list];
      [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
      onChange(next);
    };

    return (
      <div>
        <p style={{ marginBottom: 8, fontWeight: 500 }}>{field.label}</p>
        <BlockStack gap="200">
          {list.map((url, i) => (
            <div
              key={i}
              style={{
                border: '1px solid var(--p-color-border)',
                borderRadius: 8,
                padding: 8,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <TextField
                label={`Image ${i + 1}`}
                labelHidden
                type="url"
                value={url || ''}
                onChange={(v) => handleChangeAt(i, v)}
                placeholder="https://..."
              />
              <InlineStack gap="100" align="space-between" blockAlign="center">
                <InlineStack gap="100">
                  <Button
                    size="micro"
                    disabled={i === 0}
                    onClick={() => handleMove(i, 'up')}
                    accessibilityLabel="Move up"
                  >
                    Move up
                  </Button>
                  <Button
                    size="micro"
                    disabled={i === list.length - 1}
                    onClick={() => handleMove(i, 'down')}
                    accessibilityLabel="Move down"
                  >
                    Move down
                  </Button>
                </InlineStack>
                <Button
                  size="micro"
                  variant="plain"
                  tone="critical"
                  icon={DeleteIcon}
                  onClick={() => handleRemoveAt(i)}
                  accessibilityLabel="Remove image"
                />
              </InlineStack>
            </div>
          ))}
        </BlockStack>
        <div style={{ marginTop: 8 }}>
          <Button
            variant="secondary"
            icon={PlusIcon}
            onClick={() => onChange([...list, ''])}
          >
            Add image
          </Button>
        </div>
      </div>
    );
  }
  return (
    <TextField
      label={field.label}
      type={field.type === 'number' ? 'number' : 'text'}
      value={value ?? ''}
      onChange={(v) => onChange(field.type === 'number' ? Number(v) || 0 : v)}
    />
  );
}
