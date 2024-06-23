import type { FC, ReactElement } from "react";

import { useState } from "react";

import { useAppDispatch } from "../../redux/hook";
import { addUser } from "../../redux/user/user.actions";

import type { UserData } from "../../redux/user/user.models";

import { Box, TextField, Button } from "@mui/material";

const InitialUserDataState: UserData = {
  name: "",
  email: "",
  age: "",
};

const FormComponent: FC = (): ReactElement => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<UserData>(InitialUserDataState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(
      addUser({ ...formData, age: Number(formData.age) }, () =>
        setFormData(InitialUserDataState),
      ),
    );
  };

  const handleViewEmailSentClick = () => {
    window.open(
      process.env.REACT_APP_EMAIL_BASE_URL ?? "http://localhost:8081/",
      "_blank",
    );
  };

  return (
    <Box
      component="form"
      noValidate
      sx={{
        boxShadow: 3,
        display: "flex",
        justifyContent: "center",
        padding: 5,
        marginTop: 5,
        marginLeft: 30,
        marginRight: 30,
      }}
    >
      <Box>
        <TextField
          sx={{ marginBottom: 3 }}
          variant="outlined"
          fullWidth
          label="user email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <TextField
          sx={{ marginBottom: 3 }}
          variant="outlined"
          fullWidth
          label="user name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <TextField
          sx={{ marginBottom: 3 }}
          variant="outlined"
          fullWidth
          label="user age"
          type="number"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" color="primary" onClick={handleAddClick}>
            Add
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleViewEmailSentClick}
          >
            View Email Sent
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FormComponent;
