import express from "express";
import accueil from "./controllers/accueil.js";
import club from "./controllers/club.js";
import inscription from "./controllers/inscription.js";
import { contact, envoyerMail } from "./controllers/contact.js";
import createUser from "./controllers/createuser.js";
import { loginForm, login } from './controllers/login.js';
import adminuser from './controllers/adminuser.js';
import espacemembre from './controllers/espacemembre.js';
import logout from './controllers/logout.js';
import deleteUser from './controllers/deleteuser.js';
import { updateuser, updateUserSubmit } from './controllers/updateuser.js'
import pagecommande from "./controllers/pageCommande.js";
import commande from "./controllers/commande.js";
import planning from "./controllers/planning.js";
import createCommande from "./controllers/createCommande.js";
import deleteCommande from './controllers/deleteCommande.js';
import { updateCommande, updateCommandeSubmit } from './controllers/updateCommande.js'
import uservalid from "./controllers/uservalid.js";

const router = express.Router();

const checkAuthentification = (req, res, next) => {
    if (req.session.isLogged === true) {
        next()
        return;
    }
    res.redirect('/login')
    return;
}

router.use((req, res, next) => {
    res.locals.isLogged = req.session.isLogged;
    res.locals.role = req.session.role;
    next();
});


// Route vers les pages
router.get('/', accueil);
router.get('/club', club);
router.get('/inscription', inscription);
router.get('/contact', contact);
router.get('/espacemembre', checkAuthentification, espacemembre)
router.post('/inscription', createUser);
router.post('/commande', checkAuthentification, createCommande);
router.post('/commande/delete', checkAuthentification, deleteCommande)
router.post('/user/delete', checkAuthentification, deleteUser)
router.get('/adminuser', checkAuthentification, adminuser);
router.post('/login', login);
router.get('/login', loginForm);
router.get('/logout', checkAuthentification, logout);
router.post('/contact', envoyerMail);
router.get('/user/update/:id', checkAuthentification, updateuser);
router.post('/user/update/:id', checkAuthentification, updateUserSubmit);
router.get('/pageCommande/user/:idUser', checkAuthentification, pagecommande);
router.get('/commande', checkAuthentification, commande);
router.get('/planning', checkAuthentification, planning);
router.get('/commande/update/:id', checkAuthentification, updateCommande);
router.post('/commande/update/:id', checkAuthentification, updateCommandeSubmit);
router.get('/uservalid', checkAuthentification, uservalid);
router.get('/formConfirm', uservalid);
export default router;
