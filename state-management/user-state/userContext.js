import { createContext } from "react";

/**
 * ? User State management: A JSON with the following attributes
 * - logged (boolean): indicating if the user entered his credientials or not
 * - username (string), email(string), profilePic(an image file from the database)
 */

export const userContext = createContext(null);
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
        case "sign-in":
            return (
                // ? Credentials will be provided via the sign in forms 
                action.credentials
            )
        case "sign-out":
            return({logged: false});
            //? This section will contain the procedure to create a new account
        case "create-new":
            break;
            
    }
}