
Netflix Clone – SPA con React & TMDB API

# Autori

Matteo Cecchi & Andrea Giraudo

# Descrizione del Progetto

Questo progetto è una SPA (Single Page Application) stile Netflix, sviluppata con React e alimentata attraverso le API di The Movie Database (TMDB).
L’app permette di:

Esplorare film e serie TV

Consultare dettagli completi di ogni contenuto

Cercare qualsiasi film o serie

Riprodurre trailer (quando disponibili)

Gestire una lista personale dei preferiti (con persistenza in localStorage)

L'obiettivo è replicare l’esperienza utente di Netflix, con focus su performance, UI moderna e una navigazione fluida.

# Tecnologie Utilizzate
Frontend
Tecnologia	Versione	Uso
React	                           ^18.x	Frontend SPA
React Router DOM	               ^6.x	Navigazione client-side
Vite                             ^5.x	Dev server e build tool
CSS	-	Styling custom responsivo
fetch API	-	Richieste verso TMDB

Gestione Stato
- Tecnologia	                     - Motivo
Context API	                     Gestione semplice e performante per lista preferiti
localStorage	                   Persistenza della lista tra sessioni
TMDB

Base URL API: https://developer.themoviedb.org/docs

Immagini: https://image.tmdb.org/t/p/

# Installazione & Avvio
 1. Clona il progetto
git clone https://github.com/tuo-repo/netflix-clone.git
cd netflix-clone

 2. Installa le dipendenze
npm install

 3. Crea il file .env

Nella root del progetto aggiungi:

VITE_TMDB_API_KEY= la tua chiave 
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3

 4. Avvia il server di sviluppo
npm run dev

# API TMDB Utilizzate
Film

Popular:
GET /movie/popular

Top Rated:
GET /movie/top_rated

Upcoming:
GET /movie/upcoming

By Genre:
GET /discover/movie

Serie TV

Trending:
GET /trending/tv/week

Ricerca:
GET /search/tv

Video & Trailer

GET /movie/{id}/videos

GET /tv/{id}/videos


https://developer.themoviedb.org/reference/intro/getting-started
=======
