/* eslint-disable jsx-a11y/alt-text */
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Input,
} from "@material-ui/core";
import { Stack } from "@mui/material";
import { default as message } from "antd/es/message";
import "antd/es/message/style/index.css";
import { default as notification } from "antd/es/notification";
import "antd/es/notification/style/index.css";
import { useState } from "react";
import { Button } from "antd";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import api, { URL_UPLOAD } from "../../constant";
import { ReactComponent as SearchSolidIcon } from "../../image/search-solid.svg";
import "./style.css";
import { addListCard } from "../../actions/add";
import { RevertCard } from "../../actions/revert";
import { DeleteHobby } from "../../actions/type";
import { SearchCard } from "../../actions/search";

function HeaderView(props) {
    const [state, setState] = useState({ card: [] });
    const [openAdd, setOpenAdd] = useState(false);
    const dispatch = useDispatch();
    const card = useSelector((state) => state.cardReducer.list);
    const searchValue = useSelector((state) => state.cardReducer.search);
    const valueRevert = useSelector((state) => state.cardReducer.idRevert);
    const [openDiaLog, setOpenDiaLog] = useState(false);
    const [idItem, setIdItem] = useState("");
    const [cardName, setCardName] = useState("");
    const [cardAvatar, setCardAvatar] = useState("");
    const [cardImage, setCardImage] = useState("");
    const [cardDescription, setCardDescription] = useState("");
    const [nameError, setNameError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [avatarError, setAvatarError] = useState(false);
    const [avatarType, setAvatarType] = useState("");
    const [imgError, setImgError] = useState(false);

    const handleClose = () => {
        setOpenDiaLog(false);
        setCardName("");
        setCardDescription("");
        setCardAvatar("");
        setCardImage("");
    };

    const handleChangeName = (value) => {
        setCardName(value);
        setNameError(false);
    };

    const handleChangeDescription = (value) => {
        setCardDescription(value);
        setDescriptionError(false);
    };

    const UploadfileAvatar = async (file) => {
        setAvatarType(file.type);
        setCardAvatar(file.name);
        const formData = new FormData();
        // setAvatarType(file.type);
        formData.append("avatar", file);
        if (file.type !== "image/jpeg" && file.type !== "image/png") {
            setAvatarError(true);
            notification.error({
                message: "file upload failed",
                description: "file type upload is .jpg or .png",
            });
        } else {
            await api
                .post("/upload", formData)
                .then((res) => {
                    const url = `${URL_UPLOAD}` + res.data.data.name;
                    setAvatarError(false);
                    setCardAvatar(url);
                })
                .catch((err: ErrorType) => handleError(err));
        }
    };
    // console.log(avatarType);
    const UploadfileImg = async (file) => {
        const formData = new FormData();
        formData.append("file", "image");
        formData.append("file", file, file.name);
        // setCardImage(file.name);
        if (file.type !== "image/jpeg" && file.type !== "image/png") {
            setImgError(true);
            notification.error({
                message: "file upload failed",
                description: "file type upload is .jpg or .png",
            });
        } else {
            await api
                .post("/upload", formData)
                .then((res) => {
                    const url = `${URL_UPLOAD}` + res.data.data.name;
                    console.log(url);
                    setImgError(false);
                    setCardImage(url);
                })
                .catch((err: ErrorType) => handleError(err));
        }
    };

    const getData = async () => {
        await api.get(`/card`).then((res) => {
            setState({ card: res.data.data });
            dispatch(addListCard(res.data.data));
        });
    };
    console.log(cardName, cardAvatar, cardDescription, cardImage);
    const handleSubmitAdd = async () => {
        let check = true;
        if (cardName === "") {
            check = false;
            setNameError(true);
        } else {
            check = true;
            setNameError(false);
        }
        if (cardDescription === "") {
            check = false;
            setDescriptionError(true);
        } else {
            check = true;
            setDescriptionError(false);
        }
        if (
            cardAvatar === "" &&
            avatarType !== "image/jpeg" &&
            avatarType !== "image/png"
        ) {
            check = false;
            setAvatarError(true);
        } else {
            check = true;
            setAvatarError(false);
        }
        if (avatarError) {
            check = false;
            message.error("file avatar upload failed");
        } else {
            check = true;
        }
        if (!check) {
            message.error("check form");
        } else if (
            cardName === "" ||
            cardAvatar === "" ||
            cardDescription === "" ||
            avatarError
        ) {
            message.error("check form");
        } else {
            api.post(`/card/add`, {
                name: cardName,
                description: cardDescription,
                avatar: cardAvatar,
                image: cardImage,
            })
                .then((res) => {
                    // window.location.href = "/";
                    getData();
                    handleClose();
                })
                .catch((err) => handleError(err));
        }
    };

    const handleError = (err) => {
        console.log(err);
        const status = err.response?.status;
        switch (status) {
            case 400:
                message.error(err.response.data.message);
                break;
            case 401:
                message.error(err.response.data.message);
                break;
            case 500:
                message.error("Request  Failed");
                break;
            default:
                message.error("Request  Failed");
        }
    };

    const handleSearchChange = (value) => {
        dispatch(SearchCard(value));
    };

    const handleRevert = async () => {
        await api
            .put(`/card/revert/${valueRevert}`)
            .then((res) => {
                message.success("Request Successful")
                getData();
            })
            .catch((err) => handleError(err));
    };

    return (
        <div className="header-view">
            <h1>list social card</h1>
            <div
                className="action"
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginRight: "83px",
                }}
            >
                <Button
                    style={{ backgroundColor: "#F1B44C" }}
                    onClick={() => handleRevert()}
                >
                    Revert
                </Button>
                <Button
                    style={{ backgroundColor: "#064EBC" }}
                    onClick={() => setOpenDiaLog(!openDiaLog)}
                >
                    Add
                </Button>
                <Dialog
                    open={openDiaLog}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    id="pop-up-edit"
                >
                    <DialogTitle id="alert-dialog-title">
                        Add new item
                    </DialogTitle>
                    <DialogContent style={{ padding: "0px 45px" }}>
                        <form className="form-add">
                            <div className="input-avatar">
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={7.5}
                                >
                                    <div
                                        style={
                                            avatarError
                                                ? {
                                                      marginRight: "0px",
                                                      color: "#F3115E",
                                                      display: "flex",
                                                  }
                                                : { marginRight: "0px" }
                                        }
                                        className="fontSize16 displayFlex"
                                    >
                                        {" "}
                                        Avatar <div className="error">*</div>:
                                    </div>
                                    <label htmlFor="contained-button-file">
                                        <input
                                            name="avatar"
                                            accept="image/png, image/jpeg"
                                            id="contained-button-file"
                                            type="file"
                                            style={{ display: "none" }}
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                UploadfileAvatar(file);
                                            }}
                                        />
                                        <div className="img-title">
                                            {" "}
                                            <div
                                                className={
                                                    avatarError
                                                        ? "img-title-image-error"
                                                        : "img-title-image"
                                                }
                                            ></div>
                                            <div
                                                style={{
                                                    marginLeft: "10px",
                                                }}
                                            >
                                                {cardAvatar !== ""
                                                    ? cardAvatar
                                                    : "Upload Image"}
                                            </div>
                                        </div>
                                    </label>
                                </Stack>
                            </div>
                            <br />
                            <div className="input-name displayFlex">
                                <label
                                    style={
                                        nameError
                                            ? {
                                                  marginRight: "65px",
                                                  color: "#F3115E",
                                              }
                                            : { marginRight: "65px" }
                                    }
                                    className="fontSize16 displayFlex"
                                >
                                    Name <div className="error">*</div>:
                                </label>
                                <input
                                    type="text"
                                    id={nameError ? "nameError" : "name"}
                                    className="outline"
                                    name="name"
                                    value={cardName !== "" ? cardName : ""}
                                    onChange={(e) =>
                                        handleChangeName(e.target.value)
                                    }
                                />
                            </div>
                            <br />
                            <div className="input-description displayFlex">
                                <label
                                    for="description"
                                    style={
                                        descriptionError
                                            ? {
                                                  marginRight: "27px",
                                                  color: "#F3115E",
                                              }
                                            : { marginRight: "27px" }
                                    }
                                    className="fontSize16 displayFlex"
                                >
                                    Description <div className="error">*</div>:
                                </label>
                                <input
                                    type="text-area"
                                    id={
                                        descriptionError
                                            ? "descriptionError"
                                            : "description"
                                    }
                                    className="outline"
                                    name="description"
                                    value={
                                        cardDescription !== ""
                                            ? cardDescription
                                            : ""
                                    }
                                    onChange={(e) =>
                                        handleChangeDescription(e.target.value)
                                    }
                                />
                            </div>
                            <br />
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                            >
                                <div
                                    style={{ marginRight: "60px" }}
                                    className="fontSize16"
                                >
                                    Image:
                                </div>
                                <label htmlFor="contained-button-file-image">
                                    <Input
                                        name="image"
                                        accept="image/png"
                                        id="contained-button-file-image"
                                        type="file"
                                        style={{ display: "none" }}
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            UploadfileImg(file);
                                        }}
                                    />
                                    <div className="img-title">
                                        <div className="img-title-image"></div>
                                        <p
                                            style={{
                                                marginLeft: "10px",
                                            }}
                                        >
                                            {cardImage !== ""
                                                ? cardImage
                                                : "Upload Image"}
                                        </p>
                                    </div>
                                </label>
                            </Stack>
                        </form>
                        <hr className="edit-dialog-lines" />
                    </DialogContent>
                    <DialogActions>
                        <div className="btn-form-add">
                            <Button
                                onClick={handleSubmitAdd}
                                style={{
                                    backgroundColor: "#064EBC",
                                    marginRight: "20px",
                                    textTransform: "capitalize",
                                }}
                                className="btn-dialog"
                            >
                                Add
                            </Button>
                            <Button
                                onClick={handleClose}
                                autoFocus
                                style={{
                                    backgroundColor: "#D9D9D9",
                                    width: "76px",
                                    height: "43px",
                                    textTransform: "capitalize",
                                }}
                                className="btn-dialog"
                            >
                                Cancel
                            </Button>
                        </div>
                    </DialogActions>
                </Dialog>
                <div className="search-input">
                    <input
                        placeholder="Search name... "
                        spellCheck={false}
                        className="search"
                        type="text"
                        onChange={(e) => handleSearchChange(e.target.value)}
                    />
                    <SearchSolidIcon />
                </div>
            </div>
        </div>
    );
}

export default HeaderView;
