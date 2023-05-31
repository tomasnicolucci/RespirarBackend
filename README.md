# Backend para la plataforma RespirAR
## Modulo de Mapa de Estaciones

Para usar los contenedores de docker con los servicios de fiware, ejecutar el comando \
`docker-compose up -d`

Para ejecutar la aplicacion \
`npm install` (para instalar las dependencias)
`npm start`   (para ejecutar la aplicacion)
`npm run dev` (si se quiere ejecutar usando nodemon)

Listado de Endpoints \
Datos actuales (mongodb - orion) \
- GET: http://localhost:3004/estaciones             devuelve todas las estaciones almacenadas en mongodb
- GET: http://localhost:3004/estacion/:id           devuelve la estacion del id enviado por parametro

Datos Historicos (MySql) \
- GET: http://localhost:3004/estMysql               devuelve todas las estaciones en la tabla de Estaciones de MySql (solo nombre y ubicacion)
- GET: http://localhost:3004/estMysqlById/:id       devuelve el nombre y ubicacion de la estacion solicitada por parametro
- GET: http://localhost:3004/historicos             devuelve todos los datos historicos de todas las estaciones
- GET: http://localhost:3004/getHistoricosById/:id  devuelve todos los datos historicos de la estacion solicitada por parametro