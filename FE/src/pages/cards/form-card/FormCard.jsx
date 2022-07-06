/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import { default as Button } from "antd/es/button";
import "antd/es/button/style/index.css";
import { default as Form } from "antd/es/form";
import "antd/es/form/style/index.css";
import { default as Input } from "antd/es/input";
import "antd/es/input/style/index.css";
import { useEffect, useState } from "react";
import "./style.css";

const { TextArea } = Input;
function FormCard(props) {
    const { onSubmit, card } = props;
    const [form] = Form.useForm();
    const [state, setState] = useState({
        dataValueUpdate: [],
    });
    const [selectedFile, setSelectedFile] = useState();
    const [selectedFileAvatar, setSelectedFileAvatar] = useState();
    const [preview, setPreview] = useState();
    const [previewAvatar, setPreviewAvatar] = useState();

    useEffect(() => {
        form.setFieldsValue(card);
    }, [card]);

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    useEffect(() => {
        if (!selectedFileAvatar) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFileAvatar);
        setPreviewAvatar(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFileAvatar]);

    const onChangeUpdate = (values) => {
        setState({ ...state, dataValueUpdate: values });
    };

    const onSelectFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0]);
    };

    const onSelectFileAvatar = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFileAvatar(undefined);
            return;
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFileAvatar(e.target.files[0]);
    };

    return (
        <Form
            initialValues={card}
            onFinish={onSubmit}
            form={form}
            onValuesChange={onChangeUpdate}
            className="form"
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: "Please input your Card name!",
                    },
                ]}
            >
                <Input type="text" placeholder="Enter Card name" />
            </Form.Item>
            <Form.Item
                label="Avatar"
                name="avatar"
                // rules={[{ required: true, message: "Please add your Avatar!" }]}
            >
                <input type="file" onChange={onSelectFileAvatar} />
                {selectedFileAvatar && <img src={previewAvatar} className="img-preview" />}
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"
                rules={[
                    {
                        required: true,
                        message: "Please add your description!",
                    },
                ]}
            >
                <TextArea
                    rows={4}
                    placeholder="maxLength is 256 char"
                    maxLength={256}
                />
            </Form.Item>
            <Form.Item
                label="Banner"
                name="image"
                // rules={[{ required: true, message: "Please add your Poster!" }]}
            >
                <input type="file" onChange={onSelectFile} />
                {selectedFile && <img src={preview} className="img-preview" />}
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    className="btnSubmit"
                    htmlType="submit"
                    disabled={
                        Object.keys(state.dataValueUpdate).length > 0
                            ? false
                            : true
                    }
                >
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default FormCard;
