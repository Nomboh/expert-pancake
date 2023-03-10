import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { ActivityFormValues } from "../../../app/models/activity";
import { useStore } from "../../../app/store/store";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as yup from "yup";
import MyTextInput from "../../../app/common/forms/MyTextInput";
import MyTextArea from "../../../app/common/forms/MyTextArea";
import MySelectInput from "../../../app/common/forms/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDatepicker from "../../../app/common/forms/MyDatepicker";

function ActivityForm() {
  const { id } = useParams();
  const {
    activityStore: {
      loadActivity,
      createActivity,
      updateActivity,
      loadingInitial,
    },
  } = useStore();

  const initialState = new ActivityFormValues();

  const [activity, setActivity] = useState<ActivityFormValues>(initialState);

  const navigate = useNavigate();

  const validationSchema = yup.object({
    title: yup.string().required("Title is a required field"),
    description: yup.string().required("Description is a required field"),
    date: yup.string().required("date is required"),
    venue: yup.string().required(),
    city: yup.string().required(),
    category: yup.string().required(),
  });

  useEffect(() => {
    if (id) {
      loadActivity(id).then(activity =>
        setActivity(new ActivityFormValues(activity))
      );
    }
  }, [id, loadActivity]);

  function handleFormSubmit(activity: ActivityFormValues) {
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

  if (loadingInitial) return <LoadingComponent content="loading activity..." />;
  return (
    <Segment clearing>
      <Header content="Activity Details" sub color="teal" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={function (values): void | Promise<any> {
          handleFormSubmit(values);
        }}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name="title" placeholder="Title" />

            <MyTextArea placeholder="Description" name="description" />

            <MySelectInput
              options={categoryOptions}
              placeholder="Category"
              name="category"
            />

            <MyDatepicker
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeCaption="time"
              dateFormat={"MMM d, yyyy h:mm aa"}
            />

            <Header content="Location Details" sub color="teal" />

            <MyTextInput placeholder="City" name="city" />

            <MyTextInput placeholder="Venue" name="venue" />
            <Button
              floated="right"
              loading={isSubmitting}
              positive
              type="submit"
              content="Submit"
              disabled={isSubmitting || !dirty || !isValid}
            />
            <Button
              floated="right"
              type="button"
              content="Cancel"
              as={Link}
              to={"/activities"}
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}

export default observer(ActivityForm);
