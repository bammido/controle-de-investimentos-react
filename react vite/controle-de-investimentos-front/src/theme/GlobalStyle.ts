import {fonts} from './Theme'

export default function Globalstyle(){
    return(
        <style global='true' jsx='true'>{`
        * {
            font-family: ${fonts.primary};

            margin: 0;
            padding:0;

            transition: 300ms;
        }
        `}</style>
    )
}