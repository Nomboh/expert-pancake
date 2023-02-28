import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
  activities: Activity[];
  selectActivity: (id: string) => void;
  selectedActivity: Activity | undefined;
  cancelActivity: () => void;
  openForm: (id: string) => void;
  closeForm: () => void;
  editMode: boolean;
  createOrEdit: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}

function ActivityDashboard({
  activities,
  selectActivity,
  selectedActivity,
  cancelActivity,
  openForm,
  closeForm,
  editMode,
  createOrEdit,
  deleteActivity,
  submitting,
}: Props) {
  return (
    <Grid>
      <Grid.Column width={"10"}>
        <ActivityList
          activities={activities}
          deleteActivity={deleteActivity}
          selectActivity={selectActivity}
          submitting={submitting}
        />
      </Grid.Column>

      <Grid.Column width={"6"}>
        {selectedActivity && !editMode && (
          <ActivityDetails
            cancelActivity={cancelActivity}
            activity={selectedActivity}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ActivityForm
            activity={selectedActivity}
            createOrEdit={createOrEdit}
            closeForm={closeForm}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}

export default ActivityDashboard;
