const { validationResult } = require('express-validator')
/**
 * @desc Server response
 */
const response = require('../../config/ResponseStatus')
/**
 * @type {StudentModel}
 */
const StudentModel = require('../model/StudentModel')
/**
 * @type {studentModel}
 */
const studentModel = new StudentModel()

/**
 * @type {class} StudentController
 * @desc
 * @created_by Muhammad Hasan
 */
class StudentController {

    #result = { 'status': null, 'msg': null,  success: false , 'data': null}

    startExam = async (req, res, next) => {
        const er = validationResult(req)
        if(!er.isEmpty()){
            this.#result['msg'] = "Please Write A Valid Email."
            return res.status(response.STATUS_OK).json(this.#result)
        }
        const data = await studentModel.startExam(req)
        return res.status(response.STATUS_OK).json(data)
    }


}

module.exports = StudentController