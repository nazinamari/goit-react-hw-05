import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage"
import { fetchDataTrending } from "../../components/services/api";
import MovieList from "../../components/MovieList /MovieList";
import css from "./HomePage.module.css"

export default function HomePage() {

    const [movies, setMovies] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function getData() {
            try {
                setisLoading(true);
                setError(false);
                const data = await fetchDataTrending();
                setMovies(data);
            } catch(error) {
                setError(true);
            } finally {
                setisLoading(false);
            }
        }
        getData();
    }, []);

    return (
        <>
            <h1 className={css.title__home}>Trending today</h1>
            {isLoading && <Loader></Loader>}
            {error && <ErrorMessage/>}
            <div>
                {movies.length > 0 && <MovieList movies={movies}></MovieList>}
            </div>
        </>
    )
}