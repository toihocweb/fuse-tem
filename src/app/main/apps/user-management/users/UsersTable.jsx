import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  TablePagination,
} from "@material-ui/core";
import UsersTableHead from "./UsersTableHead";
import { FuseScrollbars } from "@fuse";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import _ from "@lodash";
import { withRouter } from "react-router-dom";

const UsersTable = (props) => {
  const dispatch = useDispatch();
  const users = useSelector(
    ({ userManagementApp }) => userManagementApp.users.data
  );
  const keyword = useSelector(
    ({ userManagementApp }) => userManagementApp.users.keyword
  );
  const [data, setData] = useState(users);
  // an array of selected user
  const [selected, setSelected] = useState([]);
  // field order(desc, asc) by id
  const [order, setOrder] = useState({
    direction: "asc",
    id: null,
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(actions.getUsers());
  }, [dispatch]);

  useEffect(() => {
    const keywordRegEx = new RegExp("^" + keyword, "gi");
    setData(
      keyword.length
        ? users.filter((user) => user.data.displayName.match(keywordRegEx))
        : users
    );
  }, [users, keyword]);

  console.log(data);
  // select all user on click table head checkbox
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      return setSelected(data.map((user) => user.uuid));
    }
    setSelected([]);
  };

  // change order
  const handlePropertySort = (event, property) => {
    const id = property;
    let direction = "desc";

    // still click on the same property and is desc
    if (order.id === property && order.direction === "desc") {
      direction = "asc";
    }

    setOrder({
      direction,
      id,
    });
  };

  const handleClick = (id) => {
    props.history.push("/apps/user-management/" + id);
  };

  const handleSelect = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    // if user not selected yet => add to selected(s)
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    }
    // unselect user if click again with case: start , end , index
    else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table className="min-w-xl" aria-labelledby="tableTitle">
          <UsersTableHead
            numSelected={selected.length}
            rowCount={data.length}
            order={order}
            onPropertySort={handlePropertySort}
            onSelectAllClick={handleSelectAllClick}
          />
          <TableBody>
            {_.orderBy(data, [(o) => o.data[order.id]], [order.direction])
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => {
                const isSelected = selected.indexOf(user.uuid) !== -1;
                return (
                  <TableRow
                    className="h-64 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={user.uuid}
                    selected={isSelected}
                    onClick={(event) => handleClick(user.uuid)}
                  >
                    <TableCell
                      className="w-48 px-4 sm:px-12"
                      padding="checkbox"
                    >
                      <Checkbox
                        checked={isSelected}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleSelect(event, user.uuid)}
                      />
                    </TableCell>
                    <TableCell
                      className="w-52"
                      component="th"
                      scopr="row"
                      padding="none"
                    >
                      {user.data.photoURL ? (
                        <img
                          className="w-full block rounded-full"
                          src={user.data.photoURL}
                          alt={user.data.displayName}
                        />
                      ) : (
                        <img
                          className="w-full block rounded-full"
                          src="assets/images/avatars/profile.jpg"
                          alt="user-avatar"
                        />
                      )}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {user.data.displayName}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {user.data.email}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {user.role}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleRowsPerPageChange}
      />
    </div>
  );
};

export default withRouter(UsersTable);
