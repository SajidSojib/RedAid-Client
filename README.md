


# 🩸 RedAid – Blood Donation Platform


RedAid is a **MERN stack-based blood donation platform** designed to seamlessly connect blood donors with those in urgent need. It offers a user-friendly interface, role-based dashboards, and secure integrations to make blood donation more accessible and efficient.

**Live Site:** [https://red--aid.web.app/](https://red--aid.web.app/)  
**Backend Site:** [https://redaid-server.vercel.app/](https://redaid-server.vercel.app/)


---

## 🚀 Features

- 🔐 **Donor Registration & Login**
- 📦 **Create & Manage Blood Donation Requests**
- 🔍 **Search Nearby Donors by Location & Blood Type**
- 📊 **Role-Based Dashboard** (Admin, Donor, Volunteer)
- 🧾 **Content Management System** (Blog & Tips)
- 💳 **Secure Donations with Stripe Integration**
- 🛡 **Protected Routes using Firebase Authentication**
- 📁 **Image Upload using ImageBB**
- 🎨 **Responsive & Accessible UI** with Tailwind CSS + DaisyUI

---


## 📸 Screenshot

![RedAid Screenshot](https://i.ibb.co/yn7qGBjR/Fire-Shot-Capture-002-Home-Red-Aid-localhost.png)

---

## 🔐 Roles in the App

* **Admin:** Manages users, requests, and content.
* **Volunteer:** Updates donation request statuses.
* **Donor:** Registers, donates, and tracks own requests.

---
## Project Overview

RedAid is a full-stack MERN application aimed at simplifying the blood donation process by connecting donors with recipients in need. The platform features role-based dashboards for admins, donors, and volunteers, allowing easy management of donation requests, secure payment processing via Stripe, and real-time authentication with Firebase. With a responsive and intuitive UI built using React and Tailwind CSS, RedAid ensures a seamless user experience across devices. The application promotes community engagement through blog content and supports image uploads for enhanced request details.


---
## 🛠️ Tech Stack

### **Frontend**
- React 19
- Tailwind CSS v4 + DaisyUI
- React Router v7
- React Hook Form
- Firebase Authentication
- React Query (TanStack Query)
- Stripe.js
- SweetAlert2
- Jodit Editor

### **Backend**
- Express.js
- MongoDB (Native Driver)
- Firebase Admin SDK
- Stripe API
- Dotenv & CORS

---

## 📦 Dependencies

### **Frontend**
- `react`, `react-dom`
- `react-router-dom`
- `tailwindcss`, `daisyui`
- `axios`
- `@tanstack/react-query`
- `react-hook-form`
- `firebase`
- `@stripe/stripe-js`
- `sweetalert2`
- `jodit-react`
- (Vite or Create React App)

### **Backend**
- `express`
- `mongodb`
- `cors`
- `dotenv`
- `stripe`
- `firebase-admin`
- `nodemon` (dev)

---

## ⚙️ Environment Variables

Create `.env` files in both **client** and **server** directories.

### **server/.env.example**
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=sk_test_...
FIREBASE_SERVICE_ACCOUNT_JSON=./serviceAccountKey.json
IMAGEBB_API_KEY=your_imagebb_key
````

### **client/.env.example**

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

## ▶️ Run Locally

1. **Clone the repository**

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

2. **Setup Backend**

```bash
cd server
cp .env.example .env
# Fill in your environment variables
npm install
npm run dev
```

3. **Setup Frontend**

```bash
cd ../client
cp .env.example .env
# Fill in your environment variables
npm install
npm run dev
```

4. **Access the app**

* Frontend: [http://localhost:5173](http://localhost:5173) (Vite) or [http://localhost:3000](http://localhost:3000) (CRA)
* Backend API: [http://localhost:5000](http://localhost:5000)

---


## 🧪 Troubleshooting

* **MongoDB connection error** → Check `MONGODB_URI` and whitelist IPs on MongoDB Atlas.
* **Stripe payment failing** → Ensure you’re using **test API keys** and correct webhook setup.
* **Firebase auth error** → Verify your Firebase credentials and domain whitelist.
* **CORS errors** → Check backend CORS settings.

---

## 🌐 Live Links

* **Frontend:** [https://red--aid.web.app/](https://red--aid.web.app/)
* **Backend:** [https://redaid-server.vercel.app/](https://redaid-server.vercel.app/)

---

## 📜 License

This project is licensed under the **MIT License** — feel free to use and adapt it.


Here’s what you’ll still need to do before committing it:
1. **Replace** `./assets/banner.png` and `./assets/screenshot.png` with actual files in your repo.  
2. Add real environment variables in `.env` (not committed).  
3. Update `<your-username>` and `<repo-name>` in the clone URL.  
