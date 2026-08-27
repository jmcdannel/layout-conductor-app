> [!IMPORTANT]
> **This project has moved.** Active development of DEJA.js and the Track & Trestle model
> railroad platform now happens in private repositories under
> [**Track and Trestle Technology, LLC**](https://github.com/trackandtrestle).
> This repository stays public as a historical snapshot and is no longer maintained.
>
> **Current product, docs, and downloads → [dejajs.com](https://dejajs.com)**

# 🚦 Layout Conductor — Web App

**React control panel for a DCC++ / DCC-EX model railroad.**

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Material_UI-007FFF?style=for-the-badge&logo=mui&logoColor=white" />
  <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" />
</p>

The operator-facing half of the **Layout Conductor** system: throttles, turnouts, sensors,
signals, and effects in one responsive interface, backed by a swappable API.

## ✨ Features

- 🎚️ **Throttles** — speed, direction, and functions for multiple locomotives
- 🔀 **Turnouts** — servo and relay control, individually or as routes
- 📡 **Sensors** — live block occupancy feedback
- 🚦 **Signals & effects** — lighting, sound, and signal aspects
- 📱 Responsive layout intended for a tablet mounted at the fascia

## 🔗 Companion services

Layout Conductor deliberately separated the UI from the hardware bridge, and three
backends were built against the same contract:

| Repo | Runtime | Notes |
|------|---------|-------|
| [`layout-conductor-api`](https://github.com/jmcdannel/layout-conductor-api) | Python / Flask | Ran on the Raspberry Pi beside the command station |
| [`layout-conductor-node-api`](https://github.com/jmcdannel/layout-conductor-node-api) | Node / WebSocket | Push-based successor to HTTP polling |
| [`layout-conductor-deno-api`](https://github.com/jmcdannel/layout-conductor-deno-api) | Deno | REST experiment |
| [`layout-conductor-arduino`](https://github.com/jmcdannel/layout-conductor-arduino) | Arduino C++ | Per-area sketches for turnouts, signals, and effects |

## ⚙️ Tech stack

React 17 · MUI 5 · Emotion · React Router 6 · Sass · Create React App · GitHub Pages

## 🧑‍💻 Running it

```bash
npm install
npm start        # http://localhost:3000
npm run deploy   # publish to GitHub Pages
```

## 📌 Status

Superseded by the MQTT-based
[Track and Trestle Technology Suite](https://github.com/jmcdannel/Track-and-Trestle-Technology-Suite),
and later by [DEJA.js](https://github.com/jmcdannel/DEJA.js).

## 🧭 Where this fits

This repo is one step in a long-running line of model railroad control software:

| Era | Project | What changed |
|-----|---------|--------------|
| 2020 | [`train-control`](https://github.com/jmcdannel/train-control) | First React throttle, JMRI + Arduino over HTTP |
| 2021 | [`dctc`](https://github.com/jmcdannel/dctc) | Standalone Arduino DC controller (no computer required) |
| 2022–23 | [`layout-conductor-*`](https://github.com/jmcdannel?tab=repositories&q=layout-conductor) | Split into app + API; Python, Node, and Deno backends explored |
| 2024 | [`Track-and-Trestle-Technology-Suite`](https://github.com/jmcdannel/Track-and-Trestle-Technology-Suite) | MQTT-based monorepo: dispatcher, throttle, dashboard, action API |
| 2024–25 | [`DEJA.js`](https://github.com/jmcdannel/DEJA.js) | TypeScript/Turborepo rewrite, Firebase realtime backbone |
| 2025– | **[dejajs.com](https://dejajs.com)** (private) | Commercial cloud platform for DCC-EX |

---

<sub>Built by [Josh McDannel](https://github.com/jmcdannel) · [dejajs.com](https://dejajs.com) · [LinkedIn](https://www.linkedin.com/in/jmcdannel)</sub>
