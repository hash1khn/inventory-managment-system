import React from "react";
import { Form, Input, InputNumber, Button } from "antd";

const InventoryForm = ({ onAdd }) => {
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        console.log(values);
        onAdd(values);
        form.resetFields();
    };

    return (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
                label="Device Type"
                name="deviceType"
                rules={[
                    { required: true, message: "Please enter the Device Type" },
                ]}>
                <Input style={{ width: "400px" }} /> {/* Set desired width */}
            </Form.Item>

            <Form.Item
                label="Model Name"
                name="modelName"
                rules={[
                    { required: true, message: "Please enter the model name" },
                ]}>
                <Input style={{ width: "400px" }} /> {/* Set desired width */}
            </Form.Item>

            <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: "Please enter the price" }]}>
                <InputNumber min={0} style={{ width: "400px" }} />{" "}
                {/* Set desired width */}
            </Form.Item>

            <Form.Item
                label="Product Number"
                name="productNumber"
                rules={[
                    {
                        required: true,
                        message: "Please enter the product number",
                    },
                ]}>
                <Input style={{ width: "400px" }} /> {/* Set desired width */}
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="ant-btn-custom">
                    Add Device
                </Button>
            </Form.Item>
        </Form>
    );
};

export default InventoryForm;
