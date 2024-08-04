const passport=require('passport')
const LocalStrategy = require('passport-local').Strategy;
const userModel=require('./models/userModels')

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await userModel.findOne({username});
        if (!user)
            return done(null, false, { message: 'Incorrect username.' });
        if (user.password !== password) {
            console.log("Incorrect password.")
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

module.exports = passport;