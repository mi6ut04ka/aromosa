'use client'
import { createContext, useEffect, useState, useContext, useMemo } from "react";
import { getUserFromServer } from "../lib/auth";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [loadingUser, setLoadingUser] = useState(false); 
    const [user, setUser] = useState(null);


    useEffect(()=>{
        fetchUser();
    },[])

    const fetchUser = async () => {
        setLoadingUser(true);
        const user = await getUserFromServer();
        setUser(user);
        setLoadingUser(false);
    }

    return (
        <UserContext.Provider value={{user , setUser, loadingUser}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    return useContext(UserContext);
  }