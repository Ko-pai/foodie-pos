import { Box, Typography } from "@mui/material";
import React from "react";
import { useDropzone } from "react-dropzone";

interface Prop {
  onDrop: (file: File[]) => void;
}

const FileDropZone = ({ onDrop }: Prop) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Box
      {...getRootProps()}
      sx={{
        borderRadius: 4,
        border: "3px dotted lightgray",
        p: 1,
        cursor: "pointer",
        height: 70,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag and drop some files here, or click to select files</p>
      )}
    </Box>
  );
};

export default FileDropZone;
