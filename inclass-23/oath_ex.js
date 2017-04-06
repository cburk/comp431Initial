const express = require('express')
const session = require('express-session')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

const config = require('./config')

//app = express()
//app.use(session({secret: '8521a42cafb6a00a61cecddfc7d0b44b'}))

//app.use(passport.initialize())
//app.use(passport.session())

//TODO: Just standing in for db
const users = {}

passport.serializeUser((user, done) => {
	users[user.id] = user
	done(null, user.id)
})

passport.deserializeUser((id, done) => {
	const user = users[id]
	done(null, user)
})

passport.use(new FacebookStrategy(config,
	(token, refreshToken, profile, done) => {
		process.nextTick(() => {return done(null, profile)})
	})
)

const profile = (req, res) => {
	res.send({hello: 'world'})
}
const fail = (req, res) => {
	res.send({errorMsg: 'login failed'})
}

//app.use('/login', passport.authenticate('facebook', {scope: 'email'}))
//app.use('/callback', passport.authenticate('facebook', 
//	{successRedirect: '/profile', failureRedirect: '/fail'}))
//app.use('/profile', profile)
//app.use('/fail', fail)

module.exports = app => {
	app.use(passport.initialize())
	app.use(passport.session())

	app.use('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}))
	app.use('/callback', passport.authenticate('facebook',
        {successRedirect: '/profile', failureRedirect: '/fail'}))
	app.use('/profile', profile)
	app.use('/fail', fail)
}
