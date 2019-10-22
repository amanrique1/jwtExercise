let jwt = require('jsonwebtoken');
let config = require('./config');
const User = require('./models/user');

// Clase encargada de la creación del token
class HandlerGenerator {

    async login(req, res) {

        // Extrae el usuario y la contraseña especificados en el cuerpo de la solicitud
        let username = req.body.username;
        let password = req.body.password;


        // Si se especifico un usuario y contraseña, proceda con la validación
        // de lo contrario, un mensaje de error es retornado
        if (username && password) {
            let md5 = require('md5');
            let pass = md5(password);
            console.log(pass);
            try {
                let user = await User.findOne({ "username": username, "password": pass });
                console.log(user);
                // Si los usuarios y las contraseñas coinciden, proceda con la generación del token
                // de lo contrario, un mensaje de error es retornado
                if (username === user.username && pass === user.password) {

                    // Se genera un nuevo token para el nombre de usuario el cuál expira en 24 horas
                    let token = jwt.sign({ username: username },
                        config.secret, { expiresIn: '24h' });

                    // Retorna el token el cuál debe ser usado durante las siguientes solicitudes
                    res.json({
                        success: true,
                        message: 'Authentication successful!',
                        token: token
                    });

                } else {

                    // El error 403 corresponde a Forbidden (Prohibido) de acuerdo al estándar HTTP
                    res.sendStatus(403).json({
                        success: false,
                        message: 'Incorrect username or password'
                    });

                }
            } catch (err) {
                console.log(err);
            }



        } else {

            // El error 400 corresponde a Bad Request de acuerdo al estándar HTTP
            res.send(400).json({
                success: false,
                message: 'Authentication failed! Please check the request'
            });

        }

    }
    async createUser(req, res) {

        // Extrae el usuario y la contraseña especificados en el cuerpo de la solicitud
        let username = req.body.username;
        let password = req.body.password;
        let role = req.body.role;


        // Si se especifico un usuario y contraseña, proceda con la validación
        // de lo contrario, un mensaje de error es retornado
        if (username && password && role) {
            let md5 = require('md5');
            let pass = md5(req.body.password);
            const user = new User(
                {
                    "username": username,
                    "password": pass,
                    "role": role
                });
            await user.save();
            console.log(user);
            res.json({
                status: 'User saved'
            });
        }

    }

    async updateUser(req, res) {

        // Extrae el usuario y la contraseña especificados en el cuerpo de la solicitud
        let username = req.body.username;
        let password = req.body.password;
        let role = req.body.role;
        let user = await User.findOne({ "username": username, "password": pass });

        // Si se especifico un usuario y contraseña, proceda con la validación
        // de lo contrario, un mensaje de error es retornado
        //No es permitido cambiar de rol a no ser que sea admin
        if (username && password) {
            if ((user.role === "admin" || user.role === role)&&user.role!=="reader") {
                let md5 = require('md5');
                let pass = md5(req.body.password);
                await User.findOneAndUpdate({ "username": username }, { $set: { "username": username, "password": pass, "role": role } });
                res.json({
                    status: 'User modified'
                });
            }else{
                res.send(403).json({
                    success: false,
                    message: 'No tiene permiso para cambiar el rol'
                });
            }
        }

    }

    async getUsers(req, res) {

     
        let users = await User.find();
        res.json(users);


    }

    index(req, res) {

        // Retorna una respuesta exitosa con previa validación del token
        res.json({
            success: true,
            message: 'Index page'
        });

    }
}

module.exports = HandlerGenerator;