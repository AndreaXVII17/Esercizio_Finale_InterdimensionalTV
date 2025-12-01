import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./Detail.css";
import actorPlaceholder from '../../assets/actor-placeholder.svg';
import backdropPlaceholder from '../../assets/backdrop-placeholder.svg';
// NavBar is provided by Layout
import BackButton from "../BackButton/BackButton";
import { useFavourites } from '../../context/FavouritesContext';


const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function Detail({ mediaType }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [details, setDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [ratedTv, setRatedTv] = useState([]);
  const [ratedMovies, setRatedMovies] = useState([]);
  const [userRating, setUserRating] = useState(null);
  const [ratings, setRatings] = useState(null);
  const { favourites, addFavourite, removeFavourite } = useFavourites();

    const castRef = useRef(null);
    const similarRef = useRef(null);
    const [castLeft, setCastLeft] = useState(false);
    const [castRight, setCastRight] = useState(false);
    const [simLeft, setSimLeft] = useState(false);
    const [simRight, setSimRight] = useState(false);



  useEffect(() => {
<<<<<<< HEAD
    async function loadAll() {
      // dettagli film
      const d = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${API_KEY}&language=it-IT`
      ).then((r) => r.json());
      setDetails(d);

      // il cast
      const c = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${API_KEY}&language=it-IT`
      ).then((r) => r.json());
      setCast(c.cast);

      // qui c'è fetch trailer su yt
      const v = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${API_KEY}&language=it-IT`
      ).then((r) => r.json());
      const trailer =
        v.results.find(
          (x) => x.type === "Trailer" && x.site === "YouTube"
        ) || null;
      setTrailerKey(trailer ? trailer.key : null);

      // film simili consigliati 
      const s = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${id}/similar?api_key=${API_KEY}&language=it-IT`
      ).then((r) => r.json());
      setSimilar(s.results);

      // fetch ratings / certifications
      try {
        if (mediaType === 'tv') {
          const cr = await fetch(
            `https://api.themoviedb.org/3/tv/${id}/content_ratings?api_key=${API_KEY}&language=it-IT`
          ).then((r) => r.json());
          setRatings(cr.results || []);
        } else {
          // movies: release_dates contains certifications per country
          const mr = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${API_KEY}`
          ).then((r) => r.json());
          setRatings(mr.results || []);
        }
      } catch (e) {
        console.error('Error fetching ratings', e);
        setRatings(null);
      }

      // fetch account rated lists (requires Bearer token)
      // NOTE: token provided inline per user's request
      try {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YjZjNTMyZmI2NDFkNjM3NTgzZGZmNjZjNjdmMTM4NCIsIm5iZiI6MTc2Mjc4NTc4Ni44NzUsInN1YiI6IjY5MTFmOWZhZmUwOGI2NzcyNmEwY2YzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bYx1ffbNPqHam0JWdpJcYy9moHha62AY0MjVgeX5nn8'
          }
        };

        // rated TV
        const rt = await fetch(
          'https://api.themoviedb.org/3/account/22458540/rated/tv?language=en-US&page=1&sort_by=created_at.asc',
          options
        ).then((r) => r.json());
        setRatedTv(rt.results || []);

        // rated movies
        const rm = await fetch(
          'https://api.themoviedb.org/3/account/22458540/rated/movies?language=en-US&page=1&sort_by=created_at.asc',
          options
        ).then((r) => r.json());
        setRatedMovies(rm.results || []);

        // compute user rating for the current item (if present)
        const numericId = Number(id);
        if (mediaType === 'tv') {
          const found = (rt.results || []).find((x) => Number(x.id) === numericId);
          setUserRating(found ? found.rating : null);
        } else {
          const found = (rm.results || []).find((x) => Number(x.id) === numericId);
          setUserRating(found ? found.rating : null);
        }
      } catch (e) {
        console.error('Error fetching account rated lists', e);
=======
    // Parallelize many API calls and avoid multiple sequential awaits
    const controller = new AbortController();
    let mounted = true;

    async function loadAll() {
      try {
        // fetch details first so page renders quickly
        const dRes = await fetch(
          `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${API_KEY}&language=it-IT`,
          { signal: controller.signal }
        );
        const d = await dRes.json();
        if (!mounted) return;
        setDetails(d);

        // parallel requests for the rest
        const creditsP = fetch(
          `https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${API_KEY}&language=it-IT`,
          { signal: controller.signal }
        ).then((r) => r.json()).catch(() => null);

        const videosP = fetch(
          `https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${API_KEY}&language=it-IT`,
          { signal: controller.signal }
        ).then((r) => r.json()).catch(() => null);

        const similarP = fetch(
          `https://api.themoviedb.org/3/${mediaType}/${id}/similar?api_key=${API_KEY}&language=it-IT`,
          { signal: controller.signal }
        ).then((r) => r.json()).catch(() => ({ results: [] }));

        const ratingsP = (async () => {
          try {
            if (mediaType === 'tv') {
              const cr = await fetch(
                `https://api.themoviedb.org/3/tv/${id}/content_ratings?api_key=${API_KEY}&language=it-IT`,
                { signal: controller.signal }
              );
              return (await cr.json()).results || [];
            } else {
              const mr = await fetch(
                `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${API_KEY}`,
                { signal: controller.signal }
              );
              return (await mr.json()).results || [];
            }
          } catch (e) {
            return null;
          }
        })();

        const [c, v, s, r] = await Promise.all([creditsP, videosP, similarP, ratingsP]);
        if (!mounted) return;

        setCast((c && c.cast) || []);
        const trailer = v?.results?.find((x) => x.type === 'Trailer' && x.site === 'YouTube') || null;
        setTrailerKey(trailer ? trailer.key : null);
        setSimilar((s && s.results) || []);
        setRatings(r || []);

        // fetch account rated lists in background (do not block initial UI)
        (async () => {
          try {
            const options = {
              method: 'GET',
              headers: {
                accept: 'application/json',
                Authorization:
                  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YjZjNTMyZmI2NDFkNjM3NTgzZGZmNjZjNjdmMTM4NCIsIm5iZiI6MTc2Mjc4NTc4Ni44NzUsInN1YiI6IjY5MTFmOWZhZmUwOGI2NzcyNmEwY2YzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bYx1ffbNPqHam0JWdpJcYy9moHha62AY0MjVgeX5nn8'
              }
            };

            const [rtRes, rmRes] = await Promise.all([
              fetch('https://api.themoviedb.org/3/account/22458540/rated/tv?language=en-US&page=1&sort_by=created_at.asc', options).then(r => r.json()).catch(() => ({ results: [] })),
              fetch('https://api.themoviedb.org/3/account/22458540/rated/movies?language=en-US&page=1&sort_by=created_at.asc', options).then(r => r.json()).catch(() => ({ results: [] }))
            ]);

            if (!mounted) return;
            setRatedTv(rtRes.results || []);
            setRatedMovies(rmRes.results || []);

            const numericId = Number(id);
            if (mediaType === 'tv') {
              const found = (rtRes.results || []).find((x) => Number(x.id) === numericId);
              setUserRating(found ? found.rating : null);
            } else {
              const found = (rmRes.results || []).find((x) => Number(x.id) === numericId);
              setUserRating(found ? found.rating : null);
            }
          } catch (e) {
            // ignore background errors
          }
        })();
      } catch (e) {
        if (e.name === 'AbortError') return;
        console.error(e);
>>>>>>> GiraudoAndrea_modificheMain
      }
    }

    loadAll();
<<<<<<< HEAD
=======

    return () => {
      mounted = false;
      controller.abort();
    };
>>>>>>> GiraudoAndrea_modificheMain
  }, [id, mediaType]);

  // manage visibility of scroll buttons for cast and similar lists
  useEffect(() => {
    const castEl = castRef.current;
    const similarEl = similarRef.current;

    const updateCast = () => {
      if (!castEl) return;
      setCastLeft(castEl.scrollLeft > 0);
      setCastRight(castEl.scrollLeft + castEl.clientWidth < castEl.scrollWidth - 1);
    };

    const updateSim = () => {
      if (!similarEl) return;
      setSimLeft(similarEl.scrollLeft > 0);
      setSimRight(similarEl.scrollLeft + similarEl.clientWidth < similarEl.scrollWidth - 1);
    };

    if (castEl) {
      castEl.addEventListener('scroll', updateCast, { passive: true });
      window.addEventListener('resize', updateCast);
      setTimeout(updateCast, 50);
    }

    if (similarEl) {
      similarEl.addEventListener('scroll', updateSim, { passive: true });
      window.addEventListener('resize', updateSim);
      setTimeout(updateSim, 50);
    }

    return () => {
      if (castEl) castEl.removeEventListener('scroll', updateCast);
      if (similarEl) similarEl.removeEventListener('scroll', updateSim);
      window.removeEventListener('resize', updateCast);
      window.removeEventListener('resize', updateSim);
    };
  }, [cast, similar]);

  const scrollCast = (dir = 1) => {
    const el = castRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' });
  };

  const scrollSim = (dir = 1) => {
    const el = similarRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' });
  };

  // pick preferred rating/certification (prefer Italy, then first available)
  const getPreferredRating = () => {
    if (!ratings) return null;
    if (mediaType === 'tv') {
      // ratings is an array of { iso_3166_1, rating }
      const it = ratings.find((r) => r.iso_3166_1 === 'IT' || r.iso_3166_1 === 'it');
      if (it && it.rating) return it.rating;
      const first = ratings.find((r) => r.rating);
      return first ? first.rating : null;
    } else {
      // movies: ratings is an array of { iso_3166_1, release_dates: [ { certification } ] }
      const it = ratings.find((r) => r.iso_3166_1 === 'IT' || r.iso_3166_1 === 'it');
      if (it && Array.isArray(it.release_dates)) {
        const cert = it.release_dates.find((d) => d.certification && d.certification.trim() !== '');
        if (cert) return cert.certification;
      }
      // fallback: search any certification in release_dates
      for (const row of ratings) {
        if (row.release_dates && row.release_dates.length) {
          const cert = row.release_dates.find((d) => d.certification && d.certification.trim() !== '');
          if (cert) return cert.certification;
        }
      }
      // final fallbacks: use details.adult or vote_average if present
      if (details) {
        if (details.adult) return '18+';
        if (typeof details.vote_average === 'number') return `${Math.round(details.vote_average * 10) / 10}/10`;
      }
      return null;
    }
  };


  if (!details) return <div className="detail-loading">Caricamento…</div>;

  const isFavourite = Array.isArray(favourites) && favourites.some((f) => Number(f.id) === Number(id) && ((f.media_type || f.mediaType || (f.first_air_date ? 'tv' : 'movie')) === mediaType));

  const handleFavouriteToggle = () => {
    if (!details) return;
    if (isFavourite) {
      if (typeof removeFavourite === 'function') removeFavourite(details.id);
    } else {
      if (typeof addFavourite === 'function') {
        const item = {
          id: details.id,
          media_type: mediaType,
          poster_path: details.poster_path || null,
          title: details.title || null,
          name: details.name || null,
          first_air_date: details.first_air_date || null,
        };
        addFavourite(item);
      }
    }
  };

  const backdropUrl = details.backdrop_path
<<<<<<< HEAD
    ? `https://image.tmdb.org/t/p/original${details.backdrop_path}`
=======
    ? `https://image.tmdb.org/t/p/w1280${details.backdrop_path}`
>>>>>>> GiraudoAndrea_modificheMain
    : details.poster_path
    ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
    : backdropPlaceholder;

  return (
    <div className="detail-page">
      <div className="detail-backdrop">
        <img
          className={`detail-backdrop-img`}
          src={backdropUrl}
          alt={details.title || details.name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = backdropPlaceholder;
          }}
        />
        <div className="backdrop-overlay" />
        <BackButton />
      </div>

      <div className="detail-header">
        <h1 className="detail-title">{details.title || details.name}</h1>
        <div className="detail-header-right">
          <button
            type="button"
            className="detail-fav-btn"
            onClick={handleFavouriteToggle}
            aria-pressed={isFavourite}
            aria-label={isFavourite ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 6,
              marginRight: 8,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isFavourite ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.65 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M12.1 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.65 11.54l-1.25 1.31z" />
              </svg>
            )}
          </button>
          <div className="detail-rating">{getPreferredRating() || '—'}</div>

          {typeof details?.vote_average === 'number' ? (
            <div className="detail-aggregate-inline" title={`Voto medio TMDB: ${Math.round(details.vote_average * 10) / 10}`}>
              <span className="agg-num">{Math.round(details.vote_average * 10) / 10}</span>
              <span className="agg-scale">/10</span>
            </div>
          ) : null}

          {userRating ? (
            <div className="detail-user-rating">La tua valutazione: {userRating}</div>
          ) : null}
        </div>
      </div>

      <div className="detail-info">
        <span>
          {details.release_date?.slice(0, 4) ||
            details.first_air_date?.slice(0, 4)}
        </span>
        <span> • {details.genres.map((g) => g.name).join(", ")}</span>
      </div>

      <div className="detail-body-row">
        <div className="detail-overview-col">
          <p className="detail-overview">{details.overview}</p>
        </div>

        {trailerKey && (
          <div className="detail-trailer-col">
            <div className="detail-trailer">
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}`}
                allow="autoplay"
                title="Trailer"
              />
            </div>
          </div>
        )}
      </div>

     
      <h2>Cast</h2>
      <div className="row-wrapper">
        {castLeft && <button className="scroll-btn left" onClick={() => scrollCast(-1)} aria-label="Scroll cast left">‹</button>}
        <div className="detail-cast scroll-row" ref={castRef}>
          {cast.slice(0, 20).map((actor) => (
            <div key={actor.id} className="cast-card">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : actorPlaceholder
                }
                alt={actor.name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = actorPlaceholder;
                }}
<<<<<<< HEAD
=======
                loading="lazy"
>>>>>>> GiraudoAndrea_modificheMain
              />
              <p>{actor.name}</p>
              <small>{actor.character}</small>
            </div>
          ))}
        </div>
        {castRight && <button className="scroll-btn right" onClick={() => scrollCast(1)} aria-label="Scroll cast right">›</button>}
      </div>

    
      <h2>Simili</h2>
      <div className="row-wrapper">
        {simLeft && <button className="scroll-btn left" onClick={() => scrollSim(-1)} aria-label="Scroll similar left">‹</button>}
        <div className="similar-list scroll-row" ref={similarRef}>
          {similar.map((item) => (
            <Link
      to={`/${mediaType}/${item.id}`}
      key={item.id}
      className="similar-card"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >

              <img
                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                alt=""
<<<<<<< HEAD
=======
                loading="lazy"
>>>>>>> GiraudoAndrea_modificheMain
              />
              <p>{item.title || item.name}</p>
            </Link>
          ))}
        </div>
        {simRight && <button className="scroll-btn right" onClick={() => scrollSim(1)} aria-label="Scroll similar right">›</button>}
      </div>
    </div>
  );
}
