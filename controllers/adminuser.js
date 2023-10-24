import query from '../database.js';

export default (req, res) => {
    query(
        'SELECT * FROM User',
        (error, users) => {
            if (error) {
                console.error(error);
                res.status(500).send('Erreur lors de la requete');
                return;
            }
            res.render('adminuser', { users });
        }
    );
};
