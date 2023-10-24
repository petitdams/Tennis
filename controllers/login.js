import query from '../database.js';
import bcrypt from 'bcrypt';

export function loginForm(req, res) {
    res.render('loginForm');
}

export function login(req, res) {
    const identifiant = {
        email: req.body.email,
        password: req.body.password,
    }

    // Récupération du User par son email
    query(
        'SELECT * FROM User WHERE email = ?', [identifiant.email],
        (error, result) => {
            // Gestion de l'erreur
            if (error) {
                console.error(`Erreur lors de l'exécution de la requête : ${error}`);
                res.status(500).send('Erreur serveur');
                return;
            }

            // Si l'utilisateur n'a pas été trouvé
            if (result.length === 0) {
                res.render(
                    'loginForm', { message: 'Identifiants incorrects' }
                );
                return;
            }

            // Vérification du mot de passe
            bcrypt.compare(identifiant.password, result[0].password, (error, isPasswordCorrect) => {
                if (!isPasswordCorrect) {
                    res.render(
                        'loginForm', { message: 'Identifiants incorrects ' }
                    );
                    return;
                }

                req.session.isLogged = true;
                req.session.userId = result[0].id;

                // Conditions basées sur le rôle
                if (result[0].role === "admin") {
                    req.session.role = "admin";
                    // Si l'utilisateur a le rôle "admin", le rediriger vers la page "adminuser"
                    res.redirect('/adminuser');
                }
                else if (result[0].role === 'membre') {
                    req.session.role = "membre";
                    // Si l'utilisateur a le rôle "membre", le rediriger vers la page "espacemembre"
                    res.redirect('/espacemembre');
                }
                else {
                    // Si l'utilisateur n'a ni le rôle "admin" ni le rôle "membre, le rediriger vers la page d'accueil
                    res.redirect('/');
                }
            });
        }
    );
}
