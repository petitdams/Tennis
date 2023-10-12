import { v4 } from 'uuid';
import query from '../database.js';
import bcrypt from 'bcrypt';
import xss from 'xss';

export default (req, res) => {
  const id = v4();
  const user = {
    lastName:xss(req.body.nom),
    firstName:xss(req.body.prenom),
    password:(req.body.motDePasse),
    email:xss(req.body.email),
    adresse:xss(req.body.adresse),
    sexe:xss(req.body.sexe),
    dateDeNaissance:xss(req.body.dateNaissance),
    choixFormule:xss(req.body.formule),
  }
  


  // Utilisez bcrypt pour hacher le mot de passe
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la requête');
      return;
    }

    // Insérez l'utilisateur dans la base de données avec le mot de passe haché
    query(
      'INSERT INTO User (id, lastName, firstName, password, email, adresse, sexe, dateDeNaissance, choixFormule) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, user.lastName, user.firstName, hash, user.email, user.adresse, user.sexe, user.dateDeNaissance, user.choixFormule],
      (error, result) => {
        if (error) {
          console.error(error);
          res.status(500).send('Erreur lors de la requête');
          return;
        }
        // Redirigez vers la page d'accueil après l'ajout de l'utilisateur
        // res.redirect('/');
           res.redirect("/uservalid");
      }
    );
  });
};
