import Navigation from "../Navigation/Navigation";
import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import HomePage from "../../pages/HomePage/HomePage.jsx";
import MoviesPage from "../../pages/MoviesPage/MoviesPage.jsx";
import MovieDetailsPage from "../../pages/MovieDetailsPage/MovieDetailsPage.jsx";
import MovieCast from "../MovieCast/MovieCast.jsx";
import MoviesReviews from "../MovieReviews/MovieReviews.jsx";
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage.jsx'));

export default function App () {
    return (
        <div>
            <Navigation/>
            <Suspense fallback={<div>LOADING PAGE...</div>}>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/movies" element={<MoviesPage/>}/>
                    <Route path="/movies/:movieId" element={<MovieDetailsPage/>}>
                        <Route path="cast" element={<MovieCast/>}/>
                        <Route path="reviews" element={<MoviesReviews/>}/>
                    </Route>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </Suspense>
        </div>
    );
}