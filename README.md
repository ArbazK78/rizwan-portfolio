# Rizwan Gad — Portfolio

> Personal portfolio of Rizwan Gad, Full Stack Engineer specialising in scalable systems and AI.

**Live:** [rizwan-portfolio-umber.vercel.app](https://rizwan-portfolio-umber.vercel.app)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| 3D / Graphics | Three.js |
| Icons | Lucide React |
| Email | EmailJS (no backend) |
| Build Tool | Vite |
| Hosting | Vercel |

---

## Features

- **3D Hero Scene** — Live Three.js canvas with floating wireframe geometries and particle field, reacting to mouse movement in real time
- **Loading Screen** — Branded intro with animated progress bar before the portfolio renders
- **Figma-style Cursor** — Custom dual cursor (dot + lagging ring) that expands on hover
- **Scroll Animations** — Every section fades and slides in using a custom `useReveal` hook with `IntersectionObserver`
- **About Section** — Story blocks, interactive journey timeline, and value cards
- **Skills Section** — Branded icon grid with viewport-triggered animated progress bars
- **Projects Section** — Featured card (Scheduling Planner) + two side-by-side project cards with glassmorphism demo buttons
- **Contact Form** — EmailJS-powered, no backend required — with custom styled dropdown, validation, loading state, success countdown, and error handling
- **Mobile Responsive** — Fully responsive across mobile, tablet, and desktop with hamburger nav
- **SEO Ready** — Open Graph, Twitter Card, canonical URL, and meta description
- **Favicon** — Custom branded `RG` SVG favicon

---

## Project Structure

```
rizwan-portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── HeroCanvas.tsx       # Three.js 3D scene
│   │   ├── LoadingScreen.tsx    # Branded loading intro
│   │   ├── AboutSection.tsx     # About + timeline + value cards
│   │   ├── SkillCard.tsx        # Individual skill card
│   │   ├── GlassDemoBtn.tsx     # Glassmorphism hover button
│   │   ├── ContactForm.tsx      # EmailJS contact form
│   │   └── Reveal.tsx           # Scroll animation wrapper
│   ├── hooks/
│   │   └── useReveal.ts         # IntersectionObserver hook
│   ├── types.ts                 # Shared TypeScript interfaces
│   ├── App.tsx                  # Main layout + all sections
│   └── main.tsx                 # Entry point
├── .env                         # EmailJS keys (not committed)
├── index.html                   # SEO meta tags + favicon
└── vite.config.ts
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- Git

### Installation

```bash
git clone https://github.com/ArbazK78/rizwan-portfolio.git
cd rizwan-portfolio
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
VITE_EJS_SERVICE_ID=your_service_id
VITE_EJS_TEMPLATE_ID=your_template_id
VITE_EJS_PUBLIC_KEY=your_public_key
```

Get these from [emailjs.com](https://emailjs.com) after setting up your Gmail service and email template.

### Run Locally

```bash
npm run dev
```

Opens at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

---

## Deployment

This project is deployed on **Vercel** with automatic deployments on every push to `main`.

To deploy your own instance:

1. Push the repo to GitHub
2. Import the project at [vercel.com](https://vercel.com)
3. Add your three `VITE_EJS_*` environment variables in Vercel's project settings
4. Click Deploy

---

## EmailJS Template Variables

The contact form sends the following variables to your EmailJS template:

| Variable | Description |
|---|---|
| `{{from_name}}` | Sender's full name |
| `{{from_email}}` | Sender's email (set as Reply-To) |
| `{{project_type}}` | Selected project type |
| `{{message}}` | Message body |

---

## Projects Featured

| Project | Stack | Highlight |
|---|---|---|
| **Scheduling Planner** | Java, Spring Boot, Streams API | Handles 80K tasks, outperforms MSP by 50% |
| **WellCare** | React, Node.js, MongoDB | Real human medical assistance app |
| **AI Demographic Predictor** | Python, TensorFlow, OpenCV, Flask | 91% accuracy on age, gender & ethnicity |

---

## Roadmap

- [ ] Add project demo videos
- [ ] Toast notifications
- [ ] 404 custom page
- [ ] Blog / writing section
- [ ] Dark/Light mode toggle

---

## Author

**Rizwan Gad** — Full Stack Engineer

- GitHub: [@ArbazK78](https://github.com/ArbazK78)
- LinkedIn: [rizwan-gad](https://in.linkedin.com/in/rizwan-gad)
- Email: arbazgad@gmail.com

---

*Built with React, Three.js, TypeScript and a lot of attention to detail.*
