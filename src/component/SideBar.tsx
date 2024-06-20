import React from "react";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import CategoryIcon from "@mui/icons-material/Category";
import SettingsIcon from "@mui/icons-material/Settings";
import ExtensionIcon from "@mui/icons-material/Extension";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TableBarIcon from "@mui/icons-material/TableBar";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Link from "next/link";

const iconData = [
  {
    id: 1,
    icon: <RestaurantMenuIcon />,
    route: "/backoffice/menu",
    label: "Menu",
  },
  {
    id: 2,
    icon: <MenuBookIcon />,
    route: "/backoffice/menuCategory",
    label: "Menu Category",
  },
  {
    id: 3,
    icon: <ExtensionIcon />,
    route: "/backoffice/addOn",
    label: "Addons",
  },
  {
    id: 4,
    icon: <CategoryIcon />,
    route: "/backoffice/addon-Category",
    label: "Addon  Category",
  },
  {
    id: 5,
    icon: <LocationOnIcon />,
    route: "/backoffice/location",
    label: "Location",
  },
  {
    id: 6,
    icon: <TableBarIcon />,
    route: "/backoffice/table",
    label: "Table",
  },
  {
    id: 7,
    icon: <LocalMallIcon />,
    route: "/backoffice/order",
    label: "Order",
  },
];

export const SideBar = () => {
  return (
    <Box
      sx={{ width: 250, height: { xs: "100%" }, background: "#e9fc90" }}
      role="presentation"
    >
      <List>
        {iconData.map((text) => (
          <Link
            href={text.route}
            key={text.id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: "#b6733f" }}>
                  {text.icon}
                </ListItemIcon>
                <ListItemText primary={text.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <Link
          href={"/backoffice/setting"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: "#b6733f" }}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={"Settings"} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
  );
};
