import { createContext, useState } from 'react'
import { getRestaurants } from './store-request-api/index';

/*
    This is the global data store, employing the Flux design pattern.
*/

//The context that will be shared across components
export const GlobalStoreContext = createContext({});


export const GlobalStoreActionType = {
    LOAD_RESTAURANT_INFO: "LOAD_RESTAURANT_INFO",
}

function GlobalStoreContextProvider(props) {
    const [store, setStore] = useState({
        restaurants: []
    });
 
    // Data store's reducers that will handle all the state changes
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            //Get all the resteurants info 
            case GlobalStoreActionType.LOAD_RESTAURANT_INFO: {
                return setStore({
                    restaurants: payload,
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