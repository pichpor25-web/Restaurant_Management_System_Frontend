const ErrorMessage = ({ message }) =>
  message ? (
    <p className="rounded-lg bg-red-50 p-3 text-sm text-red-800" role="alert">{message}</p>
  ) : null

export default ErrorMessage
