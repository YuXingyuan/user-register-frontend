import type { FC, ReactElement } from "react";

import { Box, Alert } from "@mui/material";

type ErrorComponentProps = {
  error: string;
};
const ErrorComponent: FC<ErrorComponentProps> = ({ error }): ReactElement => {
  return (
    <Box sx={{ marginLeft: 30, marginRight: 30 }}>
      <Alert severity="error">{error}</Alert>
    </Box>
  );
};

export default ErrorComponent;
