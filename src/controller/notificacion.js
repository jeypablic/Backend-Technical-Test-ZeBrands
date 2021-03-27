const nodemailer = require('nodemailer');
/**
 * Funcion que se encarga de enviar una notificación via email.
 * 
 * @param {*} para destinatario
 * @param {*} mensaje mensaje a enviar
 */
function enviar(para, mensaje){

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'prueba.jpry@gmail.com',
            pass: 'prjey_2812'
        }
    });

    const mailOptions = {
        from: 'prueba.jpry@gmail.com',
        to: para,
        subject: 'Actualización de producto',
        text: mensaje
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado: ' + info.response);
        }
      });
}

module.exports = {'enviar': enviar};

