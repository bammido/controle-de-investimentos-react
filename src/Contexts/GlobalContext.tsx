import { useState, createContext } from 'react'

export type GlobalContextType = {
    setters?: any,
    states?: any,
    methods?: any
}

export const globalContext = createContext<GlobalContextType>({})

type Props = { children: JSX.Element[] | JSX.Element }

export function GlobalContextProvider({ children }: Props) {
    const [user, setUser] = useState()

    const methods = {

    }

    const states = {
        user
    }

    const setters = {
        setUser
    }

    const value = {
        setters,
        states,
        methods
    }

    return <globalContext.Provider value={value}>
        {children}
    </globalContext.Provider>
}