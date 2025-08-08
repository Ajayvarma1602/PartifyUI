# 🚘 PartifyUI  
---
**PartifyUI** is a fully responsive and animated vehicle parts finder interface, inspired by real-world e-commerce platforms like Partify. Built using HTML, CSS, and vanilla JavaScript, it provides a smooth, modern user experience with dynamic search options, theme toggle, and animated interactions — all without a backend.

---

**Live Link** - https://ajayvarma1602.github.io/PartifyUI/

------

**Figma Link** - https://www.figma.com/design/nrUzwpnCiwxvD0OLhxWNqB/Partify?node-id=1-1213&t=l7K4dTA0ea9sRInA-1

------

## 🌟 Features

- 🌗 **Light/Dark Mode Toggle**  
  Seamless switch between light and dark themes with user preference saved in `LocalStorage`.

- 📱 **Responsive Design**  
  Adjusts perfectly across mobile, tablet, and desktop viewports. A working hamburger menu appears on smaller screens and adapts to theme modes.

- 🔍 **Vehicle Search Functionality**  
  Users can find parts by:
  - **Year / Make / Model** (cascading dropdowns)
 ✅ *Smart Fill Example: It works in Year/Make/Modal*   
  Pasting VIN `**1C6RR7KT9CS123456**` will auto-fill:  
  `year: 2012, make: RAM, model: 1500`
  - **License Plate**
  - **VIN** 
     Dummy VIN to vehicle mapping
    const vinMap = {
      "1C6RR7KT9CS123456": { year: "2012", make: "RAM", model: "1500" },
      "4T1BF1FK7FU123456": { year: "2015", make: "Toyota", model: "Camry" },
      "2T1BURHE5HC765432": { year: "2017", make: "Toyota", model: "Corolla" }
      };
  

- 🔄 **Recently Viewed Parts**  
  Tracks user searches, stores them locally, and displays them with delete option and direct redirection.

- 🔢 **Animated Stats Counter**  
  Stats like “Quality Parts” and “Vehicle Models” animate numerically on page load.

- 🎁 **Special Offers Reveal**  
  Click "Reveal Deal" to generate a random special offer from a list of dummy deals.

- 💬 **Fully Dynamic Chat Widget**  
  Three intelligent chat options:
  - **Connect with Agent** – simulates calling a support agent.
  - **Live Chat** – shows an instant message flow.
  - **FAQs** – displays instant answers on button click.

- 🗣️ **Feedback Widget**  
  Collects user feedback via a simple Yes/No system, then shows a dynamic response.

---

## 🛠️ Tech Stack

- **HTML5** – Semantic markup
- **CSS3** – Responsive layout, theme handling, animations
- **JavaScript (ES6)** – DOM handling, modal behavior, localStorage, dynamic logic

---
