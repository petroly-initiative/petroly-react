import { createContext } from "react";
import { USER, T } from "../../constants";


/**
 * ? User State management: A JSON with the following attributes
 * - logged (boolean): indicating if the user entered his credientials or not
 * - username (string), email(string), profilePic(an image file from the database)
 */

export const UserContext = createContext(null);
/**
 * 
 * @param currentState: The original state 
 * @param action : The dispatched action
 * Actions will be in the following format to operate correctly
 * {
 * type: ("sign-in" / "sign-out")
 * credentials (required only for sign in actions): 
 *  {
 *     username: "string",
 *     email: "string",
 *     image: (A file from cloudiary)
 * }
 * }
 */
export const userReducer = (currentState, action) => {
    switch(action.type){
        case T.SET_CLIENT:
            return {
              status: USER.LOGGED_IN,
              token: action.token,
              username: action.username,
              lang: action.lang
           
            };
        case T.LOGIN:
            return {
                status: USER.VERIFING,
                token: action.token,
                lang: localStorage.getItem("lang") || "en"
                
            }
        case T.LOGOUT:
            sessionStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            return {
                status: USER.LOGGED_OUT,
                lang: action.lang
            };
        case T.CHANGE_LANG:
            localStorage.setItem("lang", action.lang);
            return {...Object.assign(currentState, {lang: action.lang})};

        case "create-new":
            break;        
    }
}
