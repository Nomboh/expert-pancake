import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);

  const [editMode, setEditMode] = useState(false);

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
    activity.id
      ? setActivities([
          ...activities.filter(acv => acv.id !== activity.id),
          activity,
        ])
      : setActivities([...activities, { ...activity, id: uuid() }]);
  };

  const deleteActivity = (id: string) => {
    setActivities(activities.filter(acv => acv.id !== id));
  };

  useEffect(() => {
    axios
      .get<Activity[]>(`http://localhost:5000/api/activities`)
      .then(response => {
        setActivities(response.data);
      });
  }, []);

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
        />
      </Container>
    </>
  );
}

export default App;
