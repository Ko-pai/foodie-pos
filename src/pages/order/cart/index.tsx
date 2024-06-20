import OrderAppLayout from "@/component/OrderAppLayout";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { removeCart } from "@/store/slices/cartSlice";
import { getTotalPriceCartItem } from "@/utils/generals";
import { useRouter } from "next/router";

const CartItemDetail = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const deleteInCart = () => {};
  

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {cartItems.length
        ? cartItems.map((item, index) => {
            return (
              <Box
                key={index}
                sx={{
                  width: { xs: 300, md: 400 },
                  p: 2,
                  mb: 2,
                  border: "divider",
                  display: "flex",
                  bgcolor: "rgba(106, 204, 237,0.5)",
                }}
              >
                <Typography
                  sx={{
                    mr: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 25,
                    width: 26,
                    color: "#f0f0f0",
                    textAlign: "center",
                    borderRadius: "50%",
                    bgcolor: "#333A73",
                  }}
                >
                  {index + 1}
                </Typography>
                <Box sx={{ width: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Typography>{item.menu.name} </Typography>
                    <Typography>{item.menu.price} ks</Typography>
                  </Box>
                  {item.addon.map((d) => {
                    return (
                      <Box
                        key={d.id}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography sx={{ fontSize: 14, mb: 2 }}>
                          {d.name}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }}>
                          {d.price} ks
                        </Typography>
                      </Box>
                    );
                  })}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Typography sx={{ fontSize: 14, mb: 1 }}>
                      Quantity
                    </Typography>
                    <Typography sx={{ fontSize: 14 }}>
                      {item.quantity}
                    </Typography>
                  </Box>
                  <Divider sx={{ bgcolor: "green" }} />

                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <IconButton onClick={() => dispatch(removeCart(item))}>
                      <DeleteIcon sx={{ "&:hover": { color: "crimson" } }} />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        router.push({
                          pathname: `menu/${item.menu.id}`,
                          query: { ...router.query, cartItemId: item.id },
                        });
                      }}
                    >
                      <EditIcon sx={{ "&:hover": { color: "#007500" } }} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            );
          })
        : ""}
      {cartItems.length ? (
        <Box
          sx={{
            width: { xs: 300, md: 400 },
            display: "flex",
            justifyContent: "flex-end",
            mt: 2,
            mb: 2,
          }}
        >
          <Typography sx={{ fontSize: 18, mr: 2 }}>Total Price: </Typography>
          <Typography
            sx={{ fontSize: 17, color: "#FBA834", fontWeight: "bold" }}
          >
            {getTotalPriceCartItem(cartItems)} ks
          </Typography>
        </Box>
      ) : (
        ""
      )}

      <Button variant="contained" sx={{ width: "fit-content", mb: 2, mt: 2 }}>
        Confirm Order
      </Button>
    </Box>
  );
};

export default CartItemDetail;
