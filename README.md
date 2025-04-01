# Santander Project

Este es un proyecto de prueba técnica que consta de dos partes: un **frontend** y un **backend**. El propósito de este proyecto es cargar datos desde un archivo Excel y un formulario, y luego procesarlos en el backend.

## Estructura del Proyecto

El proyecto está dividido en dos secciones principales:

### Frontend

El código del frontend está ubicado en la carpeta `front/` y está basado en Angular. Los archivos principales del frontend son:

- `front/src/app/app.component.ts`: Componente principal de la aplicación Angular donde se maneja el formulario y la carga del archivo Excel.
- `front/src/app/app.component.html`: Plantilla HTML donde se define el formulario para el ingreso de datos y la carga del archivo Excel.
- `front/src/app/services/candidates.service.ts`: Servicio para realizar las solicitudes HTTP al backend para cargar los datos.

### Backend

El backend está en la carpeta `back/` y está basado en NestJS. Los archivos principales del backend son:

- `back/src/app.controller.ts`: Controlador del backend que maneja la carga del archivo Excel y la extracción de datos.
- `back/src/app.service.ts`: Servicio que procesa los datos del archivo Excel y los devuelve al frontend.
