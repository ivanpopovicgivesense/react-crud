import { Error } from "./App";

type ErrorMessageProps = {
  message: string | Error;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  const errorMessage =
    typeof message === "string"
      ? message
      : message.status
      ? `${message.message} (Status: ${message.status})`
      : message.message;

  return (
    <div style={{ color: "#e50000", margin: "20px 0" }}>
      <h2>Error:</h2>
      <p>{errorMessage}</p>
    </div>
  );
};

export default ErrorMessage;
