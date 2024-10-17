import {
  MessageRoleEnum,
  TranscriptMessage,
} from "@/lib/types/conversation.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ConversationMessageProps {
  message: TranscriptMessage;
}

export function ConversationMessage({ message }: ConversationMessageProps) {
  const isUser = message.role === MessageRoleEnum.USER;

  return (
    <div className={`flex items-end space-x-2 ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      {!isUser && (
        <Avatar>
          <AvatarImage src="/bot-avatar.png" alt="AI" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}
      <div
        className={`max-w-[80%] p-3 rounded-2xl ${
          isUser
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-gray-200 text-gray-800 rounded-bl-none'
        }`}
      >
        <p className="text-sm">{message.transcript}</p>
      </div>
      {isUser && (
        <Avatar>
          <AvatarImage src="/user-avatar.png" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
