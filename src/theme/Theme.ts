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
    blue: '#6366F1'

}

export const fonts = {
    primary: "'IBM Plex Sans', sans-serif",
    secondary: "'IBM Plex Serif', serif"
}

export const temaEscuro = {
    pallete: {
        colors: {
            black: '#202124',
            white: '#E8F0FE',
            ...colors
        },
        primary: {
            main: '#202124',
            contrastText: '#fff'
        }
    }
}

export const temaClaro = {
    pallete: {
        colors: {
            black: '#202124',
            white: '#E8F0FE',
            ...colors
        },
        primary: {
            main: '#fff',
            contrastText: '#202124'
        }
    }
}

export const display = {
Mobile: {'min-width': 'min-width: 320px' , 'max-width': 'max-width: 480px'},
Tablets: {'min-width': 'min-width: 481px', 'max-width':'max-width: 768px'},
Laptops: {'min-width': 'min-width: 769px', 'max-width': 'max-width: 1024px'}, 
Desktops: {'min-width':'min-width: 1025px', 'max-width':'max-width: 1200px'}, 
TV: {'min-width':'min-width: 1201px'} 
}