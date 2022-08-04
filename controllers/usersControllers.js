const User = require('../models/users')
const bcryptjs = require('bcryptjs');
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const { google } = require("googleapis");
const { framework } = require('passport');
const OAuth2 = google.auth.OAuth2;




const sendEmail = async (email, uniqueString) => { //FUNCION ENCARGADA DE ENVIAR EL EMAIL

    const myOAuth2Client = new OAuth2(
        process.env.GOOGLE_CLIENTID,
        process.env.GOOGLE_CLIENTSECRET,
        "https://developers.google.com/oauthplayground"
        )
        myOAuth2Client.setCredentials({
            refresh_token:process.env.GOOGLE_REFRESHTOKEN
            });
    
            const accessToken = myOAuth2Client.getAccessToken() 




    const transporter = nodemailer.createTransport({ //DEFINIMOS EL TRASPORTE UTILIZANDO NODEMAILER
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.USER,    //DEFINIMOS LOS DATOS DE AUTORIZACION DE NUESTRO PROVEEDOR DE
          pass: process.env.PASS,
          type: "OAuth2",
          clientId: process.env.GOOGLE_CLIENTID,
          clientSecret: process.env.GOOGLE_CLIENTSECRET,
          refreshToken: process.env.GOOGLE_REFRESHTOKEN,
          accessToken: accessToken                        //COREO ELECTRONICO, CONFIGURAR CUAENTAS PARA PERMIR EL USO DE APPS
        },
        tls: {
            rejectUnauthorized: false
          }                                            //CONFIGURACIONES DE GMAIL
    })

    // EN ESTA SECCION LOS PARAMETROS DEL MAIL 
    let mailOptions = { 
        from: process.env.USER,    //DE QUIEN
        to: email,       //A QUIEN
        subject: "Verification of user email ", //EL ASUNTO Y EN HTML EL TEMPLATE PARA EL CUERPO DE EMAIL Y EL LINK DE VERIFICACION
        html: `
        <div >
        <h2 style="font-weigth: bold"> Welcome to MyTinerary!&#9992;&#65039; </h2>
        <p> Thanks for registering with us. We are glad to have you as a member!<h2>
        <p style="color: black">Please, Click <a href=https://backmytinerary-carrozzino.herokuapp.com/api/verify/${uniqueString}>HERE</a> to confirm your account. Thank You </p>
        </div>
        `
    
    };
   
    transporter.sendMail(mailOptions, function (error, response) { //SE REALIZA EL ENVIO
        if (error) { console.log(error) }
        else {
            console.log("Mensaje enviado")

        }
    })
};

const usersControllers = {
    verifyEmail: async (req, res) => {
        const { uniqueString } = req.params // Extrae el string unico del link

        const user = await User.findOne({uniqueString: uniqueString })
        //console.log(user) //busca el usuario correspondiente al link

        if(user) {
            user.emailVerification = true //coloca el Campo emailVerified en true
            await user.save()
            res.redirect('https://mytinerary-carrozzino.herokuapp.com/validation') //redirecciona al usuario a la ruta definida
            console.log(res)
        }
        else { res.json ({ success:false, response: "Email not verified" })}
    },

    signUpUsers: async (req, res) => {
        let { firstName, lastName, email, password, from, urlImage, country} = req.body.userData
        const test =req.body.test
        
        try {
            const userExists = await User.findOne({ email }) //Buscar si el usuario existe en DB
            if (userExists) {
                //console.log(userExists.from.indexOf(from))
                if (userExists.from.indexOf(from) !== -1) {
                  //console.log("resultado de if " +(usuarioExiste.from.indexOf(from) !==0 )) //INDEXOF = 0 EL VALOR EXISTE EN EL INDICE EQ A TRUE -1 NO EXITE EQ A FALSE  
                  res.json({ success: false,
                    from: from, 
                    message: "You already signed-Up, please Log in" })
                } else {
                    const passwordHashed = bcryptjs.hashSync(password, 10)

                    userExists.from.push(from)
                    userExists.password.push(passwordHashed)
                    res.json({
                        success: true,
                        from: from,
                        message: "Add "+from+" to use the SignIn"
                    })
                    if(from === "form-Signup"){
                        //Posteriormente agregamos la verificacion de email
                        userExists.uniqueString = crypto.randomBytes(15).toString('hex')
                        await userExists.save()

                        await sendEmail(email, userExists.uniqueString) //Llama a la funcion encargada del envio del correo electronico
                        res.json({
                            success: true,
                            from: from,
                            message: "We sent you an email to Verify. Please verify your email to complete the signUp",
                        })
                    } else {
                        userExists.save()
                        userExists.emailVerification = true
                        res.json({
                            success: true,
                            from: from,
                            message: "Add "+from+" to SignIn"
                        })
                    }
                }
            } else {
                //si el usuario no existe
                //lo crea y encripta la contrasena

                const passwordHashed = bcryptjs.hashSync(password, 10)
                // const emailVerification = false
                //crea un nuevo objeto de personas con su usuario y contrasena (ya encriptada)

                const newUser = await new User ({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password:[passwordHashed],
                    urlImage: urlImage,
                    uniqueString: crypto.randomBytes(15).toString('hex'),
                    emailVerification: true,
                    from:[from],
                    country: country
                })

                //se lo asigna al usuario nuevo
                if (from !== "form-Signup") { //si la peticion proviene de cuenta externa
                    await newUser.save()
                    // newUser.emailVerification = true
                    
                    res.json({
                        success: true,
                        from: from,
                        message:"Congratulations, the user has been created with "+from,
                    }) //agregamos mensaje de verificacion
                } else {
                    //PASAR EMAIL VERIFICADO A FALSE
                    newUser.emailVerification = false
                    //ENVIARLE EL E MAIL PARA VERIFICAR
                    await newUser.save()
                    await sendEmail(email, newUser.uniqueString) //llama ala funcion encargada del envio del correo electronico

                    res.json({
                        success: true,
                        from: from,
                        message: "We sent you an email. Please verify your email to complete the signUp"
                    }) //agregamos mensaje de verificacion
                }
            }
        } catch (error) {
            res.json({ success: false, message: "Something went wrong. Please try again in a few minutes.", console: console.log(error) }) //CAPTURA EL ERROR
        }
    },

    signInUser: async (req, res) => {

        const { email, password, from } = req.body.userData
             try {
        const userExists = await User.findOne({ email })
        //metodo para buscar password mediante from
        //console.log(usuarioExiste.from)
        //console.log(from)
        // const indexpass = userExists.from.indexOf(from)
        //console.log(userExists.password[indexpass])

        if(!userExists) {//primero verifica que el usuario exista
            res.json({
                 success: false,
                 from: 'no-form',
                 message: " Your user is not registered, please Sign Up"})
        } else {
            if (from !== "form-Signup") {
                let passwordMatch = userExists.password.filter(pass => bcryptjs.compareSync(password, pass))

                if (passwordMatch.length > 0) {

                    const userData = {
                        id: userExists._id,
                        firstName: userExists.firstName,
                        lastName: userExists.lastName,
                        email: userExists.email,
                        urlImage: userExists.urlImage,
                        from: from,

                    }

                    userExists.isConnected = true
                    userExists.lastConnection = new Date().toLocaleString()
                    await userExists.save()

                    const token = jwt.sign({...userData}, process.env.SECRET_KEY,{expiresIn: 60* 60*24})
                    res.json({
                        success: true,
                        response: {token, userData},
                        message: "Welcome Back "+ userData.firstName,
                    })

                } else {
                    res.json({
                        success: false, 
                        from: from,
                        message: "You have not registered with "+from+" if you want to Log In with this method you must signUp with " +from
                    })
                }
            } else {

                if(userExists.emailVerification) {
                    let passwordMatch = userExists.password.filter(pass => bcryptjs.compareSync(password, pass))
                    //console.log(passwordMatch)
                    //console.log("resultado de busqueda de contrasena:" + (passwordMatch.length > 0))
                    if(passwordMatch.length > 0 ) {
                        const userData = {
                            id: userExists._id,
                            firstName: userExists.firstName,
                            lastName: userExists.lastName,
                            email: userExists.email,
                            urlImage: userExists.urlImage,
                            from: from,

                        }
                        
                        userExists.isConnected = true
                        userExists.lastConnection = new Date().toLocaleString()
                        await userExists.save()
                        const token = jwt.sign({...userData}, process.env.SECRET_KEY, {expiresIn: 60* 60*24})
                        
                        res.json({
                            success: true,
                            from: from,
                            response: {token, userData},
                            message: "Welcome Back " +userData.firstName
                        })
                    } else {
                        res.json({
                            success :false,
                            from: from,
                            message: "The user or password doesn't Match"
                        })
                    }
                } else {
                    res.json ({
                        success: false,
                        from: from,
                        message: "You didn't verified your email. Please check your email to complete your Sign Up" 
                    })
                }
            } // si no esta verificado
        }
            
         } catch (error) {
             res.json({
                success: false,
                message: "Something went wrong. Please try again in a few minutes.",
            })
        }
    },

    signOutUser: async (req, res) => {

        const email = req.body.closeUser
        const user = await User.findOne({ email })

        user.isConnected = false
        await user.save()

        res.json({ success: true, message: "hola"})
    },

    verificarToken: (req, res) => {

        if(req.user) {
            res.json({
                success: true,
                response:{id:req.user.id, firstName:req.user.firstName, email:req.user.email, urlImage: req.user.urlImage, from:"token"},
                message:"Welcome Back "+ req.user.firstName
            })
        } else {
            res.json({
                success: false,
                message: "Please try again"
            })
        }
    }
}

module.exports = usersControllers