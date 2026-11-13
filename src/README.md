# ShowTrack – TV Shows Tracking & Analytics App

ShowTrack is a modern, responsive web application built with React that allows users to discover TV series, manage their personal watchlists with custom statuses and ratings, and visualize viewing statistics using interactive charts.

---

## 🌟 Key Features

1. **Discover View (`/`)**:
   - Search for TV series dynamically using the **TVMaze API**.
   - Displays show details including poster images, titles, genres, and a quick-add button to the watchlist.
   - Includes real-time loading spinners and robust error handling.

2. **Watchlist View (`/watchlist`)**:
   - Personal watchlist stored persistently in browser **localStorage**.
   - Interactive state management: update viewing status (*Plan to Watch*, *Watching*, *Completed*).
   - Rate shows with custom star ratings (1–5).
   - Filter items effortlessly by their current status or remove items from the list.

3. **Statistics View (`/stats`)**:
   - Summary metric cards displaying total saved shows, completed shows, and average rating.
   - Interactive data visualizations powered by **Recharts**:
     - **Bar Chart**: Show distribution across different genres.
     - **Pie Chart**: Show distribution by viewing status.

---

## 🛠️ Technologies & Libraries

- **React** (v18+) with Vite
- **Bootstrap & React-Bootstrap** (Responsive grid system & UI components)
- **React Router DOM** (Client-side routing with `HashRouter` for GitHub Pages compatibility)
- **Recharts** (Interactive data analytics charts)
- **React Icons** (Modern UI icon set)
- **TVMaze REST API** (External JSON data source, no API key required)

---

## 🚀 Getting Started

Follow these instructions to run the project locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd showtrack