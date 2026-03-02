import { useState } from "react";
import ThemeBuilderContext from "../context/theme.context";

// Default values for Shopify theme-like sections
const defaultSections = {
  // Global
  template: "classic",
  primaryColor: "#1463ff",
  secondaryColor: "#111827",

  // Header
  header: {
    logoUrl: "",
    logoWidth: 150,
    showSearch: true,
    showCart: true,
  },

  // Hero Banner
  heroBanner: {
    heading: "Command Attention With Every Scented Step",
    subheading: "Unleash Your True Allure",
    body: "Rated #1 Best Selling Product in 2025 in Men's Fragrance",
    bannerImageUrl: "",
    primaryCtaText: "Shop the collection",
    primaryCtaLink: "/collections/all",
    secondaryCtaText: "Learn more",
    secondaryCtaLink: "#",
  },

  // Featured Products
  featuredProducts: {
    heading: "Featured collection",
    subheading: "Shop our best-selling products",
    collectionHandle: "frontpage",
    productsToShow: 8,
    columnsDesktop: 4,
    columnsMobile: 2,
  },

  // Image with text
  imageWithText: {
    heading: "Image with text block",
    body: "Pair text with an image to focus on your chosen product, collection, or blog post.",
    imageUrl: "",
    imagePosition: "left",
    buttonText: "Learn more",
    buttonLink: "#",
  },

  // Testimonials
  testimonials: {
    heading: "What our customers say",
    subheading: "Real stories from real people",
    items: [
      { quote: "Great quality and fast shipping!", author: "Customer 1" },
      { quote: "Love this store. Will definitely order again.", author: "Customer 2" },
      { quote: "Best shopping experience ever.", author: "Customer 3" },
    ],
  },

  // Newsletter
  newsletter: {
    heading: "Subscribe to our newsletter",
    subheading: "Get the latest updates and special offers.",
    placeholder: "Enter your email",
    buttonText: "Subscribe",
    body: "By subscribing, you agree to receive marketing emails.",
  },

  // Footer
  footer: {
    showPaymentIcons: true,
    copyrightText: "© 2025 Your Store. All rights reserved.",
    menuItems: [
      { title: "About", link: "/pages/about" },
      { title: "Contact", link: "/pages/contact" },
      { title: "Privacy", link: "/policies/privacy-policy" },
    ],
  },

  // Product Page - Gallery
  productGallery: {
    layout: "thumbnails",
    showZoom: true,
    showThumbnails: true,
    thumbnailPosition: "bottom",
  },

  // Product Page - Details
  productDetails: {
    showVendor: true,
    showSKU: true,
    showQuantitySelector: true,
    productTitle: "Product name",
    productPrice: "$29.00",
    productDescription: "Product description goes here. Add details about materials, sizing, and care.",
  },

  // Product Page - Reviews
  productReviews: {
    enableReviews: true,
    showRating: true,
    reviewsCount: 42,
  },
};

export default function ThemeBuilderProvider(props) {
  const { children } = props;

  const [template, setTemplate] = useState(defaultSections.template);
  const [primaryColor, setPrimaryColor] = useState(defaultSections.primaryColor);
  const [secondaryColor, setSecondaryColor] = useState(defaultSections.secondaryColor);

  const [selectedGroup, setSelectedGroup] = useState("Homepage");
  const [selectedSectionName, setSelectedSectionName] = useState("Hero Banner");
  const [selectedSubsectionName, setSelectedSubsectionName] = useState(null);

  const [sections, setSections] = useState(defaultSections);

  const updateSection = (sectionKey, field, value) => {
    setSections((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [field]: value,
      },
    }));
  };

  const updateTestimonialItem = (index, field, value) => {
    setSections((prev) => ({
      ...prev,
      testimonials: {
        ...prev.testimonials,
        items: prev.testimonials.items.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ),
      },
    }));
  };

  const value = {
    template,
    setTemplate,
    primaryColor,
    setPrimaryColor,
    secondaryColor,
    setSecondaryColor,
    selectedGroup,
    setSelectedGroup,
    selectedSectionName,
    setSelectedSectionName,
    selectedSubsectionName,
    setSelectedSubsectionName,
    sections,
    setSections,
    updateSection,
    updateTestimonialItem,
  };

  return (
    <ThemeBuilderContext.Provider value={value}>
      {children}
    </ThemeBuilderContext.Provider>
  );
}
