import query from '../database.js';
import xss from 'xss';

/***AFFICHER LE FORMULAIRE DE MODIFICATION */
export function updateuser(req, res) {
    let id = req.params.id;

    query(
        'SELECT * FROM User WHERE id = ?', [id],
        (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send('Erreur lors de la requete');
                return;
            }

            const user = results[0];
            user.dateDeNaissance = user.dateDeNaissance.toISOString().substring(0, 10)
            if (!user) {
                return res.status(404).send(`Contact with id ${id} not found`);
            }

            const titreFormulaire = "MODIFIER";
            const titreCreationCompte = "FORMULAIRE DE MISE A JOUR";
            //on appelle le template inscription en lui passant les informations concernant le user
            res.render('inscription.ejs', {
                title: 'Modification d\'un user',
                action: `/user/update/${id}`,
                user,
                update: true,
                titreFormulaire,
                titreCreationCompte
            });
        }
    );
};

export function updateUserSubmit(req, res) {
    let id = req.params.id;
   
        query(`UPDATE User SET lastName = ?,
                               firstName = ?,
                               email = ?,
                               adresse = ?,
                               sexe = ?,
                               dateDeNaissance = ?,
                               choixFormule = ?
            WHERE id = ?`,
            [   xss(req.body.nom),
                xss(req.body.prenom),
                xss(req.body.email),
                xss(req.body.adresse),
                xss(req.body.sexe),
                xss(req.body.dateNaissance),
                xss(req.body.formule),
                id
                ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).send('Erreur lors de la requete');
                    return;
                }
                //on redirige vers la page admin
                res.redirect('/adminuser');
            }
        );

    };
