import { useEffect } from "react";
import Navigation from "../../Navigation";
import getTokenLocal from "../functions/getTokenLocal";
import verifyToken from "../functions/verifyToken";

export default function useIsAuthenticated() {

    const { goToLogin } = Navigation()

    async function verifyAuthenticated() {
        try {
            const token = getTokenLocal()

            if (!token) throw new Error("Necessário fazer login");

            await verifyToken(token)
        } catch (error) {
            return goToLogin()
        }
    }

    useEffect(() => {
        verifyAuthenticated()
    }, [])
}