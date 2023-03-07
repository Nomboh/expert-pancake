import { useField } from "formik";
import React from "react";
import { Form, Label } from "semantic-ui-react";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
  type?: string;
}

function MyTextInput(prop: Props) {
  const [field, meta] = useField(prop.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{prop.label}</label>
      <input {...field} {...prop} />
      {meta.touched && meta.error ? (
        <Label basic color="red" content={meta.error} />
      ) : null}
    </Form.Field>
  );
}

export default MyTextInput;
