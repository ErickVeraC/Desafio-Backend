# Desafío Backend con Frontend Integrado

Este proyecto incluye un servidor backend y un frontend para gestionar y mostrar publicaciones de blog.

### Despliegues

- Servidor Backend: https://desafio-backend-jnku.onrender.com
- Frontend: https://frontend-con-servidor-nodejs.vercel.app/

### Funcionalidades

#### Entidades

##### Usuario (User)

Representa a un usuario que puede crear publicaciones.

- Atributos:

  - name (string)
  - profilePic (string)
  - email (string)
  - password (string)
  - created_at (date)
  - updated_at (date)
  - 🚨 Nota: No se permiten usuarios con el mismo email.

#### Publicación (Post)

Representa un artículo de blog creado por un usuario.

- Atributos:
  - title (string)
  - image (string)
  - body (string)
  - user (ObjectId, referencia a UserId)
  - created_at (date)
  - updated_at (date)

### Endpoints

- POST /user: Crea un nuevo usuario.
  No requiere autorización.
- GET /user/:id: Obtiene la información de un usuario por ID.
  No requiere autorización.
- POST /auth/login: Genera un nuevo JWT.
  No requiere autorización.
- POST /post: Crea una nueva publicación.
  Requiere autorización.
- GET /posts: Lista todas las publicaciones.
  Soporta filtrado por título con el query param search.
- PATCH /post/:id: Actualiza una publicación.
  Requiere autorización y no permite cambiar el usuario asociado.
- DELETE /post/:id: Elimina una publicación.
  Solo el propietario del post puede realizar esta acción.
  Requiere autorización.

## Uso de la Aplicación Frontend

1. Registro de Usuario: Utiliza el formulario de Sign In para crear un nuevo usuario. Esto te redirigirá a la página de inicio, y el usuario se agregará a la base de datos.
2. Inicio de Sesión: Puedes hacer Log In con tus credenciales, lo que generará un token y un ID asociado que se guardarán en el localStorage.
3. Crear Publicaciones: Una vez autenticado, verás el botón Create Post. Esto te permitirá crear una publicación, que se asociará al usuario autenticado.

### Reglas de Uso

- Crear Usuario: No se permiten emails duplicados.
- Crear Publicación: Solo los usuarios autenticados pueden crear publicaciones, y el ID del creador se asocia automáticamente a la publicación.
