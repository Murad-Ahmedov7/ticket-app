import { createReplySnapshot, getMessageContent } from './utils/messageReply.js';
import { useCallback, useEffect, useState } from 'react';
import { initialState } from './data/initialState.js';
import { loadStore, storeKeys, newMessage, messageTime, normalizeTaskStatus, taskStatuses } from './utils/helpers.js';
import Sidebar from './components/Sidebar.jsx';
import ChatView from './components/chat/ChatView.jsx';
import TasksView from './components/tasks/TasksView.jsx';
import OperatorView from './components/operator/OperatorView.jsx';
import GroupsView from './components/groups/GroupsView.jsx';
import CompaniesView from './components/companies/CompaniesView.jsx';
import UsersView from './components/users/UsersView.jsx';
import EmployeesView from './components/employees/EmployeesView.jsx';
import ToastContainer from './components/common/ToastContainer.jsx';
import AudioCallModal from './components/modals/AudioCallModal.jsx';
import PollModal from './components/modals/PollModal.jsx';
import CreateTaskModal from './components/modals/CreateTaskModal.jsx';
import TaskDetailModal from './components/modals/TaskDetailModal.jsx';
import EditMessageModal from './components/modals/EditMessageModal.jsx';
import NewChatModal from './components/modals/NewChatModal.jsx';
import ChatInfoModal from './components/modals/ChatInfoModal.jsx';
import GroupBulkModal from './components/modals/GroupBulkModal.jsx';
import CreateCompanyModal from './components/modals/CreateCompanyModal.jsx';
import EditCompanyModal from './components/modals/EditCompanyModal.jsx';
import CreateUserModal from './components/modals/CreateUserModal.jsx';
import CreateEmployeeModal from './components/modals/CreateEmployeeModal.jsx';
import EditEmployeeModal from './components/modals/EditEmployeeModal.jsx';
import CreateGroupModal from './components/modals/CreateGroupModal.jsx';
import RegisterRequestModal from './components/modals/RegisterRequestModal.jsx';

export default function App() {
  const [store, setStore] = useState(() => loadStore(initialState));
  const [activeView, setActiveView] = useState('chat');
  const [activeChatId, setActiveChatId] = useState(() => store.conversations.some(c => c.id === 'test_group') ? 'test_group' : store.conversations[0]?.id || null);
  const [chatCategory, setChatCategory] = useState('all');
  const [calendarYear, setCalendarYear] = useState(2026);
  const [calendarMonth, setCalendarMonth] = useState(8);
  const [operatorTab, setOperatorTab] = useState('all');
  const [replyingToMessage, setReplyingToMessage] = useState(null);
  const [modal, setModal] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches); }
    catch { return false; }
  });

  useEffect(() => {
    try { localStorage.setItem('halal_platform_store', JSON.stringify(Object.fromEntries(storeKeys.map(key => [key, store[key]])))); }
    catch (error) { console.warn('LocalStorage save failed:', error); }
  }, [store]);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); }
    catch (error) { console.warn('Theme save failed:', error); }
  }, [dark]);

  const notify = useCallback(message => setToasts(items => [...items, { id: crypto.randomUUID(), message }]), []);
  const dismissToast = useCallback(id => setToasts(items => items.filter(item => item.id !== id)), []);
  const openModal = (type, data = {}) => setModal({ type, data });
  const closeModal = () => setModal(null);
  const conversation = store.conversations.find(c => c.id === activeChatId);
  const detailTask = modal?.type === 'taskDetail' ? store.tasks.find(task => task.id === modal.data.id) : null;

  function selectConversation(id) {
    setActiveChatId(id);
    setReplyingToMessage(null);
    setStore(previous => ({ ...previous, conversations: previous.conversations.map(c => c.id === id ? { ...c, unread: 0 } : c) }));
  }

  function deleteConversation(id) {
    const remaining = store.conversations.filter(c => c.id !== id);
    setStore(previous => ({ ...previous, conversations: previous.conversations.filter(c => c.id !== id) }));
    if (id === activeChatId) setActiveChatId(remaining[0]?.id || null);
    notify('Söhbət bağlandı');
  }

  function appendMessage(message, chatId = activeChatId) {
    if (!chatId) return;
    setStore(previous => ({ ...previous, messages: { ...previous.messages, [chatId]: [...(previous.messages[chatId] || []), message] } }));
  }

  function sendMessage(text) {
    const message = newMessage({ text, replyTo: createReplySnapshot(replyingToMessage), time: messageTime() });
    setStore(previous => ({
      ...previous,
      messages: { ...previous.messages, [activeChatId]: [...(previous.messages[activeChatId] || []), message] },
      conversations: previous.conversations.map(c => c.id === activeChatId ? { ...c, lastSnippet: text, time: message.time } : c),
    }));
    setReplyingToMessage(null);
    notify('Mesaj göndərildi');
  }

  function attachFile(file) {
    const chatId = activeChatId;
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        appendMessage(newMessage({ text: '📷 Şəkil göndərildi:', image: reader.result, fileName: file.name, time: messageTime() }), chatId);
        notify(`"${file.name}" göndərildi`);
      };
      reader.readAsDataURL(file);
    } else {
      appendMessage(newMessage({ text: `📎 Sənəd əlavə edildi: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`, time: messageTime() }), chatId);
      notify(`"${file.name}" göndərildi`);
    }
  }

  function reactToMessage(id, emoji) {
    const exists = store.messages[activeChatId]?.find(message => message.id === id)?.reactions?.[emoji];
    setStore(previous => ({ ...previous, messages: { ...previous.messages, [activeChatId]: (previous.messages[activeChatId] || []).map(message => {
      if (message.id !== id) return message;
      const reactions = { ...message.reactions };
      if (reactions[emoji]) delete reactions[emoji]; else reactions[emoji] = 1;
      return { ...message, reactions };
    }) } }));
    notify(`${emoji} reaksiyası ${exists ? 'silindi' : 'əlavə edildi'}`);
  }

  function editMessage(id, text) {
    setStore(previous => ({ ...previous, messages: { ...previous.messages, [activeChatId]: previous.messages[activeChatId].map(message => message.id === id ? { ...message, replyTo: getMessageContent(message).replyTo, text: `${text} (redaktə edildi)` } : message) } }));
    closeModal();
    notify('Mesaj redaktə edildi');
  }

  function voteOnPoll(id, optionId) {
    const poll = store.messages[activeChatId]?.find(message => message.id === id);
    if (!poll || poll.type !== 'poll') return;
    if (poll.userVoted === optionId) return notify('Siz artıq bu varianta səs vermisiniz');
    setStore(previous => ({ ...previous, messages: { ...previous.messages, [activeChatId]: previous.messages[activeChatId].map(message => message.id !== id ? message : {
      ...message, userVoted: optionId,
      options: message.options.map(option => ({ ...option, votes: option.id === optionId ? option.votes + 1 : option.id === message.userVoted ? Math.max(0, option.votes - 1) : option.votes })),
    }) } }));
    notify('Səsiniz qeydə alındı!');
  }

  function createPoll(question, option1, option2) {
    appendMessage(newMessage({ type: 'poll', pollId: `poll_${Date.now()}`, question, options: [{ id: 'opt_1', text: option1, votes: 1 }, { id: 'opt_2', text: option2, votes: 0 }], userVoted: 'opt_1' }));
    closeModal();
    notify('Yeni sorğu dərc edildi!');
  }

  function newDirectChat(name, text) {
    const id = `user_${name.toLowerCase().replace(/\s+/g, '_')}`;
    const existing = store.conversations.find(c => c.id === id);
    const chat = existing || { id, name, type: 'direct', lastSnippet: text || 'Söhbət başladıldı', time: 'İndi', unread: 0, avatarGradient: 'from-violet-500 to-indigo-600', membersCount: 2, members: [name, 'Siz'] };
    setStore(previous => ({ ...previous,
      conversations: existing ? previous.conversations.map(c => c.id === id ? { ...c, unread: 0, lastSnippet: text || c.lastSnippet } : c) : [chat, ...previous.conversations],
      messages: { ...previous.messages, [id]: [...(existing ? previous.messages[id] || [] : []), ...(text ? [newMessage({ text })] : [])] },
    }));
    setActiveChatId(id);
    closeModal();
    notify(`"${name}" ilə söhbət başladıldı`);
  }

  function newGroupChat(name, members) {
    const id = `group_${Date.now()}`;
    const chat = { id, name, type: 'group', lastSnippet: 'Yeni qrup yaradıldı', time: 'İndi', unread: 0, avatarGradient: 'from-brand-600 to-indigo-600', membersCount: members.length, members };
    setStore(previous => ({ ...previous, conversations: [chat, ...previous.conversations], messages: { ...previous.messages, [id]: [newMessage({ text: `"${name}" qrupu yaradıldı. İştirakçılar: ${members.join(', ')}` })] } }));
    setActiveChatId(id);
    closeModal();
    notify(`"${name}" qrupu uğurla yaradıldı`);
  }

  function clearChat() {
    if (!confirm('Bu söhbətin bütün mesajlarını silmək istədiyinizə əminsiniz?')) return;
    setStore(previous => ({ ...previous, messages: { ...previous.messages, [activeChatId]: [] }, conversations: previous.conversations.map(c => c.id === activeChatId ? { ...c, lastSnippet: 'Mesaj yoxdur' } : c) }));
    closeModal();
    notify('Söhbət təmizləndi');
  }

  function createTask(values) {
    let id = Math.floor(100 + Math.random() * 900);
    while (store.tasks.some(task => task.id === id)) id += 1;
    const task = { id, title: values.title, message: values.comment || values.title, creator: 'Emil Xanciqazov', createdAt: `14-09-2026 ${values.time}`, deadline: `${values.date.split('-').reverse().join('-')} ${values.time}`, assignee: values.assignee, status: 'Gözləmədə', equipment: values.equipment };
    setStore(previous => ({ ...previous, tasks: [task, ...previous.tasks], messages: previous.messages[activeChatId] ? { ...previous.messages, [activeChatId]: [...previous.messages[activeChatId], newMessage({ text: `Yeni tapşırıq yaradıldı: ${task.title}`, embeddedTask: { id, title: task.title, deadline: task.deadline } })] } : previous.messages }));
    closeModal();
    notify(`Tapşırıq #${id} uğurla yaradıldı`);
  }

  function setTaskStatus(id, status) {
    setStore(previous => ({ ...previous, tasks: previous.tasks.map(task => task.id === id ? { ...task, status } : task) }));
    notify(`Status yeniləndi: "${status}"`);
  }

  function cycleTaskStatus(id) {
    const task = store.tasks.find(item => item.id === id);
    if (!task) return;

    const currentStatus = normalizeTaskStatus(task.status);
    const currentIndex = taskStatuses.indexOf(currentStatus);
    const nextStatus = taskStatuses[(currentIndex + 1) % taskStatuses.length];

    setStore(previous => ({
      ...previous,
      tasks: previous.tasks.map(item => item.id === id ? { ...item, status: nextStatus } : item),
    }));
    notify(`Tapşırıq #${id} statusu: ${nextStatus}`);
  }

  function taskDetail(id) {
    if (!store.tasks.some(task => task.id === id)) return notify('Tapşırıq tapılmadı');
    openModal('taskDetail', { id });
  }

  function deleteTask(id) {
    const task = store.tasks.find(item => item.id === id);
    if (!task || !confirm(`Tapşırıq #${id} ("${task.title}") silinsin?`)) return;
    setStore(previous => ({ ...previous, tasks: previous.tasks.filter(item => item.id !== id) }));
    closeModal();
    notify(`Tapşırıq #${id} silindi`);
  }

  function changeMonth(delta) {
    const date = new Date(calendarYear, calendarMonth + delta, 1);
    setCalendarYear(date.getFullYear());
    setCalendarMonth(date.getMonth());
  }

  function approveCandidate(id) {
    const candidate = store.operatorApprovals.find(item => item.id === id);
    if (!candidate) return;
    setStore(previous => ({ ...previous,
      operatorApprovals: previous.operatorApprovals.map(item => item.id === id ? { ...item, status: 'approved' } : item),
      users: previous.users.some(user => user.name.toLowerCase() === candidate.name.toLowerCase()) ? previous.users : [...previous.users, { id: Date.now(), name: candidate.name, company: candidate.company, email: candidate.email, position: candidate.position, status: 'Aktiv' }],
    }));
    notify(`"${candidate.name}" operator tərəfindən təsdiqləndi!`);
  }

  function bulkAssign(name, members) {
    const group = store.groups.find(item => item.name === name);
    if (!group) return;
    const additions = members.filter(member => !group.members.includes(member));
    setStore(previous => ({ ...previous, groups: previous.groups.map(item => item.id === group.id ? { ...item, members: [...item.members, ...additions] } : item) }));
    closeModal();
    notify(`${additions.length} istifadəçi "${name}" qrupuna əlavə edildi`);
  }

  function saveCompany(company) {
    const editing = company.id !== undefined;
    setStore(previous => ({ ...previous, companies: editing ? previous.companies.map(item => item.id === company.id ? company : item) : [...previous.companies, { ...company, id: Date.now() }] }));
    closeModal();
    notify(editing ? `"${company.name}" məlumatları yeniləndi` : `"${company.name}" şirkəti uğurla yaradıldı`);
  }

  function deleteCompany(id) {
    const company = store.companies.find(item => item.id === id);
    if (!company || !confirm(`"${company.name}" şirkətini silmək istəyirsiniz?`)) return;
    setStore(previous => ({ ...previous, companies: previous.companies.filter(item => item.id !== id) }));
    closeModal();
    notify(`"${company.name}" şirkəti silindi`);
  }

  function saveEmployee(employee) {
    const editing = employee.id !== undefined;
    setStore(previous => ({ ...previous, employees: editing ? previous.employees.map(item => item.id === employee.id ? employee : item) : [...previous.employees, { ...employee, id: Date.now() }] }));
    closeModal();
    notify(editing ? `"${employee.name}" məlumatları yeniləndi` : `"${employee.name}" işçi kimi əlavə olundu`);
  }

  function deleteEmployee(id) {
    const employee = store.employees.find(item => item.id === id);
    if (!employee || !confirm(`"${employee.name}" işçisini siyahıdan silmək istəyirsiniz?`)) return;
    setStore(previous => ({ ...previous, employees: previous.employees.filter(item => item.id !== id) }));
    closeModal();
    notify(`"${employee.name}" işçisi silindi`);
  }

  function createUser(user) {
    setStore(previous => ({ ...previous, users: [...previous.users, { ...user, id: Date.now() }] }));
    closeModal();
    notify(`"${user.name}" istifadəçi kimi əlavə olundu`);
  }

  function toggleUserStatus(id) {
    const user = store.users.find(item => item.id === id);
    if (!user) return;
    const status = user.status === 'Aktiv' ? 'Gözləmədə' : 'Aktiv';
    setStore(previous => ({ ...previous, users: previous.users.map(item => item.id === id ? { ...item, status } : item) }));
    notify(`${user.name} statusu: ${status}`);
  }

  function deleteUser(id) {
    const user = store.users.find(item => item.id === id);
    if (!user || !confirm(`"${user.name}" istifadəçisini silmək istədiyinizə əminsiniz?`)) return;
    setStore(previous => ({ ...previous, users: previous.users.filter(item => item.id !== id) }));
    notify(`"${user.name}" silindi`);
  }

  function createGroup(group) {
    setStore(previous => ({ ...previous, groups: [...previous.groups, { ...group, id: `g_${Date.now()}`, members: ['Emil Xanciqazov'], color: 'from-brand-600 to-indigo-600' }] }));
    closeModal();
    notify(`"${group.name}" qrupu yaradıldı`);
  }

  function registerRequest(request) {
    setStore(previous => ({ ...previous, operatorApprovals: [{ ...request, id: Date.now(), status: 'pending', approvedAs: null, regDate: `14-09-2026 ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` }, ...previous.operatorApprovals] }));
    setOperatorTab('pending');
    closeModal();
    notify(`Yeni ${request.reqType}: "${request.name}" müraciəti təsdiqə göndərildi!`);
  }

  return (
    <div className="app-shell flex min-h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-950">
      <Sidebar activeView={activeView} onNavigate={setActiveView} taskCount={store.tasks.length} pendingCount={store.operatorApprovals.filter(item => item.status === 'pending').length} dark={dark} onToggleTheme={() => { setDark(!dark); notify(!dark ? 'Gecə rejimi aktivləşdirildi' : 'Gündüz rejimi aktivləşdirildi'); }} notify={notify} />

      <main className="app-main flex min-w-0 flex-1 overflow-hidden">
        <div className={activeView === 'chat' ? 'contents' : 'hidden'}>
          <ChatView conversations={store.conversations} messages={store.messages} activeChatId={activeChatId} chatCategory={chatCategory} onCategory={setChatCategory} onSelect={selectConversation} onDelete={deleteConversation} onModal={openModal} onSend={sendMessage} onFile={attachFile} onLocation={() => { appendMessage(newMessage({ text: '📍 Məkan paylaşıldı: Bakı şəhəri, Nizami küç. 45 (HALAL-P Baş Ofis)' })); notify('Məkan göndərildi'); }} onVoice={() => { appendMessage(newMessage({ type: 'voice', duration: '0:05', audioUrl: 'https://test-ticket-back.halal.az/media/application/audio_1789120397635_1545b054.m4a' })); notify('Səsli mesaj göndərildi (0:05)'); }} onReaction={reactToMessage} onVote={voteOnPoll} notify={notify} reply={replyingToMessage} onReply={setReplyingToMessage} onCancelReply={() => setReplyingToMessage(null)} onTaskDetail={taskDetail} />
        </div>
        <div className={activeView === 'tasks' ? 'contents' : 'hidden'}><TasksView tasks={store.tasks} onCreate={data => openModal('createTask', data)} onDetail={taskDetail} onStatus={setTaskStatus} onCycle={cycleTaskStatus} onChat={() => setActiveView('chat')} calendarYear={calendarYear} calendarMonth={calendarMonth} onMonth={changeMonth} onResetCalendar={() => { setCalendarYear(2026); setCalendarMonth(8); }} notify={notify} /></div>
        <div className={activeView === 'operator' ? 'contents' : 'hidden'}><OperatorView approvals={store.operatorApprovals} operatorTab={operatorTab} onTab={setOperatorTab} onApprove={approveCandidate} /></div>
        <div className={activeView === 'groups' ? 'contents' : 'hidden'}><GroupsView groups={store.groups} onBulk={() => openModal('groupBulk')} onNewUser={() => openModal('createUser')} onChat={() => setActiveView('chat')} /></div>
        <div className={activeView === 'companies' ? 'contents' : 'hidden'}><CompaniesView companies={store.companies} onCreate={() => openModal('createCompany')} onEdit={company => openModal('editCompany', company)} /></div>
        <div className={activeView === 'users' ? 'contents' : 'hidden'}><UsersView users={store.users} onCreate={() => openModal('createUser')} onStatus={toggleUserStatus} onDelete={deleteUser} /></div>
        <div className={activeView === 'employees' ? 'contents' : 'hidden'}><EmployeesView employees={store.employees} onCreate={() => openModal('createEmployee')} onEdit={employee => openModal('editEmployee', employee)} /></div>
      </main>

      {modal?.type === 'audioCall' && conversation && <AudioCallModal conversation={conversation} onClose={() => { closeModal(); notify('Zəng başa çatdı'); }} notify={notify} />}
      {modal?.type === 'poll' && <PollModal onClose={closeModal} onSave={createPoll} notify={notify} />}
      {modal?.type === 'editMessage' && <EditMessageModal message={modal.data} onClose={closeModal} onSave={editMessage} />}
      {modal?.type === 'newChat' && <NewChatModal users={store.users} onClose={closeModal} onDirect={newDirectChat} onGroup={newGroupChat} />}
      {modal?.type === 'chatInfo' && conversation && <ChatInfoModal conversation={conversation} onClose={closeModal} onClear={clearChat} />}
      {modal?.type === 'createTask' && <CreateTaskModal defaults={modal.data} onClose={closeModal} onSave={createTask} />}
      {detailTask && <TaskDetailModal task={detailTask} onClose={closeModal} onStatus={setTaskStatus} onCycle={cycleTaskStatus} onDelete={deleteTask} />}
      {modal?.type === 'groupBulk' && <GroupBulkModal users={store.users} groups={store.groups} onClose={closeModal} onSave={bulkAssign} />}
      {modal?.type === 'createCompany' && <CreateCompanyModal onClose={closeModal} onSave={saveCompany} notify={notify} />}
      {modal?.type === 'editCompany' && <EditCompanyModal company={modal.data} onClose={closeModal} onSave={saveCompany} onDelete={deleteCompany} />}
      {modal?.type === 'createUser' && <CreateUserModal onClose={closeModal} onSave={createUser} />}
      {modal?.type === 'createEmployee' && <CreateEmployeeModal onClose={closeModal} onSave={saveEmployee} />}
      {modal?.type === 'editEmployee' && <EditEmployeeModal employee={modal.data} onClose={closeModal} onSave={saveEmployee} onDelete={deleteEmployee} />}
      {modal?.type === 'createGroup' && <CreateGroupModal onClose={closeModal} onSave={createGroup} />}
      {modal?.type === 'registerRequest' && <RegisterRequestModal onClose={closeModal} onSave={registerRequest} />}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
