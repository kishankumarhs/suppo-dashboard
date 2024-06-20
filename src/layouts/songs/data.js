import { Icon, IconButton } from "@mui/material"


export default function (data, loading, error) {
    const columns =
        [
            { Header: "Id", accessor: "id", width: "20%", align: "left" },
            { Header: "name", accessor: "name", width: "10%", align: "left" },
            { Header: "Spotify ID", accessor: "spotify_id", align: "left" },
            { Header: "Delete", accessor: "delete", align: "center" },
            { Header: "Edit", accessor: "edit", align: "center" },
        ]

    const rows = !loading && data ? data.map(song => (
        {
            id: song._id,
            name: song.name,
            spotify_id: song.spotify_id,
            delete: <IconButton
                name="Delete"

            >
                <Icon sx={{
                    color: "error.main",
                    fontSize: 20
                }}>
                    delete
                </Icon>
            </IconButton>,
            edit: <IconButton>
                <Icon sx={{
                    color: "gray",
                    fontSize: 20
                }}>
                    edit_note
                </Icon>
            </IconButton>,
        }
    )) : []

    return {
        columns: columns,
        rows: rows
    }
}

export const playlistTableData = function (data, loading, error) {
    console.log("Playlist Data", data, loading, error);
    const columns =
        [
            { Header: "Id", accessor: "id", width: "20%", align: "left" },
            { Header: "name", accessor: "name", width: "10%", align: "left" },
            { Header: "description", accessor: "description", align: "left" },
            { Header: "Playlist Id", accessor: "playlist", align: "left" },
            { Header: "songs", accessor: "songs", align: "left" },
            { Header: "Delete", accessor: "delete", align: "center" },
            { Header: "Edit", accessor: "edit", align: "center" },
        ]

    const rows = !loading && data ? data.map(song => (
        {
            id: song._id,
            name: song.title,
            playlist: song.playlist_id,
            description: song.desc,
            songs: Array.isArray(song.songs) ? song.songs.length : 0,
            delete: <IconButton
                name="Delete"

            >
                <Icon sx={{
                    color: "error.main",
                    fontSize: 20
                }}>
                    delete
                </Icon>
            </IconButton>,
            edit: <IconButton>
                <Icon sx={{
                    color: "GrayText",
                    fontSize: 20
                }}>
                    edit_note
                </Icon>
            </IconButton>,
        }
    )) : []

    return {
        columns: columns,
        rows: rows
    }
}