const { Common_validator } = require('../../config/TextString')

const { body } = require('express-validator')

exports.HealthIssueID = () => {
    return [
        body('id', Common_validator.numeric_need_string_given).isNumeric()
    ]
}
