import { useEffect, useState } from "react"
import { IMAGE_URL, fetchCast } from "../services/api"
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from './MovieCast.module.css';

export default function MovieCast () {

    const [cast, setCast] = useState([]);
    const { movieId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
    async function getCast() {
        try {
            setIsLoading(true);
            const data = await fetchCast(movieId);
            setCast(data);
        } catch (error) {
            setError(true)
        } finally {
            setIsLoading(false)
        }
    }
    getCast();
    }, [movieId]);
    
    return (
        <div>
            {isLoading && <Loader />}
            {error && <ErrorMessage />}
            <ul className={css.list}>
                {cast.map(castItem => {
                    return (
                        <li key={castItem.id} className={css.item}>
                            {castItem.profile_path ? (
                                <img
                                src={`${IMAGE_URL}${castItem.profile_path}`} 
                                alt={castItem.name}
                            />
                            ) : (
                                <img
                                src="https://static.vecteezy.com/system/resources/previews/026/966/960/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg"
                                width="200px"
                                height="300px"
                                alt=""
                                />
                            )}
                            <div>
                                <p>Name: {castItem.name}</p>
                                <p>Character: {castItem.character}</p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}