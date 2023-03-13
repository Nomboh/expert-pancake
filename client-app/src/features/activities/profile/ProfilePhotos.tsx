import { observer } from "mobx-react-lite";
import React, { useState, SyntheticEvent } from "react";
import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react";
import PhotoUploadWidget from "../../../app/common/imageUpload/PhotoUploadWidget";
import { Photo, Profile } from "../../../app/models/profile";
import { useStore } from "../../../app/store/store";

type Props = {
  profile: Profile;
};

function ProfilePhotos({ profile }: Props) {
  const {
    profileStore: {
      isCurrentUser,
      uploadPhoto,
      uploading,
      loading,
      setMainPhoto,
      deletePhoto,
    },
  } = useStore();
  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [target, setTarget] = useState("");

  const handlePhotoUpload = (file: Blob | null) => {
    if (file) {
      uploadPhoto(file).then(() => setAddPhotoMode(false));
    }
  };

  const handleSetMainPhoto = (
    e: SyntheticEvent<HTMLButtonElement>,
    photo: Photo
  ) => {
    setTarget(e.currentTarget.name);
    setMainPhoto(photo);
  };

  const handleDeletePhoto = (
    e: SyntheticEvent<HTMLButtonElement>,
    photo: Photo
  ) => {
    setTarget(e.currentTarget.name);
    deletePhoto(photo);
  };

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header icon={"image"} content="Photos" floated="left" />
          {isCurrentUser && (
            <Button
              floated="right"
              content={addPhotoMode ? "Cancel" : "Add Photo"}
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            />
          )}
        </Grid.Column>

        <Grid.Column width={16}>
          {addPhotoMode ? (
            <PhotoUploadWidget
              handlePhotoUpload={handlePhotoUpload}
              uploading={uploading}
            />
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile.photos?.map(photo => (
                <Card key={photo.id}>
                  <Image src={photo.url || `/assets/user.png`} />
                  {isCurrentUser && (
                    <Button.Group fluid widths={2} positive>
                      <Button
                        basic
                        color="green"
                        content="Main"
                        name={photo.id}
                        disabled={photo.isMain}
                        loading={target === photo.id && loading}
                        onClick={e => handleSetMainPhoto(e, photo)}
                      />

                      <Button
                        basic
                        disabled={photo.isMain}
                        name={photo.id + "del"}
                        loading={target === photo.id + "del" && loading}
                        onClick={e => handleDeletePhoto(e, photo)}
                        color="red"
                        icon="trash"
                      />
                    </Button.Group>
                  )}
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}

export default observer(ProfilePhotos);
