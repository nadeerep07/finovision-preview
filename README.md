# Finovision Business Solutions LLC — Production Website

[![Status](https://img.shields.io/badge/Status-Multi--Page%20Production%20Ready-10b981.svg)]()
[![Standards](https://img.shields.io/badge/Standards-HTML5%20%7C%20WCAG%202.1%20AA-blue.svg)]()
[![SEO](https://img.shields.io/badge/Domain-finovision.net%20(Primary)-073c34.svg)]()
[![CleanURLs](https://img.shields.io/badge/URLs-Clean%20(No%20.html)-10b981.svg)]()

Multi-page corporate website for **Finovision Business Solutions LLC**, an accredited business advisory, accounting, statutory audit, UAE VAT compliance, and cloud ERP systems firm based in Sharjah Media City (Shams), UAE.

---

## Domains & Clean URL Architecture

- **Primary Canonical Domain**: [`https://finovision.net`](https://finovision.net)
- **Secondary Domain**: `finovisionuae.com` (Permanently redirected via HTTP 301 to `https://finovision.net`)
- **Clean URLs**: All public routes hide `.html` extensions (`/`, `/about`, `/services`, `/vat-services`, `/contact`).
- **Pre-Configured Hosting Rules**:
  - `vercel.json`: `"cleanUrls": true` + 301 redirects for secondary domains and `www.*`.
  - `_redirects` & `netlify.toml`: 301 rules for Netlify and Cloudflare Pages.
  - `.htaccess`: Apache/cPanel mod_rewrite rules for HTTPS, domain canonicalization, and `.html` stripping.
  - `sitemap.xml` & `robots.txt`: Search engine index files referencing canonical clean URLs.
  - Directory indices (`about/index.html`, etc.) for zero-config local servers.

---

## Corporate Identity

- **Entity**: Finovision Business Solutions LLC
- **Jurisdiction**: Sharjah Media City (Shams), Sharjah, United Arab Emirates
- **Commercial License**: #1804056
- **Telephone / WhatsApp**: `+971 50 301 0675` (International format)
- **Official Email**: `info@finovision.net`
- **Hours of Operation**:
  - Sunday – Thursday: 9:00 AM – 6:00 PM
  - Saturday: By appointment
  - Friday: Closed
- **Core Qualifications**:
  - Certified Public Accountant (CPA, Alaska, USA)
  - MBA in Finance (Manipal University, Dubai)
  - Diploma in GCC VAT Compliance (PwC / ATT)
- **Regional Footprint**: United Arab Emirates · Oman · India (20+ Years Combined Corporate Track Record)

---

## Multi-Page Architecture

```text
finovision/
├── index.html               # Home (Hero Advisory Compass, Practice highlights, Track Record)
├── about.html               # About Us (Company Profile, Vision, Mission, Values, Qualifications)
├── services.html            # Services (Consultancy, ERP Software, POS & IT Solutions)
├── vat-services.html        # UAE VAT & Tax (Dedicated compliance flyer specifications)
├── contact.html             # Contact Us (Directory, Office hours, Consultation form, FAQ)
├── about/index.html         # Directory clean URL fallback
├── services/index.html      # Directory clean URL fallback
├── vat-services/index.html  # Directory clean URL fallback
├── contact/index.html       # Directory clean URL fallback
├── app.js                   # Client-side JavaScript (clean URL active matcher, mobile drawer, reveal)
├── styles/
│   ├── base.css             # Foundational tokens, reset, typography, and accessibility utilities
│   └── advisory.css         # Advisory theme components, subpage banners, responsive styles
├── assets/
│   ├── finovision-mark.svg  # Scalable vector logo mark
│   ├── finoza_review_img.jpg# Financial audit & spreadsheets review photo
│   └── finoza_team_img.jpg  # Advisory team collaborative meeting photo
├── sitemap.xml              # XML Sitemap with clean canonical URLs
├── robots.txt               # Crawler directives pointing to finovision.net
├── vercel.json              # Vercel deployment configuration
├── _redirects               # Netlify/Cloudflare redirects
├── netlify.toml             # Netlify pretty_urls configuration
├── .htaccess                # Apache/cPanel rewrite rules
└── docs/
    ├── SEO_GEO_STRATEGY.md  # Detailed SEO, GEO tags, keywords, and local citations strategy
    ├── ARCHITECTURE.md      # Technical architecture, DOM structure, script lifecycle
    ├── STYLE_GUIDE.md       # Visual tokens, typography scale, CSS conventions
    ├── CONTENT_SPECIFICATION.md # Verified business facts, credentials, legal profile
    └── ...                  # Client-supplied reference documents
```

---

## Coding Standards & Accessibility

1. **Semantic HTML5 & WCAG 2.1 AA**:
   - Distinct, descriptive `<h1>` on every page with sequential heading hierarchy.
   - Accessible landmark roles (`role="banner"`, `role="main"`, `role="contentinfo"`).
   - Skip to main content link (`.skip-link`) as the first focusable element on every page.
   - Visible focus indicators (`:focus-visible`) for keyboard navigation.
   - Paired `.sr-only` labels on form controls with appropriate `autocomplete` attributes.
   - Zero emojis across all HTML, CSS, and JS files.

2. **Detailed SEO & GEO Targeting**:
   - Canonical link tags to `https://finovision.net/...` on every page.
   - Geolocation meta tags targeting Sharjah Media City (`AE-SH`, coordinates `25.3223;55.5136`).
   - Schema.org JSON-LD microdata: `AccountingService`, `LocalBusiness`, `BreadcrumbList`, and `FAQPage`.
   - Open Graph & Twitter Card social previews.

3. **Performance Optimization**:
   - Zero runtime framework dependencies (pure HTML, Vanilla CSS, Vanilla JavaScript).
   - Lazy-loaded (`loading="lazy"`), async-decoded (`decoding="async"`) images with explicit width and height.

---

## Local Development & Testing

Run a local server from the workspace root:

```bash
# Using Python 3:
python3 -m http.server 4173

# Or using Node.js:
npx serve -l 4173
```

Visit in your browser:
- `http://localhost:4173/`
- `http://localhost:4173/about`
- `http://localhost:4173/services`
- `http://localhost:4173/vat-services`
- `http://localhost:4173/contact`

---

## Deployment Guide

- **Vercel**: Push to GitHub or run `vercel`. `vercel.json` automatically manages clean URLs and domain 301 redirects.
- **Netlify**: Connect repository. `netlify.toml` and `_redirects` automatically enforce pretty URLs and domain canonicalization.
- **cPanel / Apache**: Upload all files to `public_html/`. `.htaccess` automatically manages HTTPS, domain redirects, and clean URLs.

## Repository Remotes

This project is mirrored to both the personal and company GitHub repositories. After committing changes, push the `main` branch to both remotes:

```bash
git push origin main
git push company main
```
