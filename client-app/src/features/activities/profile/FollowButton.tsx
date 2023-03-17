import { observer } from "mobx-react-lite";
import React, { SyntheticEvent } from "react";
import { Reveal, Button } from "semantic-ui-react";
import { Profile } from "../../../app/models/profile";
import { useStore } from "../../../app/store/store";

interface Props {
  profile: Profile;
}

function FollowButton({ profile }: Props) {
  const { profileStore, userStore } = useStore();
  const { updateFollowings, loading } = profileStore;

  const handleFollow = (e: SyntheticEvent, username: string) => {
    e.preventDefault();
    profile.following
      ? updateFollowings(username, false)
      : updateFollowings(username, true);
  };

  if (userStore.user?.username === profile.username) return null;
  return (
    <Reveal animated="move">
      <Reveal.Content visible style={{ width: "100%" }}>
        <Button
          fluid
          color="teal"
          content={profile.following ? "Following" : "Not Following"}
        />
      </Reveal.Content>

      <Reveal.Content hidden style={{ width: "100%" }}>
        <Button
          fluid
          color={profile.following ? "red" : "teal"}
          content={profile.following ? "Unfollow" : "Following"}
          basic
          loading={loading}
          onClick={e => handleFollow(e, profile.username)}
        />
      </Reveal.Content>
    </Reveal>
  );
}

export default observer(FollowButton);
