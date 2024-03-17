import { useEffect, useState } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import { fetchReviews } from "../services/api";
import { useParams } from "react-router-dom";
import css from './MovieReviews.module.css'

export default function MoviesReviews() {

    const [reviews, setReviews] = useState([]);
    const { movieId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        async function getReviews() {
            try {
                setIsLoading(true);
                const data = await fetchReviews(movieId);
                setReviews(data);
            } catch (error) {
                setError(true)
            } finally {
                setIsLoading(false)
            }
        }
        getReviews();
    }, [movieId])
    
    return(
        <div>
            {isLoading && <Loader />}
            {error && <ErrorMessage />}
            {reviews.length > 0 && (
                <ul className={css.reviews}>
                {reviews.map(({ id, author, content, rating }) => (
                    <li key={id}>
                        <div className={css.reviewsWrap}>
                            <p className={css.author}>{author}</p>
                            <p className={css.rating}>{rating}</p>
                            <p className={css.content}>{content}</p>
                        </div>
                    </li>
                ))}
            </ul>
            )}
            {!reviews.length && <p>We dont have any reviews for this movie</p>}
        </div>
    )
}