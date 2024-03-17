import { useEffect, useMemo, useState } from "react"
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MoviesFilter from "../../components/MoviesFilter/MoviesFilter";
import MovieList from "../../components/MovieList /MovieList";
// import { fetchDataTrending } from "../../components/services/api";
import { useSearchParams } from "react-router-dom";
import { getMoviesSearch } from "../../components/services/api";

export default function MoviesPage () {

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const [params] = useSearchParams();
    const movieFilter = params.get('query') ?? '';

    useEffect(() => {
        async function getData() {
            try {
                setIsLoading(true);
                const data = await getMoviesSearch(movieFilter);
                setMovies(data);
            } catch (error) {
                setError(true)
            } finally {
                setIsLoading(false);
            }
        }
        getData()
    }, [movieFilter]);

    // const filteredMovies = movies.filter((movie) => 
    // movie.title.toLowerCase().includes(movieFilter.toLowerCase())
    // );

    const filteredMovies = useMemo(() => {
        return movies.filter((movie) =>
    movie.title.toLowerCase().includes(movieFilter.toLowerCase())
    );
    },[movies, movieFilter])

    return (
        <>
            {isLoading && <Loader />}
            {error && <ErrorMessage />}
            <MoviesFilter />
            <MovieList movies={filteredMovies}></MovieList>
            {/* <div>
                {filteredMovies.length > && ! isLoading && <MovieList movies={filteredMovies} />}
            </div> */}
        </>
    );
}
