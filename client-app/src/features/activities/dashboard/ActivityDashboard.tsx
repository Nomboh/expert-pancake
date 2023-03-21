import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Grid, Loader } from "semantic-ui-react";
import { PagingParams } from "../../../app/models/pagination";
import { useStore } from "../../../app/store/store";
import ActivityFilters from "./ActivityFilter";
import ActivityList from "./ActivityList";
import ActivityPlaceholder from "./ActivityPlaceholder";

function ActivityDashboard() {
  const {
    activityStore: {
      loadingInitial,
      loadActivities,
      activityRegistry,
      pagination,
      setPagingParams,
    },
  } = useStore();

  const [setNextPage, setSetNextPage] = useState(false);

  const handleNextPage = () => {
    setSetNextPage(true);
    setPagingParams(new PagingParams(2, pagination!.currentPage + 1));
    loadActivities().then(() => setSetNextPage(false));
  };

  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities();
  }, [loadActivities, activityRegistry.size]);

  return (
    <Grid>
      <Grid.Column width={"10"}>
        {loadingInitial && !setNextPage ? (
          <>
            <ActivityPlaceholder />
            <ActivityPlaceholder />
          </>
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={handleNextPage}
            hasMore={
              !setNextPage &&
              !!pagination &&
              pagination.currentPage < pagination.totalPages
            }
          >
            <ActivityList />
          </InfiniteScroll>
        )}
      </Grid.Column>

      <Grid.Column width={"6"}>
        <ActivityFilters />
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader content="Loading..." active={setNextPage} />
      </Grid.Column>
    </Grid>
  );
}

export default observer(ActivityDashboard);
