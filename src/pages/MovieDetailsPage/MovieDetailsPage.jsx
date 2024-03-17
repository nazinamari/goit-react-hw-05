import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { IMAGE_URL, getMovieById } from "../../components/services/api";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from './MovieDetailsPage.module.css'

export default function MovieDetailsPage () {

    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

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
            {movie && (
                <div>
                    <img 
                        src={`${IMAGE_URL}${movie.poster_path}`}
                        width="350px"
                        alt={movie.title}
                    />
                    <h2>
                        {movie.title} ({getYear()})
                    </h2>
                    <p>
                        User score: {Math.round(movie.vote_average * 10)}%
                    </p>
                    <h3>Overview</h3>
                    <p>{movie.overview}</p>
                    <h3>Genres</h3>
                    <div>
                        {movie.genres.map(el => el.name).join('')}
                    </div>
                </div>
            )}
            <hr></hr>
            <p>Additional Information</p>
            <ul>
                <div className={css.linkWrap}>
                    <li>
                        <Link 
                            className={css.link}
                            to="cast"
                        >
                            Cast
                        </Link>
                    </li>
                    <li>
                    <Link 
                            className={css.link}
                            to="reviews"
                        >
                            Review
                        </Link>
                    </li>
                </div>
            </ul>
            <hr></hr>
            <Outlet/>
        </div>
    )
}