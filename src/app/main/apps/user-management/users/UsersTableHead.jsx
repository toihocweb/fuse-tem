import React, { useState } from "react";
import {
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  Icon,
  Menu,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  TableSortLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";

const rows = [
  {
    id: "photo",
    align: "left",
    disablePadding: true,
    label: "",
    sort: false,
  },
  {
    id: "displayName",
    align: "left",
    disablePadding: false,
    label: "Name",
    sort: true,
  },
  {
    id: "email",
    align: "left",
    disablePadding: false,
    label: "Email",
    sort: true,
  },
  {
    id: "role",
    align: "left",
    disablePadding: false,
    label: "Role",
    sort: false,
  },
];

const useStyles = makeStyles((theme) => ({
  actionsButtonWrapper: {
    background: theme.palette.background.paper,
  },
}));

const UsersTableHead = (props) => {
  const classes = useStyles(props);
  // enable the menu when there is selected user(s)
  const [selectedUsersMenu, setSelectedUsersMenu] = useState(null);

  const openSelectedUsersMenu = (event) => {
    setSelectedUsersMenu(event.currentTarget);
  };

  const closeSelectedUserMenu = () => {
    setSelectedUsersMenu(null);
  };

  return (
    <TableHead>
      <TableRow className="h-64">
        <TableCell padding="checkbox" className="relative pl-4 sm:pl-12">
          <Checkbox
            indeterminate={
              props.numSelected > 0 && props.numSelected < props.rowCount
            }
            checked={props.numSelected === props.rowCount}
            onChange={props.onSelectAllClick}
          />
          {props.numSelected > 0 && (
            <div
              className={clsx(
                "flex items-center justify-center absolute w-64 top-0 left-0 ml-68 h-64 z-10",
                classes.actionsButtonWrapper
              )}
            >
              <IconButton
                aria-owns={selectedUsersMenu ? "selectedUsersMenu" : null}
                aria-haspopup="true"
                onClick={openSelectedUsersMenu}
              >
                <Icon>more_horiz</Icon>
              </IconButton>
              <Menu
                id="selectedUsersMenu"
                anchorEl={selectedUsersMenu}
                open={Boolean(selectedUsersMenu)}
                onClose={closeSelectedUserMenu}
              >
                <MenuList>
                  <MenuItem onClick={closeSelectedUserMenu}>
                    <ListItemIcon className="min-w-40">
                      <Icon>delete</Icon>
                    </ListItemIcon>
                    <ListItemText primary="Remove" />
                  </MenuItem>
                  <MenuItem onClick={closeSelectedUserMenu}>
                    <ListItemIcon className="min-w-40">
                      <Icon>edit</Icon>
                    </ListItemIcon>
                    <ListItemText primary="Edit" />
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          )}
        </TableCell>
        {rows.map((row) => (
          <TableCell
            key={row.id}
            align={row.align}
            padding={row.disablePadding ? "none" : "default"}
            sortDirection={
              props.order.id === row.id ? props.order.direction : false
            }
          >
            {row.sort ? (
              <Tooltip
                title="Sort"
                placement={
                  row.align === "right" ? "bottom-end" : "bottom-start"
                }
                enterDelay={100}
              >
                <TableSortLabel
                  active={props.order.id === row.id}
                  direction={props.order.direction}
                  onClick={(event) => props.onPropertySort(event, row.id)}
                >
                  {row.label}
                </TableSortLabel>
              </Tooltip>
            ) : (
              row.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default UsersTableHead;
