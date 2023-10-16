import express from "express";
import accueil from "./controllers/accueil.js";
import club from "./controllers/club.js";
import inscription from "./controllers/inscription.js";
import {contact, envoyerMail} from "./controllers/contact.js";
import createUser from "./controllers/createuser.js";
import uservalid from "./controllers/uservalid.js";
import {loginForm, login} from './controllers/login.js';
import adminuser from './controllers/adminuser.js';
import espacemembre from './controllers/espacemembre.js';
import logout from './controllers/logout.js';
import deleteUser from './controllers/deleteuser.js';
import {updateuser, updateUserSubmit}  from './controllers/updateuser.js'

const router = express.Router();

const checkAuthentification = (req, res, next) => {
   if(req.session.isLogged === true){
       next ()
    return;
   } 
   res.redirect('/login')
   return;
}

router.use((req, res, next) => {
    res.locals.isLogged = req.session.isLogged;
    next();
});


// Route vers les pages
router.get('/', accueil);
router.get('/club', club);
router.get('/inscription', inscription);
router.get('/contact', contact);
router.get('/uservalid', uservalid);
router.get('/espacemembre', espacemembre)
router.post('/inscription' , createUser);
router.post('/user/delete', deleteUser) 
// router.put() ==> route pour mettre à jour (update)
router.get('/adminuser', adminuser);
router.post('/login', login);
router.get('/login', loginForm);
router.get('/logout', logout);
router.post('/contact', envoyerMail);
router.get('/user/update/:id', updateuser);
router.post('/user/update/:id', updateUserSubmit);

export default router;
