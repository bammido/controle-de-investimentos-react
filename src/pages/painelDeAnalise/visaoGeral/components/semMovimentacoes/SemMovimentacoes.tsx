import Button from "../../../../../Components/Button";
import Navigation from "../../../../../Navigation";

export default function SemMovimentacoes() {

    const { goToCadastrarMovimentacoes } = Navigation()

    return <>
        <h1>Você ainda não possui movimentações</h1>
        <Button
            label="Cadastrar movimentações"
            onClick={goToCadastrarMovimentacoes}
            icon="pi pi-cart-plus"
        />
    </>
}