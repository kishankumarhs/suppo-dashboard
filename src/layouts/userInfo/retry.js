import { Box, Typography } from "@mui/material";
import React from "react";
import NewReleasesOutlinedIcon from "@mui/icons-material/NewReleasesOutlined";
import BasicLayout from "layouts/authentication/components/BasicLayout";

const RetryPage = () => {
  return (
    <BasicLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          gap: "3px",
        }}
      >
        <Box sx={{ fontSize: "100px" }}>
          <NewReleasesOutlinedIcon color="error" fontSize="inherit" />
        </Box>
        <Typography variant="subtitle1" textAlign="center">
          Something went wrong please try again in app
        </Typography>
      </Box>
    </BasicLayout>
  );
};

export default RetryPage;
