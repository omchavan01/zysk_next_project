# Next.js 15 App Router Project

## 🚀 Project Overview

This is a **Next.js 15** application using the **App Router** in JavaScript. The project includes user authentication with **NextAuth**, dynamic routing, API integration and . It follows best practices with modular folder structures and middleware for secure routes.

## 🔥 Features

- ✅ **App Router:** Modern routing system in Next.js 15
- ✅ **Data Fetching & Caching:** Axios & TanStack Query
- ✅ **Blogs Section:** Dynamic blog pages with pagination (DummyJSON API)
- ✅ **Specific Blog Section:** Specific blog page based on [slug] from main blogs page
- ✅ **Contact Form Integration:** Sends data to email & spreadsheet via AppScript
- ✅ **Authentication:** Credentials & OAuth (Google, GitHub) using NextAuth v14
- ✅ **Middleware:** Protected routes based on authentication status
- ✅ **Toast Notifications:** react-hot-toast for feedback

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/omchavan01/zysk_next_project.git
cd zysk_next_project
```

### 2️⃣ Install Dependencies

```sh
 npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file and add the following:

```
NEXTAUTH_URL = http://localhost:3000
NEXTAUTH_SECRET = your_secret_key
GOOGLE_ID = your_google_id
GOOGLE_SECRET = your_google_secret
GITHUB_ID = your_github_id
GITHUB_SECRET = your_github_secret
```

### 4️⃣ Run the Development Server

```sh
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## 📌 Usage

### 🔑 Authentication

- Users can log in via **credentials (email/password)** or **OAuth (Google/GitHub)**.
- Sessions are managed with **NextAuth**.
- Middleware protects certain routes from unauthorized access.

### 📄 Blogs with Pagination

- Fetches blog data from **DummyJSON API**.
- Displays paginated blogs in the main blogs page
- Displays a specific blog with dynamic routing (`/blogs/[slug]`).

### 📩 Contact Form Integration

- Sends form data to **Google Sheets & Email** via **Google Apps Script**.
- Uses **react-hot-toast** for success/error messages.
