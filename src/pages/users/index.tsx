import React, { useEffect, useState } from "react";
import { fetchUserList } from "../../utils/api/user/user";
import { message } from "antd";
const Users = () => {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const response = await fetchUserList();
        setUserList(response.data);
      } catch (error: any) {
        message.error(error);
      }
    };

    getRestaurants();
  }, []);
  return (
    <>
      <h1>Users: Coming Soon...</h1>
      <h2> Stay Tuned! Good things take time.</h2>
      <ul>
        {userList.map((user: any) => (
            <li key={user.id}>{JSON.stringify(user)}</li>
        ))}
      </ul>
    </>
  );
};

export default Users;
