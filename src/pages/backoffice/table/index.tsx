import Layout from "@/component/Layout";
import ItemCard from "@/component/ItemCard";
import NewMenuDialog from "@/component/NewMenuDialog";
import SnackBar from "@/component/SnackBar";
import { useAppSelector } from "@/store/hook";
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import TableBarIcon from "@mui/icons-material/TableBar";
import NewTableDialog from "@/component/NewTableDialog";
import { CreateTable } from "@/types/table";

const Table = () => {
  const [open, setOpen] = useState(false);
  const [newTable, setNewTable] = useState<CreateTable>({
    name: "",
    locationId: 0,
  });
  const { tables } = useAppSelector((state) => state.table);
  const { selectedLocation } = useAppSelector((state) => state.app);

  const printQrHandler = (assetUrl: string | null, tableId: number) => {
    const openWindow = window.open("");

    openWindow?.document.write(`<html>
    <head>
        <title>Print Qr</title>
    </head>
    <body style="display : flex ; align-items: center; justify-content : center">
        <img src=${assetUrl} onload="window.print() ; window.close()" />
    </body>
    </html>`);

    window.document.close();
  };

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
            New Table
          </Button>
        </Box>
        <NewTableDialog
          setOpen={setOpen}
          open={open}
          setNewTable={setNewTable}
          newTable={newTable}
        />
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {tables.map((d) => {
            if (d.locationId === selectedLocation?.id) {
              return (
                <Box
                  key={d.id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <ItemCard
                    icon={<TableBarIcon />}
                    title={d.name}
                    href={`/backoffice/table/${d.id}`}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#A98467",
                      width: "fit-content",
                      height: 33,
                      "&:hover": { bgcolor: "#ba9783" },
                    }}
                    onClick={() => printQrHandler(d.assetUrl, d.id)}
                  >
                    Print QR
                  </Button>
                </Box>
              );
            }
          })}
        </Box>
        <SnackBar />
      </Box>
    </Box>
  );
};

export default Table;
