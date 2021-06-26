const BaseModel = require('./BaseModel')
const response = require('../../config/ResponseStatus')
const text = require('../../config/TextString')

/**
 * load all required scheme file
 *
 * @type {object}
 * @files QuestionSchema,
 *
 */
const QuestionSchema = require('../model/schemes/QuestionSchema')


class QuestionSetModel extends BaseModel{

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
    selected_columns =  ['id', 'question', 'options', 'answer', 'duration', 'negative', 'negative_mark']

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
    getQuestionsList = async () => {
        const question = QuestionSchema.QuestionSchema(this.#db)

        const data = await question.findOne({attributes: this.selected_columns})
            .then(result => {
                this.response.status = 200
                this.response.success = true
                this.response.msg = 'Questions Found.'
                this.response.data = result
                return this.response
            })
            .catch( e => {
                console.log(e)
                this.output = this.responseFormat(response.STATUS_SERVER_ERROR, null, e)
            })
        return this.response
    }




}

module.exports = QuestionSetModel