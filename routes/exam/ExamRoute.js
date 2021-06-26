const router = require('express').Router()

/**
 * load controllers
 *
 * @type {controller} list
 */
const ExamController = require('../../app/controller/ExamController')
const StudentController = require('../../app/controller/StudentController')
const QuestionController = require('../../app/controller/QuestionController')

/**
 * request value validator
 */
const start_validator = require('../../app/validator/UserAuthValidator').start()

/**
 * initialize controllers
 *
 * @type {object}   examController, studentController
 *
 */
const examController = new ExamController()
const studentController = new StudentController()
const questionController = new QuestionController()

/**
 * Router list
 *
 * @type {route}
 */
router.post('/start-exam', start_validator, studentController.startExam)
router.post('/get-questions', questionController.getQuestion)


module.exports = router