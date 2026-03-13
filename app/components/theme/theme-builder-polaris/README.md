# Theme Builder (Polaris)

Shopify Polaris version of the Liquid section editor. Copy this folder into your Shopify Polaris app to add a theme builder page.

## Copy to Your Shopify App

1. **Copy the entire `theme-builder-polaris` folder** into your app (e.g. `src/theme-builder/` or `app/theme-builder/`).

2. **Install dependencies** (if not already in your app):
   ```bash
   yarn add @shopify/polaris @shopify/polaris-icons jszip
   ```

3. **Add a route** that renders the component. Example for Shopify Remix/React Router apps:

   ```jsx
   // app/routes/app.theme-creator.jsx (or your route file)
   import { ThemeCreatorPolaris } from '../theme-builder';

   export default function ThemeCreatorPage() {
     return <ThemeCreatorPolaris />;
   }
   ```

4. **Ensure the route is wrapped in AppProvider** (Shopify app templates do this by default).

## Folder Structure

```
theme-builder-polaris/
├── index.js                 # Main export
├── ThemeCreatorPolaris.jsx  # Main component
├── themeExport.js           # ZIP export logic
├── libs/
│   └── methods.js           # Utilities
├── config/
│   └── constants.js         # Component library, field config
└── components/
    ├── SectionPreview.jsx   # Preview (inline styles, no Tailwind)
    ├── TestimonialSlider.jsx
    └── polaris/              # Polaris UI components
        ├── ThemeColorsCard.jsx
        ├── ComponentLibraryCard.jsx
        ├── Toolbar.jsx
        ├── PageStructureCard.jsx
        ├── InspectorCard.jsx
        └── FieldRenderer.jsx
```

## Import Paths

If you copy the folder to a different location (e.g. `app/theme-builder/`), update the import in your route:

```jsx
import { ThemeCreatorPolaris } from '~/theme-builder';  // or your path
```

All internal imports use relative paths (`../../config/constants`, etc.) so they work as long as the folder structure is preserved.
