import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { List, Image, Popup } from "semantic-ui-react";
import { Profile } from "../../../app/models/profile";
import ProfileCard from "../profile/ProfileCard";

type Props = {
  attendee: Profile[];
};

function ActivityListItemAttendee({ attendee }: Props) {
  return (
    <List horizontal>
      {attendee &&
        attendee.map(attendant => (
          <Popup
            hoverable
            key={attendant.username}
            trigger={
              <List.Item
                key={attendant.username}
                as={Link}
                to={`/profile/${attendant.username}`}
              >
                <Image
                  circular
                  src={attendant.image || `/assets/user.png`}
                  size="mini"
                />
              </List.Item>
            }
          >
            <Popup.Content>
              <ProfileCard profile={attendant} />
            </Popup.Content>
          </Popup>
        ))}
    </List>
  );
}

export default observer(ActivityListItemAttendee);
