import React from "react";
import UsersHeader from "./UsersHeader";
import UsersTable from "./UsersTable";
import reducer from "../store/reducers";
import { FusePageCarded } from "@fuse";
import withReducer from "app/store/withReducer";

const Users = () => {
  return (
    <FusePageCarded
      classes={{
        content: "flex",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={<UsersHeader />}
      content={<UsersTable />}
      innerScroll
    />
  );
};

export default withReducer("userManagementApp", reducer)(Users);
