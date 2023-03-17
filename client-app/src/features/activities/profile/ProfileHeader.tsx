import { observer } from "mobx-react-lite";
import React from "react";
import {
  Button,
  Divider,
  Grid,
  GridColumn,
  Header,
  Item,
  Reveal,
  Segment,
  Statistic,
} from "semantic-ui-react";
import { Profile } from "../../../app/models/profile";

type Props = {
  profile: Profile;
};

function ProfileHeader({ profile }: Props) {
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size="small"
                src={profile.image || `/assets/user.png`}
              />
              <Item.Content verticalAlign="middle">
                <Header as="h1" content={profile.displayName} />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>

        <GridColumn width={4}>
          <Statistic.Group>
            <Statistic label="Followers" value={profile.followerCount}/>
            <Statistic label="Following" value={profile.followingCount} />
          </Statistic.Group>

          <Divider />

          <Reveal animated="move">
            <Reveal.Content visible style={{ width: "100%" }}>
              <Button fluid color="teal" content="Following" />
            </Reveal.Content>

            <Reveal.Content hidden style={{ width: "100%" }}>
              <Button
                fluid
                color={true ? "red" : "teal"}
                content={true ? "Unfollow" : "Following"}
                basic
              />
            </Reveal.Content>
          </Reveal>
        </GridColumn>
      </Grid>
    </Segment>
  );
}

export default observer(ProfileHeader);
