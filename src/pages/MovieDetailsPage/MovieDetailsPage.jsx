import { Suspense, useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { IMAGE_URL, getMovieById } from "../../components/services/api";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from './MovieDetailsPage.module.css'
import { MdArrowBackIos } from "react-icons/md";

export default function MovieDetailsPage () {

    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const location = useLocation();
    const backLinkRef = useRef(location.state ?? '/payments')

    const getYear = () => new Date(movie.release_date).getFullYear();

    useEffect(() => {
        async function getData() {
            try {
                setIsLoading(true);
                const data = await getMovieById(movieId);
                setMovie(data);
            } catch (error) {
                setError(true);
            } finally {
                setIsLoading (false);
            }
        }
        getData();
    }, [movieId])
    
    
    return (
        <div>
            {isLoading && <Loader />}
            {error && <ErrorMessage />}
            <Link to={backLinkRef.current} className={css.backLink}><MdArrowBackIos/>GO BACK</Link>
            {movie && (
                <div className={css.movieDetails__wrap}>
                    <img
                        className={css.poster}
                        src={`${IMAGE_URL}${movie.poster_path}`}
                        width="350px"
                        alt={movie.title}
                    />
                    <h1>
                        {movie.title} ({getYear()})
                    </h1>
                    <p>
                        User score: {Math.round(movie.vote_average * 10)}%
                    </p>
                    <h2>Overview</h2>
                    <p>{movie.overview}</p>
                    <h2>Genres</h2>
                    <div>
                        {movie.genres.map(el => el.name).join('')}
                    </div>
                </div>
            )}
            <hr></hr>
            <h3 className={css.title__additional}>Additional Information</h3>
            <ul className={css.list__additional}>
                <div className={css.linkWrap}>
                    <li>
                        <NavLink 
                            className={css.link}
                            to="cast"
                        >
                            Cast
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            className={css.link}
                            to="reviews"
                        >
                            Review
                        </NavLink>
                    </li>
                </div>
            </ul>
            <hr></hr>
            <Suspense fallback={null}>
                <Outlet/>
            </Suspense>
        </div>
    )
}