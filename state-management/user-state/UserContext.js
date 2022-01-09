import { createContext } from "react";
import { USER, T } from "../../constants";


/**
 * @param USER: indicates the user status in the userContext
 * USER.LOGGED_IN: the user successfully logged in.
 * USER.VERIFING: the user is under verifing and updating the ApolloClient with user's token.
 * USER.LOGGED_OUT: the user is successfully logged out.
 *
 * @param T: indicates the type and origin of the dispatch.
 * T.LOGIN: the user successfully used the sign in dialog, but its status is VERIFING,
 * this because it is not enough to have the user get a succeded login, we need to apply its valid token
 * throughout React with ApolloProvider.
 * T.SET_CLIENT: now the user the is logged in, its token is saved, and the new AplloClient is set.
 * T.LOGOUT: start the proccess of loging the user out.
 * T.CHANGE_LANG: change the language.
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
 *
 * normally this context contains (after when T.LOGIN):
 *    status
 *		token
 *		username
 *		profileId
 *		lang
 *
 */
export const userReducer = (currentState, action) => {
  switch (action.type) {
    case T.LOGIN:
      return {
        status: USER.VERIFING,
        token: action.token,
        username: action.username,
        profileId: action.profileId,
        lang: action.lang,
      };

    case T.SET_CLIENT:
      return {
        ...Object.assign(currentState, {
          status: USER.LOGGED_IN,
          profileId: action.profileId,
        }),
      };

    case T.LOGOUT:
      sessionStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      return {
        status: USER.LOGGED_OUT,
        lang: action.lang,
      };
    case T.CHANGE_LANG:
      localStorage.setItem("lang", action.lang);
      return { ...Object.assign(currentState, { lang: action.lang }) };

    case "create-new":
      break;
  }
};
