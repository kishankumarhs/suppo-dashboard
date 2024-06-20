import { styled } from "@mui/material";

export const ImageThumbnail = styled("img")(({ theme }) => ({
  width: "200px",
  height: "100%",
  borderRadius: theme.shape.borderRadius,
  objectFit: "cover",
}));
