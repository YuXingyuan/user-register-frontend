import type { FC, ReactElement } from "react";

import { ErrorBoundary } from "react-error-boundary";
import CssBaseline from "@mui/material/CssBaseline";

import FormComponent from "../../components/form/form.component";
import TableComponent from "../../components/table/table.component";
import LoadingComponent from "../../components/loading/loading.component";
import ErrorComponent from "../../components/error/error.component";

import ErrorPage from "../error/error";

import { useAppSelector } from "../../redux/hook";

const App: FC = (): ReactElement => {
  const loading = useAppSelector((state) => state.user.loading);
  const error = useAppSelector((state) => state.user.error);

  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <CssBaseline />

      {loading && <LoadingComponent open={loading} />}

      {!!error && <ErrorComponent error={error} />}

      <FormComponent />
      <TableComponent />
    </ErrorBoundary>
  );
};

export default App;
