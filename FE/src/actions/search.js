export const SearchCard = (search) => {
    console.log("action Search", search);
    return {
        type: "SEARCH_CARDS",
        search: search,
    };
};
