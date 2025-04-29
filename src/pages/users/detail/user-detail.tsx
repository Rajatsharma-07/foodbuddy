import React, { useEffect, useState } from "react";
import { retrieveUser } from "../../../utils/api/user/admin_user";
import { useParams } from "react-router-dom";
import UserForm from "../common/user-form";
import { message } from "antd";
const UserDetail = () => {
  const [userData, setUserData] = useState<any>({});
  const { id } = useParams<{ id: string }>();
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    document.title = "User Detail";
    const fetchUserData = async () => {
      try {
        const response = id && (await retrieveUser(Number(id)));
        if (response.data) {
          setUserData(response.data);
        }
      } catch (error: any) {
        messageApi.error(error.message);
      }
    };
    fetchUserData();
  }, [id]);

  return (
    <>
      {contextHolder}
      <UserForm add={false} detail={true} edit={false} user_data={userData} />
    </>
  );
};

export default UserDetail;
