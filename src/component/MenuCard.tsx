import PaidIcon from "@mui/icons-material/Paid";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Menu } from "@prisma/client";
import Link from "next/link";

interface Props {
  menu: Menu;
  href: string | object;
  isAvailable?: boolean;
}

const MenuCard = ({ menu, href, isAvailable }: Props) => {
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        marginRight: "15px",
        marginBottom: "30px",
        cursor: `${!isAvailable ? "not-allowed" : "pointer"}`,
      }}
    >
      <Card
        title={isAvailable === false ? "Unavailable" : ""}
        sx={{
          width: { xs: 150, sm: 220 },
          height: { xs: 180, sm: 230 },
          pb: { xs: 2 },
          opacity: isAvailable === false ? 0.4 : 1,
        }}
      >
        <CardMedia
          sx={{ height: { xs: 100, sm: 140 }, objectFit: "contain" }}
          image={
            menu.assetUrl ||
            "https://www.werafoods.com/assets/images/default-food-image-large.png"
          }
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: { xs: 1, sm: 2 },
          }}
        >
          <Typography
            noWrap
            sx={{ fontSize: { xs: 16, sm: 17 }, fontWeight: 600 }}
          >
            {menu.name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              mt: 1,
            }}
          >
            <PaidIcon sx={{ mr: 1, color: "#50C4ED" }} />
            <Typography
              sx={{
                m: 0,
                p: 0,
                color: "#3f3d3d",
                fontWeight: 500,
                fontStyle: "italic",
                fontSize: 15,
              }}
            >
              {menu.price}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MenuCard;
