import { useState, createContext } from 'react'
import getTemaEscuroLocal from '../helpers/functions/getTemaEscuroLocal'

export type SettersType = {
    setUser: React.Dispatch<React.SetStateAction<{}>>,
    setTemaEstaEscuro: React.Dispatch<React.SetStateAction<boolean>>
}

export type GlobalContextType = {
    setters?: SettersType,
    states?: any,
    methods?: any
}


export const globalContext = createContext<GlobalContextType>({})

type Props = { children: JSX.Element[] | JSX.Element }

export function GlobalContextProvider({ children }: Props) {
    const [user, setUser] = useState<{}>({})
    const [temaEstaEscuro, setTemaEstaEscuro] = useState<boolean>(getTemaEscuroLocal() === 'escuro' ? true : false)

    const methods = {

    }

    const states = {
        user,
        temaEstaEscuro
    }

    const setters = {
        setUser,
        setTemaEstaEscuro
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