import Navigation from "../../Navigation"

export default function useLogOut() {
    const { goToLogin } = Navigation()
    localStorage.clear()
    goToLogin()
}