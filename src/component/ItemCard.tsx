import { Box, Paper, Typography } from "@mui/material";
import Link from "next/link";
import React, { ReactNode } from "react";

interface Prop {
  icon: ReactNode;
  title: string;
  href: string;
  subtitle?: string;
  isAvailable?: boolean;
  onClick?: () => void;
}


const ItemCard = ({ icon, title, href, subtitle, isAvailable }: Prop) => {
  const mouseColor = () => {
    
  }

  return (
    <Link href={href} style={{ cursor: "pointer", textDecoration: "none" }} >
      <Paper
        sx={{
          width: 170,
          height: 170,
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          opacity: isAvailable ? 0.4 : 1,
          m: 2,
        }}
      >
        {icon}
        <Typography sx={{ fontWeight: "700" }}>{title} </Typography>
        {subtitle && <Typography sx={{ fontSize: 14 }}>{subtitle}</Typography>}
      </Paper>
    </Link>
  );
};

export default ItemCard;
