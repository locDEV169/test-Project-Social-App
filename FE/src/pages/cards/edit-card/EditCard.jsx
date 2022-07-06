/* eslint-disable react-hooks/exhaustive-deps */
import { default as Button } from "antd/es/button";
import "antd/es/button/style/index.css";
import { default as message } from "antd/es/message";
import "antd/es/message/style/index.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FormCard from "../form-card/FormCard";
import api from "../../../constant";

function EditCard(props) {
    const navigate = useNavigate();
    const path = useParams();
    const [card, setCard] = useState();

    const onSubmit = (values) => {
        api.put(`/card/${path.id}`, {
            name: values.name,
            description: values.description,
            avatar: "https://img.vietcetera.com/uploads/images/18-apr-2022/avatar-m-anh-1650263536870.jpg",
            image: "https://img.vietcetera.com/uploads/images/27-jun-2022/220627-chatluongsong-1656297379225.jpg",
        })
            .then((res) => {window.location.href = '/'})
            .catch((err) => handleError(err));
    };

    useEffect(() => {
        api.get(`card/${path.id}`).then((res) => {
            const { data: dataSource } = res;
            setCard(dataSource)
        });
    }, []);

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
        <div className="home-page">
            <h1>Edit Social Card</h1>
            <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                <div className="action">
                    <Button style={{ backgroundColor: "orange" }}>
                        revert
                    </Button>
                    <Button
                        onClick={() => navigate(-1)}
                        style={{ backgroundColor: "silver" }}
                    >
                        Back
                    </Button>
                </div>
            </div>
            <FormCard onSubmit={onSubmit} card={card}/>
        </div>
    );
}

export default EditCard;
