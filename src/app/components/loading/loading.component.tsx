import type { FC, ReactElement } from "react";

import { Backdrop, CircularProgress } from "@mui/material";

type LoadingComponentProps = {
  open: boolean;
};

const LoadingComponent: FC<LoadingComponentProps> = ({
  open,
}): ReactElement => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingComponent;
