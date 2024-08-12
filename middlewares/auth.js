import { verifyToken } from "../services/auth.js";

function checkForAuthCookie(cookieName){
    return function(req, res, next){
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue){
            return next();
        }
         try {
            const userPayload = verifyToken(tokenCookieValue);
            req.user = userPayload;
        }
        catch(e){}
        return next();
    }
}

export default checkForAuthCookie;