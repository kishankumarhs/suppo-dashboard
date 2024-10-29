/* eslint-disable react/prop-types */
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
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Billing page components
import Invoice from "layouts/billing/components/Invoice";
import { Avatar, Divider, Skeleton } from "@mui/material";
import { useGetRequest } from "utils/axiosHooks";
import { PAYOUT_ENDPOINT } from "utils/axios.apis";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import DataTable from "examples/Tables/DataTable";

function Invoices() {
  const { data, loading, error } = useGetRequest(`${PAYOUT_ENDPOINT.GET_ALL_PAYOUTS.URL}`);
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {image ? (
        <MDAvatar src={image} name={name} size="sm" />
      ) : (
        <Avatar
          sx={{
            bgcolor: "#" + Math.floor(Math.random() * 0xffffff).toString(16),
          }}
          size="sm"
        >
          {name[0]?.toUpperCase()}
        </Avatar>
      )}
      <MDBox ml={2} lineHeight={1}>
        <MDTypography
          textTransform="capitalize"
          display="block"
          variant="button"
          fontWeight="medium"
        >
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const columns = [
    // { Header: "Id", accessor: "id", width: "20%", align: "left" },
    { Header: "User", accessor: "name", align: "left" },
    { Header: "Paypal Account", accessor: "address", align: "left" },
    { Header: "Requested At", accessor: "dob", align: "center" },
    { Header: "Converted Amount", accessor: "gender", width: "15%", align: "left" },
    { Header: "Premium User", accessor: "premium", align: "center" },
    { Header: "Status", accessor: "listing_time", align: "center" },
  ];

  const rows =
    !loading && error == null
      ? data?.map((item) => ({
          id: item._id,
          name: (
            <Author
              image={item.requestedBy?.profile_pic}
              name={item.requestedBy.full_name}
              email={item.requestedBy.email}
            />
          ),
          address: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {item.paypalInfo}
            </MDTypography>
          ),
          listing_time: (
            <MDBox ml={-1}>
              <MDBadge badgeContent={item.status} color="success" variant="gradient" size="sm" />
            </MDBox>
          ),
          dob: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {Intl.DateTimeFormat("en-us", {
                hour: "numeric",
                minute: "numeric",
                day: "numeric",
                month: "short",
                year: "numeric",
              }).format(new Date(item.requestTime))}
            </MDTypography>
          ),
          premium: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {`${+item.amount.toFixed(2)} SUP`}
            </MDTypography>
          ),
          gender: (
            <MDTypography
              component="a"
              href="#"
              textAlign="left"
              textTransform="uppercase"
              variant="caption"
              color="text"
              fontWeight="medium"
            >
              {`${+item.convertedAmount.toFixed(2)} EUR`}
            </MDTypography>
          ),
        }))
      : [];

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          Payout Request
        </MDTypography>
      </MDBox>
      <Divider />
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <DataTable
            table={{ columns, rows }}
            isSorted={false}
            entriesPerPage={false}
            showTotalEntries={false}
            noEndBorder
          />
          {/* {!loading && error == null ? (
            data?.map((record) => {
              return (
                <Invoice
                  key={record._id}
                  date={Intl.DateTimeFormat("en-Us", {
                    hour12: false,
                    day: "2-digit",
                    hour: "2-digit",
                    month: "short",
                    minute: "2-digit",
                    year: "numeric",
                    weekday: "short",
                  }).format(new Date(record.requestTime))}
                  id={record._id}
                  price={record.convertedAmount.toString()}
                  suppoCoin={+record.amount}
                  status={record.status}
                />
              );
            })
          ) : (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          )} */}
          {/* <Invoice date="March, 01, 2020" id="#MS-415646" price="$180" />
          <Invoice date="February, 10, 2021" id="#RV-126749" price="$250" />
          <Invoice date="April, 05, 2020" id="#QW-103578" price="$120" />
          <Invoice date="June, 25, 2019" id="#MS-415646" price="$180" />
          <Invoice date="March, 01, 2019" id="#AR-803481" price="$300" noGutter /> */}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default Invoices;
