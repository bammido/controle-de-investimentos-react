import { useContext, useEffect } from "react";
import Navigation from "../../Navigation";
import getTokenLocal from "../functions/getTokenLocal";
import verifyToken from "../functions/verifyToken";
import { GlobalSettersType, globalContext } from "../../Contexts/GlobalContext";

export default function useIsAuthenticated() {

    const { goToLogin } = Navigation()

    const { setters } = useContext(globalContext)

    const { setUser } = (setters as GlobalSettersType)

    async function verifyAuthenticated() {
        try {
            const token = getTokenLocal()

            if (!token) throw new Error("Necessário fazer login");

            const { payload } = await verifyToken(token)

            const user = payload?.data || {}

            console.log(user)

            setUser(user)
        } catch (error) {
            return goToLogin()
        }
    }

    useEffect(() => {
        verifyAuthenticated()
    }, [])
}