import { RouterProvider } from 'react-router-dom';
import router from './Routes'

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

import { locale, addLocale } from 'primereact/api'
import { GlobalStyle } from './theme/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { temaClaro, temaEscuro } from './theme/Theme';

import { useContext } from 'react'
import { globalContext, GlobalStatesType } from './Contexts/GlobalContext';

addLocale('pt-br', {
  firstDayOfWeek: 1,
  dayNames: ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'],
  dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
  dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  monthNames: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
  monthNamesShort: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
  today: 'Hoje',
  clear: 'Limpar'
});

locale('pt-br');

function App() {

  const { states } = useContext(globalContext)
  const { temaEstaEscuro } = states as GlobalStatesType
  return (
    <div className="App">
      <ThemeProvider theme={temaEstaEscuro ? temaEscuro : temaClaro}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}

export default App;
