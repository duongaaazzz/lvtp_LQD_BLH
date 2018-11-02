const jwt= require('jsonwebtoken');
// format of header
// Authorization: Bearer <access_token>

module.exports = (req, res, next) => {
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    //check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        //Slipt at  the space
        const bearer = bearerHeader.split(' ')
        // Get token from array
        const bearerToken= bearer[1];
        //Set the token
        req.token = bearerToken;
        //next middleware
        next();
    }else{
        //forbidden
        res.sendStatus(403);
    }
}