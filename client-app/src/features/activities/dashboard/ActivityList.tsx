import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/store/store";

function ActivityList() {
  const {
    activityStore: { selectActivity, loading, deleteActivity },
  } = useStore();
  const {
    activityStore: { getActivitiesByDate },
  } = useStore();
  const [target, setTarget] = useState("");

  const handleDelete = (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  };

  return (
    <Segment>
      <Item.Group divided>
        {getActivitiesByDate.map(activity => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city} {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  floated="right"
                  onClick={() => selectActivity(activity.id)}
                  content="View"
                  color="blue"
                />
                <Button
                  floated="right"
                  onClick={e => handleDelete(e, activity.id)}
                  loading={loading && target === activity.id}
                  name={activity.id}
                  content="Delete"
                  color="red"
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}

export default observer(ActivityList);
