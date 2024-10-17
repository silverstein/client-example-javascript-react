import { FunctionCallResultMessage } from "../../lib/types/conversation.type";

interface FunctionCallResultMessageProps {
  message: FunctionCallResultMessage;
}

export default function FunctionCallResult({
  message,
}: FunctionCallResultMessageProps) {
  return (
    <div className="flex justify-center">
      <div className="max-w-[80%] p-3 rounded-lg bg-green-100 text-green-800">
        <p className="text-sm">{message.functionCallResult.result}</p>
      </div>
    </div>
  );
}
