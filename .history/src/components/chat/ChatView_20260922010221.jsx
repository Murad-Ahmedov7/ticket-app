import { useState } from 'react';
import ConversationList from './ConversationList.jsx';
import ChatHeader from './ChatHeader.jsx';
import MessageList from './MessageList.jsx';
import MessageComposer from './MessageComposer.jsx';
import ReactionPicker from './ReactionPicker.jsx';

import { useState } from 'react';
import ConversationList from './ConversationList.jsx';
import ChatHeader from './ChatHeader.jsx';
import MessageList from './MessageList.jsx';
import MessageComposer from './MessageComposer.jsx';
import ReactionPicker from './ReactionPicker.jsx';

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
  onToggleSidebar, // Sidebar-ı açıb-bağlama funksiyası
}) {
  const [reaction, setReaction] = useState(null);
  const conversation = conversations.find((c) => c.id === activeChatId);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
      {/* 1. ƏN ÜST ZOLAQLAR: Hamburger Düyməsi və Altındakı Ayırıcı Xətt */}
      <header className="h-14 px-4 bg-white/95 dark:bg-slate-900/95 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between shrink-0 z-20 backdrop-blur select-none">
        <div className="flex items-center gap-3">
          {/* Gömrük tərzi tünd kvadrat Hamburger düyməsi */}
          <button
            onClick={onToggleSidebar}
            title="Menyunu Aç / Bağla"
            className="w-10 h-10 rounded-xl bg-[#1e2329] hover:bg-[#2b323a] text-slate-200 flex flex-col items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer border border-white/10 shrink-0"
          >
            <span className="w-5 h-[2px] bg-slate-200 rounded-sm" />
            <span className="w-5 h-[2px] bg-slate-200 rounded-sm" />
            <span className="w-5 h-[2px] bg-slate-200 rounded-sm" />
          </button>
        </div>
      </header>

      {/* 2. ƏSAS MƏZMUN (Siyahı və Aktiv Çat Pəncərəsi) */}
      <section className="flex-1 flex h-[calc(100%-3.5rem)] overflow-hidden min-w-0">
        <ConversationList
          conversations={conversations}
          activeChatId={activeChatId}
          chatCategory={chatCategory}
          onCategory={onCategory}
          onSelect={onSelect}
          onDelete={onDelete}
          onNewChat={() => onModal('newChat')}
        />

        <div className="flex-1 flex flex-col h-full bg-white dark:bg-slate-950 overflow-hidden min-w-0 relative">
          {conversation && (
            <>
              <ChatHeader
                conversation={conversation}
                onCall={() => onModal('audioCall')}
                onCreateTask={() => onModal('createTask')}
                onInfo={() => onModal('chatInfo')}
                onAddMember={() => onModal('groupBulk')}
              />
              <MessageList
                messages={messages[activeChatId] || []}
                activeChatId={activeChatId}
                onReactionPicker={(event, id) => {
                  event.stopPropagation();
                  const rect = event.currentTarget.getBoundingClientRect();
                  setReaction({ id, top: rect.top, left: rect.left });
                }}
                onReaction={onReaction}
                onReply={onReply}
                onEdit={(message) => onModal('editMessage', message)}
                onCreateTask={(message) =>
                  onModal('createTask', {
                    title: message.text?.slice(0, 30) || 'Söhbət tapşırığı',
                    comment: `Mesajdan yaradıldı: "${message.text || ''}"`,
                  })
                }
                onTaskDetail={onTaskDetail}
                onVote={onVote}
                notify={notify}
              />
              <MessageComposer
                reply={reply}
                onCancelReply={onCancelReply}
                onSend={onSend}
                onFile={onFile}
                onLocation={onLocation}
                onPoll={() => onModal('poll')}
                onVoice={onVoice}
                notify={notify}
              />
            </>
          )}

          {reaction && (
            <ReactionPicker
              position={reaction}
              onClose={() => setReaction(null)}
              onReact={(emoji) => {
                onReaction(reaction.id, emoji);
                setReaction(null);
              }}
            />
          )}
        </div>
      </section>
    </div>
  );
}