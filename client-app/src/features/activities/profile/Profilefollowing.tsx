import { observer } from "mobx-react-lite";
import { Card, Grid, Header, Tab } from "semantic-ui-react";
import { useStore } from "../../../app/store/store";
import ProfileCard from "./ProfileCard";

type Props = {};

function Profilefollowing(prop: Props) {
  const { profileStore } = useStore();
  const { profile, loadingFollowing, followings, activeTab } = profileStore;

  return (
    <Tab.Pane loading={loadingFollowing}>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon={"user"}
            content={
              activeTab === 3
                ? `${profile?.displayName} followers`
                : `People following ${profile?.displayName}`
            }
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group>
            {followings.map(profile => (
              <ProfileCard key={profile.username} profile={profile} />
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}

export default observer(Profilefollowing);
