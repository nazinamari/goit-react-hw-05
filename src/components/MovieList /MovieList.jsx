import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList ({ movies }) {
    const location = useLocation();

    return (
        <ul className={css.list}>
            {movies.map(({ id, title, poster_path }) => (
                <li key={id} className={css.item}>
                    <Link to={`/movies/${id}`} state={location} className={css.item__link}>
                        <div className={css.item__wrap}>
                            {poster_path ? (<img
                                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                                alt="film"
                                width="200px"
                                height="300px"
                                />) : (
                                    <div className={css.coverpic}>
                                        <img
                                        src="https://www.uoduckstore.com/TDS%20Product%20Images/QuickStudy%20Book%20for%20Calculus_1.jpg?resizeid=3&resizeh=195&resizew=195"
                                        alt=""
                                        />
                                    </div>
                                )} 
                            <h3 className={css.item__title}>{title}</h3>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
