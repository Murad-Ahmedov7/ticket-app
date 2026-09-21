import { useState } from 'react';
import ConversationList from './ConversationList.jsx';
import ChatHeader from './ChatHeader.jsx';
import MessageList from './MessageList.jsx';
import MessageComposer from './MessageComposer.jsx';
import ReactionPicker from './ReactionPicker.jsx';

export default function ChatView({ conversations, messages, activeChatId, chatCategory, onCategory, onSelect, onDelete, onModal, 
  onSend, onFile, onLocation, onVoice, onReaction, onVote, notify, reply, onReply, onCancelReply, onTaskDetail }) {
  
    const [reaction, setReaction] = useState(null);
    const conversation = conversations.find(c => c.id === activeChatId);
  return <section className="flex-1 flex h-full overflow-hidden min-w-0">
    <ConversationList conversations={conversations} activeChatId={activeChatId} chatCategory={chatCategory} onCategory={onCategory} onSelect={onSelect} onDelete={onDelete} onNewChat={() => onModal('newChat')} />
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-slate-950 overflow-hidden min-w-0 relative">
      {conversation && <>
        <ChatHeader conversation={conversation} onCall={() => onModal('audioCall')} onCreateTask={() => onModal('createTask')} onInfo={() => onModal('chatInfo')} onAddMember={() => onModal('groupBulk')} />
        <MessageList messages={messages[activeChatId] || []} activeChatId={activeChatId} onReactionPicker={(event, id) => { event.stopPropagation(); const rect = event.currentTarget.getBoundingClientRect(); setReaction({ id, top: rect.top, left: rect.left }); }} onReaction={onReaction} onReply={onReply} onEdit={message => onModal('editMessage', message)} onCreateTask={message => onModal('createTask', { title: message.text?.slice(0, 30) || 'Söhbət tapşırığı', comment: `Mesajdan yaradıldı: "${message.text || ''}"` })} onTaskDetail={onTaskDetail} onVote={onVote} notify={notify} />
        <MessageComposer reply={reply} onCancelReply={onCancelReply} onSend={onSend} onFile={onFile} onLocation={onLocation} onPoll={() => onModal('poll')} onVoice={onVoice} notify={notify} />
      </>}
      {reaction && <ReactionPicker position={reaction} onClose={() => setReaction(null)} onReact={emoji => { onReaction(reaction.id, emoji); setReaction(null); }} />}
    </div>
  </section>;
}
