import Button from "../Components/Button";
import MudaTemaButtonComponent from "../Components/MudaTemaButton";
import Navigation from "../Navigation";
import { NotFoundContentDIv } from "./style";

export default function NotFound() {
    const { goToHome } = Navigation()

    return <NotFoundContentDIv>
        <div>
            <MudaTemaButtonComponent />
        </div>
        <div>
            <h1>404 - Página Não Encontrada! :(</h1>
            <div>
                <Button
                    label="Voltar para home"
                    onClick={goToHome}
                    icon="pi pi-home"
                />
            </div>
        </div>
    </NotFoundContentDIv>
}