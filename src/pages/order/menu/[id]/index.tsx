import OrderAppLayout from "@/component/OrderAppLayout";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { appSelector } from "@/store/slices/appSlice";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Addon, AddonCategory, MenuAddonCategory } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import Image from "next/image";
import AddonCategories from "@/component/AddonCategories";
import QuantitySeletor from "@/component/QuantitySeletor";
import { CartItem } from "@/types/cart";
import { addToCart } from "@/store/slices/cartSlice";
import { nanoid } from "@reduxjs/toolkit";

const OrderPageMenuDetails = () => {
  const router = useRouter();
  const { query } = router;
  const { id } = router.query;
  const cartItemId = router.query.cartItemId;
  const { cartItems } = useAppSelector((state) => state.cart);

  const { menus, menuAddonCategories, addonCategories, addons } =
    useAppSelector(appSelector, shallowEqual);

  const [selectedAddon, setSelectedAddon] = useState<Addon[]>([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [changeAddonCategories, setChangeAddonCategories] = useState<
    AddonCategory[]
  >([]);
  const [value, setValue] = useState(1);

  const menu = menus.find((d) => d.id === Number(id));
  const assetUrl = String(menu?.assetUrl);
  const dispatch = useAppDispatch();

  const findCartItem = cartItems.find((item) => item.id === cartItemId);

  const findAddonCategoriesId = menuAddonCategories
    .filter((d) => d.menuId === Number(id))
    .map((d) => d.addOnCategoryId);

  const findAddonCategories = addonCategories.filter((d) =>
    findAddonCategoriesId.includes(d.id)
  );

  const findAddon = addons.filter((d) =>
    findAddonCategoriesId.includes(d.addonCategoryId)
  );

  useEffect(() => {
    if (findAddonCategories) {
      setChangeAddonCategories(findAddonCategories);
    }
  }, []);

  useEffect(() => {
    const requiredAddonCategories = findAddonCategories.filter(
      (item) => item.isRequired
    );

    const selectedRequiredAddon = selectedAddon?.filter((item) => {
      const addonCategory = findAddonCategories.find(
        (d) => d.id === item.addonCategoryId
      );
      return addonCategory?.isRequired ? true : false;
    });

    const isDisabled =
      requiredAddonCategories.length !== selectedRequiredAddon?.length;
    setIsDisabled(isDisabled);
  }, [selectedAddon, findAddonCategories]);

  /* This useEffect is for found cartItem are replace in selected addon */

  useEffect(() => {
    if (findCartItem) {
      setSelectedAddon(findCartItem.addon);
      setValue(findCartItem.quantity);
    }
  }, [findCartItem]);

  /* ******************************************* */

  /* This is for quantity selector function */
  const onDecrease = () => {
    if (value === 0) {
      setValue(0);
    } else {
      const minusValue = value - 1;
      setValue(minusValue);
    }
  };

  const onIncrease = () => {
    const plusValue = value + 1;
    setValue(plusValue);
  };
  /* ******************************************* */

  const handleAddToCart = () => {
    if (!menu) return null;

    const newCartItem: CartItem = {
      id: findCartItem ? findCartItem.id : nanoid(7),
      menu,
      addon: selectedAddon,
      quantity: value,
    };
    dispatch(addToCart(newCartItem));
    const pathname = findCartItem ? "/order/cart" : "/order";
    router.push({ pathname, query });
  };

  if (!menus) return null;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mb: 3,
      }}
    >
      <Box sx={{ widht: 400, height: 300, mt: 4 }}>
        <img
          style={{ width: "220px", height: "220px", borderRadius: "50%" }}
          src={menu ? assetUrl : "default_image_url"}
        />
      </Box>
      <AddonCategories
        addonCategories={changeAddonCategories}
        selectedAddon={selectedAddon}
        setSelectedAddon={setSelectedAddon}
      />
      <QuantitySeletor
        onDecrease={onDecrease}
        onIncrease={onIncrease}
        value={value}
      />
      <Button
        disabled={isDisabled}
        variant="contained"
        sx={{
          width: "fit-content",
          mt: 2,
          bgcolor: "#333A73",
          "&:hover": { bgcolor: "#78d0ed", color: "#151515" },
        }}
        onClick={handleAddToCart}
      >
        Add to cart
      </Button>
    </Box>
  );
};

export default OrderPageMenuDetails;

/* 

                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value={d?.name}
                      control={<Radio />}
                      label={d?.name}
                    />
                  </RadioGroup>
                  
                  
                  
                  
                  
                  {selectedAddon?.map((item) => {
                    if (item.addonCategoryId === d?.id) {
                      return (
                        <RadioGroup
                          key={item.id}
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="female"
                          name="radio-buttons-group"
                          onChange={(evt, value) => {}}
                        >
                          <FormControlLabel
                            value={item?.name}
                            control={<Radio />}
                            label={item?.name}
                          />
                        </RadioGroup>
                      );
                    }
                  })}
                  
                  */
