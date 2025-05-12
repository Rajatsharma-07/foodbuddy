import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  GetProp,
  Image,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Switch,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MenuCategory } from "../../../@types/menu-categories/menu-category";
import { MenuItem } from "../../../@types/menu-item/menu-item";
import { PATHS } from "../../../routes/paths";
import { fetchMenuCategoryList } from "../../../utils/api/menu-categories/menu-categories";
import {
  createMenuItem,
  updateMenuItem,
} from "../../../utils/api/menu-items/menu-items";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

type Props = {
  add: boolean;
  edit: boolean;
  detail: boolean;
  menu_item_data?: MenuItem;
};

const MenuItemForm = ({ add, detail, edit, menu_item_data }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loader, setLoader] = useState(false);
  const [menuCategoryList, setMenuCategoryList] = useState<MenuCategory[]>([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!detail) {
      setLoader(true);
      const getMenuCategories = async () => {
        try {
          const response = await fetchMenuCategoryList({});
          setMenuCategoryList(response.data);
        } catch (error: any) {
          console.error(error);
        }
        setLoader(false);
      };
      getMenuCategories();
    }
  }, [detail]);

  useEffect(() => {
    if ((edit || detail) && menu_item_data) {
      form.setFieldsValue({
        name: menu_item_data.name,
        description: menu_item_data.description,
        default_price: menu_item_data.default_price,
        category_id: menu_item_data.category_id,
        is_available: menu_item_data.is_available || false,
        is_active: menu_item_data.is_active || false,
      });

      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: `${process.env.REACT_APP_BACKEND_API_PATH}/uploads/menu-items/${menu_item_data.image_path}`,
        },
      ]);
    }
  }, [menu_item_data, edit, detail, form]);

  const isDisabled = detail;

  const handleFinish = async (values: any) => {
    if (add) {
      try {
        const formData: any = new FormData();
        // Append the image file
        if (fileList?.[0]?.originFileObj) {
          formData.append("image", fileList[0].originFileObj);
        }

        // Append other fields
        Object.keys(values).forEach((key) => {
          if (key !== "image") {
            formData.append(key, values[key]);
          }
        });

        await createMenuItem(formData);
        messageApi.success("Menu Item created successfully!");
        navigate(PATHS.menu_items.list);
      } catch (error: any) {
        messageApi.error(error.message);
      }
    } else if (edit) {
      try {
        const formData: any = new FormData();
        // Check if user has uploaded a new file (originFileObj will be present)
        if (fileList?.[0]?.originFileObj) {
          formData.append("image", fileList[0].originFileObj);
        }

        // Append rest of the fields
        Object.keys(values).forEach((key) => {
          if (key !== "image") {
            formData.append(key, values[key]);
          }
        });

        id && (await updateMenuItem(Number(id), formData));
        messageApi.success("MenuItem updated successfully!");
        navigate(PATHS.menu_items.list);
      } catch (error: any) {
        messageApi.error(error.message);
      }
    }
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    // Convert only newly added file to base64
    const file = newFileList[0]?.originFileObj;
    if (file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJpgOrPng) {
        message.error("Only JPG/PNG files are allowed!");
        return;
      }
      if (!isLt2M) {
        message.error("Image must be smaller than 2MB!");
        return;
      }

      const base64 = await getBase64(file);
      newFileList[0].thumbUrl = base64;
      setPreviewImage(base64);
    }

    setFileList(newFileList);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      {contextHolder}
      <Card>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
          initialValues={{
            is_active: true,
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Image" name="image">
                <Upload
                  listType="picture-card"
                  name="image"
                  disabled={isDisabled}
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  beforeUpload={() => false} // Prevent auto-upload
                  accept="image/*"
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                {previewImage && (
                  <Image
                    wrapperStyle={{ display: "none" }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                      afterOpenChange: (visible) =>
                        !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter name" }]}
              >
                <Input
                  variant={detail ? "filled" : "outlined"}
                  disabled={isDisabled}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Description" name="description">
                <TextArea
                  variant={detail ? "filled" : "outlined"}
                  disabled={isDisabled}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Default Price"
                name="default_price"
                rules={[
                  { required: true, message: "Please enter the Default Price" },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  variant={detail ? "filled" : "outlined"}
                  disabled={isDisabled}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Category"
                name="category_id"
                rules={[{ required: true, message: "Please enter the city" }]}
              >
                {!detail ? (
                  <Select
                    variant={detail ? "filled" : "outlined"}
                    disabled={isDisabled}
                    placeholder="Select role"
                    loading={loader}
                  >
                    {menuCategoryList.map((menu_category: MenuCategory) => (
                      <Option key={menu_category.id} value={menu_category.id}>
                        {menu_category.name}
                      </Option>
                    ))}
                  </Select>
                ) : (
                  <Input
                    variant={detail ? "filled" : "outlined"}
                    disabled={isDisabled}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Is Active"
                name="is_active"
                valuePropName="checked"
              >
                <Switch disabled={isDisabled} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Is Available"
                name="is_available"
                valuePropName="checked"
              >
                <Switch disabled={isDisabled} />
              </Form.Item>
            </Col>
          </Row>

          {!detail && (
            <Flex justify="end" align="center" gap={10}>
              <Button
                variant="outlined"
                htmlType="submit"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {add ? "Create" : "Update"}
              </Button>
            </Flex>
          )}
        </Form>
      </Card>
    </>
  );
};

export default MenuItemForm;
