import React from "react";
import { Message } from "semantic-ui-react";

interface Props {
  errors: any;
}

function ValidationError({ errors }: Props) {
  return (
    <Message error>
      {errors && (
        <Message.List>
          {errors.map((error: string, i: any) => (
            <Message.Item key={i} content={error} />
          ))}
        </Message.List>
      )}
    </Message>
  );
}

export default ValidationError;
