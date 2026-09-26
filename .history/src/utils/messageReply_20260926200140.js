// Old replies stored the quote inside the message text. Read them without
// rewriting saved history or guessing an author/message ID that was not saved.
export function getMessageContent(message) {
  const text = message.text || '';
  if (message.replyTo) return { text, replyTo: message.replyTo };

  const legacy = text.match(/^↪ Cavab(?:\s*\(([^)]+)\))?: "([\s\S]*?)"\r?\n([\s\S]*)$/)
    || text.match(/^↪ Cavab: "([\s\S]*?)\.\.\."\r?\n([\s\S]*)$/);

  return legacy
    ? {
        text: legacy[3] || legacy[2],
        replyTo: {
          sender: legacy[1] || 'İstifadəçi',
          text: legacy[2] || legacy[1],
          type: 'text',
        },
      }
    : { text, replyTo: null };
}

export function createReplySnapshot(message) {
  if (!message) return null;
  let text = getMessageContent(message).text;
  if (message.type === 'voice') text = `Səsli mesaj${message.duration ? ` · ${message.duration}` : ''}`;
  else if (message.type === 'poll') text = `Sorğu: ${message.question || 'Sorğu'}`;
  else if (message.image || text.startsWith('📷 Şəkil göndərildi:')) text = message.fileName ? `Şəkil · ${message.fileName}` : 'Şəkil';
  else if (message.fileName) text = message.fileName;
  return {
    id: message.id,
    sender: message.isOutgoing ? 'Siz' : message.sender || 'İştirakçı',
    text: text.slice(0, 500),
    type: message.type || 'text',
  };
}