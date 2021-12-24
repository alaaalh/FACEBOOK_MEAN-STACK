const validInputs = (inputs) => (req, res, next) =>{
    const currentInputs = Object.keys(req.body);
    const unValidInputs = inputs.filter(item=> !currentInputs.includes(item))
    if(unValidInputs.length) {
        const error = new Error('un valid inputs');
        error.statusCode = 202
        return next(error)
    }
    next()
}

module.exports = validInputs