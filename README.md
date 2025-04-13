# Instruktioner för användning av Komplett_Ecommerce_Backend   

Följ dessa steg för att starta och använda Komplett_Ecommerce_Backend:

## Steg 1: Förbered servern
1. Öppna terminalen.
2. Navigera till servermappen:
   ```bash
   cd server
   ```
3. Installera nödvändiga paket:
   ```bash
   npm install
   ```
4. Skapa en `.env`-fil i servermappen och klistra in följande variabler:
   ```env
   MONGO_URL=<din_mongodb_connection_string>
   JWT_SECRET=<din_hemliga_nyckel>
   ```
4. Starta igång utvecklingsservern:
   ```bash
   npm run dev
   ```
