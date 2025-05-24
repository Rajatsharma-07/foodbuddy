import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined
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
  Typography
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Pagination, Sorter } from "../../../@types/common/common";
import { MenuCategory } from "../../../@types/menu-categories/menu-category";
import { PATHS } from "../../../routes/paths";
import { deleteMenuCategory, fetchMenuCategoryList } from "../../../utils/api/menu-categories/menu-categories";
  
  const MenuCategories = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [menuCategoryList, setMenuCategoryList] = useState<MenuCategory[]>([]);
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
        const response = await fetchMenuCategoryList({
          page: current,
          limit: pageSize,
          sort_field: sort_field || "updatedAt",
          sort_order: sort_order || "asc",
          filters: searchFilters,
        });
        setMenuCategoryList(response.data);
        setPagination({
          current,
          pageSize,
        });
        setTotal(response.total);
      } catch (error: any) {
        message.error(error.message || "Failed to fetch menu category.");
      }
      setLoader(false);
    };
  
    const handleTableChange: TableProps<MenuCategory>["onChange"] = (
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
      document.title = "Menu Category";
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
        await deleteMenuCategory(id);
        message.success("Menu Category deleted successfully.");
  
        await loadData(
          pagination.current,
          pagination.pageSize,
          sorter.field,
          sorter.order,
          filters
        );
      } catch (error: any) {
        messageApi.error(error.message || "Failed to delete menu category.");
      }
    };
  
    type DataIndex = keyof MenuCategory;
  
    const useColumnSearchProps = (
      dataIndex: DataIndex
    ): TableColumnType<MenuCategory> & {
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
  
    const columns: TableColumnsType<MenuCategory> = [
      {
        title: "ID",
        dataIndex: "id",
        sorter: true,
        render: (id: number) => <Link className="primary-link" to={PATHS.menu_categories.detail(id)}>{id}</Link>,
        ...useColumnSearchProps("id"),
      },
      {
        title: "Name",
        dataIndex: "name",
        sorter: true,
        render: (text: string, menu_category: MenuCategory) => (
          <Tooltip title={text}>
            <Link
              className="primary-link"
              to={PATHS.menu_categories.detail(menu_category.id)}
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
        title: "Restaurant",
        dataIndex: "restaurant",
        sorter: true,
        render: (text: string, menu_category: MenuCategory) => (
          <Tooltip title={text}>
            <Typography
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "inline-block",
                maxWidth: 150,
              }}
            >
              {menu_category?.restaurant?.name}
            </Typography>
          </Tooltip>
        ),
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
        render: (text: any, menu_category: MenuCategory) => (
          <Flex justify="space-evenly">
            <Button
              size="small"
              icon={<EditOutlined />}
              onClick={() => navigate(PATHS.menu_categories.edit(menu_category.id))}
            >
              Edit
            </Button>
            <Popconfirm
              cancelText="No"
              description="Are you sure to delete this menu category?"
              okText="Yes"
              placement="topLeft"
              title="Delete the menu category?"
              onConfirm={() => handleDelete(menu_category.id)}
            >
              <Button
                size="small"
                icon={<DeleteOutlined />}
              >
                Delete
              </Button>
            </Popconfirm>
          </Flex>
        ),
      },
    ];
  
    const rowSelection: TableProps<MenuCategory>["rowSelection"] = {
      onChange: (selectedRowKeys: React.Key[], selectedRows: MenuCategory[]) => {
      },
      getCheckboxProps: (record: MenuCategory) => ({
        disabled: record.name === "Disabled Menu Category",
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
          <h2>Menu Category</h2>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate(PATHS.menu_categories.new)}
          >
            Add new menu category
          </Button>
        </Flex>
        <Table<MenuCategory>
          columns={columns}
          dataSource={menuCategoryList}
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
  
  export default MenuCategories;
  