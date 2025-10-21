Aplicación Web FrontEnd Vite+React - Backend Nodejs-Express (CinemaVault):
Para ejecutar esta aplicación es recomendable utilizar el docker-compose.yml, ya que viene configurada para ello.

*En caso de que no quieras utilizar el docker compose, modifica las variables en el .env a los de tu entorno.
*Pero es necesario al 100% una db de mysql.
*También modifica la whitelist de los cors en el server.js, si es necesario.

#
Esta aplicación le permite a un usuario normal con rol de 'user', entrar a un directorio de películas.
El usuario podra filtrar las películas que se encuentren por diferentes parámetros, genero, año, destacadas, etc.
Tambien podrá utilizar un buscador, donde podrá buscar por el nombre de la película.
*También podrá ver puntuaciones de las películas puestas por los administradores.
(No todas las opciones estan disponibles o se pueden ver, ya que no se logro hacer en el tiempo dado, como el filtro por categorias, o que el usuario pueda ver los detalles de una película en una página aparte)

El administrador podrá añadir películas a la página, modificarlas y eliminarlas.
También podrá crear y eliminar generos, directores, actores.
(Por ahora solo se puede añadir películas al directorio, lo demás no se logro hacer en el tiempo dado).
#

PARA PODER CORRER EL BACKEND (NECESARIO PARA EL FRONTEND):
1. Entrar al directorio del backend 'Backend-CineVault' y en la terminal utilizar el comando 'npm install'.
2. Utilizar el comando 'npx prisma generate'
3. Después utilizar el comando 'prisma migrate dev'
4. Despues para correr el backend: 'npm run dev'.

PARA PODER CORRER EL FRONTEND(NECESARIO PARA VER DATOS):
1. Entrar al directorio del frontend 'Frontend-CineVault' y luego correr el comando 'npm install'.
2. Despues para correr el frontend: 'npm run dev'.

UNDER CONSTRUCTION
