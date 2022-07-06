const initialState = {
    list: [],
    activeId: null,
    search: "",
    idRevert: "",
};

const cardReducer = (state = initialState, action) => {
    // console.log("cardReducer",action.type)
    switch (action.type) {
        case "DELETE_CARD": {
            console.log("Delete card", action.payload);
            let newList = state.list.filter((card) => {
                return action.payload !== card._id;
            });

            return {
                ...state,
                list: newList,
            };
        }
        case "ADD_LISTCARDS": {
            // const newList = [...state.list];
            // newList.push(action.cards);
            const newList = [...action.cards];

            return {
                ...state,
                list: newList,
            };
        }
        case "SEARCH_CARDS": {
            // const newList = [...state.list];
            const valueSearch = action.search;

            return {
                ...state,
                // list: listResult,
                search: valueSearch,
            };
        }
        case "REVERT_CARDS": {
            console.log("REVERT_CARDS",action.idRevert);
            const valueRevert = action.idRevert
            // const newList = [...state.list];
            // newList.push(action.cards);
            // const newList = [...action.cards];

            return {
                ...state,
                idRevert: valueRevert
            };
        }

        default:
            return state;
    }
};

export default cardReducer;
