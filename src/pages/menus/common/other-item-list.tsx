import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Table, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MenuItem } from "../../../@types/menu-item/menu-item";
import { PATHS } from "../../../routes/paths";

import {
  Image,
  InputNumber,
  TableColumnsType,
  TableProps,
  Tooltip,
} from "antd";
import { MessageInstance } from "antd/es/message/interface";
import { Pagination } from "../../../@types/common/common";
import { MenuItemJunction } from "../../../@types/menu-item-junction/menu-item-junction";
import { fetchMenuItemList } from "../../../utils/api/menu-items/menu-items";

type Props = {
  messageApi: MessageInstance;
  priceObject: any;
  setPriceObject: any;
  menuItemData: any;
  setMenuItemData: any;
  addedMenuItems: MenuItemJunction[];
  categoryFilter: string | null;
};

const { Text } = Typography;

const OtherItemsList = ({
  messageApi,
  priceObject,
  setPriceObject,
  menuItemData,
  setMenuItemData,
  addedMenuItems,
  categoryFilter,
}: Props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<MenuItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const navigate = useNavigate();
  const [pagination, setPagination] = useState<Pagination>({
    current: 1,
    pageSize: 10,
  });

  useEffect(() => {
    const fetchMenuItems = async () => {
      setLoader(true);
      try {
        const not_in_array = addedMenuItems?.map((item: MenuItemJunction) => {
          return item.menu_item_id;
        });
        const response: any = await fetchMenuItemList({
          category: categoryFilter || null,
          page: pagination.current || 1,
          limit: pagination.pageSize || 10,
          not_in_array,
        });
        if (response) {
          setMenuItems(response.data);
          setPagination({
            current: pagination.current || 1,
            pageSize: pagination.pageSize || 10,
          });
          setTotal(response.total);
          let price: any = { ...priceObject };
          response.data.forEach((item: MenuItem) => {
            price[item.id] = item.default_price;
          });
          setPriceObject(price);
        }
      } catch (error: any) {
        messageApi.error(error.message);
      }
      setLoader(false);
    };
    fetchMenuItems();
  }, [categoryFilter]);

  const handlePriceChange = useCallback(
    (item_id: number, price: number) => {
      const newPriceObject = { ...priceObject, [item_id]: price };
      setPriceObject(newPriceObject);

      setMenuItemData((prevData: any) => {
        const newData = JSON.parse(JSON.stringify(prevData));
        const index = newData.findIndex(
          (item: any) => item.menu_item_id === item_id
        );

        if (index >= 0) {
          newData[index] = {
            ...newData[index],
            price: price,
          };
        } else {
          newData.push({
            menu_item_id: item_id,
            price: price,
          });
        }

        return newData;
      });
    },
    [priceObject, setPriceObject, setMenuItemData]
  );

  const columns: TableColumnsType<MenuItem> = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id: number) => (
        <Link className="primary-link" to={PATHS.menu_items.detail(id)}>
          {id}
        </Link>
      ),
    },
    {
      title: "Active",
      dataIndex: "is_active",
      render: (is_active: boolean) =>
        is_active ? (
          <CheckCircleOutlined style={{ color: "rgb(0, 200, 0)" }} />
        ) : (
          <CloseCircleOutlined style={{ color: "rgb(255, 0, 0)" }} />
        ),
    },
    {
      title: "Available",
      dataIndex: "is_available",
      render: (is_available: boolean) =>
        is_available ? (
          <CheckCircleOutlined style={{ color: "rgb(0, 200, 0)" }} />
        ) : (
          <CloseCircleOutlined style={{ color: "rgb(255, 0, 0)" }} />
        ),
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text: string, menu_item: MenuItem) => (
        <>
          <Image
            src={`${process.env.REACT_APP_BACKEND_API_PATH}/uploads/menu-items/${menu_item.image_path}`}
            style={{ width: 50, height: 40, marginRight: 8 }}
          />
          <Tooltip title={text}>
            <Link
              className="primary-link"
              to={PATHS.menu_items.detail(menu_item.id)}
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "inline-block",
                maxWidth: 150,
              }}
            >
              {text}
            </Link>
          </Tooltip>
        </>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (category: any) => <Text>{category.name}</Text>,
    },
    {
      title: "Price",
      dataIndex: "default_price",
      render: (price: number, menu_item: MenuItem) => (
        <InputNumber
          value={priceObject[menu_item.id]}
          name="price"
          onChange={(value) => handlePriceChange(menu_item?.id, value)}
        />
      ),
    },
  ];

  const rowSelection: TableProps<MenuItem>["rowSelection"] = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: MenuItem[]) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRows(selectedRows);

      setMenuItemData((prevData: any) => {
        const prevDataMap = new Map(
          prevData.map((item: any) => [item.menu_item_id, item])
        );

        // Keep all previously added items
        const updatedData = [...prevData];

        selectedRows.forEach((row) => {
          const existing = prevDataMap.get(row.id);
          if (!existing) {
            updatedData.push({
              menu_item_id: row.id,
              price: priceObject[row.id] || row.default_price,
            });
          }
        });

        return updatedData;
      });
    },
  };

  const handleTableChange: TableProps<MenuItem>["onChange"] = (
    newPagination
  ) => {
    const { current, pageSize } = newPagination;
    setPagination({ current, pageSize });
  };

  return (
    <Table<MenuItem>
      columns={columns}
      dataSource={menuItems}
      loading={loader}
      rowKey="id"
      size="small"
      rowSelection={{ type: "checkbox", ...rowSelection }}
      sortDirections={["ascend", "descend"]}
      style={{ marginBottom: 10 }}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        showSizeChanger: true,
        pageSizeOptions: [10, 20, 50],
        total: total,
      }}
      onChange={handleTableChange}
    />
  );
};

export default OtherItemsList;
