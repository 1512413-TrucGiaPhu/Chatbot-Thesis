const nodemailer = require('nodemailer');

module.exports = function (recipient, HTMLContent){
    console.log(recipient, HTMLContent);
    let transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'huynhtrongnghia.htn@gmail.com',
          pass: 'haNgpHuong120712'
        }
    });

    const message = {
        from: 'no-reply.amazono@gmail.com', 
        to: recipient,    
        subject: 'Có user cần được hỗ trợ',
        html: HTMLContent 
    };

    transport.sendMail(message, (err, info) => {
        if (err) {
        console.log(err)
        } 
        else {
        console.log(info);
        }
    });
}