import { useState } from 'react';
import ConversationList from './ConversationList.jsx';
import ChatHeader from './ChatHeader.jsx';
import MessageList from './MessageList.jsx';
import MessageComposer from './MessageComposer.jsx';
import ReactionPicker from './ReactionPicker.jsx';

export default function ChatView({ conversations, messages, activeChatId, chatCategory, onCategory, onSelect, onDelete, onModal, 
  onSend, onFile, onLocation, onVoice, onReaction, onVote, notify, reply, onReply, onCancelReply, onTaskDetail }) {
  
    const [reaction, setReaction] = useState(null);
    const [showConversationList, setShowConversationList] = useState(false);
    const conversation = conversations.find(c => c.id === activeChatId);
  
  return <section className="chat-layout flex-1 flex flex-col h-full overflow-hidden min-w-0" data-list-open={showConversationList || !conversation}>
    <nav className="chat-view-tabs shrink-0 gap-2 border-b border-slate-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-900" aria-label="Söhbət görünüşü">
      <button type="button" aria-pressed={showConversationList || !conversation} onClick={() => { setShowConversationList(true); setReaction(null); }} className="min-w-0 flex-1 rounded-lg px-3 py-2 text-xs font-bold text-slate-600 aria-pressed:bg-slate-100 aria-pressed:text-slate-900 dark:text-slate-200 dark:aria-pressed:bg-slate-800 dark:aria-pressed:text-white">Söhbətlər</button>
      <button type="button" disabled={!conversation} aria-pressed={!showConversationList && !!conversation} onClick={() => setShowConversationList(false)} className="min-w-0 flex-1 truncate rounded-lg px-3 py-2 text-xs font-bold text-slate-600 aria-pressed:bg-slate-100 aria-pressed:text-slate-900 disabled:opacity-40 dark:text-slate-200 dark:aria-pressed:bg-slate-800 dark:aria-pressed:text-white">{conversation?.name || 'Mesajlar'}</button>
    </nav>
    <div className="chat-workspace flex min-h-0 min-w-0 flex-1" data-list-open={showConversationList || !conversation}>
    <div className="chat-conversations">
    <ConversationList conversations={conversations} activeChatId={activeChatId} chatCategory={chatCategory} onCategory={onCategory} onSelect={id => { onSelect(id); setShowConversationList(false); setReaction(null); }} onDelete={onDelete} onNewChat={() => onModal('newChat')} />
    </div>
    <div className="chat-panel flex-1 flex flex-col h-full bg-white dark:bg-[#0B1120] overflow-hidden min-w-0 relative">
      {conversation && <>
        <ChatHeader onShowConversations={() => setShowConversationList(true)} conversation={conversation} onCall={() => onModal('audioCall')} onCreateTask={() => onModal('createTask')} onInfo={() => onModal('chatInfo')} onAddMember={() => onModal('groupBulk')} />
        <MessageList messages={messages[activeChatId] || []} activeChatId={activeChatId} onReactionPicker={(event, id) => { event.stopPropagation(); const rect = event.currentTarget.getBoundingClientRect(); setReaction({ id, top: rect.top, left: rect.left }); }} onReaction={onReaction} onReply={onReply} onEdit={message => onModal('editMessage', message)} onCreateTask={message => onModal('createTask', { title: message.text?.slice(0, 30) || 'Söhbət tapşırığı', comment: `Mesajdan yaradıldı: "${message.text || ''}"` })} onTaskDetail={onTaskDetail} onVote={onVote} notify={notify} />
        <MessageComposer reply={reply} onCancelReply={onCancelReply} onSend={onSend} onFile={onFile} onLocation={onLocation} onPoll={() => onModal('poll')} onVoice={onVoice} notify={notify} />
      </>}
      {reaction && <ReactionPicker position={reaction} onClose={() => setReaction(null)} onReact={emoji => { onReaction(reaction.id, emoji); setReaction(null); }} />}
    </div>
    </div>
  </section>;
}
