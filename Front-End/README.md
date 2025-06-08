# Resource Hub

Resource Hub is a web application designed for efficient management of organizational resources, including meals, assets, and maintenance tasks. It provides distinct interfaces and functionalities for Administrators and regular Users.

## Features

- **Dashboard:** Overview of key statistics and activities for both Admins and Users.
- **Meal Management:**
  - Meal Calendar for users to request meals.
  - Admin interface to manage meal types and times.
- **Asset Management:**
  - Users can request assets.
  - Admins manage organizational assets (add, edit, delete, monitor).
  - Tracking of requested and due assets.
- **Maintenance Management:**
  - Users can submit maintenance requests.
  - Admins manage and track maintenance tasks, priorities, and statuses.
- **User Management (Admin):** Manage user accounts and roles.
- **Reporting (Admin):** Generate reports for meals, assets, and maintenance activities.
- **Notifications:** Inform users about relevant events or updates.
- **Settings:** User profile and application settings (e.g., theme).
- **Role-Based Access Control:** Different views and permissions for Admin and User roles.

## Tech Stack

- **Frontend:** React, TypeScript, JavaScript
- **UI Library:** Material UI (MUI)
- **Styling:** Tailwind CSS, CSS Modules/Plain CSS
- **Routing:** React Router
- **Data Fetching/State Management:** React Query, Axios
- **Calendar:** FullCalendar
- **Charts:** Chart.js (via react-chartjs-2), Recharts
- **PDF Generation:** html2pdf.js
- **Build Tool:** Vite
- **Linting:** ESLint

## Project Structure

```
/public             # Static assets (images, logos)
/src
├── App.tsx         # Main application component with routing
├── main.tsx        # Application entry point
├── index.css       # Global styles (Tailwind base)
│
├── components/     # Reusable UI components (categorized)
├── contexts/       # React context providers (Sidebar, User)
├── layouts/        # Page layout structures (Admin, User, shared)
├── pages/          # Top-level page components (categorized by role)
├── query/          # React Query hooks for data fetching
├── theme/          # MUI theme configuration and provider
└── utils/          # Utility functions
```

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/FiveStackDev/Resource_Hub.git
    cd Resource_Hub
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
    _or if using yarn:_
    ```bash
    yarn install
    ```

## Running the Project

1.  **Start the development server:**
    ```bash
    npm run dev
    ```
    _or_
    ```bash
    yarn dev
    ```
2.  Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).

## Building for Production

```bash
npm run build
```

_or_

```bash
yarn build
```

This will create a `dist` folder with the optimized production build.

## Linting

```bash
npm run lint
```

_or_

```bash
yarn lint
```

## Database Relational Schema

![Database_Diagram](https://github.com/user-attachments/assets/b6e15acc-67d6-4530-a637-359ac1f70104)
