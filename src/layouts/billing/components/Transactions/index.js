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
import { Link } from "@mui/material";
import Card from "@mui/material/Card";
// import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import dayjs from "dayjs";
// import MDButton from "components/MDButton";

// Billing page components
import Transaction from "layouts/billing/components/Transaction";
import { PAYOUT_ENDPOINT } from "utils/axios.apis";
import { useGetRequest } from "utils/axiosHooks";

function Transactions() {
  const { data, loading, error } = useGetRequest(
    `${PAYOUT_ENDPOINT.GET_ALL_PAYOUTS.URL}?limit=20&sort=createdAt`
  );
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Your Transaction&apos;s
        </MDTypography>
      </MDBox>
      <MDBox pt={3} pb={2} px={2}>
        <MDBox mb={2}>
          <MDTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
            newest
          </MDTypography>
        </MDBox>
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          {!loading && error == null
            ? data
                .filter((ele) => dayjs(ele.createdAt).isSame(dayjs(), "day"))
                .map((item) => {
                  return (
                    <Link key={item._id} href="/payouts">
                      <Transaction
                        color="success"
                        icon="expand_more"
                        name={item.requestedBy.full_name}
                        description={Intl.DateTimeFormat("en", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(new Date(item.requestTime))}
                        value={`${item.convertedAmount.toFixed(2)} EUR`}
                      />
                    </Link>
                  );
                })
            : "No data found"}

          {/* <Transaction
            color="success"
            icon="expand_less"
            name="Apple"
            description="27 March 2020, at 04:30 AM"
            value="+ $ 2,000"
          /> */}
        </MDBox>
        <MDBox mt={1} mb={2}>
          <MDTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
            yesterday or behind
          </MDTypography>
        </MDBox>
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          {!loading && error == null
            ? data
                .filter((ele) => dayjs(ele.createdAt).isSame(dayjs().subtract(1, "day"), "day"))
                .map((item) => {
                  return (
                    <Link key={item._id} href="/payouts">
                      <Transaction
                        key={item._id}
                        color="success"
                        icon="expand_more"
                        name={item.requestedBy.full_name}
                        description={Intl.DateTimeFormat("en", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(new Date(item.requestTime))}
                        value={`${item.convertedAmount.toFixed(2)} EUR`}
                      />
                    </Link>
                  );
                })
            : "No data found"}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default Transactions;
