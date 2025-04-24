
const errorHandler = (err, req, res, next) => {
    //Error will be caught here, if it is thrown into the global scope
    var flag=""
    //For token expired error
    if(err.message === 'Token expired' || err.message === 'jwt expired'){
        res.status(440)
        flag="token"
    }
    else if(err.message === 'RefreshToken expired'){
        res.status(440)
        flag="refreshtoken"
    }

    //set the status code
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)

    //Return the response
    res.json({
        // expiredtoken:flag,
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = { errorHandler }