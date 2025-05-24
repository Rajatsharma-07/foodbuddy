import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import TableForm from "../common/table-form";

const AddNewTable = () => {
  useEffect(() => {
    document.title = "Add New Table";
  }, []);

  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  return (
    <>
      <TableForm
        add={true}
        detail={false}
        edit={false}
      />
    </>
  );
};

export default AddNewTable;
