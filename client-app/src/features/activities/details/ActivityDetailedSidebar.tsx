import React from "react";
import { Segment, List, Label, Item, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Activity } from "../../../app/models/activity";

interface Props {
  activity: Activity;
}

export default observer(function ActivityDetailedSidebar({
  activity: { attendees, host},
}: Props) {
  return (
    <>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {attendees?.length} People Going
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {attendees &&
            attendees.map(attendee => (
              <Item key={attendee.username} style={{ position: "relative" }}>
                {attendee.username === host?.username && (
                  <Label
                    style={{ position: "absolute" }}
                    color="orange"
                    ribbon="right"
                  >
                    Host
                  </Label>
                )}

                <Image size="tiny" src={attendee.image || "/assets/user.png"} />
                <Item.Content verticalAlign="middle">
                  <Item.Header as="h3">
                    <Link to={`profile/${attendee.username}`}>
                      {attendee.displayName}
                    </Link>
                  </Item.Header>
                  {
                      attendee.following && (
                        <Item.Extra style={{ color: "orange" }}>Following</Item.Extra>
                      )
                  }
                  
                </Item.Content>
              </Item>
            ))}
        </List>
      </Segment>
    </>
  );
});
