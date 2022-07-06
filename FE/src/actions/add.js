export const addListCard = (cards) => {
    console.log("action comment", cards);
    return {
        type: "ADD_LISTCARDS",
        cards: cards,
    };
};
