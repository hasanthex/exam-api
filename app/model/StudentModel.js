const BaseModel = require('./BaseModel')
const response = require('../../config/ResponseStatus')
const text = require('../../config/TextString')

/**
 * load all required scheme file
 *
 * @type {object}
 * @files StudentScheme,
 *
 */
const StudentScheme = require('../model/schemes/StudentScheme')


class StudentModel extends BaseModel{

    /**
     * private db object
     *
     * @type {object} Database Class
     */
    #db

    /**
     * use for store response variables
     *
     * @type {object} this class response
     */
    response = { 'status': null, 'msg': null,  success: false , 'data': null}


    /**
     * column name of hospital table to get
     *
     * @type {array} database
     */
    selected_columns =  ['id', 'name', 'email', 'start_time', 'end_time', 'question_set', 'answered', 'mark']

    /**
     * class constructor
     *
     * @type {constructor}
     * @params
     * @return
     */
    constructor() {
        super();
        this.#db = this.getDBConnection()
    }

    /**
     * @params null
     * @return {Promise<Object>}
     */
    startExam = async (req) => {
        const student = StudentScheme.StudentScheme(this.#db)

        const data = await student.findOne(
            {where:{email: req.body.email}},
            {attributes: this.selected_columns})
            .then(result => {
                if(result){
                    this.response.status = 200
                    this.response.success = true
                    this.response.msg = 'Student Found.'
                    this.response.data = result
                }else{
                    this.response.status = 200
                    this.response.success = false
                    this.response.msg = 'Student Does Not Exists of This Email.'
                    this.response.data = result
                }
                return this.response
            })
            .catch( e => {
                console.log(e)
                this.output = this.responseFormat(response.STATUS_SERVER_ERROR, null, e)
            })

        console.log('Data ::: ', data)

        return this.response
    }




}

module.exports = StudentModel