import type { FC, ReactElement } from "react";

import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  editUser,
  deleteUser,
  deleteSelectedUsers,
  getAllUsers,
  toggleSelected,
} from "../../redux/user/user.actions";

import { config, CellType } from "../../utils/table/config";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  TextField,
  Button,
  IconButton,
  Checkbox,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import type { UserData, UserForm } from "../../redux/user/user.models";
const InitialUserDataState: UserData = {
  name: "",
  age: "",
  active: true,
};

const TableComponent: FC = (): ReactElement => {
  const dispatch = useAppDispatch();

  const [editTableRow, setTableEditRow] = useState<string>("");
  const [editData, setEditData] = useState<UserData>(InitialUserDataState);

  const userList = useAppSelector((state) => state.user.userList);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDeleteSelected = () => {
    const ids: string[] = userList
      .filter((user) => user.selected === true)
      .map((user) => user.id!);
    if (!!ids.length) {
      dispatch(deleteSelectedUsers(ids));
      setTableEditRow("");
    }
  };

  const handleDelete = (id: string) => () => {
    dispatch(deleteUser(id));
    setTableEditRow("");
  };

  const handleToggleSelected = (id: string) => () => {
    dispatch(toggleSelected(id));
  };

  const handleEnableEdit = (user: UserForm) => () => {
    setTableEditRow(user.id!);
    setEditData({
      name: user.name,
      age: String(user.age),
      active: user.active,
    });
  };

  const handleSaveEdit = (id: string) => () => {
    dispatch(editUser({ ...editData, id, age: Number(editData.age) }));
    setTableEditRow("");
  };

  const handleEditOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData((prev) => {
      if (e.target.name === "active") {
        return {
          ...prev,
          active: !prev.active,
        };
      }

      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <Box
      sx={{
        boxShadow: 3,
        display: "flex",
        justifyContent: "center",
        marginTop: 5,
        marginLeft: 30,
        marginRight: 30,
      }}
    >
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {config.map(({ key, label }, i) => (
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    width: key === "name" || key === "age" ? "20%" : undefined,
                  }}
                  key={`${i}_${key}`}
                >
                  {label === "" ? (
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      type="button"
                      onClick={handleDeleteSelected}
                    >
                      Delete
                    </Button>
                  ) : (
                    label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(!userList.length && (
              <TableRow>
                <TableCell align="center" colSpan={config.length}>
                  NO DATA
                </TableCell>
              </TableRow>
            )) || (
              <>
                {userList.map((row, i) => (
                  <TableRow key={`${row.id}_${i}`}>
                    {config.map(({ key, type }, j) => {
                      let value: any = row[key];
                      switch (type) {
                        case CellType.Label:
                          if (editTableRow === row.id && key === "name") {
                            value = (
                              <TextField
                                variant="outlined"
                                fullWidth
                                type="text"
                                name="name"
                                value={editData.name}
                                onChange={handleEditOnChange}
                              />
                            );
                          } else if (editTableRow === row.id && key === "age") {
                            value = (
                              <TextField
                                variant="outlined"
                                fullWidth
                                type="number"
                                name="age"
                                value={editData.age}
                                onChange={handleEditOnChange}
                              />
                            );
                          }
                          break;
                        case CellType.Bool:
                          if (editTableRow === row.id && key === "active") {
                            value = (
                              <Checkbox
                                name="active"
                                checked={editData.active}
                                onChange={handleEditOnChange}
                              />
                            );
                          } else {
                            value = value ? (
                              <CheckIcon sx={{ color: "green" }} />
                            ) : (
                              <CloseIcon sx={{ color: "red" }} />
                            );
                          }
                          break;
                        case CellType.Delete:
                          value = (
                            <IconButton onClick={handleDelete(row.id!)}>
                              <DeleteIcon />
                            </IconButton>
                          );
                          break;
                        case CellType.DeleteSelect:
                          value = (
                            <Checkbox
                              name={`${row.id}_${j}_checkbox`}
                              checked={row.selected}
                              onChange={handleToggleSelected(row.id!)}
                            />
                          );
                          break;
                        case CellType.Edit:
                          if (editTableRow === "") {
                            value = (
                              <IconButton onClick={handleEnableEdit(row)}>
                                <EditIcon />
                              </IconButton>
                            );
                          } else if (editTableRow === row.id) {
                            value = (
                              <IconButton onClick={handleSaveEdit(row.id!)}>
                                <SaveIcon />
                              </IconButton>
                            );
                          } else {
                            value = (
                              <IconButton
                                disabled
                                onClick={handleEnableEdit(row)}
                              >
                                <EditIcon />
                              </IconButton>
                            );
                          }
                          break;
                      }
                      return (
                        <TableCell key={`${row.id}_${j}_${key}`}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableComponent;
