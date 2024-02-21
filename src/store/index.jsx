import { createContext, useState } from 'react'
import { getRestaurants } from './store-request-api/index';

/*
    This is the global data store, employing the Flux design pattern.
*/

export const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
    LOAD_RESTAURANT_INFO: "LOAD_RESTAURANT_INFO",
    SET_STATE_FILTER_CRITERIA:"SET_STATE_FILTER_CRITERIA",
    SET_GENRE_FILTER_CRITERIA:"SET_GENRE_FILTER_CRITERIA",
}

function GlobalStoreContextProvider(props) {
    const [store, setStore] = useState({
        restaurants: [],
        state_filters: {All:true},
        genre_filter: {All:true}
    });

    // Data store's reducers that will handle all the state changes
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            //Get all the resteurants info 
            case GlobalStoreActionType.LOAD_RESTAURANT_INFO: {
                return setStore({
                    ...store,
                    restaurants: payload,
                });
            }
            //Sets the chosen state filters
            case GlobalStoreActionType.SET_STATE_FILTER_CRITERIA: {
                return setStore({
                    ...store,
                    state_filters: payload,
                });
            }
            //Sets the chosen state filters
            case GlobalStoreActionType.SET_GENRE_FILTER_CRITERIA: {
                return setStore({
                    ...store,
                    genre_filter: payload,
                });
            }
            
            default:
                return store;
        }
    }

    store.loadRestaurants = async function () {
        console.log("store.loadRestaurants");
        const response = await getRestaurants();
        if (response.status === 200) {
            let restaurants = response.data;
            console.log(restaurants)
            storeReducer({
                type: GlobalStoreActionType.LOAD_RESTAURANT_INFO,
                payload: restaurants
            });
            console.log("Data loaded successfully");
        }
        else {
            console.log("API FAILED TO GET THE RESTEURANT INFO");
        }
    }

    store.setStateAllFilter = () => {
        let new_state_filter = {All:true};
        storeReducer({
            type: GlobalStoreActionType.SET_STATE_FILTER_CRITERIA,
            payload: new_state_filter
        });

    }

    store.setStateFilter = (state) => {
        let new_state_filter;
        
        if (!store.state_filters.hasOwnProperty('All')) {
            new_state_filter = { ...store.state_filters };
            new_state_filter[state] = true;
        } else {
            new_state_filter = { [state]: true };
        }

        storeReducer({
            type: GlobalStoreActionType.SET_STATE_FILTER_CRITERIA,
            payload: new_state_filter
        });
    };
    
    
    store.deselectState = (state) => {
        let new_state_filter = { ...store.state_filters };
        delete new_state_filter[state] 

        storeReducer({
            type: GlobalStoreActionType.SET_STATE_FILTER_CRITERIA,
            payload: new_state_filter
        });
    }

    store.setGenreAllFilter = () => {
        let new_genre_filter = {All:true};

        storeReducer({
            type: GlobalStoreActionType.SET_GENRE_FILTER_CRITERIA,
            payload: new_genre_filter
        });

    }

    store.setGenreFilter = (genre) => {
        let new_genre_filter;

        if (!store.genre_filter.hasOwnProperty('All')) {
            new_genre_filter = { ...store.genre_filter };
            new_genre_filter[genre] = true;
        } else {
            new_genre_filter = { [genre]: true };
        }

        storeReducer({
            type: GlobalStoreActionType.SET_GENRE_FILTER_CRITERIA,
            payload: new_genre_filter
        });
    }

    store.deselectGenre = (genre) => {
        let new_genre_filter = { ...store.genre_filter };
        delete new_genre_filter[genre] 

        storeReducer({
            type: GlobalStoreActionType.SET_GENRE_FILTER_CRITERIA,
            payload: new_genre_filter
        });
    }
    
    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
    }

export default GlobalStoreContext;
export { GlobalStoreContextProvider };