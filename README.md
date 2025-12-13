# Kloudspot Crowd Management System

A modern, real-time crowd management and analytics dashboard built with Next.js 16 and Tailwind CSS.

## 🚀 Live Demo

**[View Live Application](https://klodspot-assignment.vercel.app/)**

## 📖 Overview

The Kloudspot Crowd Management System is a comprehensive dashboard designed to monitor and analyze crowd data in real-time. It provides actionable insights through interactive charts, live occupancy tracking, and detailed site metrics.

## ✨ Features

- **Real-Time Occupancy Tracking**: Live updates of crowd numbers using WebSockets.
- **Interactive Dashboards**: detailed analytics using Recharts for visual data representation.
- **Site Management**: Context-aware site selection and data filtering.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS 4 for seamless use on any device.
- **Modern UI/UX**: Clean, intuitive interface with glassmorphism effects and smooth transitions.
- **Authentication**: Secure login flow.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Real-time**: [Socket.io-client](https://socket.io/)

## 🚀 Getting Started

Follow these steps to run the project locally:

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd klodspot_assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 📂 Project Structure

```
├── public/          # Static assets
├── src/
│   ├── app/         # Next.js App Router pages
│   ├── components/  # Reusable UI components
│   ├── context/     # React Context for global state (Site, Socket)
│   ├── services/    # API services
│   └── utils/       # Helper functions
├── package.json     # Project dependencies
└── README.md        # Project documentation
```

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
