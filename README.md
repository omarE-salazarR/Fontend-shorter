# Proyecto de React

Este es un proyecto de React. A continuación se detallan los pasos para ponerlo en funcionamiento en tu entorno local.

## Prerrequisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:
- **Node.js** (versión recomendada: 14.x o superior)
- **npm** (versión recomendada: 6.x o superior) o **Yarn** (opcional)

## Pasos para poner en marcha el proyecto

1. **Clonar el repositorio**
   Clona este repositorio en tu máquina local usando el siguiente comando:
   ```sh
   git clone https://github.com/tu-usuario/tu-repositorio.git
2. Navega al directorio 
    cd url-shortener-front
3. Instalar dependencias
    npm install (o yarn install si estás utilizando Yarn)
4. Ejecutar app
    npm start (o yarn start si estás utilizando Yarn)
5. Construccion de app en prod 
    npm run build (o yarn build si estás utilizando Yarn)

**Estructura basica del proyecto**
/url-shortener-front
├── App.js             # Archivos públicos estáticos
│── App.css            # Hoja de estilos
├── src/               # carpeta de componentes
│   ├── components/    # Componentes React
│       |-- Rir.js     # Logica de redireccion
│       ├── Shorter.js # logica de acortador
│   
├── package.json       # Archivo de configuración de npm
└── README.md          # Este archivo
