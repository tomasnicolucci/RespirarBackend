# Backend para la plataforma RespirAR
## Modulo de Mapa de Estaciones

Para usar los contenedores de docker con los servicios de fiware, ejecutar el comando \
`docker-compose up -d`

Para ejecutar la aplicacion \
`npm install` (para instalar las dependencias) \
`npm start`   (para ejecutar la aplicacion) \
`npm run dev` (si se quiere ejecutar usando nodemon) 

Listado de Endpoints \
Datos actuales (mongodb - orion) 
- GET: http://localhost:3004/estaciones             devuelve todas las estaciones almacenadas en mongodb
- GET: http://localhost:3004/estacion/:id           devuelve la estacion del id enviado por parámetro

Datos Históricos (MySql) 
- GET: http://localhost:3004/getHistoricosById/?id=[id]&attr=[attr]  devuelve los datos históricos del atributo y de la estación solicitada por parámetro
- GET: http://localhost:3004/getHistoricosById/?id=[id]&attr=[attr]&minDate=[mm/dd/yyyy]&maxDate=[mm/dd/yyyy]  devuelve los datos históricos del atributo y de la estación solicitada por parámetro, entre las fechas seleccionadas.
