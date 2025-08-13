# AI Chatbot – OpenAI API (Full Stack)

A simple MERN-style full-stack chatbot built with:

- **Backend:** Node.js + Express + OpenAI SDK
- **Frontend:** React + Vite

The backend keeps your OpenAI API key secure, and the frontend interacts with it via a `/api/chat` endpoint.

---

## 📂 Project Structure

```

ai-chatbot/
├── backend/        # Express server
│   ├── package.json
│   ├── server.js
│   ├── .env.example
│   └── README.md
└── frontend/       # React client
├── package.json
├── vite.config.js
├── index.html
└── src/
├── main.jsx
├── App.jsx
├── api.js
└── styles.css

````

---

## ⚙️ Backend Setup

1. **Navigate to backend folder**
   ```bash
   cd backend
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   * Copy `.env.example` → `.env`
   * Add your **OpenAI API key**:

     ```
     OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx
     PORT=5000
     CLIENT_ORIGIN=http://localhost:5173
     ```

4. **Run the server**

   ```bash
   npm run dev
   ```

   Server starts at: [http://localhost:5000](http://localhost:5000)
   Health check: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🎨 Frontend Setup

1. **Navigate to frontend folder**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure backend URL**

   * In `src/api.js`, set the backend URL:

     ```js
     export const BASE_URL = 'http://localhost:5000';
     ```

4. **Run the frontend**

   ```bash
   npm run dev
   ```

   App runs at: [http://localhost:5173](http://localhost:5173)

---

## 🚀 Deployment Guide

### **Frontend (Vercel / Netlify)**

* Build:

  ```bash
  npm run build
  ```
* Deploy the `dist/` folder.

### **Backend (Render / Railway)**

* Upload the backend folder.
* Set environment variables:

  * `OPENAI_API_KEY` → Your API key
  * `CLIENT_ORIGIN` → URL of deployed frontend
* Start command: `node server.js`

---

## 💡 How It Works

* **Frontend:**

  * Displays a chat UI.
  * Sends user messages to `/api/chat` on backend.

* **Backend:**

  * Accepts POST requests at `/api/chat` with `{ messages: [] }`.
  * Calls OpenAI API (`gpt-4o-mini` by default).
  * Sends back AI’s reply.

---

## 📜 Example API Request

```json
POST /api/chat
{
  "messages": [
    { "role": "system", "content": "You are a helpful assistant." },
    { "role": "user", "content": "Hello!" }
  ]
}
```

**Response:**

```json
{
  "reply": "Hi there! How can I assist you today?"
}
```

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express, OpenAI SDK, Helmet, CORS, Morgan, Rate-Limit
* **Frontend:** React, Vite, CSS
* **Security:** API key hidden on server, rate-limiting enabled

---

## 📌 Notes

* Keep your `OPENAI_API_KEY` secret and **never** expose it in frontend code.
* You can change the model in `server.js`:

  ```js
  model: 'gpt-4o-mini'
  ```
* Adjust `temperature` for more/less creative responses.

--
