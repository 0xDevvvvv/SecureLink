# SecureLink

SecureLink is a web application that allows users to generate one-time, expiring links to securely share sensitive information. A secret can only be viewed once and will expire after a set time.

## Features

- Create a secure, one-time link to share sensitive data.
- View the secret exactly once.
- Check the status of a secret: whether it's viewed, expired, or still available.
- All secrets are encrypted before storage using AES-GCM.
- Simple React frontend and Go backend.
- PostgreSQL database for storing secret metadata.

---

## Tech Stack

- **Frontend**: React + Tailwind CSS
- **Backend**: Go (Golang)
- **Database**: PostgreSQL
- **Encryption**: AES-256 GCM mode
- **ORM/Migrations**: Goose (Go migration tool)


---

## Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/securelink.git
cd securelink
```

### 2. Setup Backend (Go)

#### Install Dependencies

Make sure Go is installed. Then:

```bash
cd backend
go mod tidy
```

#### Configure Environment

Create a `.env` file in the `backend` directory:

```env
DBUSER=YOUR_DB_USERNAME
DBPASSWORD=YOUR_DB_PASS
DBHOST=localhost or YOUR_HOST
DBNAME=YOUR_DB_NAME
DBPORT=YOUR_DB_PORT
SERVERPORT=YOUR_SERVER_PORT
CLIENTPORT=YOUR_CLIENTPORT
AESKEY=your32characterkey
```

#### Run Migrations

Install Goose if not already installed:

```bash
go install github.com/pressly/goose/v3/cmd/goose@latest
```

Then run:

```bash
goose -dir=db/migrations postgres "$DB_URL" up
```

#### Start the Server

```bash
go run main.go
```

By default, it runs on `http://localhost:8080`.

---

### 3. Setup Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

By default, runs on `http://localhost:5173`.

---

## Folder Structure

```
server/
├── config/
│   └── env.go
├── db/
│   ├── migrations/
│   │   └── 20250425182321_create_secrets_table.sql
│   └── repository.go
├── handlers/
│   └── handlers.go
├── models/
│   └── models.go
├── services/
│   └── service.go
├── utils/
│   └── aes.go
├── .env
├── go.mod
├── go.sum
└── main.go

client/
└── securelink/
    │   public/
    │   └── vite.svg
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   │   ├── About.tsx
    │   │   ├── CheckStatusPanel.tsx
    │   │   ├── CreateSecretForm.tsx
    │   │   ├── navbar.tsx
    │   │   ├── SecureLinkPanel.tsx
    │   │   ├── TabNavigation.tsx
    │   │   └── ViewSecretPanel.tsx
    │   ├── App.css
    │   ├── App.tsx
    │   ├── index.css
    │   ├── main.tsx
    │   └── vite-env.d.ts
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── README.md
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts

```

---

## API Endpoints (Backend)

- `POST /generate`: Create a new encrypted secret link.
- `GET /s/{id}`: View the secret (only once).
- `GET /status/{id}`: Check secret status (viewed, expired, etc.).

---

## Notes

- Nonces are randomly generated per message and prepended to ciphertext.
- Secrets are encrypted using AES-256 GCM with a user-defined key from `.env`.
- Once viewed or expired, secrets are no longer accessible.

---

