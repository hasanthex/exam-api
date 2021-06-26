const { validationResult } = require('express-validator')
/**
 * @type {Server Response}
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
 *
 *
 * @type {class} ExamController
 * @desc
 * @created_by Muhammad Hasan
 */
class ExamController {

    #result = { status: null, error: null, result: null}


    start = async (req, res, next) => {
        const er = validationResult(req)

        if(!er.isEmpty()){
            return res.status(response.STATUS_UNPROCESSABLE_ENTITY).json({ errors: er.array() })
        }
        const data = await questionSetModel.startExam(req)
        return res.status(response.STATUS_OK).json(data)
    }

    test =  async (req, res, next) => {
        const er = validationResult(req)

        if(!er.isEmpty()){
            return res.status(response.STATUS_UNPROCESSABLE_ENTITY).json({ errors: er.array() })
        }
        const data = await questionSetModel.list()
        return res.status(response.STATUS_OK).json(data)
    }



}

module.exports = ExamController