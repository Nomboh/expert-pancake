import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Header, Icon } from "semantic-ui-react";

interface Props {
  setFiles: (files: any) => void;
}

function PhotoWidgetDropzone({ setFiles }: Props) {
  const dzStyles = {
    border: "dashed 3px #eee",
    borderColor: "#eee",
    borderRadius: "5px",
    padding: "30px",
    textAlign: "center" as "center",
    height: 200,
  };

  const dzActive = {
    borderColor: "green",
  };

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      setFiles(
        acceptedFiles.map((file: any) => {
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
        })
      );
    },
    [setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      style={isDragActive ? { ...dzActive, ...dzActive } : dzStyles}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Icon name="upload" size="huge" />
      <Header content="Drop image here!!" />
    </div>
  );
}

export default PhotoWidgetDropzone;
