/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import { Button, InputBase, Paper } from "@material-ui/core";
import "antd/es/button/style/index.css";
import { default as message } from "antd/es/message";
import "antd/es/message/style/css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addListCmt } from "../../../actions/addCmt";
import { addReact, customReact } from "../../../actions/react";
import api from "../../../constant";
import { ReactComponent as ReactTym } from "../../../image/heart-solid.svg";
import ImgFail from "../../../image/Image 1@2x.png";
import { ReactComponent as ReactCmt } from "../../../image/message-solid.svg";
import "./style.css";

function DetailCard(props) {
    const path = useParams();
    const [card, setCard] = useState();
    const dispatch = useDispatch();
    const reactTym = useSelector((state) => state.reactReducer.listTym);
    const commentStore = useSelector((state) => state.commentReducer.list);
    const [comment, setComment] = useState();
    const [cmtInput, setCmtInput] = useState("");
    const [cmtErr, setCmtErr] = useState(false);

    const covertDate = (day) => {
        const date = new Date(day);
        const dateAt = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return dateAt;
    };

    async function getDataList() {
        try {
            const response = await api.get(`card/${path.id}`);
            const { data: dataSource } = response;
            setCard(dataSource);
            console.log(dataSource.status)
            dispatch(addReact(dataSource.heart));
            const responseCmt = await api.get(`/comment/card/${path.id}`);
            setComment(responseCmt.data);
            dispatch(addListCmt(responseCmt.data));
        } catch (err) {
            message.error({
                message: "Error is occured",
                description: "No data found.",
            });
        }
    }
    console.log( "store", card?.status);

    useEffect(() => {
        getDataList();
    }, []);

    const addTym = async () => {
        await api
            .put(`card/heart/${path.id}`, {
                comment: cmtInput,
                cardId: path.id,
            })
            .then((res) => {
                dispatch(customReact(reactTym));
                window.location.reload();
            })
            .catch((err) => handleError(err));
    };

    const submitComment = () => {
        console.log(cmtInput);
        let check = true;
        if (cmtInput === "") {
            setCmtErr(true);
            check = false;
        } else {
            setCmtErr(false);
        }
        if (!check) {
            message.error("check form");
        } else {
            api.post("/comment/add", {
                comment: cmtInput,
                cardId: path.id,
            })
                .then((res) => {
                    window.location.reload();
                })
                .catch((err) => handleError(err));
        }
    };

    const handleError = (err) => {
        const status = err.response?.status;
        switch (status) {
            case 400:
                message.error(err.response.data.message);
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
        <div className="home-page" style={{ margin: "0px 100px" }}>
            <div className="detail-card">
                <h1>social card detail</h1>
                <div className="card">
                    <div className="card-info">
                        <img className="avatar" src={card?.avatar} />
                        <div className="card-info-left">
                            <div className="name">{card?.name}</div>
                            <div className="create-day">
                                {covertDate(card?.createdAt)}
                            </div>
                        </div>
                    </div>
                    <div className="description">{card?.description}</div>
                    <div className="card-img">
                        <img
                            src={card?.image === "" ? ImgFail : card?.image}
                            className="item-img"
                        />
                    </div>
                </div>
                <div className="react">
                    <div className="react-tym">
                        <ReactTym onClick={() => addTym()} />{" "}
                        <div style={{ marginLeft: "5px" }}>{reactTym}</div>
                    </div>
                    <div className="react-cmt">
                        <ReactCmt />
                        <div style={{ marginLeft: "5px" }}>
                            {comment?.length}
                        </div>
                    </div>
                </div>
            </div>
            <div className="lines"></div>
            <div className="list-cmt">
                {comment?.map((item, key) => (
                    <div className="cmt-item" key={key}>
                        <div className="cmt-day">
                            {covertDate(item.createdAt)} (day create)
                        </div>
                        <div className="cmt-text">{item.comment}</div>
                    </div>
                ))}
            </div>
            <div className="lines"></div>
            <div className="post-cmt" style={{ marginBottom: "160px" }}>
                <div className="social-footer">
                    <div className="footer-title">Post a new coment</div>
                    <Paper
                        id="form-search-cmt"
                        style={cmtErr ? { border: "1px solid #F3115E" } : {}}
                        component="form"
                    >
                        <div className="input-cmt">
                            <InputBase
                                className="input-base-comt"
                                placeholder="Add comment..."
                                inputProps={{ "aria-label": "comment" }}
                                onChange={(e) => setCmtInput(e.target.value)}
                            />
                        </div>

                        <div className="input-add-post">
                            <Button
                                className="btn-add-post"
                                style={{ backgroundColor: "#064EBC" }}
                                variant="contained"
                                onClick={() => submitComment()}
                            >
                                Post
                            </Button>
                        </div>
                    </Paper>
                </div>
            </div>
        </div>
    );
}

export default DetailCard;
