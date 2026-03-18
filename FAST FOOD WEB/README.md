# Vansh Fast Food - Modern Landing Page 🍔🔥

Hey everyone! Built this badass landing page for a local premium fast food stall named "Vansh Fast Food". The idea was to move away from those boring, standard restaurant templates and build something that actually looks like a futuristic, cyberpunk-themed Awwwards-winning site.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) 
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) 
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## What I built here

I wanted the scrolling to feel ridiculously smooth, so I threw in **Lenis JS**. It completely changes the vibe of the page. Then I hooked up **GSAP (ScrollTrigger)** to make massive 3D food items (like burgers and noodles) literally fall down the screen as you scroll.

Here are a few things I'm really proud of in this build:

- **GSAP Scroll Animations**: Elements fade, rotate, and drop down tied perfectly to your scroll speed. The background also shifts colors from charcoal black to deep neon orange seamlessly.
- **Buttery Scroll**: Normal browser scrolling is usually janky, so I used Lenis to hijack the scroll and make it flow like water.
- **Glassmorphism Menu**: Used Swiper.js to build a clean, draggable sliding menu with nice glass UI cards.
- **Vanilla Tilt**: Added a subtle 3D hover effect so the menu cards tilt slightly towards your mouse.
- **WhatsApp Order Form**: At the footer, there's a neat little form with floating neon labels. When a customer hits "ENTER THE GAME", it grabs their name and phone, and automatically opens WhatsApp with a pre-typed order message sent straight to the owner's phone. No complex backend needed!
- **Custom Cursor**: Built a custom trailing neon orange cursor just for the aesthetic (I disabled it on mobile though so it doesn't break touch).

## The Tech Stack
- Plain HTML, CSS, Vanilla JavaScript (No React/Next.js overhead, kept it raw and fast!)
- GSAP & ScrollTrigger
- Swiper JS & Lenis
- Vanilla Tilt JS
- FontAwesome & Google Fonts (Outfit + Inter)

## How to Check It Out

If you want to play around with the code, steal some animation logic, or just see how it looks:

1. Clone this repo: 
```bash
git clone https://github.com/yourusername/vansh-fast-food.git
```
2. Open the folder and double click `index.html`.
3. That's literally it. No `npm install`, no build steps, no servers.

## Is it Mobile Responsive?
Yep. It switches from a complex desktop view to a clean stacked view on phones. I added a full-screen dark hamburger menu overlay and killed the custom cursor for touch screens so it runs flawlessly.

Feel free to fork this or rip some of the GSAP logic for your own projects! ✌️
