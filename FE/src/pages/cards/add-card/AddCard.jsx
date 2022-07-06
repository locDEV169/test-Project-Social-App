import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Input,
} from "@material-ui/core";
import Stack from "@mui/material/Stack";
import { default as Button } from "antd/es/button";
import "antd/es/button/style/index.css";
import { default as message } from "antd/es/message";
import "antd/es/message/style/index.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../constant";
import "./style.css";

function AddCard(props) {
    const navigate = useNavigate();
    const { open } = props;
    const [openDiaLog, setOpenDiaLog] = useState(open);

    const handleClickOpen = () => {
        setOpenDiaLog(true);
    };

    const handleClose = () => {
        setOpenDiaLog(!open);
    };

    const onSubmit = (values) => {
        api.post("/card/add", {
            name: values.name,
            description: values.description,
            avatar: "https://img.vietcetera.com/uploads/images/18-apr-2022/avatar-m-anh-1650263536870.jpg",
            image: "https://img.vietcetera.com/uploads/images/27-jun-2022/220627-chatluongsong-1656297379225.jpg",
        })
            .then((res) => {
                window.location.href = "/";
            })
            .catch((err) => handleError(err));
    };

    const handleError = (err) => {
        const status = err.response?.status;
        switch (status) {
            case 400:
                message.error(err.response.data.msg);
                break;
            case 401:
                message.error(err.response.data.message);
                break;
            case 500:
                message.error("Request Login Failed");
                break;
            default:
                message.error("Request Login Failed");
        }
    };

    return (
        <div className="">
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                id="pop-up"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Add new card"}
                </DialogTitle>
                <DialogContent>
                    <form className="form-add">
                        <div className="input-avatar">
                            <label style={{ marginRight: "100px" }}>
                                Avatar:
                            </label>
                            <input type="file" className="upload-image" />
                        </div>
                        <br />
                        <div className="input-name">
                            <label style={{ marginRight: "100px" }}>
                                Name:
                            </label>
                            <input type="text" id="fname" name="fname" />
                        </div>
                        <br />
                        <div className="input-description">
                            <label
                                for="description"
                                style={{ marginRight: "67px" }}
                            >
                                Description:
                            </label>
                            <input type="text" id="fname" name="fname" />
                        </div>
                        <br />
                        <div className="input-avatar">
                            <label style={{ marginRight: "100px" }}>
                                Image:
                            </label>
                            <input
                                type="file"
                                className="upload-image"
                                style={{ display: "none" }}
                            />
                        </div>
                    </form>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <div> avatar:</div>
                        <label htmlFor="contained-button-file">
                            <Input
                                accept="image/png"
                                id="contained-button-file"
                                multiple
                                type="file"
                            />
                        </label>
                        <Button
                            variant="contained"
                            component="span"
                            onClick={() => setOpenDiaLog(true)}
                        >
                            Upload
                        </Button>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button
                        // onClick={handleClose}
                        style={{ backgroundColor: "#064EBC" }}
                    >
                        Save
                    </Button>
                    <Button
                        onClick={handleClose}
                        autoFocus
                        style={{ backgroundColor: "#D9D9D9" }}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddCard;
