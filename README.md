# Resource Hub

**Resource Hub** is a full-stack web application for managing meals, assets, maintenance, and organizational resources. It offers distinct functionalities and dashboards for Administrators and Users, powered by a Ballerina backend and a modern React frontend.

---

## 📁 Project Structure

```
/Resource-Hub
├── Front-End/                # React frontend app
└── Back-End/                 # Ballerina backend API
```

---

## ✨ Features

### 🔒 Authentication & Authorization

* JWT-based login system
* Role-based access control (Admin & User)

### 🍽️ Meal Management

* Users can request meals via a calendar UI
* Admins manage meal types and times

### 🛠️ Maintenance Management

* Users submit maintenance requests
* Admins prioritize and track maintenance tasks

### 🧰 Asset Management

* Asset request and tracking by users
* Admins manage inventory and handovers

### 👤 User Management

* Admin-side user role control
* Profile editing and preferences

### 📊 Dashboard & Analytics

* Summary statistics for users and admins

### 📧 Email Notifications

* SMTP-based notifications for events and reminders

### 📑 Reporting

* API hooks for PDF report generation
* Admins can generate and download summaries

### 🌙 Theme & UI

* Light/Dark mode toggle
* Responsive sidebar and layout

---

## 🧪 Tech Stack

### 🔧 Backend

* **Language:** Ballerina
* **Runtime:** Ballerina HTTP module
* **Database:** MySQL
* **Email:** SMTP
* **Docs:** OpenAPI (if enabled)

### 💻 Frontend

* **Framework:** React (TypeScript)
* **UI:** Material UI (MUI), Tailwind CSS
* **State Management:** React Query, Axios
* **Routing:** React Router
* **PDF & Charts:** html2pdf.js, Chart.js, Recharts
* **Build Tool:** Vite

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/FiveStackDev/ResourceHub.git
```

---

## 🔧 Backend Setup (`/backend`)

### Install Ballerina:

Download from [https://ballerina.io/downloads/](https://ballerina.io/downloads/)

### Configure `Config.toml`

```toml
[back_end_ballerina.services]
USER = "your_db_user"
PASSWORD = "your_db_password"
HOST = "localhost"
PORT = "3306"
DATABASE = "your_database_name"
SMTP_HOST = "your_smtp_host"
SMTP_PORT = "587"
SMTP_USER = "your_smtp_user"
SMTP_PASSWORD = "your_smtp_pass"
PDFSHIFT_API_KEY = "your_pdfshift_api_key"
```

### Add MySQL Driver

In `Ballerina.toml`:

```toml
[[platform.java11.dependency]]
groupId = "mysql"
artifactId = "mysql-connector-java"
version = "8.0.26"
```

---

## 🗄️ Database Schema

A detailed SQL schema is provided in the [`backend/README.md`](./backend/README.md), including:

* `users`, `mealtimes`, `mealtypes`, `requestedmeals`
* `assets`, `requestedassets`, `maintenance`, `notification`

📌 **ER Diagram:**

![Database Diagram](https://github.com/user-attachments/assets/b6e15acc-67d6-4530-a637-359ac1f70104)

---

## 📝 License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.


