import {
  DownloadOutlined,
  SaveOutlined
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Image,
  Input,
  message,
  Modal,
  Row,
  Select,
  Switch,
  Tabs,
  TabsProps,
  Tooltip,
  Typography
} from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MenuCategory } from "../../../@types/menu-categories/menu-category";
import { MenuItemJunction } from "../../../@types/menu-item-junction/menu-item-junction";
import { Menu } from "../../../@types/menu/menu";
import { PATHS } from "../../../routes/paths";
import { fetchMenuCategoryList } from "../../../utils/api/menu-categories/menu-categories";
import { fetchMenuItemJunctionList } from "../../../utils/api/menu-item-junction/menu-item-junction";
import {
  createMenu,
  fetchMenuList,
  importMenuData,
  updateMenu,
} from "../../../utils/api/menu/menu";
import FoodTypeIcon from "../../common/food-type-icon";
import AddedItemsList from "./added-item-list";
import OtherItemsList from "./other-item-list";

type Props = {
  add: boolean;
  edit: boolean;
  detail: boolean;
  menu_data?: Menu;
};

const { Title, Text } = Typography;

const { Option } = Select;

const MenuForm = ({ add, detail, edit, menu_data }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [priceObject, setPriceObject] = useState<any>({});
  const [menuItemData, setMenuItemData] = useState<any>([]);
  const [fetchAgain, setFetchAgain] = useState<boolean>(true);
  const [loader, setLoader] = useState<boolean>(false);
  const [menuItems, setMenuItems] = useState<MenuItemJunction[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [categoryList, setCategoryList] = useState<MenuCategory[]>([]);
  const [menuList, setMenuList] = useState<Menu[]>([]);
  const [menuId, setMenuId] = useState<string | null>(null);
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = async () => {
    setIsModalOpen(true);
    try {
      if (menuList?.length === 0) {
        const response = await fetchMenuList({});
        if (response.data) {
          setMenuList(response.data);
        }
      }
    } catch (error: any) {
      messageApi.error(error.message);
      throw error;
    }
  };

  const handleOk = async (values: any) => {
    try {
      const data = {
        name: values["menu_name"],
        menu_id: values["menu_id"],
      };
      const response = await importMenuData(data);
      messageApi.success("Data imported!");
      navigate(PATHS.menus.list);
    } catch (error: any) {
      messageApi.error(error.message);
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchMenuCategories = async () => {
      try {
        const response: any = await fetchMenuCategoryList({});
        if (response.data) {
          setCategoryList(response.data);
        }
      } catch (error: any) {
        messageApi.error(error.message);
      }
    };
    fetchMenuCategories();
  }, []);

  useEffect(() => {
    const fetchMenuItems = async () => {
      if (!add && fetchAgain) {
        setLoader(true);
        try {
          const response: any =
            id && (await fetchMenuItemJunctionList(Number(id)));
          if (response.data) {
            setMenuItems(response.data);
            let priceData: any = {};
            response.data.forEach((item: MenuItemJunction) => {
              priceData[item.menu_item_id] = item.price;
            });
            setPriceObject(priceData);
          }
        } catch (error: any) {
          messageApi.error(error.message);
        }
        setLoader(false);
        setFetchAgain(false);
      }
    };
    fetchMenuItems();
  }, [fetchAgain]);

  useEffect(() => {
    if ((edit || detail) && menu_data) {
      form.setFieldsValue({
        name: menu_data.name,
        is_active: menu_data.is_active,
      });
    }
  }, [menu_data, edit, detail, form]);

  const isDisabled = detail;

  const handleFinish = async (values: any) => {
    if (add) {
      try {
        await createMenu(values, menuItemData);
        messageApi.success("Menu created successfully!");
        navigate(PATHS.menus.list);
      } catch (error: any) {
        messageApi.error(error.message);
      }
    } else if (edit) {
      try {
        id && (await updateMenu(Number(id), values, menuItemData));
        messageApi.success("Menu updated successfully!");
        navigate(PATHS.menus.list);
      } catch (error: any) {
        messageApi.error(error.message);
      }
    }
  };

  const onChange = (key: string) => {};

  const handleCategoryChange = async (value: string) => {
    setCategoryFilter(value);
  };

  const handleMenuSelect = async (value: string) => {};

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Added Products",
      children: (
        <AddedItemsList
          messageApi={messageApi}
          priceObject={priceObject}
          setPriceObject={setPriceObject}
          menuItems={menuItems}
          menuItemData={menuItemData}
          setMenuItemData={setMenuItemData}
          setFetchAgain={setFetchAgain}
          loader={loader}
        />
      ),
    },
    {
      key: "2",
      label: "Other Products",
      children: (
        <OtherItemsList
          messageApi={messageApi}
          priceObject={priceObject}
          setPriceObject={setPriceObject}
          menuItemData={menuItemData}
          setMenuItemData={setMenuItemData}
          addedMenuItems={menuItems}
          categoryFilter={categoryFilter}
        />
      ),
    },
  ];

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
              <Form.Item label="Is Active" name="is_active">
                <Switch disabled={isDisabled} />
              </Form.Item>
            </Col>
          </Row>

          <Flex justify="space-between" align="end">
            <Typography.Title level={4}>Items</Typography.Title>
            {add && (
              <Button
                icon={<DownloadOutlined />}
                type="primary"
                variant="filled"
                onClick={showModal}
              >
                Import data from other menu
              </Button>
            )}
          </Flex>

          {/* <Select value={categoryFilter} placeholder="Choose a category" onChange={handleCategoryChange}>
            <Option key={null} value={null}>
              Choose a category
            </Option>
            {categoryList?.map((category: MenuCategory) => {
              return (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              );
            })}
          </Select> */}

          {detail ? (
            <>
              <Row gutter={16}>
                {menuItems?.map((item: MenuItemJunction) => {
                  const src = `${process.env.REACT_APP_BACKEND_API_PATH}/uploads/menu-items/${item.menu_item.image_path}`;
                  return (
                    <Col span={6} key={item.id} style={{ marginTop: 10 }}>
                      <Card
                        key={item.menu_item_id}
                        style={{
                          border: "1px solid lightgray",
                          borderRadius: "50px",
                          height: 400, // Set a height that fits all
                          display: "flex",
                          flexDirection: "column",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)", // custom shadow
                        }}
                      >
                        <Image
                          alt={item.menu_item.name}
                          src={src}
                          height={180}
                          width={"100%"}
                          style={{ borderRadius: "30px", objectFit: "cover" }}
                        />

                        <div
                          style={{
                            flexGrow: 1,
                            padding: "8px",
                            display: "flex",
                            flexDirection: "column",
                            overflow: "hidden",
                          }}
                        >
                          <Flex justify="space-between" align="center">
                            <Flex justify="space-evenly" align="center">
                              <Link to={PATHS.menu_items.detail(item.id)}>
                                <Title
                                  level={4}
                                  style={{ margin: 0, marginTop: 10 }}
                                >
                                  {item.menu_item.name}
                                </Title>
                                <Flex justify="start" align="center" gap={5}>
                                  <FoodTypeIcon
                                    type={item.menu_item.food_type}
                                  />
                                  <Text type="danger">{`(${item.menu_item.category?.name})`}</Text>
                                </Flex>
                              </Link>
                            </Flex>
                          </Flex>

                          <Tooltip title={item.menu_item.description}>
                            <Text
                              type="secondary"
                              style={{
                                marginTop: 8,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: 3, // Change this number as needed
                                WebkitBoxOrient: "vertical",
                                lineHeight: "1.5em",
                                maxHeight: "4.5em", // 3 lines × 1.5em line height
                              }}
                            >
                              {item.menu_item.description}
                            </Text>
                          </Tooltip>
                        </div>

                        <Flex
                          justify="end"
                          align="center"
                          style={{ padding: "0 8px 8px" }}
                        >
                          <Title
                            level={5}
                            style={{
                              margin: 0,
                              color: "var(--primary-color)",
                            }}
                          >
                            {`₹ ${item.price}`}
                          </Title>
                        </Flex>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </>
          ) : (
            <>
              <Tabs defaultActiveKey="1" items={items} onChange={onChange} />

              <Flex justify="end" align="center" gap={10}>
                <Button
                  variant="outlined"
                  htmlType="submit"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button
                  icon={<SaveOutlined />}
                  type="primary"
                  htmlType="submit"
                >
                  Save
                </Button>
              </Flex>
            </>
          )}
        </Form>
      </Card>
      <Modal
        title="Import Data: Choose one of your menu"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        footer={null}
      >
        <Form
          layout="vertical"
          form={modalForm}
          onFinish={handleOk}
          initialValues={{
            is_active: true,
          }}
        >
          <Form.Item
            label="Name"
            name="menu_name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input
              variant={detail ? "filled" : "outlined"}
              disabled={isDisabled}
            />
          </Form.Item>
          <Form.Item
            label="Menu"
            name="menu_id"
            rules={[{ required: true, message: "Please choose menu id" }]}
          >
            <Select
              value={menuId}
              onChange={handleMenuSelect}
              placeholder="Choose a menu"
              style={{ width: "100%" }}
            >
              <Option key={null} value={null}>
                Choose a menu
              </Option>
              {menuList?.map((menu: Menu) => {
                return (
                  <Option key={menu.id} value={menu.id}>
                    {menu.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Flex justify="end" align="center" gap={10}>
            <Button variant="outlined" htmlType="submit" onClick={handleCancel}>
              Cancel
            </Button>
            <Button icon={<SaveOutlined />} type="primary" htmlType="submit">
              Save
            </Button>
          </Flex>
        </Form>
      </Modal>
    </>
  );
};

export default MenuForm;
