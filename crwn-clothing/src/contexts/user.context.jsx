// context allows certain data to be shared across components, such as authentication 
// details, which can be passed to other components.

import { createContext, useEffect, useReducer } from "react";

import { onAuthStateChangedListener, createUserDocumentFromAuth  } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
    currentUser: null,
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
    console.log("dispatched");
    console.log(action);
    const {type, payload} = action;

    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            } 
        default: 
            throw new Error(`unhandeled type ${type} in userReducer`);
    }
}

const INITIAL_STATE = {
    currentUser: null
}

export const UserProvider = ({children}) => {
    // const [currentUser, setCurrentUser] = useState(null);
    const [currentUser, dispatch] = useReducer(userReducer,INITIAL_STATE);
    console.log(currentUser);


    const setCurrentUser = (user) => {
        dispatch({type:USER_ACTION_TYPES.SET_CURRENT_USER});
            
    }

    const value = {currentUser, setCurrentUser};
    
    //checks for changes to state of authenticated user - listener function.
    //unsubscribe stops the function from listening.
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
        if(user){
            createUserDocumentFromAuth(user);
        }
        setCurrentUser(user);
        });
        return unsubscribe;
    },[]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
