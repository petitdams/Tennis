import { v4 } from 'uuid';
import query from '../database.js';
import nodemailer from 'nodemailer';



// Configuration de Nodemailer
const transporter = nodemailer.createTransport({
    host: 'mail.infomaniak.com', // Remplacez par l'hôte SMTP de votre fournisseur
    port: 465, // Port habituellement utilisé pour SMTP sécurisé. Cela pourrait aussi être 587.
    secure: true, // true pour le port 465, false pour les autres ports
    auth: {
        user: process.env.EMAIL_USER, // Votre adresse e-mail
        pass: process.env.EMAIL_PWD, // Votre mot de passe
    }
});

export function contact(req, res) {
    res.render('contact')
}

// AJOUT D'UN CONTACT ET ACTUALISATION DE L'AFFICHAGE
export function envoyerMail(req, res) {


    // Envoi d'un email avec les informations du contact
    const mailOptions = {
        from: process.env.EMAIL_USER, // Expéditeur, // Expéditeur
        to: process.env.EMAIL_TO, // Destinataire
        subject: 'Nouveau message de contact reçu',
        text: `Nom: ${req.body.lastname}\nPrénom: ${req.body.firstname}\nEmail: ${req.body.email}\nMessage: ${req.body.message}`
    };

    transporter.sendMail(mailOptions, (mailError, info) => {
        if (mailError) {
            console.error('Erreur lors de l\'envoi de l\'email:', mailError);
        }
        else {
            console.log('Email envoyé: ' + info.response);
        }
    });

    // Redirection vers la page de confirmation d'envoi
    res.redirect("/formConfirm");
}
