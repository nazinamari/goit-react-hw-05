import { useSearchParams } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { useState } from "react";
import css from './MoviesFilter.module.css'
import { AiOutlineSearch } from "react-icons/ai";

export default function MoviesFilter() {

    const [params, setParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');

    const changeFilter = (newFilter) => {
        params.set('query', newFilter);
        setParams(params);
        
    };

    const notify = () => toast.error('Please enter search term!');

    const onChangeValue = e => {
        const { value } = e.target;
        setSearchQuery(value);
    };

    const handleSubmit = e => {
        e.preventDefault();

        if(searchQuery === "") {
            notify()
            return;
        }

        changeFilter(searchQuery);
        setSearchQuery('');
        
    }

    return(
        <div className={css.form__wrap}>
            <form onSubmit={handleSubmit} className={css.form}>
                <input
                    className={css.input}
                    type="text"
                    name="query"
                    value={searchQuery}
                    onChange={onChangeValue}
                    placeholder="Enter movie titile..."
                >
                </input>
                <button type="submit" className={css.button__search}>
                    <AiOutlineSearch size="24px" />
                    Search
                </button>
            </form>
            <Toaster position="top-right"/>
        </div>
    )
}
