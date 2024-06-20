import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import React from "react";
import Image from "next/image";
import { useAppSelector } from "@/store/hook";
import { useRouter } from "next/router";

const HeadBarForOrderApp = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const router = useRouter();
  const cartQuery = router.pathname;

  const handleCart = () => {
    if (cartItems.length) {
      router.push({ pathname: "/order/cart", query: router.query });
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          zIndex: 2,
          top: { xd: 0, sm: 8 },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          width: { xs: "100%", sm: "75%" },
          color: "#f0f0f0",
        }}
      >
        <Typography
          sx={{
            mb: { xs: 1, md: 0 },
            fontSize: { xs: 20, sm: 34 },
            color: "#333A73",
            fontWeight: "bold",
            cursor: "default",
          }}
        >
          Order what you want.
        </Typography>
        <Box>
          {cartQuery.includes("cart") ? (
            <Button
              onClick={() =>
                router.push({ pathname: "/order", query: router.query })
              }
            >
              <HomeIcon sx={{ color: "#333A73", fontSize: 30 }} />
            </Button>
          ) : (
            <Button
              color="inherit"
              sx={{ position: "relative" }}
              disabled={cartItems.length ? false : true}
              onClick={handleCart}
            >
              {cartItems.length ? (
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: { xs: 18, md: 22 },
                    height: { xs: 18, md: 22 },
                    position: "absolute",
                    right: { xs: 0, md: -5 },
                    top: { xs: 2, md: 0 },
                    color: "#333A73",
                    borderRadius: "50%",
                    bgcolor: "#00FFFF",
                  }}
                >
                  {cartItems.length}
                </Typography>
              ) : (
                ""
              )}
              <ShoppingCartIcon
                sx={{ color: "#1119c5", fontSize: { xs: 25, md: 30 } }}
              />
            </Button>
          )}
        </Box>
      </Box>

      <Image
        src={"/orderWave.svg"}
        alt="OrderWave.png"
        width={0}
        height={0}
        style={{ width: "100%", height: "auto" }}
        objectFit="contain"
      />
    </Box>
  );
};

export default HeadBarForOrderApp;
/* 
 <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: { xs: 18, md: 22 },
                height: { xs: 18, md: 22 },
                position: "absolute",
                right: { xs: 0, md: -5 },
                top: { xs: 2, md: 0 },
                color: "#333A73",
                borderRadius: "50%",
                bgcolor: "#00FFFF",
              }}
            >
              {cartItems.length}
            </Typography>




            // Shopping button
            <Button
            color="inherit"
            sx={{ position: "relative" }}
            disabled={cartItems.length ? false : true}
            onClick={handleCart}
          >
            
            <ShoppingCartIcon
              sx={{ color: "#1119c5", fontSize: { xs: 25, md: 30 } }}
            />
          </Button>


          // home Button
 <Button
            onClick={() =>
              router.push({ pathname: "/order", query: router.query })
            }
          >
            <HomeIcon sx={{ color: "#333A73", fontSize: 30 }} />
          </Button>
          */
