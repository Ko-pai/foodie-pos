import BackofficeLayout from "@/component/BackofficeLayout";

import { Box, Button, Typography } from "@mui/material";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

import React from "react";
import Image from "next/image";
import Layout from "@/component/Layout";

const SignInButton = () => {
  return (
    <BackofficeLayout>
      <Box
        sx={{
          height: "100vh",
          color: "#F5F5F5",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{
            width: 250,
            height: 60,

            color: "#F5F5F5",
            bgcolor: "#4285F4",
            fontWeight: "bold",
            borderRadius: 2,
            "&:hover": {
              bgcolor: "#5da5f4",
            },
          }}
          onClick={() => {
            signIn("google", { callbackUrl: "/backoffice" });
          }}
        >
          <Image
            src="/icons8-google.svg"
            alt={"googleIcon"}
            width={40}
            height={40}
          />{" "}
          &nbsp;&nbsp; Sign in with google
        </Button>
      </Box>
    </BackofficeLayout>
  );
};

export default SignInButton;
