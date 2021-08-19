// ? Sending a request for the evaluation information submitted by the user

export const evalReducer = (state, action) => {
    switch(action.type){
        // retrieving the evaluation information from DB
        case "edit":
            break;
        case "send":
            var data = action.content;
            // sending the information to the DB
            /**
             * return ({sucess: (isProcessSuccessful)})
             */
            return({sucess: true})
    }
}