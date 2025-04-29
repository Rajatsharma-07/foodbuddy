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
import { UserData } from "../../../@types/users/user";
import { PATH_ADMIN } from "../../../routes/paths";
import { deleteUser, fetchUserList } from "../../../utils/api/user/admin_user";

const AdminUserList = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [userList, setUserList] = useState<UserData[]>([]);
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
      const response = await fetchUserList({
        page: current,
        limit: pageSize,
        sort_field: sort_field || "updatedAt",
        sort_order: sort_order || "asc",
        filters: searchFilters,
      });
      setUserList(response.data);
      setPagination({
        current,
        pageSize,
      });
      setTotal(response.total);
    } catch (error: any) {
      message.error(error.message || "Failed to fetch users.");
    }
    setLoader(false);
  };

  const handleTableChange: TableProps<UserData>["onChange"] = (
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
    document.title = "Users";
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
      await deleteUser(id);
      message.success("User deleted successfully.");

      await loadData(
        pagination.current,
        pagination.pageSize,
        sorter.field,
        sorter.order,
        filters
      );
    } catch (error: any) {
      messageApi.error(error.message || "Failed to delete user.");
    }
  };

  type DataIndex = keyof UserData;

  const useColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<UserData> & {
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

  const columns: TableColumnsType<UserData> = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: true,
      render: (id: number) => (
        <Link className="primary-link" to={PATH_ADMIN.users.detail(id)}>
          {id}
        </Link>
      ),
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
      title: "First name",
      dataIndex: "first_name",
      sorter: true,
      render: (text: string, user: UserData) => (
        <Tooltip title={text}>
          <Link
            className="primary-link"
            to={PATH_ADMIN.users.detail(user.id)}
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
      ...useColumnSearchProps("first_name"),
    },
    {
      title: "Last name",
      sorter: true,
      dataIndex: "last_name",
      ...useColumnSearchProps("last_name"),
    },
    {
      title: "Email",
      sorter: true,
      dataIndex: "email",
      ...useColumnSearchProps("email"),
    },
    {
      title: "Superuser status",
      dataIndex: "is_superuser",
      render: (is_superuser: boolean) =>
        is_superuser ? (
          <CheckCircleOutlined style={{ color: "rgb(0, 200, 0)" }} />
        ) : (
          <CloseCircleOutlined style={{ color: "rgb(255, 0, 0)" }} />
        ),
    },
    {
      title: "Role",
      dataIndex: "role",
      sorter: true,
      render: (role: { name: string }) => (
        <Typography style={{ textTransform: "capitalize" }}>
          {role?.name}
        </Typography>
      ),
    },
    {
      title: "Restaurant",
      dataIndex: "restaurant",
      sorter: true,
      render: (restaurant: { name: string } | null) => (
        <Tooltip title={restaurant?.name || ""}>
          <Typography
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "inline-block",
              maxWidth: 150,
            }}
          >
            {restaurant?.name || ""}
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
      render: (text: any, user: UserData) => (
        <Flex justify="space-evenly">
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => navigate(PATH_ADMIN.users.edit(user.id))}
          >
            Edit
          </Button>
          <Popconfirm
            cancelText="No"
            description="Are you sure to delete this user?"
            disabled={!user.is_active}
            okText="Yes"
            placement="topLeft"
            title="Delete the user"
            onConfirm={() => handleDelete(user.id)}
          >
            <Button
              size="small"
              color="danger"
              variant="outlined"
              disabled={!user.is_active}
              icon={<DeleteOutlined />}
            >
              Delete
            </Button>
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  const rowSelection: TableProps<UserData>["rowSelection"] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: UserData[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record: UserData) => ({
      disabled: record.first_name === "Disabled User",
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
        <h2>Users</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate(PATH_ADMIN.users.new)}
        >
          Add new user
        </Button>
      </Flex>
      <Table<UserData>
        columns={columns}
        dataSource={userList}
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

export default AdminUserList;
