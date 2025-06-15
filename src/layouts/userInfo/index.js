import { Box, Typography } from "@mui/material";
import React from "react";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import BasicLayout from "layouts/authentication/components/BasicLayout";

const UserInfo = () => {
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
          <CheckCircleOutlinedIcon color="success" fontSize="inherit" />
        </Box>
        <Typography variant="subtitle1" textAlign="center">
          Your account is connected with suppo now you can request payouts
        </Typography>
      </Box>
    </BasicLayout>
  );
};

export default UserInfo;
