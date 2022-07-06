export const RevertCard = (id) => {
    console.log("action RevertCard", id);
    return {
        type: "REVERT_CARDS",
        idRevert: id,
    };
};
