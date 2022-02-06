import { useGlobalContext } from "./context";
const MessageProp = () => {
  const { message } = useGlobalContext();
  return (
    <div
      className={`flex w-full left-0 top-16 space-y-4  flex-col items-center ${
        message.isError === true ? "bg-red-400/80" : "bg-green-600/80"
      }  text-gray-100 absolute`}
    >
      <h1 className={`font-bold text-xl uppercase`}>{message.isError ? "Error" : "Success"}</h1>
      <p>{message.message}</p>
    </div>
  );
};
export default MessageProp;
