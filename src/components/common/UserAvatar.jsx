import { createContext, useContext, useMemo, useState } from 'react';
import { getAvatarByGender, neutralAvatars, resolveAvatarUser } from '../../utils/avatars.js';
const AvatarDirectory = createContext([]);

export function AvatarProvider({ users = [], employees = [], approvals = [], conversations = [], tasks = [], children }) {
  const records = useMemo(() => [
    ...users, ...employees, ...approvals,
    ...conversations.filter(chat => chat.type !== 'group').map(({ id, ...user }) => user),
    ...tasks.flatMap(task => [
      { name: task.assignee, avatar: task.assigneeAvatar },
      { name: task.creator, avatar: task.creatorAvatar },
    ]),
  ], [users, employees, approvals, conversations, tasks]);
  return <AvatarDirectory.Provider value={records}>{children}</AvatarDirectory.Provider>;
}

export default function UserAvatar({ user, className = '', alt = '', ...props }) {
  const records = useContext(AvatarDirectory);
  const source = getAvatarByGender(resolveAvatarUser(user, records));
  const [failedSource, setFailedSource] = useState(null);
  return <img {...props} src={failedSource === source ? neutralAvatars[0] : source}
    alt={alt} loading="lazy" referrerPolicy="no-referrer"
    onError={() => setFailedSource(source)}
    className={`shrink-0 object-cover ${className}`} />;
}
