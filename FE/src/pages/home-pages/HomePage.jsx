/* eslint-disable jsx-a11y/alt-text */
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Input,
} from "@material-ui/core";
import { Stack } from "@mui/material";
import { Button } from "antd";
import "antd/dist/antd.css";
import { default as message } from "antd/es/message";
import "antd/es/message/style/index.css";
import { default as notification } from "antd/es/notification";
import "antd/es/notification/style/index.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addListCard } from "../../actions/add";
import { DeleteHobby } from "../../actions/type";
import HeaderView from "../../components/header/HeaderView";
import api, { URL_UPLOAD } from "../../constant";
import { ReactComponent as PenceilAlt } from "../../image/pencil-alt-solid.svg";
import { ReactComponent as TrashAlt } from "../../image/trash-can-regular.svg";
import ImgFail from "../../image/Image 1.png";
import "./style.css";
import NoContent from "../cards/no-content/NoContent";
import { RevertCard } from "../../actions/revert";

function HomePage(props) {
    const [state, setState] = useState({ card: [] });
    const [openAdd, setOpenAdd] = useState(false);
    const dispatch = useDispatch();
    const card = useSelector((state) => state.cardReducer.list);
    const searchValue = useSelector((state) => state.cardReducer.search);
    const valueRevert = useSelector((state) => state.cardReducer.idRevert);
    const [openDiaLog, setOpenDiaLog] = useState(false);
    const [idItem, setIdItem] = useState("");
    const [openDiaLogEdit, setOpenDiaLogEdit] = useState(false);
    const [cardName, setCardName] = useState("");
    const [cardAvatar, setCardAvatar] = useState("");
    const [cardImage, setCardImage] = useState("");
    const [cardDescription, setCardDescription] = useState("");
    const [nameError, setNameError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [avatarError, setAvatarError] = useState(false);
    const [avatarType, setAvatarType] = useState("");
    const [imgError, setImgError] = useState(false);

    useEffect(() => {
        api.get(`/card`).then((res) => {
            setState({ card: res.data.data });
            dispatch(addListCard(res.data.data));
        });
    }, []);
    const filterCard = card?.filter(
        (post) =>
            post.name?.includes(searchValue) ||
            post.description?.includes(searchValue)
    );
    // console.log(valueRevert);
    useEffect(() => {
        api.get(`card/${idItem}`).then((res) => {
            setCardName(res.data.name);
            setCardImage(res.data.image);
            setCardAvatar(res.data.avatar);
            setCardDescription(res.data.description);
            // dispatch(addListCard(res.data.data));
        });
    }, [idItem]);

    const covertDate = (day) => {
        const date = new Date(day);
        const dateAt = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return dateAt;
    };

    const handleClickOpen = (id) => {
        setOpenDiaLog(true);
        setIdItem(id);
    };

    const handleClose = () => {
        setOpenDiaLog(false);
    };

    const handleClickOpenEdit = (id) => {
        setOpenDiaLogEdit(true);
        setIdItem(id);
    };

    const handleCloseEdit = () => {
        setOpenDiaLogEdit(false);
    };

    const handleChangeName = (value) => {
        if (value === " ") {
            setNameError(true);
        } else {
            setCardName(value);
            setNameError(false);
        }
    };

    const handleChangeDescription = (value) => {
        if (value === " ") {
            setDescriptionError(true);
        } else {
            setCardDescription(value);
            setDescriptionError(false);
        }
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
                    console.log(url);
                    setAvatarError(false);
                    setCardAvatar(url);
                })
                .catch((err: ErrorType) => handleError(err));
        }
    };
    // console.log(avatarType);
    const UploadfileImg = async (file) => {
        const formData = new FormData();
        formData.append("avatar", file);
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

    const handleDelete = async (id) => {
        dispatch(RevertCard(idItem));
        dispatch(DeleteHobby(idItem));
        setOpenDiaLog(false);
        // await api
        //     .delete(`/card/${idItem}`)
        //     .then((res) => message.success("Request Successful"))
        //     .catch((err) => handleError(err));
        await api
            .put(`/card/delete/${idItem}`)
            .then((res) => message.success("Request Successful"))
            .catch((err) => handleError(err));
    };

    const handleEdit = async () => {
        console.log(cardName, cardDescription, cardAvatar, cardImage);
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
        // if (
        //     cardAvatar === "" &&
        //     avatarType !== "image/jpeg" &&
        //     avatarType !== "image/png"
        // ) {
        //     check = false;
        //     setAvatarError(true);
        // } else {
        //     check = true;
        //     setAvatarError(false);
        // }
        // if (avatarError) {
        //     check = false;
        //     message.error("file avatar upload failed");
        // } else {
        //     check = true;
        // }
        // if (imgError) {
        //     check = false;
        //     message.error("file image upload failed");
        // } else {
        //     check = true;
        // }
        if (!check) {
            message.error("check form");
        } else if (
            cardName === "" ||
            cardAvatar === "" ||
            cardDescription === "" ||
            avatarError
        ) {
            // console.log(cardName, cardAvatar, cardDescription, cardImage);
            message.error("check form");
        } else {
            api.put(`/card/${idItem}`, {
                name: cardName,
                description: cardDescription,
                avatar: cardAvatar,
                image: cardImage,
            })
                .then((res) => {
                    // window.location.href = "/";
                    getData();
                    handleCloseEdit();
                })
                .catch((err) => handleError(err));
        }
    };

    const handleError = (err) => {
        console.log(err);
        const status = err.response?.status;
        switch (status) {
            case 400:
                message.error(err.response.data.msg);
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

    return (
        <div className="home-page">
            <HeaderView />
            <div className="item">
                {card.length > 0 ? (
                    filterCard.length > 0 ? (
                        filterCard.map((item) => (
                            <div className="detail-item">
                                <div style={{ margin: "23px 30px" }}>
                                    <Link to={``}>
                                        <div className="info">
                                            <div className="left">
                                                <img
                                                    className="avatar"
                                                    src={item.avatar}
                                                />
                                                <div className="card-home-info">
                                                    <Link
                                                        to={`/detail-card/${item._id}`}
                                                    >
                                                        <div className="card-home-info-name">
                                                            {item.name}
                                                        </div>
                                                        <div className="card-home-day">
                                                            {covertDate(
                                                                item.createdAt
                                                            )}
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div id="right">
                                                <PenceilAlt
                                                    style={{
                                                        marginRight: "15px",
                                                    }}
                                                    onClick={() =>
                                                        handleClickOpenEdit(
                                                            item._id
                                                        )
                                                    }
                                                />
                                                <TrashAlt
                                                    style={{
                                                        color: "red",
                                                    }}
                                                    onClick={() =>
                                                        handleClickOpen(
                                                            item._id
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="center">
                                            {item.description}
                                        </div>
                                        <img
                                            className="poster"
                                            src={
                                                item.image === ""
                                                    ? ImgFail
                                                    : item.image
                                            }
                                        />
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <NoContent />
                    )
                ) : (
                    <NoContent />
                )}
            </div>
            <div>{popUpDelete(openDiaLog, handleClose, handleDelete)}</div>
            <div>
                <Dialog
                    open={openDiaLogEdit}
                    onClose={handleCloseEdit}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    id="pop-up-edit"
                >
                    <DialogTitle id="alert-dialog-title">Edit item</DialogTitle>
                    <DialogContent style={{ padding: "0px 45px" }}>
                        <form className="form-edit">
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
                                        // setCardName(e.target.value)
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
                                        // setCardDescription(e.target.value)
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
                        <div className="btn-form-delete">
                            <Button
                                onClick={handleEdit}
                                style={{
                                    backgroundColor: "#064EBC",
                                    marginRight: "20px",
                                }}
                                className="btn-dialog"
                            >
                                Edit
                            </Button>
                            <Button
                                onClick={handleCloseEdit}
                                autoFocus
                                style={{
                                    backgroundColor: "#D9D9D9",
                                    width: "76px",
                                    height: "43px",
                                }}
                                className="btn-dialog"
                            >
                                Cancel
                            </Button>
                        </div>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

export default HomePage;

function popUpDelete(openDiaLog, handleClose, handleDelete) {
    return (
        <Dialog
            open={openDiaLog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            id="pop-up-delete"
        >
            <DialogTitle id="alert-dialog-title">
                Your about to delete a item
            </DialogTitle>
            <DialogContent>
                <div className="delete-dialog-center">
                    {trashIcon()}
                    <div className="delete-dialog-center-text">
                        This will delete your item form list Are you sure?
                    </div>
                </div>
                <hr className="delete-dialog-lines" />
            </DialogContent>
            <DialogActions style={{ paddingTop: "0px !important" }}>
                <div className="btn-form-delete">
                    <Button
                        onClick={handleDelete}
                        style={{
                            backgroundColor: "#064EBC",
                            marginRight: "20px",
                        }}
                        className="btn-dialog"
                    >
                        Delete
                    </Button>
                    <Button
                        onClick={handleClose}
                        autoFocus
                        style={{
                            backgroundColor: "#D9D9D9",
                        }}
                        className="btn-dialog"
                    >
                        Cancel
                    </Button>
                </div>
            </DialogActions>
        </Dialog>
    );
}

function trashIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="57.143"
            viewBox="0 0 50 57.143"
        >
            <path
                id="trash-can-regular"
                d="M17.857,44.643a1.786,1.786,0,0,1-3.571,0V21.429a1.786,1.786,0,0,1,3.571,0Zm8.929,0a1.786,1.786,0,0,1-3.571,0V21.429a1.786,1.786,0,0,1,3.571,0Zm8.929,0a1.786,1.786,0,0,1-3.571,0V21.429a1.786,1.786,0,0,1,3.571,0ZM35.435,2.783l4.1,6.145h7.79a2.679,2.679,0,0,1,0,5.357h-.893V48.214A8.926,8.926,0,0,1,37.5,57.143h-25a8.928,8.928,0,0,1-8.929-8.929V14.286H2.679a2.679,2.679,0,0,1,0-5.357h7.792l4.094-6.145A6.256,6.256,0,0,1,19.766,0H30.234a6.256,6.256,0,0,1,5.2,2.783ZM16.908,8.929H33.092L30.971,5.754a.9.9,0,0,0-.737-.4H19.766c-.29,0-.67.15-.737.4ZM8.929,48.214A3.57,3.57,0,0,0,12.5,51.786h25a3.568,3.568,0,0,0,3.571-3.571V14.286H8.929Z"
                fill="#f3115e"
            />
        </svg>
    );
}
