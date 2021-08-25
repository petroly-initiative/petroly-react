import { createContext } from "react";

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
        case "verified":
            return {
                logged: true,
                token: action.token,
            }
        case "login":
            return {
                user: action.user,
                token: action.token,
                logged: true
            }
        case "sign-out":
            sessionStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            return {
                logged: false
            };
        case "create-new":
            break;        
    }
}