const User = require('../models/users')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const tokenService = require('./token')
const UserDto = require('../dto/user-dto')
const ServerError = require('../exceptions/error')
const IdeaCard = require('../models/idea_cards')

class UserService {
    async registration(email, password) {
        const candidate = await User.findOne({ email })
        if (candidate) {
            throw ServerError.BadRequest(`User with email address ${email} already exists`)
        }

        const hashPassword = await bcrypt.hash(password, 3);


        const user = await User.create({ email, password: hashPassword, collections: {} })
        if (user) {
            const cardsCollection = await IdeaCard.find();
            const generalCardCollectionName = `${email}_general-cards`; // Card collection name
            const personalCardCollectionName = `${email}_personal-cards`; // Card collection name

            user.collections[`${generalCardCollectionName}`] = [...cardsCollection]
            user.collections[`${personalCardCollectionName}`] = []

            user.markModified('collections');
            await user.save();
            console.log('The card collection has been successfully added to the user`s collection.');
        } else {
            console.log('User is not found.');
        }

        const userDto = new UserDto(user);
        console.log('userDto,', userDto)
        const tokens = tokenService.generateToken({ ...userDto });
        console.log('tokens,', tokens)
        console.log('tokens.refreshToken1111,', tokens.refreshToken)
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        console.log('tokens.refreshToken,', tokens.refreshToken)
        return { ...tokens, user: userDto }
    }


    async login(email, password) {

        const findedUser = await User.findOne({ email })
        console.log('findedUser = ', findedUser)

        if (!findedUser) {
            throw ServerError.BadRequest(`User with email address ${email} not found`)
        }

        const isPassEaquals = await bcrypt.compare(password, findedUser.password)
        if (!isPassEaquals) {
            throw ServerError.BadRequest(`Incorrect password`)
        }
        const userDto = new UserDto(findedUser);
        const tokens = tokenService.generateToken({ ...userDto })
        await tokenService.saveToken(findedUser.id, tokens.refreshToken);

        return {
            ...tokens, findedUser: userDto
        }
    }

    async logout(refreshToken) {

        try {
            console.log('Token wants to be deleted', refreshToken);
            await tokenService.removeToken(refreshToken.token);

        } catch (err) {
            console.log(err);
            throw new Error('Error while deleting token');
        }
    }


    async refresh(refreshToken) {

        if (!refreshToken) {
            throw ServerError.UnathorizedError()
        }
        const userData = tokenService.validateAccessToken(refreshToken)
        const tokenFromDB = await tokenService.findToken(refreshToken)

        if (!userData || !tokenFromDB) {
            throw ServerError.UnathorizedError()
        }

        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto }
    }


    async findUserByJWT(data) {
        const { authorization } = data;
        const token = authorization.replace('Bearer ', '');
        console.log("token = ", token)
        console.log('Looking for user by token', token)
        const userToken = await tokenService.findToken(token);
        console.log('Looking for userToken', userToken)
        console.log('userData.user', userToken.user)
        const user = await User.findById(userToken.user);
        console.log('user.email', user.email)

        return user
    }

}

module.exports = new UserService()
