import query from '../database.js';

/****SUPPRESSION DE USER */
export default (req, res) => {
    const userToDelete = req.body.userToDelete;

    query(
        `DELETE FROM User WHERE id IN(?)`, [userToDelete],
        (error, result) => {
            if (error) {
                console.error(error);
                res.status(500).send('Erreur lors de la requete');
                return;
            }

            //on redirige vers la page d'accueil
            res.redirect('/adminuser');
        }
    );
};
