import { Password, PasswordProps } from 'primereact/password';
import { PasswordIv } from './style';

type Props = { invalid?: number }
export default function PasswordInput(props: PasswordProps & Props) {
    const { invalid } = props

    return <PasswordIv>
        <Password
            {...props}
            style={{ width: "100%" }}
            promptLabel="Insira a senha"
            weakLabel="Fraco"
            mediumLabel="Médio"
            strongLabel="Forte"
            toggleMask
            className={`${props.className ? props.className : ''} ${invalid ? "p-invalid block" : ''}`}
        />
    </PasswordIv>
}