import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";

// Data
import planData from "layouts/dashboard/components/Projects/data";
import { useGetRequest } from "utils/axiosHooks";
import { PLANS_REQUEST_ENDPOINT } from "utils/axios.apis";
import dayjs from "dayjs";

function Projects() {
  const { data, loading, error } = useGetRequest(PLANS_REQUEST_ENDPOINT.GET_ALL.URL);
  const { columns, rows } = planData(data, loading, error);
  const [thisMonth, setThisMonth] = useState(0);

  useEffect(() => {
    if (!loading && Array(data).length && !error) {
      const thisMonth = [];
      const prevMonth = [];
      data?.forEach((plan) => {
        if (dayjs(plan.createdAt).isSame(dayjs(), "month")) thisMonth.push(plan);
        if (dayjs(plan.createdAt).isSame(dayjs().subtract(1, "month"), "month"))
          prevMonth.push(plan);
      });
      const growthRate = ((thisMonth.length - prevMonth.length) / prevMonth.length) * 100;
      setThisMonth(`${growthRate == Infinity ? 0 : growthRate.toFixed(2)}%`);
    }
  }, [loading, data, error]);

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Plan Request
          </MDTypography>
          <MDBox display="flex" alignItems="center" lineHeight={0}>
            <Icon
              sx={{
                fontWeight: "bold",
                color: ({ palette: { info } }) => info.main,
                mt: -0.5,
              }}
            >
              done
            </Icon>
            <MDTypography variant="button" fontWeight="regular" color="text">
              &nbsp;<strong>{thisMonth}</strong> this month
            </MDTypography>
          </MDBox>
        </MDBox>
        {/* <MDBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </MDBox> */}
        {/* {renderMenu} */}
      </MDBox>
      <MDBox>
        <DataTable
          table={{ columns, rows }}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
    </Card>
  );
}

export default Projects;
