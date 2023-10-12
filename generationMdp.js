import bcrypt from 'bcrypt';

bcrypt.hash('Inah2011@', 10, (error, hash) => {
    console.log(hash);
});
