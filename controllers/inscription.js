export default (req, res) => {
     const titreFormulaire = "FORMULAIRE D'INSCRIPTION";
    const titreCreationCompte = "ET CRÉATION DE COMPTE";
    
   res.render("inscription.ejs", {action: '/inscription', update : false, titreFormulaire, titreCreationCompte }) 
}
