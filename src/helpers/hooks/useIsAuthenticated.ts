import { useEffect } from "react";
import Navigation from "../../Navigation";

export default function useIsAuthenticated() {

    const { goToLogin } = Navigation()

    useEffect(() => {
        const token = 'teste'
        if (!token) return goToLogin()
    }, [])
}