import { useField } from "formik";
import React from "react";
import { Form, Label, Select } from "semantic-ui-react";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
  options: any;
}

function MySelectInput(prop: Props) {
  const [field, meta, helpers] = useField(prop.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{prop.label}</label>
      <Select
        clearable
        options={prop.options}
        value={field.value}
        onChange={(e, d) => helpers.setValue(d.value)}
        onBlur={() => helpers.setTouched(true)}
      />

      {meta.touched && meta.error ? (
        <Label basic color="red" content={meta.error} />
      ) : null}
    </Form.Field>
  );
}

export default MySelectInput;
