import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { url } from "inspector";
import waveImg from "../../public/wave.svg";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: 500,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            src={"wave.svg"}
            alt="wave.png"
            width={0}
            height={0}
            style={{ width: "100%", height: "auto" }}
            objectFit="contain"
          />
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              position: "absolute",
              top: { xs: 4, md: 10 },
              fontSize: { xs: 32, sm: 45 },
              color: "#333A73",
            }}
          >
            Foodie POS
          </Typography>
        </Box>
        <Box sx={{ display: "flex", mt: 4, position: "absolute", top: 80 }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#606edb",
              width: "fit-content",
              mr: 2,
              fontSize: 13,

              "&:hover": { bgcolor: "#78d0ed", color: "#151515" },
            }}
          >
            <Link
              href={"/backoffice"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Backoffice
            </Link>
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#606edb",
              width: "fit-content",
              color: "#f0f0f0",
              fontSize: 13,
              "&:hover": { bgcolor: "#78d0ed", color: "#151515" },
            }}
          >
            <Link
              href={"/order"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Order
            </Link>
          </Button>
        </Box>
      </Box>

      <Box sx={{ width: "100%", height: 400, bgcolor: "#333A73" }}></Box>
    </Box>
  );
}
