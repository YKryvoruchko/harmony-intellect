# Ліцей у мамаї

A modern website for **Ліцей у мамаї**, a Ukrainian school in Romania.

The project combines a public school website with a simple admin panel, so the school team can update content without touching code. Parents can learn about the school, check schedules, view documents and photos, and submit an application directly from the site.

## Highlights

- Public website with Ukrainian, English, and Romanian language options.
- Compact language switcher with flags: `UA`, `EN`, `RO`.
- Light and dark theme with a simple sun/moon toggle.
- Hero section with class selection and weekly schedule display.
- Sections for study programs, news, documents, teachers, gallery, reviews, and contacts.
- Application form connected to the admin panel.
- Admin panel for editing site content.
- Upload support for photos and files in news, teachers, gallery, documents, and study programs.
- HEIC/HEIF image handling with generated previews for better browser support.
- Local JSON-based content storage for a lightweight setup.

## Tech Stack

- **Next.js 16**
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Server Actions**
- **JSON CMS** in the `data` folder
- **Local file uploads** in `public/uploads`

## Project Structure

```txt
harmony-intellect/
|-- data/
|   |-- content.json          # website content
|   `-- applications.json     # submitted applications
|-- public/
|   `-- uploads/              # uploaded photos and files
|-- src/
|   |-- app/
|   |   |-- admin/             # admin panel
|   |   |-- page.tsx           # homepage
|   |   |-- SiteHeader.tsx     # site navigation
|   |   |-- LanguageSwitcher.tsx
|   |   |-- ThemeToggle.tsx
|   |   `-- actions.ts         # server actions
|   `-- lib/
|       |-- cms.ts             # JSON content reading/writing
|       `-- i18n.ts            # UI and content translations
`-- next.config.ts
```

## Getting Started

Install dependencies:

```bash
npm install
```

Create `.env.local` and set private admin credentials:

```env
ADMIN_USERNAME=your-admin-name
ADMIN_PASSWORD=use-a-long-random-password
ADMIN_SESSION_SECRET=use-a-random-secret-with-at-least-32-characters
```

Run the development server:

```bash
npm run dev
```

Open the website:

```txt
http://localhost:3000
```

Open the admin panel:

```txt
http://localhost:3000/admin
```

## Available Scripts

```bash
npm run dev      # start the development server
npm run build    # create a production build
npm run start    # run the production build
npm run lint     # run ESLint checks
```

## Languages

The website supports three languages:

```txt
/              # Ukrainian
/?lang=en      # English
/?lang=ro      # Romanian
```

UI labels and translated content rules live in:

```txt
src/lib/i18n.ts
```

The main editable Ukrainian content is stored in:

```txt
data/content.json
```

## Admin Panel

The admin panel is protected by a signed, HTTP-only session. Each menu item controls a specific section of the public website, and all content-changing server actions verify the administrator session.

The admin can edit:

- General site settings
- Study programs
- News
- Teachers
- Gallery
- Documents
- Reviews
- Submitted applications

Applications from the public form are saved here:

```txt
data/applications.json
```

Website content is saved here:

```txt
data/content.json
```

Uploaded files are saved here:

```txt
public/uploads/
```

## File Uploads

The project supports uploading images and other file formats through the admin panel.

When an uploaded file can be displayed as an image, it appears directly on the website. If the file is a document or another non-previewable format, the site shows a clean file card with a link to open it.

HEIC and HEIF uploads are converted into JPG previews, so photos from modern phones can be displayed correctly in browsers.

## Development Checks

Before important changes, run:

```bash
npm run lint
npm run build
```

These commands help catch TypeScript, Next.js, and ESLint issues before deployment.

## Roadmap Ideas

- Add authentication for the admin panel.
- Move content from JSON files to a database or headless CMS.
- Add schedule editing directly in the admin panel.
- Add dedicated SEO pages for each language.
- Connect real social media links.
- Deploy the project to Vercel or a VPS.

## Purpose

Ліцей у мамаї is built to be clear, friendly, and easy to manage. Its main goal is to help parents quickly understand the school, see important information, submit applications, and follow the life of the Ukrainian community in Romania.
