export const initialState = {
      activeView: 'chat',
      activeChatId: 'test_group',
      chatCategory: 'all',
      callInterval: null,
      callSeconds: 0,
      activeMessageForReaction: null,
      editingMessageId: null,
      activeDetailTaskId: null,
      replyingToMessage: null,

      // Calendar state (Halal 12)
      calendarYear: 2026,
      calendarMonth: 8, // 0-indexed, 8 = September 2026

      // Operator Approve state (Halal 2, 3, 4)
      operatorTab: 'all',

      // 1. Conversations Store
      conversations: [
        {
          id: 'test_group',
          name: 'test',
          type: 'group',
          lastSnippet: 'Sorğu: test tapşırıqlarının 2',
          time: '12:02 PM',
          unread: 0,
          avatarGradient: 'from-brand-600 to-indigo-600',
          membersCount: 3,
          members: ['emil xanjiyev', 'Emil Xanciqazov', 'Siz']
        },
        {
          id: 'user_emil_xanjiyev',
          name: 'emil xanjiyev',
          type: 'direct',
          lastSnippet: 'jjj',
          time: '12:49 PM',
          unread: 0,
          avatarGradient: 'from-emerald-500 to-teal-600',
          membersCount: 2,
          members: ['emil xanjiyev', 'Siz']
        },
        {
          id: 'user_1',
          name: 'user 1',
          type: 'direct',
          lastSnippet: 'elebil ilişmə olur 1- 2 saniyə',
          time: '03:19 PM',
          unread: 0,
          avatarGradient: 'from-blue-500 to-cyan-500',
          membersCount: 2,
          members: ['user 1', 'Siz']
        },
        {
          id: 'user_test',
          name: 'test (şəxsi)',
          type: 'direct',
          lastSnippet: 'salam',
          time: '11:48 AM',
          unread: 2,
          avatarGradient: 'from-amber-500 to-rose-500',
          membersCount: 2,
          members: ['test', 'Siz']
        }
      ],

      // 2. Chat Messages Collection across all channels (Halal 1, 13, 14, 15, 16)
      messages: {
        'test_group': [
          { id: 1, date: "July 28, 2026", type: "text", text: ".", time: "11:14 AM", isOutgoing: true, status: "read", reactions: {} },
          { id: 2, date: "July 30, 2026", type: "text", text: "kk", time: "07:10 PM", isOutgoing: true, status: "read", reactions: {} },
          { id: 3, date: "September 10, 2026", type: "text", text: "salam", time: "09:10 AM", isOutgoing: false, sender: "emil xanjiyev", reactions: {} },
          { id: 4, date: "September 11, 2026", type: "text", text: "@Emil Xanciqazov salam", time: "11:48 AM", isOutgoing: true, status: "read", reactions: {} },
          { id: 5, date: "September 11, 2026", type: "text", text: "@emil xanjiyev SALAM", time: "12:38 PM", isOutgoing: true, status: "read", reactions: {} },
          { id: 6, date: "September 11, 2026", type: "voice", duration: "0:06", audioUrl: "https://test-ticket-back.halal.az/media/application/audio_1789115978383_10f83369.m4a", time: "12:39 PM", isOutgoing: false, sender: "emil xanjiyev", reactions: {} },
          { id: 7, date: "September 11, 2026", type: "voice", duration: "0:03", audioUrl: "https://test-ticket-back.halal.az/media/application/audio_1789116462234_903346fd.m4a", time: "12:47 PM", isOutgoing: true, status: "read", reactions: {} },
          { id: 8, date: "September 11, 2026", type: "voice", duration: "0:04", audioUrl: "https://test-ticket-back.halal.az/media/application/audio_1789116480874_7725e662.m4a", time: "12:48 PM", isOutgoing: true, status: "read", reactions: {} },
          { id: 9, date: "September 11, 2026", type: "voice", duration: "0:04", audioUrl: "https://test-ticket-back.halal.az/media/application/audio_1789116527714_fccbfef9.m4a", time: "12:48 PM", isOutgoing: false, sender: "emil xanjiyev", reactions: {} },
          { id: 10, date: "September 11, 2026", type: "text", text: "test", time: "12:49 PM", isOutgoing: false, sender: "emil xanjiyev", reactions: {} },
          { id: 11, date: "September 11, 2026", type: "text", text: "test", time: "12:49 PM", isOutgoing: true, status: "read", reactions: {} },
          { id: 12, date: "September 11, 2026", type: "voice", duration: "0:07", audioUrl: "https://test-ticket-back.halal.az/media/application/audio_1789119212171_0b5d0360.m4a", time: "01:33 PM", isOutgoing: false, sender: "emil xanjiyev", reactions: {} },
          { id: 13, date: "September 11, 2026", type: "voice", duration: "0:05", audioUrl: "https://test-ticket-back.halal.az/media/application/audio_1789120149871_72d75ad7.m4a", time: "01:49 PM", isOutgoing: false, sender: "emil xanjiyev", reactions: {} },
          { id: 14, date: "Today", type: "text", text: "salam", time: "11:24 AM", isOutgoing: true, status: "read", reactions: { '👍': 1 } },
          { 
            id: 15, 
            date: "Today", 
            type: "poll", 
            pollId: "poll_1789371488599",
            question: "test",
            options: [
              { id: "opt_1", text: "test tapşırıqlarının 2", votes: 4 },
              { id: "opt_2", text: "test tapşırıqlarının 1", votes: 2 }
            ],
            userVoted: "opt_1",
            time: "11:38 AM", 
            isOutgoing: true, 
            status: "read",
            reactions: {}
          }
        ],

        // Halal 14 messages with reaction emojis
        'user_emil_xanjiyev': [
          { id: 101, date: "September 12, 2026", type: "text", text: "11111", time: "01:47 PM", isOutgoing: false, sender: "emil xanjiyev", reactions: { '🙏': 1 } },
          { id: 102, date: "September 12, 2026", type: "text", text: "111", time: "01:47 PM", isOutgoing: true, status: "read", reactions: { '😢': 1, '🙏': 1 } },
          { id: 103, date: "September 12, 2026", type: "text", text: "fff", time: "01:47 PM", isOutgoing: false, sender: "emil xanjiyev", reactions: { '😢': 1 } },
          { id: 104, date: "September 12, 2026", type: "text", text: "🐱", time: "06:47 PM", isOutgoing: false, sender: "emil xanjiyev", reactions: { '😂': 1 } },
          { id: 105, date: "September 12, 2026", type: "text", text: "salam", time: "06:48 PM", isOutgoing: true, status: "read", reactions: { '🔥': 1 } },
          { id: 106, date: "September 12, 2026", type: "text", text: "😀", time: "06:48 PM", isOutgoing: false, sender: "emil xanjiyev", reactions: { '👍': 1 } },
          { id: 107, date: "September 12, 2026", type: "text", text: "25", time: "06:48 PM", isOutgoing: true, status: "read", reactions: { '👍': 1 } },
          { id: 108, date: "Today", type: "text", text: "jjj", time: "12:49 PM", isOutgoing: false, sender: "emil xanjiyev", reactions: {} }
        ],

        // Halal 15 messages with embedded task badges
        'user_1': [
          { id: 201, date: "July 28, 2026", type: "text", text: "salam", time: "03:10 PM", isOutgoing: false, sender: "user 1", reactions: {} },
          { id: 202, date: "July 28, 2026", type: "text", text: "salam", time: "03:16 PM", isOutgoing: true, status: "read", reactions: {} },
          { 
            id: 203, 
            date: "July 28, 2026", 
            type: "text", 
            text: "indi çox şey düzgün işləyir 😃😃", 
            time: "03:17 PM", 
            isOutgoing: false, 
            sender: "user 1", 
            reactions: {},
            embeddedTask: { id: 112, title: "yenilk", deadline: "16-09-2026 12:00" }
          },
          { id: 204, date: "July 28, 2026", type: "text", text: "ok", time: "03:17 PM", isOutgoing: true, status: "read", reactions: {} },
          { id: 205, date: "July 28, 2026", type: "text", text: "Sadəcə bidənə problemim qalıb unread ve read", time: "03:17 PM", isOutgoing: false, sender: "user 1", reactions: {} },
          { id: 206, date: "July 28, 2026", type: "text", text: "birde mesajlar digər tərəfə gec çatır", time: "03:18 PM", isOutgoing: false, sender: "user 1", reactions: {} },
          { id: 207, date: "July 28, 2026", type: "text", text: "harda?", time: "03:18 PM", isOutgoing: true, status: "read", reactions: {} },
          { id: 208, date: "July 28, 2026", type: "text", text: "qızdarda dedi mən də fikir verdim", time: "03:19 PM", isOutgoing: false, sender: "user 1", reactions: {} },
          { 
            id: 209, 
            date: "July 28, 2026", 
            type: "text", 
            text: "iki tərəfədə", 
            time: "03:19 PM", 
            isOutgoing: false, 
            sender: "user 1", 
            reactions: {},
            embeddedTask: { id: 113, title: "nofication", deadline: "25-09-2026 10:14" }
          },
          { id: 210, date: "July 28, 2026", type: "text", text: "elebil ilişmə olur 1- 2 saniyə", time: "03:19 PM", isOutgoing: false, sender: "user 1", reactions: {} },
          { id: 211, date: "Today", type: "text", text: "qw", time: "11:00 AM", isOutgoing: false, sender: "user 1", reactions: {} }
        ],

        'user_test': [
          { id: 301, date: "Yesterday", type: "text", text: "salam", time: "09:19 AM", isOutgoing: false, sender: "test", reactions: {} },
          { id: 302, date: "Yesterday", type: "text", text: "33", time: "10:23 AM", isOutgoing: true, status: "read", reactions: {} },
          { id: 303, date: "Today", type: "text", text: "jdjdkd", time: "10:25 AM", isOutgoing: false, sender: "test", reactions: {} },
          { id: 304, date: "Today", type: "text", text: "salam", time: "11:48 AM", isOutgoing: false, sender: "test", reactions: {} }
        ]
      },

      // 3. Tasks Store (Halal.mhtml, Halal 12)
      tasks: [
        { id: 10, title: "tur", message: "Layihə üzrə ilkin audit turu aparılmalıdır", creator: "emil xanjiyev", createdAt: "25-05-2026 14:14", deadline: "09-11-2026 04:00", assignee: "Emil Xanciqazov", status: "Icra olunur", equipment: "Optik Tester və Kabel" },
        { id: 12, title: "TEST", message: "2", creator: "emil xanjiyev", createdAt: "27-05-2026 12:53", deadline: "25-11-2026 11:00", assignee: "Emil Xanciqazov", status: "Gözləmədə", equipment: "Laptop və Şəbəkə alətləri" },
        { id: 109, title: "t", message: "2222", creator: "emil xanjiyev", createdAt: "14-08-2026 13:37", deadline: "15-08-2026 00:00", assignee: "emil xanjiyev", status: "Gözləmədə", equipment: "Server / Router avadanlığı" },
        { id: 110, title: "1", message: "İlkin yoxlama mərhələsi 1", creator: "Emil Xanciqazov", createdAt: "14-08-2026 13:37", deadline: "20-10-2026 00:00", assignee: "emil xanjiyev", status: "Gözləmədə", equipment: "Optik Tester və Kabel" },
        { id: 112, title: "yenilk", message: "indi çox şey düzgün işləyir 😃😃", creator: "Emil Xanciqazov", createdAt: "14-08-2026 16:15", deadline: "16-09-2026 12:00", assignee: "emil xanjiyev", status: "Gözləmədə", equipment: "Laptop və Şəbəkə alətləri" },
        { id: 113, title: "nofication", message: "iki tərəfədə bildiriş göndərilməsi", creator: "emil xanjiyev", createdAt: "31-08-2026 09:09", deadline: "25-09-2026 10:14", assignee: "emil xanjiyev", status: "Gözləmədə", equipment: "Server / Router avadanlığı" }
      ],

      // 4. Operator Approvals Store (Halal 2, 3, 4)
      // Müştəri və ya İstifadəçi qeydiyyatlarının operator tərəfindən təsdiqi
      operatorApprovals: [
        { id: 1, name: "emil xanjiyev", email: "emil.khandzhigazov@halal.az", phone: "0703392425", position: "IT-Devloper", company: "HALAL-P", reqType: "İstifadəçi Qeydiyyatı", status: "pending", approvedAs: null, regDate: "14-09-2026 10:15" },
        { id: 2, name: "İzzət", email: "izzat.rahimli@halal.az", phone: "0772552712", position: "Mühəndis", company: "HALAL-P MMC", reqType: "Müştəri Qeydiyyatı", status: "pending", approvedAs: null, regDate: "14-09-2026 10:30" },
        { id: 3, name: "Emil Mahmudov", email: "emil.mahmudov@halal.az", phone: "0552039388", position: "Muhəndis", company: "Halal servis", reqType: "Müştəri Qeydiyyatı", status: "pending", approvedAs: null, regDate: "14-09-2026 11:00" },
        { id: 4, name: "Sayid Mardaliyev", email: "sayid.mardaliyev@halal.az", phone: "0502658525", position: "komersiya teklifi", company: "Halal-P", reqType: "İstifadəçi Qeydiyyatı", status: "pending", approvedAs: null, regDate: "14-09-2026 11:20" },
        { id: 5, name: "Aygul Mammadova", email: "aygul.mammadova@halal.az", phone: "0774774776", position: "Kommersiya direktorunun muavini", company: "Halal-P", reqType: "Müştəri Qeydiyyatı", status: "pending", approvedAs: null, regDate: "14-09-2026 11:45" },
        { id: 6, name: "Yusifova Xalida", email: "servishalal1@gmail.com", phone: "0552532403", position: "Servis assistent", company: "Halal Servis", reqType: "İstifadəçi Qeydiyyatı", status: "pending", approvedAs: null, regDate: "14-09-2026 12:10" },
        { id: 7, name: "Ali Mensimov", email: "ali.mansimov@halal.az", phone: "0552532455", position: "Texnik", company: "Halal-P", reqType: "İstifadəçi Qeydiyyatı", status: "pending", approvedAs: null, regDate: "14-09-2026 12:35" },
        { id: 8, name: "test", email: "emil2295.95@gmil.com", phone: "0513119154", position: "texnik", company: "Halal P", reqType: "Müştəri Qeydiyyatı", status: "approved", approvedAs: "Müştəri", regDate: "13-09-2026 16:40" }
      ],

      // 5. Groups Store (Halal 5)
      groups: [
        { id: "g1", name: "İT və İnkişaf Qrupu", description: "Proqram təminatı və infrastruktur komandası", members: ["emil xanjiyev", "Emil Xanciqazov", "user3", "user q2"], color: "from-brand-600 to-indigo-600" },
        { id: "g2", name: "Mühəndislik və Servis", description: "Sahə mühəndisləri və texniki audit", members: ["İzzət", "Emil Mahmudov", "Vasif Xudiyev", "Yusifova Xalida"], color: "from-blue-600 to-cyan-600" },
        { id: "g3", name: "Kommersiya və Satış", description: "Müştəri münasibətləri və kommersiya təklifləri", members: ["Sayid Mardaliyev", "Aygul Mammadova", "Səmayə"], color: "from-emerald-600 to-teal-600" },
        { id: "g4", name: "Texniki Dəstək", description: "24/7 qəbul və ilkin baxış qrupu", members: ["Ali Mensimov", "test", "User 2"], color: "from-amber-500 to-orange-600" }
      ],

      // 6. Companies Store (Halal 6, 7)
      companies: [
        { id: 1, name: "HALAL-P MMC", address: "Bakı ş., Nərimanov r., Əhməd Rəcəbli 25", phone: "0124401122", email: "info@halal.az", logo: "HP" },
        { id: 2, name: "Halal Servis", address: "Bakı ş., Xətai r., Babək pr. 12", phone: "0124401133", email: "service@halal.az", logo: "HS" },
        { id: 3, name: "Halal-P", address: "Bakı ş., Səbail r., Nizami k. 45", phone: "0124401144", email: "contact@halal.az", logo: "HP" },
        { id: 4, name: "tsts", address: "tstst", phone: "0553339955", email: "sudhdj@gmail.com", logo: "TS" }
      ],

      // 7. Users Store (Halal 8, 9 - all 14 users)
      users: [
        { id: 1, name: "test", company: "Halal P", email: "emil2295.95@gmil.com", position: "texnik", status: "Gözləmədə" },
        { id: 2, name: "emil xanjiyev", company: "HALAL-P", email: "emil.khandzhigazov@halal.az", position: "IT-Devloper", status: "Aktiv" },
        { id: 3, name: "İzzət", company: "HALAL-P MMC", email: "izzat.rahimli@halal.az", position: "Mühəndis", status: "Aktiv" },
        { id: 4, name: "Emil Mahmudov", company: "Halal servis", email: "emil.mahmudov@halal.az", position: "Muhəndis", status: "Aktiv" },
        { id: 5, name: "Sayid Mardaliyev", company: "Halal-P", email: "sayid.mardaliyev@halal.az", position: "komersiya teklifi", status: "Aktiv" },
        { id: 6, name: "Aygul Mammadova", company: "Halal-P", email: "aygul.mammadova@halal.az", position: "Kommersiya direktorunun muavini", status: "Aktiv" },
        { id: 7, name: "Yusifova Xalida", company: "Halal Servis", email: "servishalal1@gmail.com", position: "Servis assistent", status: "Aktiv" },
        { id: 8, name: "Ali Mensimov", company: "Halal-P", email: "ali.mansimov@halal.az", position: "Texnik", status: "Aktiv" },
        { id: 9, name: "Səmayə", company: "Halal-P", email: "corporatesales@halal.az", position: "Satış assistent", status: "Aktiv" },
        { id: 10, name: "Emil Xanciqazov", company: "Halal-P", email: "enginer.halal@gmail.com", position: "Enginer", status: "Aktiv" },
        { id: 11, name: "Vasif Xudiyev", company: "HALAL-P MMC/Halal Servis", email: "vasif.khudiyev@halal.az", position: "Texnik", status: "Aktiv" },
        { id: 12, name: "user3", company: "Halal", email: "m@bk.ru", position: "developer", status: "Aktiv" },
        { id: 13, name: "user q2", company: "halal", email: "d1@bk.ru", position: "developer", status: "Aktiv" },
        { id: 14, name: "user 1", company: "Halal", email: "d@bk.ru", position: "developer", status: "Aktiv" }
      ],

      // 8. Employees Store (Halal 10, 11)
      employees: [
        { id: 1, name: "test", status: "Gözləmədə", liability: "test", phone: "0513119154", position: "texnik", email: "emil2295.95@gmil.com" },
        { id: 2, name: "emil xanjiyev", status: "Aktiv", liability: "Əsas İT İdarəçisi", phone: "0703392425", position: "IT-Devloper", email: "emil.khandzhigazov@halal.az" },
        { id: 3, name: "Ali Mensimov", status: "Aktiv", liability: "Sahə Təchizatı", phone: "0552532455", position: "Texnik", email: "ali.mansimov@halal.az" },
        { id: 4, name: "User 2", status: "Aktiv", liability: "Texniki Dəstək", phone: "0502223344", position: "Dəstək Operatoru", email: "user2@halal.az" },
        { id: 5, name: "Emil Mahmudov", status: "Aktiv", liability: "Avadanlıq Auditi", phone: "0552039388", position: "Muhəndis", email: "emil.mahmudov@halal.az" },
        { id: 6, name: "Vasif Xudiyev", status: "Aktiv", liability: "Şəbəkə Quraşdırılması", phone: "0773334455", position: "Texnik", email: "vasif.khudiyev@halal.az" }
      ]
    };
