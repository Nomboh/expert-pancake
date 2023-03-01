import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/store/store";

function ActivityDetails() {
  const { id } = useParams();
  const {
    activityStore: { selectedActivity: activity, loadingInitial, loadActivity },
  } = useStore();

  console.log(activity, loadingInitial);

  useEffect(() => {
    if (id) {
      loadActivity(id);
    }
  }, [loadActivity, id]);

  if (!activity || loadingInitial)
    return <LoadingComponent content="Loading Activity" />;
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            basic
            color="blue"
            content="Edit"
            as={Link}
            to={`/manage/${activity.id}`}
          />
          <Button
            as={Link}
            to={"/activities"}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}

export default observer(ActivityDetails);
