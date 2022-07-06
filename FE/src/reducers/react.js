const initialState = {
    listTym: 0,
    activeId: null,
};

const reactReducer = (state = initialState, actionReact) => {
    // console.log("reactReducer",actionReact.type)
    switch (actionReact.type) {
        case "ADD_REACT": {
            // console.log(actionReact)
            // console.log("reducers",actionReact.tym)  
            return {
                // ...state,
                listTym: actionReact.tym,
            };
        }
        case "CUSTOM_REACT": {
            const addReact = ++actionReact.tym
            return {
                // ...state,
                listTym: addReact,
            };
        }

        default:
            return state;
    }
};

export default reactReducer;
