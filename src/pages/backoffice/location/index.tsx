import BackofficeLayout from "@/component/BackofficeLayout";
import ItemCard from "@/component/ItemCard";
import NewMenuDialog from "@/component/NewMenuDialog";
import SnackBar from "@/component/SnackBar";
import { useAppSelector } from "@/store/hook";
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NewLocationDialog from "@/component/NewLocationDialog";
import { CreateLocation } from "@/types/location";
import Layout from "@/component/Layout";

const Location = () => {
  const { company } = useAppSelector((state) => state.company);
  const [open, setOpen] = useState(false);
  const { locations } = useAppSelector((state) => state.location);
  const [newLocation, setNewLocation] = useState<CreateLocation>({
    name: "",
    street: "",
    township: "",
    city: "",
    companyId: company?.id,
  });

  return (
    <Box>
      <Box sx={{ width: "100%", height: "100%", p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{ bgcolor: "#A98467", "&:hover": { bgcolor: "#ba9783" } }}
            onClick={() => {
              setOpen(true);
            }}
          >
            New Location
          </Button>
        </Box>
        <NewLocationDialog
          setNewLocation={setNewLocation}
          newLocation={newLocation}
          open={open}
          setOpen={setOpen}
        />
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {locations.map((d) => {
            return (
              <ItemCard
                key={d.id}
                href={`/backoffice/location/${d.id}`}
                icon={<LocationOnIcon />}
                title={d.name}
              />
            );
          })}
        </Box>
        <SnackBar />
      </Box>
    </Box>
  );
};

export default Location;
