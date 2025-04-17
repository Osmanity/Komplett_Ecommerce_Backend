# Komplett E-commerce Backend API

## Översikt

Komplett E-commerce Backend är ett REST API som erbjuder grundläggande CRUD-operationer (Create, Read, Update, Delete) för en e-handelsplattform. API:et hanterar produkter, användare, beställningar och meddelanden.

---

## Huvudfunktioner

### 1. Användarhantering

- **Registrering** (`POST /signup`)
- **Inloggning** (`POST /signin`)
- **Profilhämtning** (`GET /profile`)

### 2. Produkthantering

- **Hämta alla produkter** (`GET /api/products`)
- **Hämta produkt med ID** (`GET /api/products/:id`)
- **Skapa ny produkt** (`POST /api/products`)
- **Uppdatera produkt** (Ej angiven endpoint)
- **Ta bort produkt** (`DELETE /api/products/:id`)

### 3. Orderhantering

- **Skapa ny order** (`POST /api/orders`)
- **Hämta användarens ordrar** (Ej angiven endpoint)
- **Hämta specifik order med ID** (`GET /api/orders/:id`)

### 4. Meddelandehantering

- **Validera och skicka meddelanden** (`POST /api/messages`)

---

## Installation och konfiguration

### Steg 1: Förbered servern

1. Öppna terminalen.
2. Navigera till servermappen:
   ```bash
   cd path/to/server
   ```
3. Installera nödvändiga paket:
   ```bash
   npm install
   ```
4. Skapa en `.env`-fil i servermappen och inkludera miljövariabler som t.ex.:
   ```
   MONGO_URI=din_mongodb_uri
   JWT_SECRET=hemlig_nyckel
   PORT=5000
   ```
5. Starta utvecklingsservern:
   ```bash
   npm run dev
   ```

### Steg 2: Testa API:et

API:et kan testas med Postman här är länken till testing:

https://.postman.co/workspace/My-Workspace~e6af0041-d0ca-4fdc-89a5-3ab22cff66ac/collection/43137523-08629a8c-fe3d-4e2c-b16e-4a3fc49a1389?action=share&creator=43137523

skicka en begära för att ta del av postman testing för enklare testning.

Följande endpoints finns tillgängliga:



#### Autentisering

- `POST /signup` – Registrera ny användare  
- `POST /signin` – Logga in användare  
- `GET /profile` – Hämta användarens profil  

#### Produkter

- `GET /api/products` – Hämta alla produkter  
- `GET /api/products/:id` – Hämta specifik produkt  
- `POST /api/products` – Skapa ny produkt  
- `DELETE /api/products/:id` – Ta bort produkt  

#### Ordrar

- `POST /api/orders` – Skapa ny order  
- `GET /api/orders/:id` – Hämta specifik order  

#### Meddelanden

- `POST /api/messages` – Validera och skicka meddelande  

---

## Teknisk information

Backend-systemet är byggt med:

- Node.js och Express  
- MongoDB (via Mongoose)  
- JWT för autentisering  
- bcrypt för lösenordskryptering  

---

## Datamodeller

### Användare (User)

- Namn  
- E-post (unik)  
- Lösenord (krypterat)  

### Produkt (Product)

- Namn  
- Pris  
- Beskrivning  
- Kategori  
- Bilder (array av URL:er)  

### Order

- Användare (referens till User)  
- Produkter (array av produkter med ID och kvantitet)  
- Totalpris  
- Status (`pending`, `processing`, `shipped`, `delivered`, `cancelled`)  
- Leveransadress  

---

## Autentisering

API:et använder JWT (JSON Web Tokens) för autentisering. Token skickas antingen som:

- Cookie  
- Bearer token i `Authorization`-headern  

---

## Säkerhet

- Lösenord hashas med bcrypt  
- JWT används för säker autentisering  
- CORS är konfigurerat för att tillåta specifika ursprung  

---

## Utveckling

För att fortsätta utveckla systemet, se till att du har Node.js och npm installerade. Använd:

```bash
npm run dev
```

för att köra servern i utvecklingsläge med automatisk omstart via nodemon.
