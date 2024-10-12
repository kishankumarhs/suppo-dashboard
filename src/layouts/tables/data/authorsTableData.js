/* eslint-disable react/prop-types */

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { Avatar, Skeleton } from "@mui/material";

export default function data(data, loading, error) {
  console.log(data, loading, error);
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

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  const columns = [
    // { Header: "Id", accessor: "id", width: "20%", align: "left" },
    { Header: "name", accessor: "name", width: "10%", align: "left" },
    { Header: "address", accessor: "address", align: "left" },
    { Header: "Listing Time", accessor: "listing_time", align: "center" },
    { Header: "Gender", accessor: "gender", align: "center" },
    { Header: "Date Of Birth", accessor: "dob", align: "center" },
    { Header: "Premium User", accessor: "premium", align: "center" },
  ];

  const rows =
    loading && !data.length
      ? [
          {
            name: <Skeleton />,
            address: <Job title="Manager" description="Organization" />,
            status: (
              <MDBox ml={-1}>
                <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
              </MDBox>
            ),
            employed: (
              <MDTypography
                component="a"
                href="#"
                variant="caption"
                color="text"
                fontWeight="medium"
              >
                23/04/18
              </MDTypography>
            ),
            action: (
              <MDTypography
                component="a"
                href="#"
                variant="caption"
                color="text"
                fontWeight="medium"
              >
                Edit
              </MDTypography>
            ),
          },
        ]
      : data?.map((item) => ({
          id: item._id,
          name: <Author image={item?.profile_pic} name={item.full_name} email={item.email} />,
          address: (
            <Job
              title={`${item.area},${item.city}`}
              description={`${item.house_no}, ${item.postcode}`}
            />
          ),
          listing_time: (
            <MDBox ml={-1}>
              <MDBadge
                badgeContent={`${(item.totalListenTime / 3600).toFixed(2)} hrs`}
                color="success"
                variant="gradient"
                size="sm"
              />
            </MDBox>
          ),
          dob: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {new Date(item.dob).toLocaleDateString()}
            </MDTypography>
          ),
          premium: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {item.hasPremium ? "Yes" : "No"}
            </MDTypography>
          ),
          gender: (
            <MDTypography
              component="a"
              href="#"
              textTransform="uppercase"
              variant="caption"
              color="text"
              fontWeight="medium"
            >
              {item.gender}
            </MDTypography>
          ),
        }));

  return {
    columns: columns,
    rows,
  };
}
