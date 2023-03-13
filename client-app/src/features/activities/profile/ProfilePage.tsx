import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/store/store";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";

function ProfilePage() {
  const { username } = useParams<string>();
  const {
    profileStore: { profile, loadProfile, loadingProfile },
  } = useStore();

  useEffect(() => {
    if (username) {
      loadProfile(username);
    }
  }, [loadProfile, username]);

  if (loadingProfile) return <LoadingComponent content="Loading Profile ..." />;

  return (
    <Grid>
      <Grid.Column width={16}>
        {profile && (
          <>
            <ProfileHeader profile={profile} />
            <ProfileContent profile={profile} />
          </>
        )}
      </Grid.Column>
    </Grid>
  );
}

export default observer(ProfilePage);
