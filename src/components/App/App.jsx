import Navigation from "../Navigation/Navigation";
import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import HomePage from "../../pages/HomePage/HomePage.jsx";
import MoviesPage from "../MoviesFilter/MoviesFilter.jsx";
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage.jsx'));

export default function App () {
    return (
        <div>
            <Navigation/>
            <Suspense fallback={<div>LOADING PAGE...</div>}>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/movies" element={<MoviesPage/>}/>
                    <Route path="/movies/:movieId">
                        {/* <Route path="cast"/>
                        <Route path="reviews"/> */}
                    </Route>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </Suspense>
        </div>
    );
}