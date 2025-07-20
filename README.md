<div align="center">
<div className="bg-gradient-to-r from-blue-500 to-purple-600 w-10 h-10 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
 </div>           
# 💬 MegaChat App — Firebase × Vite × Tailwind

A blazing fast and beautiful **real-time chat app** built with **React + Vite**, powered by **Firebase Authentication** and **Cloud Firestore**. The app supports **Google Sign-In**, real-time messaging, automatic scroll, and a sleek modern UI using TailwindCSS.

---

## 🚀 Tech Stack

### Frontend:
- ⚛️ **React** (via Vite)
- 🎨 **Tailwind CSS** for modern UI
- 🔀 **React Router DOM** for page routing
- 🔔 **React Toastify** for notifications
- 🪄 **Framer Motion** for animations

### Firebase:
- 🔐 **Firebase Authentication** (Google + Email/Password)
- 💬 **Firestore** for real-time messaging
- ☁️ **Firebase SDK v9 Modular**

---

## 📂 Project Structure
📦 client
├── 📂 public
├── 📂 src
│ ├── 📂 components
│ │ ├── ChatRoom.jsx
│ │ ├── AuthForm.jsx
│ ├── 📂 context
│ │ ├── AuthContext.jsx
│ ├── 📂 lib
│ │ ├── firebase.js
│ ├── App.jsx
│ ├── main.jsx
| ├── index.css
| ├── App.css
├── 📜 .env
├── 📜 .gitignore
├── 📜 index.html
├── 📜 package.json
├── 📜 tailwind.config.js
├── 📜 vite.config.js
---

## 🌟 Features

✅ **Firebase Google & Email Authentication**  
✅ **Real-Time Messaging via Firestore**  
✅ **Auto Scroll-to-Bottom** on new messages  
✅ **Mobile Responsive** UI  
✅ **User Avatars from Initials**  
✅ **Toast Notifications**  
✅ **Clean and Componentized Codebase**
## 📸 Screenshots

---

| Page | Screenshot |
|------|-----------|
| **Auth Page** | ![Auth Page](./src/assets/AuthPage.png)|
| **Chat Room** | ![Chat Room](./src/assets/ChatRoom.png) |

---

# 1. Clone the repository
git clone https://github.com/your-username/megachat.git

# 2. Navigate to the project
cd megachat

# 3. Install dependencies
npm install

# 4. Add your Firebase credentials to a `.env` file
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# 5. Run the development server
npm run dev
