import { useState, createContext } from 'react'
import getTemaEscuroLocal from '../helpers/functions/getTemaEscuroLocal'
import setTemaEscuroLocal from '../helpers/functions/setTemaEscuroLocal'

export type GlobalSettersType = {
    setUser: React.Dispatch<React.SetStateAction<{}>>,
    setTemaEstaEscuro: React.Dispatch<React.SetStateAction<boolean>>
}

export type GlobalStatesType = {
    user: any,
    temaEstaEscuro: boolean
}

export type GlobalMethodsType = {
    mudaTema: (temaEscuro: boolean) => void,
}

export type GlobalContextType = {
    setters?: GlobalSettersType,
    states?: GlobalStatesType,
    methods?: any
}


export const globalContext = createContext<GlobalContextType>({})

type Props = { children: JSX.Element[] | JSX.Element }

export function GlobalContextProvider({ children }: Props) {
    const [user, setUser] = useState<{}>({})
    const [temaEstaEscuro, setTemaEstaEscuro] = useState<boolean>(getTemaEscuroLocal() === 'escuro' ? true : false)

    function mudaTema(temaEscuro: boolean) {
        temaEscuro ? setTemaEstaEscuro(true) : setTemaEstaEscuro(false)
        temaEscuro ? setTemaEscuroLocal('escuro') : setTemaEscuroLocal('claro')
    }

    const methods = {
        mudaTema
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