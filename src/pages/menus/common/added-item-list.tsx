import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PATHS } from "../../../routes/paths";

import {
  Button,
  Flex,
  Image,
  InputNumber,
  TableColumnsType,
  TableProps,
  Tooltip,
  Typography,
} from "antd";
import { MessageInstance } from "antd/es/message/interface";
import { MenuItemJunction } from "../../../@types/menu-item-junction/menu-item-junction";
import { deleteMenuItemJunctionList } from "../../../utils/api/menu-item-junction/menu-item-junction";
import { FOOD_TYPE, FOOD_TYPE_LABEL } from "../../../utils/constants/constants";
import FoodTypeIcon from "../../common/food-type-icon";

type Props = {
  messageApi: MessageInstance;
  priceObject: any;
  setPriceObject: any;
  menuItems: MenuItemJunction[];
  menuItemData: any;
  setMenuItemData: any;
  setFetchAgain: any;
  loader: boolean;
};

const { Text } = Typography;

const AddedItemsList = ({
  messageApi,
  priceObject,
  setPriceObject,
  menuItems,
  menuItemData,
  setMenuItemData,
  setFetchAgain,
  loader,
}: Props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>(
    menuItems.map((item) => item.id)
  );
  const [selectedRows, setSelectedRows] =
    useState<MenuItemJunction[]>(menuItems);
  const { id } = useParams();

  useEffect(() => {
    if (menuItems && menuItems.length > 0) {
      const keys = menuItems.map((item) => item.id);
      setSelectedRowKeys(keys);
      setSelectedRows(menuItems);

      let data = JSON.parse(JSON.stringify(menuItemData));

      menuItems.forEach((row: any) => {
        if (
          menuItemData?.filter(
            (item: any) => item.menu_item_id !== row?.menu_item_id
          )?.length == 0
        ) {
          data.push({
            menu_item_id: row.menu_item_id,
            price: priceObject[row.menu_item_id],
          });
        }
      });
      setMenuItemData(data);
    }
  }, [menuItems, priceObject]);

  const handlePriceChange = (item_id: number, price: number) => {
    setPriceObject({ ...priceObject, [item_id]: price });

    let data = [...menuItemData];
    const menuJunctionData = data.find(
      (item: any) => item.menu_item_id === item_id
    );
    if (menuJunctionData) {
      data.find((item: any) => item.menu_item_id === item_id).price = price;
    }
    setMenuItemData(data);
  };

  const handleDelete = async (menu_item_id: number) => {
    try {
      const response =
        id && (await deleteMenuItemJunctionList(Number(id), [menu_item_id]));
      setFetchAgain(true);
    } catch (error: any) {
      messageApi.error(error.message);
    }
  };

  const columns: TableColumnsType<MenuItemJunction> = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id: number, menu_item_junction: MenuItemJunction) => (
        <Link
          className="primary-link"
          to={PATHS.menu_items.detail(menu_item_junction?.menu_item_id)}
        >
          {menu_item_junction?.menu_item_id}
        </Link>
      ),
    },
    {
      title: "Active",
      dataIndex: "is_active",
      render: (is_active: boolean, menu_item_junction: MenuItemJunction) =>
        menu_item_junction.menu_item.is_active ? (
          <CheckCircleOutlined style={{ color: "rgb(0, 200, 0)" }} />
        ) : (
          <CloseCircleOutlined style={{ color: "rgb(255, 0, 0)" }} />
        ),
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text: string, menu_item_junction: MenuItemJunction) => (
        <>
          <Image
            src={`${process.env.REACT_APP_BACKEND_API_PATH}/uploads/menu-items/${menu_item_junction?.menu_item?.image_path}`}
            style={{ width: 50, height: 40, marginRight: 8 }}
          />
          <Tooltip title={text}>
            <Link
              className="primary-link"
              to={PATHS.menu_items.detail(menu_item_junction?.menu_item_id)}
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "inline-block",
                maxWidth: 150,
              }}
            >
              {menu_item_junction?.menu_item?.name}
            </Link>
          </Tooltip>
        </>
      ),
    },
    {
      title: "Food Type",
      dataIndex: "food_type",
      render: (food_type: FOOD_TYPE, menu_item_junction: MenuItemJunction) => (
        <Flex justify="start" align="center" gap={5}>
          <FoodTypeIcon type={menu_item_junction.menu_item.food_type} />
          <Text>{FOOD_TYPE_LABEL[menu_item_junction.menu_item.food_type]}</Text>
        </Flex>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (category: any, menu_item_junction: MenuItemJunction) => (
        <Text>{menu_item_junction?.menu_item?.category?.name}</Text>
      ),
    },
    {
      title: "Price",
      dataIndex: "default_price",
      defaultSortOrder: "ascend",
      render: (price: number, menu_item_junction: MenuItemJunction) => (
        <InputNumber
          value={priceObject[menu_item_junction.menu_item_id]}
          name="price"
          onChange={(value) =>
            handlePriceChange(menu_item_junction?.menu_item_id, value)
          }
        />
      ),
    },
    {
      title: "Last updated",
      dataIndex: "updatedAt",
      defaultSortOrder: "ascend",
      render: (date: string) => (
        <Typography>{new Date(date).toLocaleDateString()}</Typography>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text: any, menu_item_junction: MenuItemJunction) => (
        <Flex justify="space-evenly">
          <Button
            size="small"
            onClick={() => handleDelete(menu_item_junction?.menu_item_id)}
          >
            Remove item
          </Button>
        </Flex>
      ),
    },
  ];

  const rowSelection: TableProps<MenuItemJunction>["rowSelection"] = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRows(selectedRows);

      const data = selectedRows.map((row: any) => ({
        menu_item_id: row.menu_item_id,
        price: priceObject[row.menu_item_id],
      }));
      setMenuItemData(data);
    },
  };

  return (
    <Table<MenuItemJunction>
      columns={columns}
      dataSource={menuItems}
      loading={loader}
      rowKey="id"
      size="small"
      rowSelection={{ type: "checkbox", ...rowSelection }}
      sortDirections={["ascend", "descend"]}
      pagination={false}
      style={{ marginBottom: 10 }}
    />
  );
};

export default AddedItemsList;
