import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Flex,
  Image,
  message,
  Popconfirm,
  Row,
  Select,
  Spin,
  Tooltip,
  Typography,
} from "antd";
import Link from "antd/es/typography/Link";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuCategory } from "../../../@types/menu-categories/menu-category";
import { MenuItem } from "../../../@types/menu-item/menu-item";
import { PATHS } from "../../../routes/paths";
import { fetchMenuCategoryList } from "../../../utils/api/menu-categories/menu-categories";
import {
  deleteMenuItem,
  fetchMenuItemList,
} from "../../../utils/api/menu-items/menu-items";
import { FOOD_TYPE, FOOD_TYPE_LABEL } from "../../../utils/constants/constants";
import FoodTypeIcon from "../../common/food-type-icon";

const { Title, Text } = Typography;

const { Option } = Select;

const MenuItems = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [menuItemList, setMenuItemList] = useState<MenuItem[]>([]);
  const [categoryList, setCategoryList] = useState<MenuCategory[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [foodTypeFilter, setFoodTypeFilter] = useState<FOOD_TYPE | null>(null);
  const [loader, setLoader] = useState<boolean>(false);

  const loadData = async (
    category: string | null = categoryFilter || null,
    foodType: FOOD_TYPE | null = foodTypeFilter || null
  ) => {
    setLoader(true);
    try {
      const response = await fetchMenuItemList({
        category,
        foodType,
      });
      const categories = await fetchMenuCategoryList({});
      setMenuItemList(response.data);
      setCategoryList(categories.data);
    } catch (error: any) {
      message.error(error.message || "Failed to fetch menu itemss.");
    }
    setLoader(false);
  };

  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Menu Items";
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteMenuItem(id);
      message.success("Menu item deleted successfully.");

      await loadData();
    } catch (error: any) {
      messageApi.error(error.message || "Failed to delete menu item.");
    }
  };

  const handleCategoryChange = async (value: string) => {
    setCategoryFilter(value);
    await loadData(value);
  };

  const handleFoodTypeChange = async (value: FOOD_TYPE) => {
    setFoodTypeFilter(value);
    await loadData(categoryFilter, value);
  };

  return (
    <>
      {contextHolder}
      {loader ? (
        <Spin />
      ) : (
        <>
          <Flex justify="space-between" align="center">
            <h2>Menu Item</h2>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate(PATHS.menu_items.new)}
            >
              Add new menu item
            </Button>
          </Flex>
          <Flex justify="start" align="center" gap={10} style={{ marginBottom: "16px" }}>
            <Select
              placeholder="Choose category"
              value={categoryFilter}
              onChange={handleCategoryChange}
            >
              <Option key={null} value={null}>
                All Categories
              </Option>
              {categoryList?.map((category: MenuCategory) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>

            <Select
              placeholder="Choose food type"
              value={foodTypeFilter}
              onChange={handleFoodTypeChange}
            >
              <Option key={null} value={null}>
                All Food Types
              </Option>
              {Object.values(FOOD_TYPE).map((foodType: FOOD_TYPE) => (
                <Option key={foodType} value={foodType}>
                  <Flex justify="start" align="center" gap={5}>
                    <FoodTypeIcon type={foodType} />
                    <Text>{FOOD_TYPE_LABEL[foodType]}</Text>
                  </Flex>
                </Option>
              ))}
            </Select>
          </Flex>
          <Row gutter={16}>
            {menuItemList?.map((item: MenuItem) => {
              const src = `${process.env.REACT_APP_BACKEND_API_PATH}/uploads/menu-items/${item.image_path}`;
              return (
                <Col span={6} key={item.id} style={{ marginTop: 10 }}>
                  <Card
                    key={item.id}
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
                      alt={item.name}
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
                          <Link href={PATHS.menu_items.detail(item.id)}>
                            <Title
                              level={4}
                              style={{ margin: 0, marginTop: 10 }}
                            >
                              {item.name}
                            </Title>
                            <Flex justify="start" align="center" gap={5}>
                              <FoodTypeIcon type={item.food_type} />
                              <Text type="danger">{`(${item.category?.name})`}</Text>
                            </Flex>
                          </Link>
                        </Flex>
                        <Flex justify="space-between" align="center" gap={20}>
                          <EditOutlined
                            style={{
                              fontSize: "17px",
                              color: "var(--primary-color)",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              navigate(PATHS.menu_items.edit(item.id))
                            }
                          />
                          <Popconfirm
                            title="Delete the menu item"
                            description="Are you sure to delete this menu item?"
                            onConfirm={() => handleDelete(item.id)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <DeleteOutlined
                              style={{
                                fontSize: "17px",
                                color: "var(--primary-color)",
                                cursor: "pointer",
                              }}
                            />
                          </Popconfirm>
                        </Flex>
                      </Flex>

                      <Tooltip title={item.description}>
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
                          {item.description}
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
                        {`₹ ${item.default_price}`}
                      </Title>
                    </Flex>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </>
  );
};

export default MenuItems;
