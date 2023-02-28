import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(x => x.id === id));
  };

  const cancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleOpen = (id: string = "") => {
    id ? handleSelectActivity(id) : cancelSelectActivity();
    setEditMode(true);
  };

  const handleClose = () => {
    setEditMode(false);
  };

  const createOrEditActivity = (activity: Activity) => {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([
          ...activities.filter(acv => acv.id !== activity.id),
          activity,
        ]);
        setSelectedActivity(activity);
        setSubmitting(false);
        setEditMode(false);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setSubmitting(false);
        setEditMode(false);
      });
    }
  };

  const deleteActivity = (id: string) => {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities(activities.filter(acv => acv.id !== id));
      setSubmitting(false);
    });
  };

  useEffect(() => {
    agent.Activities.list().then(response => {
      let dActivities: Activity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split("T")[0];
        dActivities.push(activity);
      });
      setActivities(dActivities);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingComponent />;

  return (
    <>
      <NavBar openForm={handleOpen} />
      <Container style={{ marginTop: "7rem" }}>
        <ActivityDashboard
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelActivity={cancelSelectActivity}
          activities={activities}
          editMode={editMode}
          openForm={handleOpen}
          closeForm={handleClose}
          createOrEdit={createOrEditActivity}
          deleteActivity={deleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
