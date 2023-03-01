import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/store/store";
import { v4 as uuid } from "uuid";

function ActivityForm() {
  const { id } = useParams();
  const {
    activityStore: {
      loadActivity,
      createActivity,
      updateActivity,
      loading,
      loadingInitial,
    },
  } = useStore();

  const initialState = {
    id: "",
    description: "",
    title: "",
    category: "",
    date: "",
    city: "",
    venue: "",
  };

  const [activity, setActivity] = useState<Activity>(initialState);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      loadActivity(id).then(activity => setActivity(activity!));
    }
  }, [id, loadActivity]);

  function handleSubmit() {
    if (activity.id) {
      updateActivity(activity).then(() =>
        navigate(`/activities/${activity.id}`)
      );
    } else {
      activity.id = uuid();
      createActivity(activity).then(() =>
        navigate(`/activities/${activity.id}`)
      );
    }
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }

  if (loadingInitial) return <LoadingComponent content="loading activity..." />;
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          name="title"
          value={activity.title}
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder="Description"
          name="description"
          value={activity.description}
          onChange={handleInputChange}
        />

        <Form.Input
          placeholder="Category"
          name="category"
          value={activity.category}
          onChange={handleInputChange}
        />

        <Form.Input
          placeholder="Date"
          name="date"
          type="date"
          value={activity.date}
          onChange={handleInputChange}
        />

        <Form.Input
          placeholder="City"
          name="city"
          value={activity.city}
          onChange={handleInputChange}
        />

        <Form.Input
          placeholder="Venue"
          name="venue"
          value={activity.venue}
          onChange={handleInputChange}
        />
        <Button
          floated="right"
          loading={loading}
          positive
          type="submit"
          content="Submit"
        />
        <Button
          floated="right"
          type="button"
          content="Cancel"
          as={Link}
          to={"/activities"}
        />
      </Form>
    </Segment>
  );
}

export default observer(ActivityForm);
