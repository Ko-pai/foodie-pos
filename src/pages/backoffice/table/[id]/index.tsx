import Layout from "@/component/Layout";
import { CssTextField } from "@/component/CssTextField";
import DeleteDialog from "@/component/DeleteDialog";
import SingleSelect from "@/component/SingleSelect";
import SnackBar from "@/component/SnackBar";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { showSnackBar } from "@/store/slices/appSnackbarSlice";
import { deleteTable, updateTable } from "@/store/slices/tableSlice";
import { UpdateTable } from "@/types/table";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const TableDetail = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const tableId = Number(router.query.id);
  const [updateData, setUpdateData] = useState<UpdateTable>();
  const { tables } = useAppSelector((state) => state.table);
  const [isLoading, setIsLoading] = useState(true);

  const { locations } = useAppSelector((state) => state.location);
  const { selectedLocation } = useAppSelector((state) => state.app);
  const [selected, setSelected] = useState<number>();

  const findTable = tables.find((d) => d.id === tableId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (findTable) {
      setUpdateData(findTable);
      const locationId = findTable?.locationId;
      setSelected(locationId);
      setIsLoading(false);
    }
  }, [findTable]);

  useEffect(() => {
    if (updateData && selected) {
      setUpdateData({ ...updateData, locationId: selected });
    }
  }, [selected]);

  if (!updateData) {
    return (
      <Box>
        <Typography>Table not found.</Typography>
      </Box>
    );
  }

  function handleUpdate() {
    updateData &&
      dispatch(
        updateTable({
          ...updateData,
          onSuccess(data) {
            dispatch(
              showSnackBar({
                type: "success",
                message: "Update table successfully",
              })
            );
            router.push("/backoffice/table");
          },
        })
      );
  }

  function handleDelete() {
    dispatch(
      deleteTable({
        id: tableId,
        onSuccess(data) {
          dispatch(
            showSnackBar({
              type: "success",
              message: "Deleted table successfully.",
            })
          );
          setOpen(false);
          router.push("/backoffice/table");
        },
      })
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" color="error" onClick={() => setOpen(true)}>
          Delete
        </Button>
      </Box>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        title="Delete Table"
        content="Are you sure want to delete this table?"
        handleDelete={handleDelete}
      />

      <Box sx={{ width: 400, display: "flex", flexDirection: "column" }}>
        <CssTextField
          value={updateData?.name}
          sx={{ mb: 2 }}
          onChange={(evt) =>
            setUpdateData({ ...updateData, name: evt.target.value })
          }
        />

        <SingleSelect
          setSelected={setSelected}
          selected={selected}
          title="Location"
          items={locations}
        />

        <Button
          variant="contained"
          sx={{
            mt: 2,
            bgcolor: "#A98467",
            width: "fit-content",
            "&:hover": { bgcolor: "#ba9783" },
          }}
          onClick={handleUpdate}
        >
          Update
        </Button>
      </Box>
      <SnackBar />
    </Box>
  );
};

export default TableDetail;
