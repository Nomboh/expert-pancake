import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/store/store";
import ActivityFilters from "./ActivityFilter";
import ActivityList from "./ActivityList";

function ActivityDashboard() {
  const {
    activityStore: { loadingInitial, loadActivities, activityRegistry },
  } = useStore();

  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities();
  }, [loadActivities, activityRegistry.size]);

  if (loadingInitial)
    return <LoadingComponent content="Loading Activities ..." />;
  return (
    <Grid>
      <Grid.Column width={"10"}>
        <ActivityList />
      </Grid.Column>

      <Grid.Column width={"6"}>
        <ActivityFilters />
      </Grid.Column>
    </Grid>
  );
}

export default observer(ActivityDashboard);
