import { Fieldset as FieldsetPrimeReact, FieldsetProps as FieldsetPropsPrimeReact } from 'primereact/fieldset';

type FieldSetProps = {}

export default function Fieldset(props: FieldsetPropsPrimeReact & FieldSetProps) {
    return <FieldsetPrimeReact {...props} />
}