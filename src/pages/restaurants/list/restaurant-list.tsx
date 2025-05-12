import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import {
    Button,
    Flex,
    Input,
    InputRef,
    message,
    Popconfirm,
    Space,
    Table,
    TableColumnsType,
    TableColumnType,
    TableProps,
    Tooltip,
    Typography,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Pagination, Sorter } from "../../../@types/common/common";
import { Restaurant } from "../../../@types/restaurants/restaurant";
import { PATH_ADMIN } from "../../../routes/paths";
import { deleteRestaurant, fetchRestaurantList } from "../../../utils/api/restaurant/restaurant";
  
  const Restaurants = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [restaurantList, setRestaurantList] = useState<Restaurant[]>([]);
    const [loader, setLoader] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(0);
    const [pagination, setPagination] = useState<Pagination>({
      current: 1,
      pageSize: 10,
    });
    const [sorter, setSorter] = useState<Sorter>({
      field: "updatedAt",
      order: "asc",
    });
  
    const [filters, setFilters] = useState<Record<string, string>>({});
  
    const loadData = async (
      current: number = pagination.current || 1,
      pageSize: number = pagination.pageSize || 10,
      sort_field?: string,
      sort_order?: string,
      searchFilters: Record<string, string> = filters
    ) => {
      setLoader(true);
      try {
        const response = await fetchRestaurantList({
          page: current,
          limit: pageSize,
          sort_field: sort_field || "updatedAt",
          sort_order: sort_order || "asc",
          filters: searchFilters,
        });
        setRestaurantList(response.data);
        setPagination({
          current,
          pageSize,
        });
        setTotal(response.total);
      } catch (error: any) {
        message.error(error.message || "Failed to fetch restaurants.");
      }
      setLoader(false);
    };
  
    const handleTableChange: TableProps<Restaurant>["onChange"] = (
      newPagination,
      antdFilters,
      sorterInfo
    ) => {
      const { current, pageSize } = newPagination;
      setPagination({ current, pageSize });
  
      if (sorterInfo) {
        const sorter = Array.isArray(sorterInfo) ? sorterInfo[0] : sorterInfo;
        const sortField = (sorter as any)?.field;
        const sortOrder = (sorter as any)?.order;
  
        if (sortField && sortOrder) {
          setSorter({
            field: sortField,
            order: sortOrder === "ascend" ? "asc" : "desc",
          });
        }
      } else {
        setSorter({ field: "updatedAt", order: "asc" });
      }
  
      const processedFilters: Record<string, string> = {};
      for (const key in antdFilters) {
        const filterValue = antdFilters[key];
        if (Array.isArray(filterValue)) {
          processedFilters[key] = filterValue[0] as string;
        }
      }
      setFilters(processedFilters);
    };
  
    const navigate = useNavigate();
    useEffect(() => {
      document.title = "Restaurants";
    }, []);
  
    useEffect(() => {
      loadData(
        pagination.current,
        pagination.pageSize,
        sorter.field,
        sorter.order,
        filters
      );
    }, [
      filters,
      pagination.current,
      pagination.pageSize,
      sorter.field,
      sorter.order,
    ]);
  
    const handleDelete = async (id: number) => {
      try {
        await deleteRestaurant(id);
        message.success("Restaurant deleted successfully.");
  
        await loadData(
          pagination.current,
          pagination.pageSize,
          sorter.field,
          sorter.order,
          filters
        );
      } catch (error: any) {
        messageApi.error(error.message || "Failed to delete restaurant.");
      }
    };
  
    type DataIndex = keyof Restaurant;
  
    const useColumnSearchProps = (
      dataIndex: DataIndex
    ): TableColumnType<Restaurant> & {
      onFilterDropdownOpenChange?: (visible: boolean) => void;
    } => {
      const searchInput = useRef<InputRef>(null);
  
      return {
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
          close,
        }) => {
          return (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
              <Input
                ref={searchInput}
                placeholder={`Search ${String(dataIndex)}`}
                value={selectedKeys[0] || ""}
                onChange={(e) =>
                  setSelectedKeys(e.target.value ? [e.target.value] : [])
                }
                onPressEnter={() => {
                  confirm();
                  close();
                }}
                style={{ marginBottom: 8, display: "block" }}
              />
              <Space>
                <Button
                  type="primary"
                  onClick={() => {
                    confirm();
                    close();
                  }}
                  icon={<SearchOutlined />}
                  size="small"
                  style={{ width: 90 }}
                >
                  Search
                </Button>
                <Button
                  onClick={() => {
                    if (clearFilters) {
                      clearFilters();
  
                      confirm({ closeDropdown: false });
  
                      const newFilters = { ...filters };
                      delete newFilters[dataIndex];
                      setFilters(newFilters);
                    }
  
                    setSelectedKeys([]);
  
                    close();
                  }}
                  size="small"
                  style={{ width: 90 }}
                >
                  Reset
                </Button>
              </Space>
            </div>
          );
        },
        filterIcon: (filtered: boolean) => (
          <SearchOutlined style={{ color: filtered ? "var(--primary-color)" : undefined }} />
        ),
        onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
      };
    };
  
    const columns: TableColumnsType<Restaurant> = [
      {
        title: "ID",
        dataIndex: "id",
        sorter: true,
        render: (id: number) => <Link className="primary-link" to={PATH_ADMIN.restaurants.detail(id)}>{id}</Link>,
        ...useColumnSearchProps("id"),
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
        title: "name",
        dataIndex: "name",
        sorter: true,
        render: (text: string, restaurant: Restaurant) => (
          <Tooltip title={text}>
            <Link
              className="primary-link"
              to={PATH_ADMIN.restaurants.detail(restaurant.id)}
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
        ),
        ...useColumnSearchProps("name"),
      },
      {
        title: "Address",
        sorter: true,
        dataIndex: "address",
        ...useColumnSearchProps("address"),
      },
      {
        title: "City",
        sorter: true,
        dataIndex: "city",
        ...useColumnSearchProps("city"),
      },
      {
        title: "State",
        sorter: true,
        dataIndex: "state",
        ...useColumnSearchProps("state"),
      },
      {
        title: "Country",
        dataIndex: "country",
        sorter: true,
        ...useColumnSearchProps("country"),
      },

      {
        title: "Pincode",
        dataIndex: "pincode",
        sorter: true,
        ...useColumnSearchProps("pincode"),
      },
      {
        title: "Last updated",
        dataIndex: "updatedAt",
        sorter: true,
        defaultSortOrder: "ascend",
        render: (date: string) => (
          <Typography>{new Date(date).toLocaleDateString()}</Typography>
        ),
      },
      {
        title: "Actions",
        dataIndex: "actions",
        render: (text: any, restaurant: Restaurant) => (
          <Flex justify="space-evenly">
            <Button
              size="small"
              icon={<EditOutlined />}
              onClick={() => navigate(PATH_ADMIN.restaurants.edit(restaurant.id))}
            >
              Edit
            </Button>
            <Popconfirm
              cancelText="No"
              description="Are you sure to delete this restaurant?"
              disabled={!restaurant.is_active}
              okText="Yes"
              placement="topLeft"
              title="Delete the restaurant?"
              onConfirm={() => handleDelete(restaurant.id)}
            >
              <Button
                size="small"
                disabled={!restaurant.is_active}
                icon={<DeleteOutlined />}
              >
                Delete
              </Button>
            </Popconfirm>
          </Flex>
        ),
      },
    ];
  
    const rowSelection: TableProps<Restaurant>["rowSelection"] = {
      onChange: (selectedRowKeys: React.Key[], selectedRows: Restaurant[]) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
      },
      getCheckboxProps: (record: Restaurant) => ({
        disabled: record.name === "Disabled Restaurant",
      }),
    };
  
    return (
      <>
        {contextHolder} {/* For message API */}
        <Flex
          justify="space-between"
          align="center"
          style={{ marginBottom: "16px" }}
        >
          <h2>Restaurants</h2>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate(PATH_ADMIN.restaurants.new)}
          >
            Add new restaurant
          </Button>
        </Flex>
        <Table<Restaurant>
          columns={columns}
          dataSource={restaurantList}
          loading={loader}
          rowKey="id"
          size="small"
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 50],
            total: total,
          }}
          onChange={handleTableChange}
          sortDirections={["ascend", "descend"]}
        />
      </>
    );
  };
  
  export default Restaurants;
  