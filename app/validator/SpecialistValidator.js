const { Common_validator } = require('../../config/TextString')

const { body } = require('express-validator')

exports.SpecialistID = () => {
    return [
        body('id', Common_validator.numeric_need_string_given).isNumeric()
    ]
}
