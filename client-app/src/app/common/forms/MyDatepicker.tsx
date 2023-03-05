import { useField } from "formik";
import React from "react";
import { Form, Label } from "semantic-ui-react";
import ReactDatePicker, {
  ReactDatePickerProps as Props,
} from "react-datepicker";

function MyDatepicker(prop: Partial<Props>) {
  const [field, meta, helpers] = useField(prop.name!);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <ReactDatePicker
        {...field}
        {...prop}
        onChange={date => helpers.setValue(date)}
        selected={(field.value && new Date(field.value)) || null}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red" content={meta.error} />
      ) : null}
    </Form.Field>
  );
}

export default MyDatepicker;
