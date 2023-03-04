import React from "react";
import { Message } from "semantic-ui-react";

interface Props {
  errors: string[];
}

function ValidationError({ errors }: Props) {
  return (
    <Message error>
      {errors &&
        errors.map((error: string, i) => (
          <Message.Item key={i} content={error} />
        ))}
    </Message>
  );
}

export default ValidationError;
