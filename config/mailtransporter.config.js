const nodemailer=require("nodemailer");

module.exports=nodemailer.createTransport({
    host:"smtp.zoho.in",
    secure:true,
    port:465,
    auth:{
        user:"info@traindhaba.com",
        pass:"z5icKGtysbSm"
    }
});
