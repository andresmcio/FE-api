const { generateUUID } = require ("../helpers/generate_uuid");
const bcrypt = require ("bcrypt");
const fs = require ("fs");
const path = require ("path");


module.exports = {
    createUser: async (req, res) => {
        const userData = req.body;
      
        try {
          let newUser = {
            fullName: userData.fullName,
            userName: userData.userName,
            email: userData.email,
          };
      
          if (userData.password !== userData.confirmPassword) {
            return res.status(400).json({ message: "Las contraseñas no coinciden" });
          } else {
            // Verifica que la contraseña no esté vacía antes de intentar hashearla
            if (!userData.password) {
              return res.status(400).json({ message: "La contraseña no puede estar vacía" });
            }
      
            newUser.password = bcrypt.hashSync(userData.password, 10);
          }
      
          newUser.id = generateUUID();
          let users = fs.readFileSync(path.join(__dirname, "../data/users.json"), "utf-8");
      
          if (users.length === 0) {
            users = [];
          } else {
            users = JSON.parse(users);
          }
      
          users.push(newUser);
      
          fs.writeFileSync(path.join(__dirname, "../data/users.json"), JSON.stringify(users, null, 2), "utf-8");
      
          return res.status(201).json({ message: "Usuario creado correctamente", user: newUser });
        } catch (err) {
          return res.status(400).json({ message: err.message });
        }
      },
    access: async (req, res) => {
        const userData = req.body;

        try {
            let users = fs.readFileSync(path.join(__dirname, "../data/users.json"), "utf-8");

            if (users.length === 0) {
                users = [];
            } else {
                users = JSON.parse(users);
            }

            let user = users.find(user => user.email === userData.email);

            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            } else {
                if (!bcrypt.compareSync(userData.password, user.password)) {
                    return res.status(400).json({ message: "Contraseña incorrecta" });
                } else {
                    return res.status(200).json({ message: "Usuario logueado correctamente", user: user });
                }
            }
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }
}