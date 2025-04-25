# Aplicación de Temporizador Simple

Esta es una aplicación web que permite a los usuarios crear y gestionar múltiples temporizadores.

## Características

- **Agregar temporizadores**: Los usuarios pueden crear temporizadores con nombres personalizados.
- **Ajustar tiempo**: Los usuarios pueden aumentar o disminuir el tiempo de los temporizadores antes de iniciarlos.
- **Iniciar temporizadores**: Los temporizadores comienzan a contar regresivamente desde el tiempo configurado.
- **Guardar estado**: Los temporizadores se guardan automáticamente en `localStorage` y continúan desde donde se quedaron al recargar la página.
- **Anuncio de finalización**: Cuando un temporizador llega a 0, se anuncia su finalización utilizando la API de `SpeechSynthesis`.
- **Detener anuncio**: Los usuarios pueden detener el anuncio de finalización con un botón "Stop".
- **Eliminar temporizadores**: Los temporizadores pueden eliminarse, deteniendo cualquier cuenta regresiva o anuncio activo.
- **Restaurar tiempo inicial**: Al presionar "Stop", el temporizador vuelve al tiempo inicial configurado.

## Estructura del Proyecto

- **index.html**: El documento HTML principal que establece la estructura de la aplicación web. Incluye una sección para agregar temporizadores, botones para ajustar los valores de los temporizadores y un área de visualización para los temporizadores activos.
  
- **scripts/app.js**: Contiene el código JavaScript que implementa la funcionalidad de los temporizadores. Esto incluye funciones para agregar nuevos temporizadores, iniciar temporizadores, ajustar los valores de los temporizadores y manejar la lógica de la cuenta regresiva. También utiliza la API de SpeechSynthesis para anunciar cuando los temporizadores terminan.

- **styles/style.css**: Contiene los estilos CSS para la aplicación, definiendo el diseño, la apariencia de los botones y el diseño general de la interfaz de los temporizadores.

## Cómo Usar

1. **Abrir la aplicación**:
   - Abre el archivo `index.html` en un navegador web moderno.

2. **Agregar un temporizador**:
   - Haz clic en el botón "Agregar Temporizador".
   - Ingresa un nombre para el temporizador.

3. **Ajustar el tiempo**:
   - Usa los botones "+" y "-" para ajustar los minutos del temporizador.

4. **Iniciar el temporizador**:
   - Haz clic en el botón "Iniciar" para comenzar la cuenta regresiva.

5. **Detener el anuncio**:
   - Cuando el temporizador llegue a 0, se anunciará su finalización.
   - Haz clic en el botón "Stop" para detener el anuncio y restaurar el tiempo inicial.

6. **Eliminar un temporizador**:
   - Haz clic en el botón "Eliminar" para borrar un temporizador.

## Tecnologías Utilizadas

- **HTML**: Estructura de la aplicación.
- **CSS**: Estilos y diseño visual.
- **JavaScript**: Lógica de la aplicación.
- **localStorage**: Persistencia de datos en el navegador.
- **SpeechSynthesis API**: Anuncio de finalización de temporizadores.

## Requisitos

- Un navegador web moderno que soporte la API de `SpeechSynthesis` y `localStorage`.

## Licencia

Este proyecto es de código abierto y está disponible para que cualquiera lo use y modifique.