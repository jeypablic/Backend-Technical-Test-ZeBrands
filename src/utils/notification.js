const nodemailer = require('nodemailer');
/**
 * Funcion que se encarga de enviar una notificación via email.
 * 
 * @param {*} to to
 * @param {*} message Message to send
 * @param {*} subject Subject to message
 */
function send(to, message, subject){

  const trasnporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'prueba.jpry@gmail.com',
        pass: 'prjey_2812'
    }
  });

  const optionsMail = {
    from: 'prueba.jpry@gmail.com',
    to: to,
    subject: subject,
    text: message
  };

  trasnporter.sendMail(optionsMail, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email send: ' + info.response);
    }
  });
}

module.exports = {'send': send};

