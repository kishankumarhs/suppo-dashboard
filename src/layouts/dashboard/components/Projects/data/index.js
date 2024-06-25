/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Avatar, CircularProgress, Icon, Stack } from "@mui/material";
import MDButton from "components/MDButton";
import dayjs from "dayjs";

export default function data(data, loading, error) {
  const hello =
    data?.length && !error && !loading
      ? data.map((plan) => ({
          plan: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {plan.plan[0]?.title}
            </MDTypography>
          ),
          user: (
            <MDBox display="flex" py={1}>
              <Avatar
                alt="name"
                size={12}
                sx={{
                  bgcolor: "#" + Math.floor(Math.random() * 0xffffff).toString(16),
                  border: ({ borders: { borderWidth }, palette: { white } }) =>
                    `${borderWidth[2]} solid ${white.main}`,
                  cursor: "pointer",
                  position: "relative",
                  "&:not(:first-of-type)": {
                    ml: -1.25,
                  },

                  "&:hover, &:focus": {
                    zIndex: "10",
                  },
                }}
              >
                {plan.users?.[0].full_name[0].toUpperCase()}
              </Avatar>
              <Stack direction="column" height={"100%"} ml={1}>
                <MDTypography variant="caption" color="text" fontWeight="medium">
                  {plan.users?.[0].full_name}
                </MDTypography>
                <MDTypography variant="caption" color="text">
                  {plan.users?.[0].email}
                </MDTypography>
              </Stack>
            </MDBox>
          ),
          status: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {plan.status}
            </MDTypography>
          ),
          requested_on: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {dayjs(plan.createdAt).format("DD MMM YYYY")}
            </MDTypography>
          ),
          approve: (
            <MDBox width="8rem" textAlign="left">
              <MDButton onClick={() => {}} variant="gradient" color="dark">
                {false ? (
                  <CircularProgress size={16} />
                ) : (
                  <Icon sx={{ fontWeight: "bold" }}>bookmark</Icon>
                )}
                &nbsp; Approve
              </MDButton>
            </MDBox>
          ),
        }))
      : [];

  console.log("Data", hello);

  return {
    columns: [
      { Header: "plan", accessor: "plan", align: "center" },
      { Header: "user", accessor: "user", width: "10%", align: "left" },
      { Header: "requested on", accessor: "requested_on", width: "45%", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "approve", accessor: "approve", align: "left" },
    ],

    rows: hello,
  };
}
