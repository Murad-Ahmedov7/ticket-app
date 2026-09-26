import { useState } from "react";
import ConversationList from "./ConversationList.jsx";
import ChatHeader from "./ChatHeader.jsx";
import MessageList from "./MessageList.jsx";
import MessageComposer from "./MessageComposer.jsx";
import ReactionPicker from "./ReactionPicker.jsx";

export default function ChatView({
  conversations,
  messages,
  activeChatId,
  chatCategory,
  onCategory,
  onSelect,
  onDelete,
  onModal,
  onSend,
  onFile,
  onLocation,
  onVoice,
  onReaction,
  onVote,
  notify,
  reply,
  onReply,
  onCancelReply,
  onTaskDetail,
}) {
  const [reaction, setReaction] = useState(null);
  const [showConversationList, setShowConversationList] = useState(false);
  const conversation = conversations.find((c) => c.id === activeChatId);

  return (
    <div>
      
    </div>
  );
}
