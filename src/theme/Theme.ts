export const colors = {
    primary: {
        '1': '#ffff80',
        '2': '#fdeb61',
        '3': '#fcd742',
        '4': '#fac223',
        '5': '#f8ae04',
        '6': '#9c8200',
    },
    blackSmooth: '#303134',
    blue: '#6366F1',
    black: '#202124',
    white: '#E8F0FE',
    darkPurple: '#210124',
    celadon: '#B3DEC1',
    claret: '#750D37',
    federalBlue: '#2E1760',
    lightGreen: 'lightgreen',
    red: 'red',
    scarlet: '#FF2400',
    green: 'green',
    lightBlue: '#495057',
    basil: '#32612D'
}

export const fonts = {
    primary: "'IBM Plex Sans', sans-serif",
    secondary: "'IBM Plex Serif', serif"
}

export const temaEscuro = {
    pallete: {
        colors: {
            ...colors
        },
        primary: {
            main: colors.blackSmooth,
            contrastText: '#fff'
        },
        secondary: {
            main: '#202124',
            contrastText: colors.white
        },
        green: colors.lightGreen,
        red: colors.red
    }
}

export const temaClaro = {
    pallete: {
        colors: {
            ...colors
        },
        primary: {
            main: '#fff',
            contrastText: '#202124'
        }
        ,
        secondary: {
            main: '#D0CFCF',
            contrastText: colors.blackSmooth
        },
        green: colors.green,
        red: colors.red
    }
}

export const display = {
Mobile: {'min-width': 'min-width: 320px' , 'max-width': 'max-width: 480px'},
Tablets: {'min-width': 'min-width: 481px', 'max-width':'max-width: 768px'},
Laptops: {'min-width': 'min-width: 769px', 'max-width': 'max-width: 1024px'}, 
Desktops: {'min-width':'min-width: 1025px', 'max-width':'max-width: 1200px'}, 
TV: {'min-width':'min-width: 1201px'} 
}