import React, { useEffect } from "react";
import AdminUserForm from "../common/admin-user-form";

const AdminAddNewUser = () => {
    useEffect(() => {
        document.title = "Add New User";
    }, []);
    return (
        <>
        <AdminUserForm add={true} detail={false} edit={false}/>
        </>
    );
}

export default AdminAddNewUser;