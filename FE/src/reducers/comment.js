const initialState = {
    list: [],
    activeId: null,
};

const commentReducer = (state = initialState, action) => {
    // console.log("comment Reducer",action)
    switch (action.type) {
        case "ADD_LISTCMT": {
            const newList = [...action.comment];

            return {
                ...state,
                list: newList,
            };
        }

        default:
            return state;
    }
};

export default commentReducer;
