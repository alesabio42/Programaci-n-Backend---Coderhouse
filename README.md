# Backend de Gestión de Productos y Carritos

Este proyecto es un backend simple para la gestión de productos y carritos, utilizando diferentes herramientas aprendidas a lo largo del curso de Desarrollo Backend de Coderhouse.

## Instalación y Ejecución

1. **Requisitos previos**: Asegúrate de tener Node.js instalado en tu entorno.
   
2. **Clona el repositorio**: 

3. **Navega a la carpeta del proyecto**: 

4. **Instala las dependencias**:
    ```bash
    npm install
    ```
    
5. **Configuración de variables de entorno**:
Crea **dos archivos** en la **raíz del proyecto** (no dentro de carpetas):
- `.env.production`
- `.env.development`

Copiá los valores reales desde el archivo: CONFIGURACION_ENV.md

6. **Inicia el servidor**:
   ```bash
   # Desarrollo
   npm run dev
   
   # Producción
   npm start
   ```
## Uso

1. Accede a la aplicación en: [http://localhost:8080/login](http://localhost:8080/login)

2. **Roles de usuario**:
    - **Admin**:
        - Usuario: `adminCoder@coder.com`
        - Contraseña: `adminCod3r123`
    - **Premium**:
        - Usuario: `premiumCoder@coder.com`
        - Contraseña: `premiumCod3r123`
    - **User**:
        - Inicia sesión registrandote con cualquier otro usuario o a través de GitHub para ingresar como user.

3. **Funcionalidades por rol**:
    - **User**: 
        - Acceso a la página de productos.
        - Ver detalles de los productos.
        - Agregar productos al carrito.
        - Confirmar la compra y generar un ticket de venta.
    - **Admin**:
        - Acceso al home con opciones adicionales.
        - Gestión de inventario: agregar, modificar y eliminar productos.
        - Gestión de usuarios: agregar, modificar y eliminar usuarios.

    - **Premium**:
        - Acceso al home y al listado de productos para ver detalles.
        - Gestión de inventario: agregar, modificar y eliminar productos.


¡Gracias por utilizar este backend de gestión de productos y carritos! Si tienes alguna pregunta o sugerencia, no dudes en contactarme.

---

## 📚 Documentación
- Material y referencias del curso: https://drive.google.com/drive/u/0/folders/1syduncQ5-5Z0TUmiLHnurWUVlDlaZYFb

---
