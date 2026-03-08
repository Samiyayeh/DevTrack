<h1 align="center">
  <br>
  DevTrack
  <br>
</h1>

<h4 align="center">A robust full-stack project tracking application built with React and Node.js.</h4>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#license">License</a>
</p>

---

## 🎯 Features

- **Intuitive Dashboard**: An overview of all your ongoing projects, tasks, and progress.
- **Detailed Project Views**: Dive deep into specific projects to manage details and track milestones.
- **Modern UI/UX**: Styled meticulously using Tailwind CSS for a responsive, clean, and professional appearance.
- **Robust Backend API**: Built with Express and Sequelize (ORM) for secure, scalable data manipulation.

## 💻 Tech Stack

**Frontend**

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)

**Backend**

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/) (MySQL / SQLite support)
- [Nodemon](https://nodemon.io/)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed on your local machine:

- **Node.js**
- **npm** (Node Package Manager)

### Installation

1. **Navigate to the core project directory:**

   ```bash
   cd DevTrack
   ```

2. **Install Frontend Dependencies:**

   ```bash
   cd client
   npm install
   ```

3. **Install Backend Dependencies:**
   ```bash
   cd ../backend
   npm install
   ```

### Running the Application from Source

To run the application locally, start both the primary server and the client in separate terminal sessions.

**1. Start the Backend Server**

```bash
cd backend
npm run dev
```

_(Runs with `nodemon` for automatic fast restarts upon changes)_

**2. Start the Frontend Application**
Open a separate terminal window and run:

```bash
cd client
npm run dev
```

_(Spins up the `vite` development server with fast HMR)_

## 📂 Project Structure

```text
DevTrack/
├── backend/          # Express API server, routes, and Sequelize models
│   ├── package.json
│   ├── server.js     # Backend entry point
│   └── ...
└── client/           # React frontend built with Vite
    ├── package.json
    ├── src/
    │   ├── pages/    # Primary views (Dashboard, ProjectDetails, etc.)
    │   └── ...
    └── ...
```

## 📝 License

This project is licensed under the MIT License - see the `LICENSE` file for further details.
