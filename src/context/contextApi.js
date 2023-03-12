import React, { createContext, useState, useEffect } from 'react';

import { fetchDataFromApi } from '../utils/api';

export const Context = createContext();

// all logic which we want to globally available 
export const AppContext = (props) => {
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("New");
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        fetchSelectedCategoryData(selectedCategory)
    }, [selectedCategory]); //when we click on left panel then state change using api call

    const fetchSelectedCategoryData = (query) => {
        setLoading(true);
        fetchDataFromApi(`search/?q=${query}`).then(({contents}) => { //fetch dat and it return a promise response then we print this res output
            console.log(contents);
            setSearchResults(contents); 
            setLoading(false);
        });
    };

    return ( //context provider
        //availbale state out of above components
        <Context.Provider
            value={{
                loading,
                setLoading,
                searchResults,
                setSelectedCategory,
                selectedCategory,
                mobileMenu,
                setMobileMenu,
            }}
        >
            {props.children}
        </Context.Provider>
    );
};