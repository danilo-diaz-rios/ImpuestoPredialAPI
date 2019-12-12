var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
// var router = express.Router();
var mongoose = require('mongoose');
var cors = require('cors');
require('dotenv').config()

//DB CONNECTION
mongoose.connect(process.env.DB_LOCAL, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true)

app.use(cors());


var port = process.env.PORT || 8082;


var Mandamientos = require('./app/routes/v1/Mandamientos/Mandamientos');
var Mandamientos_Pago = require('./app/routes/v1/Mandamientos_Pago/Mandamientos_Pago');
var Resoluciones = require('./app/routes/v1/Resoluciones/Resoluciones');
var Notificacion_Emba = require('./app/routes/v1/Notificacion_Emba/Notificacion_Emba');
var Resoluciones_Vigen = require('./app/routes/v1/Resoluciones_Vigen/Resoluciones_Vigen');
var Notificacion_mensajeria = require('./app/routes/v1/Notificaciones_mensajeria/Notificacion_mensajeria');
var Notificacion_Corr = require('./app/routes/v1/Notificacion_Corr/Notificacion_Corr');
var Resoluciones_Conve_Pag = require('./app/routes/v1/Resoluciones_Conve_Pag/Resoluciones_Conve_Pag');
var Solicitud_Abo = require('./app/routes/v1/Solicitud_Abo/Solicitud_Abo');
var Respuesta_Archi_Deter = require('./app/routes/v1/Respuesta_Archi_Deter/Respuesta_Archi_Deter');
var auth = require('./app/routes/v1/auth/auth');
var user = require('./app/routes/v1/User/User');





//MORGAN PARA MOSTRAR EN LA CONSOLA TODAS LAS PETICIONES HECHAS AL SERVIDOR
app.use(morgan('dev'));

app.use(bodyParser.json());

//parse application/vnd.api+json as json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));

//v1 APIs
//app.use('/api/v1/auth', auth);
app.use('/api/v1/Mandamientos', Mandamientos);
app.use('/api/v1/MandamientosPago', Mandamientos_Pago);
app.use('/api/v1/Resoluciones', Resoluciones);
app.use('/api/v1/Notificacion_Emba', Notificacion_Emba);
app.use('/api/v1/Resoluciones_Vigen', Resoluciones_Vigen);
app.use('/api/v1/NotificacionCorrespondencia', Notificacion_Corr);
app.use('/api/v1/Resoluciones_Conve_Pag', Resoluciones_Conve_Pag);
app.use('/api/v1/Solicitud_Abo', Solicitud_Abo);
app.use('/api/v1/notificacion_mensajeria', Notificacion_mensajeria);
app.use('/api/v1/Respuesta_Archi_Deter', Respuesta_Archi_Deter);
app.use('/api/v1/auth', auth);
app.use('/api/v1/user', user);

//Authentication required APIs

app.listen(8082);
console.log('Magic happens at http://localhost:' + port);