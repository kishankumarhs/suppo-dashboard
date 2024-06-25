// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useGetRequest, usePostRequestLazy } from "utils/axiosHooks";
import { BANNERS_ENDPOINT } from "utils/axios.apis";
import bannersTableData from "./data";
import { CircularProgress, Icon, Modal, Stack, TextField } from "@mui/material";
import MDButton from "components/MDButton";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

function Banners() {
  const { data, loading, error, refetch } = useGetRequest(BANNERS_ENDPOINT.GET_ALL.URL);
  const [saveBanner, { loading: saveLoading }] = usePostRequestLazy(BANNERS_ENDPOINT.CREATE.URL);
  const { columns: songsColumns, rows: songsRows } = bannersTableData(data, loading, error);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [bannerData, setBannerData] = useState({});
  const [bannerError, setBannerError] = useState({});

  const handleSave = async () => {
    setBannerError({});
    if (bannerData.imageUrl == "" || !bannerData.imageUrl) {
      setBannerError((prev) => ({ ...prev, imageUrl: "Image URL is required" }));
    }
    if (bannerData.title == "" || !bannerData.title) {
      setBannerError((prev) => ({ ...prev, title: "Title is required" }));
    }
    if (bannerData.event_date == "" || !bannerData.event_date) {
      setBannerError((prev) => ({ ...prev, event_date: "Event date is required" }));
    }
    console.log(bannerError);
    if (Object.keys(bannerError).length > 0) return;
    await saveBanner(bannerData);
    refetch();
    handleClose();
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: "grid",
          placeItems: "center",
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={{ width: "400px" }}>
          <MDBox pb={3} pt={1} px={2}>
            <Stack spacing={2}>
              <MDTypography>Add banner</MDTypography>
              <TextField
                error={!!bannerError.imageUrl}
                helperText={bannerError.imageUrl}
                name="imageUrl"
                label={"URL"}
                onChange={(e) => setBannerData({ ...bannerData, imageUrl: e.target.value })}
                variant="outlined"
              />
              <TextField
                helperText={!!bannerError.title}
                label={"Title"}
                onChange={(e) => setBannerData({ ...bannerData, title: e.target.value })}
                name="title"
                variant="outlined"
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Event Date"
                  value={bannerData.event_date}
                  onChange={(value) => setBannerData({ ...bannerData, event_date: value })}
                />
              </LocalizationProvider>
              <MDButton onClick={handleSave} variant="gradient" color="dark">
                {saveLoading ? (
                  <CircularProgress size={16} />
                ) : (
                  <Icon sx={{ fontWeight: "bold" }}>bookmark</Icon>
                )}
                &nbsp; Save
              </MDButton>
            </Stack>
          </MDBox>
        </Card>
      </Modal>
      <MDBox mt={6} mb={3}>
        <Grid container spacing={6} justifyContent="center">
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Banners
                </MDTypography>
                <MDButton onClick={handleOpen} variant="gradient" color="dark">
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp;add Banners
                </MDButton>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: songsColumns, rows: songsRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Banners;
