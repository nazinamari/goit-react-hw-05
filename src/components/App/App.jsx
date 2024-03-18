import Navigation from "../Navigation/Navigation";
import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
const HomePage = lazy(() => import("../../pages/HomePage/HomePage.jsx"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage.jsx"));
const MovieDetailsPage = lazy(() => import("../../pages/MovieDetailsPage/MovieDetailsPage.jsx"));
const MovieCast = lazy(() => import("../MovieCast/MovieCast.jsx"));
const MoviesReviews = lazy(() => import("../MovieReviews/MovieReviews.jsx"));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage.jsx'));
import css from "./App.module.css"

export default function App () {
    return (
        <div className={css.container}>
            <Navigation/>
            <Suspense fallback={null}>
                <Routes className={css.nav}>
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