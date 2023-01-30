import { display } from "../theme/Theme";

export default function CadastrarInvestimentosStyle(){
    return <style jsx='true' >{`
    
    .titulo{
        text-align: center;
        margin: 5vh 0; 
    }

    .form-inputs{
        display: flex;
        flex-wrap: wrap
    }

    .cadastrar-investimentos-form{
        padding: 5vh 5vw;
    }

    .input-div{
        display: flex;
        flex-direction: column;
        margin: 3vh 2vw;
    }

    .input-div label{
        margin-bottom: 1vh;
    }
    
    .error-message{
        color: red;
    }

    .submit-button{
        display: flex;
        justify-content: end;
    }

    @media (${display.Mobile["max-width"]}){
        .form-inputs{
            flex-direction: column;
            align-items: center;
        }
        .input-div{
           align-items: center;
        } 
        .submit-button{
            justify-content: center;
        }
    }
    `}</style>
}