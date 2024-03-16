import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MoviesFilter from "../../components/MoviesFilter/MoviesFilter";
import MovieList from "../../components/MovieList /MovieList";
import { getMoviesSearch } from "../../components/services/api";

export default function MoviesPage () {

    const [movies, setMovies] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState(false);

    const [params] = useSearchParams();
    const searchFilm = params.get('query') ?? '';

    useEffect(() => {
        async function fetchData() {
            try {
                setisLoading(true);
                const data = await getMoviesSearch(searchFilm);
                setMovies(data);
            } catch (error) {
                setError(true)
            } finally {
                setisLoading(false);
            }
        }
        fetchData()
    }, [searchFilm]);

    const filteredMovies = useMemo(() => {
        return movies.filter(movie => 
            movie.title.toLowerCase().includes(searchFilm.toLowerCase()),
        );
    }, [searchFilm, movies]);

    return (
        <>
            {isLoading && <Loader />}
            {error && <ErrorMessage />}
            <MoviesFilter />
            <div>
                {filteredMovies.length > 0 ? (
                    <MovieList movies={filteredMovies}/>
                ) : (
                    <p>No information</p>
                )}
            </div>
        </>
    );
}