const dotenv = require('dotenv');
const Sequelize = require('sequelize')

/**
 * base model class, every model class should be extends
 * this base model class to get database connection.
 *
 * @type Base Class
 * @created_by Muhammad Hasan
 */
class BaseModel {

    /**
     * Database connection
     *
     * @type {Object} private
     * @created_by Muhammad Hasan
     */
    #db

    /**
     *  use for store response variables
     *
     * @type {Object}
     * @created_by Muhammad Hasan
     */
     #request_response = { 'status':null, 'msg': null, 'data':null}

    /**
     * @type constructor
     * @params
     * @return
     * @created_by Muhammad Hasan
     */
    constructor() {
        this.#DBConnection()
    }

    /**
     * init database connection
     *
     * @type method
     * @params
     * @return
     * @created_by Muhammad Hasan
     */
    #DBConnection(){
        this.#db = new Sequelize(
            process.env.DB_DATABASE,
            process.env.DB_USERNAME,
            process.env.DB_PASSWORD,
            {
                host: process.env.DB_HOST,
                dialect: process.env.DB_DIALECT,
                logging: false,
            }
        )
        this.#DBConnect()
        return true
    }

    /**
     * test database connection
     *
     * @type method
     * @params
     * @return
     * @created_by Muhammad Hasan
     */
    async #DBConnect(){
        try{
            await this.#db.authenticate();
            // console.log('DB Connection has been established successfully.')
        } catch (e) {
            console.error('Unable to connect to the database: ', e)
        }
    }

    /**
     * get database connection object
     *
     * @type {method} public
     * @params
     * @return {Object}
     * @created_by Muhammad Hasan
     */
    getDBConnection(){
        return this.#db
    }


    responseFormat(status, data, msg){
        this.#request_response.status = status
        this.#request_response.data = data
        this.#request_response.msg = msg
        return this.#request_response
    }
}

module.exports = BaseModel