import { useState } from "react";

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
import { useGetRequest } from "utils/axiosHooks";
import { SONGS_ENDPOINT } from "utils/axios.apis";
import songTableData, { playlistTableData } from "./data";
import { CircularProgress, Icon, Modal, Stack, TextField } from "@mui/material";
import MDButton from "components/MDButton";
import { PLAYLIST_ENDPOINT } from "utils/axios.apis";
import { usePostRequestLazy } from "utils/axiosHooks";
import { useDeleteRequestLazy } from "utils/axiosHooks";

function Songs() {
  const { data, loading, error, refetch } = useGetRequest(SONGS_ENDPOINT.GET_ALL.URL);
  const {
    data: playlist,
    loading: playlistLoading,
    error: playlistGetError,
    refetch: playlistRefetch,
  } = useGetRequest(PLAYLIST_ENDPOINT.GET_ALL.URL);
  const [saveSongs, { loading: songSaveLoading }] = usePostRequestLazy(SONGS_ENDPOINT.CREATE.URL);
  const [deleteSong, { loading: songDeleteLoading }] = useDeleteRequestLazy(
    SONGS_ENDPOINT.DELETE.URL
  );
  const [deletePlaylist, { loading: playlistDeleteLoading }] = useDeleteRequestLazy(
    PLAYLIST_ENDPOINT.DELETE.URL
  );
  const [savePlaylist, { loading: playlistSaveLoading }] = usePostRequestLazy(
    PLAYLIST_ENDPOINT.CREATE.URL
  );
  const { columns: songsColumns, rows: songsRows } = songTableData(data, loading, error);
  const { columns: playlistColumns, rows: playlistRows } = playlistTableData(
    playlist,
    playlistLoading,
    playlistGetError,
    deletePlaylist,
    playlistRefetch
  );
  const [playlistOpen, setPlaylistOpen] = useState(false);
  const handlePlaylistOpen = () => setPlaylistOpen(true);
  const handlePlaylistClose = () => setPlaylistOpen(false);
  const [playlistData, setPlaylistData] = useState({});
  const [playlistError, setPlaylistError] = useState({});
  const handlePlaylistSave = async () => {
    setPlaylistError({});
    if (playlistData.spotify_id == "" || !playlistData.spotify_id) {
      setPlaylistError((prev) => ({ ...prev, spotify_id: "Spotify Id is required" }));
    }
    if (playlistData.name == "" || !playlistData.name) {
      setPlaylistError((prev) => ({ ...prev, name: "Name is required" }));
    }
    if (Object.keys(playlistError).length > 0) return;
    await savePlaylist(playlistData);
    playlistRefetch();
    handlePlaylistClose();
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [songData, setSongData] = useState({});
  const [songError, setSongError] = useState({});
  const handleSave = async () => {
    setSongError({});
    if (songData.spotify_id == "" || !songData.spotify_id) {
      setSongError((prev) => ({ ...prev, spotify_id: "Spotify Id is required" }));
    }
    if (songData.name == "" || !songData.name) {
      setSongError((prev) => ({ ...prev, name: "Name is required" }));
    }
    if (Object.keys(songError).length > 0) return;
    await saveSongs(songData);
    refetch();
    handleClose();
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Modal
        open={playlistOpen}
        onClose={handlePlaylistClose}
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
              <MDTypography>Add Playlist</MDTypography>
              <TextField
                error={!!playlistError.title}
                helperText={playlistError.title}
                name="title"
                label={"Title"}
                onChange={(e) => setPlaylistData({ ...playlistData, title: e.target.value })}
                variant="outlined"
              />
              <TextField
                type="text"
                error={!!playlistError.desc}
                helperText={playlistError.desc}
                name="desc"
                label={"Description"}
                onChange={(e) => setPlaylistData({ ...playlistData, desc: e.target.value })}
                variant="outlined"
              />
              <TextField
                error={!!playlistError.playlist_id}
                helperText={playlistError.playlist_id}
                label={"Playlist Id"}
                onChange={(e) => setPlaylistData({ ...playlistData, playlist_id: e.target.value })}
                name="playlist_id"
                variant="outlined"
              />
              <MDButton onClick={handlePlaylistSave} variant="gradient" color="dark">
                {songSaveLoading ? (
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
      {/*Song Modal */}
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
              <MDTypography>Add Song</MDTypography>
              <TextField
                error={!!songError.spotify_id}
                helperText={songError.spotify_id}
                name="spotify_id"
                label={"Spotify Id"}
                onChange={(e) => setSongData({ ...songData, spotify_id: e.target.value })}
                variant="outlined"
              />
              <TextField
                helperText={!!songError.name}
                label={"Name"}
                onChange={(e) => setSongData({ ...songData, name: e.target.value })}
                name="name"
                variant="outlined"
              />
              <MDButton onClick={handleSave} variant="gradient" color="dark">
                {songSaveLoading ? (
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
                  Songs
                </MDTypography>
                <MDButton onClick={handleOpen} variant="gradient" color="dark">
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp;add song
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
                  Playlist
                </MDTypography>
                <MDButton onClick={handlePlaylistOpen} variant="gradient" color="dark">
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp;add playlist
                </MDButton>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: playlistColumns, rows: playlistRows }}
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

export default Songs;
