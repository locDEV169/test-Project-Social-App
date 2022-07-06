export const addReact = (tym) => {
    console.log("action react", tym);
    return {
        type: "ADD_REACT",
        tym: tym,
    };
};
export const customReact = (tym) => {
    console.log("custom react", tym);
    return {
        type: "CUSTOM_REACT",
        tym: tym,
    };
};
