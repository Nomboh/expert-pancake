import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Button, Grid, Header} from "semantic-ui-react";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";

type Props = {
  handlePhotoUpload: (file: Blob | null) => void;
  uploading: boolean;
};

function PhotoUploadWidget({ handlePhotoUpload, uploading }: Props) {
  const [files, setFiles] = useState<any>([]);
  const [cropper, setCropper] = useState<Cropper>();

  function onCrop() {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob(blob => handlePhotoUpload(blob));
    }
  }

  useEffect(() => {
    return () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <Grid>
      <Grid.Column width={4}>
        <Header sub color="teal" content={"Step 1 - Add Photo"} />
        <PhotoWidgetDropzone setFiles={setFiles} />
      </Grid.Column>

      <Grid.Column width={1} />

      <Grid.Column width={4}>
        <Header sub color="teal" content={"Step 1 - Resize Photo"} />
        {files && files.length > 0 && (
          <PhotoWidgetCropper
            setCropper={setCropper}
            imagePreview={files[0].preview}
          />
        )}
      </Grid.Column>

      <Grid.Column width={1} />

      <Grid.Column width={4}>
        <Header sub color="teal" content={"Step 1 - Preview & Upload"} />
        {files && files.length > 0 && (
          <>
            <div
              className="img-preview"
              style={{ minHeight: 200, overflow: "hidden" }}
            />
            <Button.Group widths={2}>
              <Button
                onClick={onCrop}
                loading={uploading}
                color="green"
                icon="check"
              />
              <Button
                disabled={uploading}
                onClick={() => setFiles([])}
                icon="close"
              />
            </Button.Group>
          </>
        )}
      </Grid.Column>
    </Grid>
  );
}

export default observer(PhotoUploadWidget);
