import { useState } from 'react';
import Icon from '../common/Icons.jsx';

export default function ConversationList({ conversations, activeChatId, chatCategory, onCategory, onSelect, onDelete, onNewChat }) {
  const [search, setSearch] = useState('');
  const list = conversations.filter(c => (chatCategory === 'all' || (chatCategory === 'unread' ? c.unread > 0 : c.type === chatCategory)) && `${c.name} ${c.lastSnippet}`.toLowerCase().includes(search.toLowerCase()));
  return (
 <>
 </>
  );
}
