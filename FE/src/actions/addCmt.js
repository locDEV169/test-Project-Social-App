export const addListCmt = (comment) => {
    console.log("action comment", comment);
    return {
        type: "ADD_LISTCMT",
        comment: comment,
    };
};
