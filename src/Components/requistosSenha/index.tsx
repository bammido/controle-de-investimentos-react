import { Divider } from "primereact/divider"
import { verificaPossuiUmNumero, verificaPossuiUmaLetraMaiuscula, verificaPossuiUmaLetraMinuscula } from "../../helpers/functions/validations"
import { RequisitoSenha } from "./style"

type Props = { senha: string }

export default function RequisitosSenha({ senha }: Props) {
    const umaLetraMinuscula = verificaPossuiUmaLetraMinuscula(senha)
    const umaLetraMaiuscula = verificaPossuiUmaLetraMaiuscula(senha)
    const umNumero = verificaPossuiUmNumero(senha)
    const oitoCaracteres = senha.length >= 8

    return <>
        <Divider />
        <p className="mt-2">Requisitos</p>
        <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
            <RequisitoSenha valid={umaLetraMinuscula} >Pelo menos uma letra minúscula</RequisitoSenha>
            <RequisitoSenha valid={umaLetraMaiuscula} >Pelo menos uma letra maiúscula</RequisitoSenha>
            <RequisitoSenha valid={umNumero} >Pelo meno um número</RequisitoSenha>
            <RequisitoSenha valid={oitoCaracteres} >No mínimo 8 caracteres</RequisitoSenha>
        </ul>
    </>
}