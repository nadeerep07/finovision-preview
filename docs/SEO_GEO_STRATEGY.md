# Finovision SEO & GEO-Targeting Strategy Document

This document outlines the domain canonicalization, clean URL architecture, localized UAE search engine optimization (SEO), geographical targeting (GEO), and structured data implementation for **Finovision Business Solutions LLC**.

---

## 1. Domain Canonicalization Architecture

### Primary Domain: `https://finovision.net`
- **Canonical Authority**: `finovision.net` is designated as the single primary canonical domain for all indexing, social sharing, backlinking, and corporate brand identity.
- **Top-Level Domain (TLD) Rationale**: The `.ae` country-code top-level domain (ccTLD) establishes authoritative regional relevance for search engines (Google UAE, Bing) and local corporate clients in the United Arab Emirates.

### Secondary Domain: `finovisionuae.com` (Permanent 301 Redirect)
All traffic arriving at `finovisionuae.com` or `www.finovisionuae.com` is permanently redirected via HTTP 301 to the corresponding path on `https://finovision.net`.

```
http://finovisionuae.com/*     ──[301]──> https://finovision.net/*
https://finovisionuae.com/*    ──[301]──> https://finovision.net/*
http://www.finovisionuae.com/* ──[301]──> https://finovision.net/*
https://www.finovisionuae.com/* ─[301]──> https://finovision.net/*
```

---

## 2. Clean URL Architecture (Hiding `.html`)

To ensure a modern, user-friendly, and enterprise-grade URL structure, **all `.html` extensions are hidden across all routes and internal links**.

| Clean Public Route | Internal File / Directory | Purpose |
| :--- | :--- | :--- |
| `https://finovision.net/` | `index.html` | Homepage |
| `https://finovision.net/about` | `about.html` & `about/index.html` | About Us & Credentials |
| `https://finovision.net/services` | `services.html` & `services/index.html` | Complete Service Catalog |
| `https://finovision.net/vat-services` | `vat-services.html` & `vat-services/index.html` | Specialized UAE VAT Practice |
| `https://finovision.net/contact` | `contact.html` & `contact/index.html` | Contact, Directory & FAQ |

### Multi-Platform Routing Support
The repository includes pre-configured server rules for every standard hosting environment:

1. **Vercel (`vercel.json`)**:
   - `"cleanUrls": true` automatically strips `.html`.
   - Native host-matching permanent 301 redirects from `finovisionuae.com` and `www.*` to `https://finovision.net`.
2. **Netlify / Cloudflare Pages (`_redirects` & `netlify.toml`)**:
   - `pretty_urls = true`.
   - Domain-level 301 redirects for `finovisionuae.com/*` to `https://finovision.net/:splat 301!`.
   - Path-level 301 redirects from `*.html` to clean paths.
3. **Apache / cPanel / LiteSpeed (`.htaccess`)**:
   - `RewriteEngine On` with automatic 301 stripping of `.html` via `THE_REQUEST`.
   - Canonical 301 redirect from `finovisionuae.com` to `finovision.net`.
   - Internal rewriting of clean URLs to physical `.html` files.
4. **Direct Static File Fallback**:
   - Nested directories (`about/index.html`, `services/index.html`, `vat-services/index.html`, `contact/index.html`) guarantee that local preview servers (`python3 -m http.server`, S3 buckets, GitHub Pages) resolve `/about` or `/services` without any rewrite engine required.

---

## 3. Geographic & Local SEO (GEO) Implementation

### Geolocation Coordinates & Region Tags
Finovision is licensed in Sharjah Media City (Shams), Sharjah, UAE. The following GEO meta tags are embedded in the `<head>` of every page:

```html
<meta name="geo.region" content="AE-SH">
<meta name="geo.placename" content="Sharjah Media City (Shams), Sharjah, United Arab Emirates">
<meta name="geo.position" content="25.3223;55.5136">
<meta name="ICBM" content="25.3223, 55.5136">
```

### Regional Jurisdiction Scope
Content specifically targets corporate inquiries across three primary GCC tiers:
- **Primary Hub**: Sharjah Media City (Shams), Sharjah Mainland & Free Zones (SAIF Zone, Hamriyah).
- **Metropolitan UAE**: Dubai (Business Bay, DIFC, Downtown, Deira, JLT) and Abu Dhabi.
- **Cross-Border GCC & Subcontinent**: Sultanate of Oman (Muscat, Sohar) and India (cross-border trade & holding company management).

---

## 4. Target Keyword Matrix & Intent Mapping

| Page Route | Primary Keywords | Secondary / LSI Keywords | Search Intent |
| :--- | :--- | :--- | :--- |
| **`/` (Home)** | Accounting firm UAE, VAT consultancy Sharjah, Auditing services Dubai | Bookkeeping Sharjah Media City, FTA registered tax advisor, WPS payroll UAE, Commercial Companies Law | Commercial / Navigational |
| **`/about`** | About Finovision, US CPA UAE, Tax consultant Sharjah | Shams free zone accountants, GCC VAT diploma PwC ATT, Manipal MBA Finance, cross border accounting | Informational / Trust |
| **`/services`** | UAE accounting services, Internal audit Dubai, ERP software Sharjah | POS restaurant systems UAE, supermarket billing software, Zoho Books implementation, Tally Prime partner | Commercial Investigation |
| **`/vat-services`** | UAE VAT return filing, FTA VAT compliance, Input tax credit recovery | Reverse charge mechanism UAE, zero rated tax UAE, blocked input tax, FTA penalty defense | Transactional / Specialized |
| **`/contact`** | Contact Finovision, Accounting firm Sharjah phone, Finovision address | +971 50 301 0675, info@finovision.net, Shams commercial license 1804056 | Direct Action / Contact |

---

## 5. Schema.org Structured Data (JSON-LD)

Each page features rich JSON-LD microdata enabling enhanced Google SERP features:

1. **`AccountingService` & `LocalBusiness`** (on Homepage and Contact page):
   - Legal Name: `Finovision Business Solutions LLC`
   - Official Phone: `+971503010675`
   - Official Email: `info@finovision.net`
   - Address: `Sharjah Media City (Shams), Sharjah, AE`
   - Coordinates: `25.3223, 55.5136`
   - Business Hours: Sunday–Thursday 09:00–18:00
2. **`BreadcrumbList`** (across all subpages):
   - Provides clear hierarchical breadcrumb trail (`Home` > `Services` > `VAT Services`) in search engine snippet results.
3. **`FAQPage`** (on Contact page):
   - Answers common questions regarding bespoke accounting, quarterly FTA VAT filings, ERP/POS rollout, and Shams licensing.

---

## 6. Local Citations & Google Business Profile (GBP) Recommendations

To maximize local pack rankings in Sharjah and Dubai:
1. **Google Business Profile**:
   - Primary Category: *Accounting firm*
   - Secondary Categories: *Tax consultant*, *Auditor*, *Software company*
   - Verified Address: *Sharjah Media City (Shams), Sharjah, UAE*
   - Phone: `+971 50 301 0675`
   - Website URL: `https://finovision.net`
2. **Local UAE Directories**:
   - Register on Yellow Pages UAE, Connect.ae, Yalwa UAE, and Shams Member Directory with consistent NAP (Name, Address, Phone).
