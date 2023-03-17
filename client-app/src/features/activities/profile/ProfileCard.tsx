import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";
import { Profile } from "../../../app/models/profile";

type Props = {
  profile: Profile;
};

function ProfileCard({ profile }: Props) {
  const truncate = (text: string | undefined) => {
    if (text) {
      return text.length > 40
        ? text.split(" ").slice(0, 7).join(" ") + " ..."
        : text;
    } else {
      return "No Bio";
    }
  };
  return (
    <Card as={Link} to={`/profiles/${profile.username}`}>
      <Image src={profile.image || `/assets/user.png`} />
      <Card.Content>
        <Card.Header>{profile.displayName}</Card.Header>
        <Card.Description>{truncate(profile.bio)}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="user" />
        {profile.followerCount} followers
      </Card.Content>
    </Card>
  );
}

export default observer(ProfileCard);
