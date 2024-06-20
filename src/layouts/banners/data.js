import { Icon, IconButton } from "@mui/material"
import { ImageThumbnail } from "./styles"


export default function (data, loading, error) {
    const columns =
        [
            { Header: "image", accessor: "image", width: "30%", align: "left" },
            { Header: "name", accessor: "name", width: "10%", align: "left" },
            { Header: "event", accessor: "event", align: "left" },
            { Header: "Delete", accessor: "delete", align: "center" },
            { Header: "Edit", accessor: "edit", align: "center" },
        ]

    const rows = !loading && data ? data.map(banner => (
        {
            id: banner._id,
            name: banner.title,
            image: <ImageThumbnail src={banner.imageUrl} />,
            event: new Date(banner.event_date).toLocaleString("en-US"),
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

