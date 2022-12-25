import {fonts} from './Theme'

export default function Globalstyle(){
    return(
        <style global jsx>{`
        * {
            font-family: ${fonts.primary};

            margin: 0;
            padding:0;
        }
        `}</style>
    )
}