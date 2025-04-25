import { useEffect, useState } from "react";
import UserForm from "../common/user-form";
import { retrieveUser } from "../../../utils/api/user/user";
import { useParams } from "react-router-dom";
import { message } from "antd";

const UserEdit = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [userData, setUserData] = useState<any>({});
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    document.title = "Edit User";
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
      <UserForm add={false} detail={false} edit={true} user_data={userData} />
    </>
  );
};

export default UserEdit;