const { validationResult } = require('express-validator')
/**
 * @desc Server response
 */
const response = require('../../config/ResponseStatus')
/**
 * @type {QuestionSetModel}
 */
const QuestionSetModel = require('../model/QuestionSetModel')
/**
 * @type {questionSetModel}
 */
const questionSetModel = new QuestionSetModel()

/**
 * @type {class} StudentController
 * @desc
 * @created_by Muhammad Hasan
 */
class QuestionController {

    #result = { 'status': null, 'msg': null,  success: false , 'data': null}

    getQuestion =  async (req, res, next) => {
        // const er = validationResult(req)
        // if(!er.isEmpty()){
        //     return res.status(response.STATUS_OK).json({ errors: er.array() })
        // }
        const data = await questionSetModel.getQuestionsList()
        return res.status(response.STATUS_OK).json(data)
    }



}

module.exports = QuestionController