import { useSearchParams } from 'react-router-dom'
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function MoviesFilter () {

    const notify = () => toast.error('Please enter search term!');

    const [searchParams, setSearchParams] = useSearchParams();
    const [inputValue, setInputValue] = useState("");

    function handleSubmit(evt) {
        evt.preventDefault();

        if(inputValue.trim() === '') {
            notify()
            return;
        }

        const currentParams = new URLSearchParams(searchParams);
        currentParams.set('query', inputValue);
        setSearchParams(currentParams.toString());
        setInputValue('');
    }

    const handleChange = (evt) => {
        setInputValue(evt.target.value);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    autoComplete="off"
                    autoFocus
                    onChange={handleChange}
                    value={inputValue}
                    placeholder="Search movies"
                />
                <button type="submit">Search</button>
            </form>
            <Toaster position="top-right"/>
        </>
    )
}