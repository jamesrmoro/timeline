# 🕹️ History of Game Consoles – Timeline Project

A visual timeline of game consoles, powered by [Storyblok](https://www.storyblok.com/) as a headless CMS and [Swiper.js](https://swiperjs.com/) for responsive carousel navigation.

Built with **vanilla JavaScript**, **HTML**, and **CSS**, this project displays the evolution of video game consoles with dynamic content fully managed from the CMS.

![Demo Screenshot](https://timeline.jamesrmoro.me/images/screenshot.png)

## 🔗 Live Demo

🌐 [timeline.jamesrmoro.me/game](https://timeline.jamesrmoro.me/game)

---

## 📦 Features

- 📆 Visual timeline layout using Swiper.js
- 🧩 Dynamic content loaded via Storyblok CDN API
- 🎨 Auto-generated color palette for each console card
- 🖥️ Responsive layout: supports desktop and mobile
- ⚙️ No frameworks — just plain JS, HTML, and CSS

---

## 🚀 Tech Stack

- HTML5 + CSS3
- JavaScript (ES6+)
- [Storyblok CMS](https://www.storyblok.com/)
- [Swiper.js](https://swiperjs.com/)
- [Vercel](https://vercel.com/) for deployment

---

## 📁 Project Structure
```
project-root/
├── css/
│ ├── style.css
│ └── swiper-bundle.min.css
├── js/
│ ├── script-storyblok.js
│ └── swiper-bundle.min.js
├── icons/
│ └── game.svg
├── images/
│ └── image-default.jpg
├── index.html
└── README.md
```
---

## 🧩 Storyblok Integration

This project uses a Storyblok space with a custom component `console` containing:

- `title` (string)
- `year` (number)
- `description` (rich text)
- `image` (asset)

These are grouped inside a `consoles` block under a page named `game`, which is fetched via the Storyblok CDN API (`/v2/cdn/stories/game`).

A **custom domain** was set for the Storyblok preview:  
🔗 [https://timeline.jamesrmoro.me](https://timeline.jamesrmoro.me)

---

## 🛠 Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/jamesrmoro/timeline.git
cd timeline
```

2. Open js/script-storyblok.js and update the token and slug if needed:

```bash
const TOKEN = 'your-token-here';
const SLUG = 'game';
```

## ✨ Author
Created by James Moro
🔗 https://jamesrmoro.me

## 🤝 Contributing
Feel free to fork, submit PRs or open issues with ideas and improvements.
