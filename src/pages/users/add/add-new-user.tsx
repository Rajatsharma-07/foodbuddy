import React, { useEffect } from "react";
import UserForm from "../common/user-form";

const AddNewUser = () => {
    useEffect(() => {
        document.title = "Add New User";
    }, []);
    return (
        <>
        <UserForm add={true} detail={false} edit={false}/>
        </>
    );
}

export default AddNewUser;