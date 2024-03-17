import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage"
import { fetchDataTrending } from "../../components/services/api";
import MovieList from "../../components/MovieList /MovieList";

export default function HomePage() {

    const [movies, setMovies] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function getData() {
            try {
                setisLoading(true);
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
            <h1>Trending today</h1>
            {isLoading && <Loader></Loader>}
            {error && <ErrorMessage/>}
            <div>
                {movies.length > 0 && <MovieList movies={movies}></MovieList>}
            </div>
        </>
    )
}