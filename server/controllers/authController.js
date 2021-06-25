const bcrypt = require('bcrypt');

module.exports = {
  register: async (req, res) => {
    try {
      const db = req.app.get('db');
      const { username, password } = req.body;
      //check for an existing username\
      const selected = await db.auth.get_num_users_by_username({ username });
      const count = +selected[0].count;

      if (count === 1) {
        res.status(400).json('That username is taken, please try another');
      } else {
        //hash the password
        const hash = await bcrypt.hash(password, 12);
        //add to the db 
        await db.auth.add_user({ username, hash })

        req.session.username = username;

        res.status(200).json(req.session.username);
      }
    } catch(e) {
      res.status(500).json(e);
    }
  },
  
  login: async (req, res) => {
    try {
      const db = req.app.get('db');
      const { username, password } = req.body;
      const selected = await db.auth.get_user_by_username({ username });
      await db.recipes.get_recipes_for_user()
      const user = selected[0];
      if (user) {
        const areEqual = await bcrypt.compare(password, user.password)
        if (areEqual) {
          req.session.username = username;
          res.status(200).json(req.session.username);
        } else {
          res.status(403).json('Invalid Username or Password');
        }
      } else {
        res.status(404).json('User does not exist');
      }
    } catch(e) {
      res.status(500).json(e);
    }
  },

  getUser: (req, res) => res.status(200).json(req.session.username)
}