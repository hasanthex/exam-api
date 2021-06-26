const { validationResult } = require('express-validator')
/**
 * @type {Server Response}
 */
const response = require('../../config/ResponseStatus')
/**
 * @type {AuthModel}
 */
const AuthModel = require('../model/AuthModel')
/**
 * @type {AuthModel}
 */
const authModel = new AuthModel()



/**
 * doing user related all t
 *
 * @type {class} AuthController
 * @desc
 * @created_by Muhammad Hasan
 */
class AuthController {

    #result = { status: null, error: null, result: null}

    /**
     * get all users list
     *
     * @params
     * @return {Promise<*>}
     * @created_by Muhammad Hasan
     */
    user = async (req, res, next) => {
        await authModel.getAllAuthUser()
            .then( result => {
                return res.status(response.STATUS_OK).send(result)
            })
            .catch( (err) => {
                return next(err)
            })
    }


    /**
     * register an user
     *
     * @params data
     * @return {Promise<*>}
     * @created_by Muhammad Hasan
     */
    register = async (req, res, next) => {

        const er = validationResult(req)

        if(!er.isEmpty()){
            // let errr = er.array()
            // console.log(errr[0].msg)
            return res.status(422).json({ errors: er.array() })
        }

        await authModel.registerUser(req.body)
            .then( result => {
                res.status(result.status).json(result)
            })
            .catch(
                err => {
                    return next(err)
                })
    }


    /**
     * login an user
     *
     * @params data
     * @return {Promise<*>}
     * @created_by Muhammad Hasan
     */
    login = async (req, res, next) => {
        // get request data, validation result
        const er = validationResult(req)
        // if error occur
        if(!er.isEmpty()){
            return res.status(422).json({ errors: er.array() })
        }

        // get user email and password
        let data = {
            email: req.body.email,
            password: req.body.password
        }

        await Promise.resolve(authModel.checkLoginCredential(data)
            .then( () => {
               return res
                        .status(authModel.response.status)
                        .json(authModel.response)
            })
            .catch( err => {
                return next(err)
            })
        )

        return response
    }


    getUserInfo = async (req, res, next) => {
        await Promise
            .resolve(authModel.getUserInfoFromLoginAccess(req))
            .then( result => {
                res.status(200).send('TEST')
                return
            })
            .catch( err => {
                return next(err)
            })
    }


     /**
     * pass_reset for an user
     *
     * @params data
     * @return {Promise<*>}
     * @created_by Tanjin Alam
     */
    pass_reset = async (req, res, next) => {

        const er = validationResult(req)

        if(!er.isEmpty()){
            // let errr = er.array()
            // console.log(errr[0].msg)
            return res.status(422).json({ errors: er.array() })
        }

        await authModel.pass_reset(req.body)
            .then( result => {
                res.status(result.status).json(result)
            })
            .catch(
                err => {
                    return next(err)
                }) 
                
    }
    
}

module.exports = AuthController