import { createContext } from "react";

export const NavContext = createContext(null);

export const NavReducer = (currentState, action) => {

    return {current: action};
}
