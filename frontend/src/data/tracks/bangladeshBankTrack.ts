import type { CompanyTrack } from '../learningTypes'

export const bangladeshBankTrack: CompanyTrack = {
  companyName: 'Bangladesh Bank',
  companyType: 'government',
  description: 'Central bank - Focus on BCS-style MCQ, IT fundamentals, and current affairs',
  totalDays: 30,
  interviewTips: [
    'Preliminary MCQ → Written Exam → Practical Test → Viva',
    'Focus on general IT knowledge and fundamentals',
    'Current affairs on banking and technology are important',
    'Prepare like BCS examination',
  ],
  topics: [
    {
      id: 'bb-day-1',
      day: 1,
      title: 'Computer Fundamentals',
      description: 'Basic computer concepts for MCQ',
      duration: '1 hour',
      resources: [
        { type: 'article', title: 'Computer Basics', url: 'https://www.tutorialspoint.com/computer_fundamentals/index.htm' },
      ],
      tasks: [
        'Review generations of computers',
        'Study input/output devices',
        'Learn about memory types (RAM, ROM, Cache)',
      ],
      quiz: [
        {
          question: 'Which generation of computers introduced integrated circuits (ICs)?',
          options: [
            'First Generation',
            'Second Generation',
            'Third Generation',
            'Fourth Generation',
          ],
          correctAnswer: 2,
        },
        {
          question: 'Which type of memory is volatile and loses data when power is turned off?',
          options: [
            'ROM',
            'RAM',
            'Hard Disk',
            'Flash Memory',
          ],
          correctAnswer: 1,
        },
      ],
    },
    {
      id: 'bb-day-2',
      day: 2,
      title: 'Number Systems',
      description: 'Binary, Octal, Decimal, Hexadecimal conversions',
      duration: '1.5 hours',
      resources: [
        { type: 'practice', title: 'Number System Practice', url: 'https://www.rapidtables.com/convert/number/index.html' },
      ],
      tasks: [
        'Practice binary to decimal conversion',
        'Learn hexadecimal arithmetic',
        'Solve 20 conversion problems',
      ],
      quiz: [
        {
          question: 'What is the decimal equivalent of binary number 1101?',
          options: [
            '11',
            '12',
            '13',
            '14',
          ],
          correctAnswer: 2,
        },
        {
          question: 'What is the base of the hexadecimal number system?',
          options: [
            '2',
            '8',
            '10',
            '16',
          ],
          correctAnswer: 3,
        },
      ],
    },
    {
      id: 'bb-day-3',
      day: 3,
      title: 'Operating Systems',
      description: 'OS concepts for bank IT exam',
      duration: '1 hour',
      resources: [
        { type: 'article', title: 'OS Concepts', url: 'https://www.geeksforgeeks.org/operating-systems/' },
      ],
      tasks: [
        'Study process management',
        'Learn about memory management',
        'Understand file systems',
      ],
    },
    {
      id: 'bb-day-4',
      day: 4,
      title: 'Database Concepts',
      description: 'DBMS fundamentals',
      duration: '1.5 hours',
      resources: [
        { type: 'article', title: 'DBMS Tutorial', url: 'https://www.geeksforgeeks.org/dbms/' },
      ],
      tasks: [
        'Study normalization (1NF, 2NF, 3NF)',
        'Learn about ACID properties',
        'Understand ER diagrams',
      ],
      quiz: [
        {
          question: 'Which normal form eliminates partial dependency?',
          options: [
            '1NF',
            '2NF',
            '3NF',
            'BCNF',
          ],
          correctAnswer: 1,
        },
        {
          question: 'What does the "A" in ACID properties stand for?',
          options: [
            'Association',
            'Atomicity',
            'Availability',
            'Authentication',
          ],
          correctAnswer: 1,
        },
      ],
    },
    {
      id: 'bb-day-5',
      day: 5,
      title: 'SQL Basics',
      description: 'SQL for practical test',
      duration: '1 hour',
      resources: [
        { type: 'practice', title: 'SQL Tutorial', url: 'https://www.w3schools.com/sql/' },
      ],
      tasks: [
        'Practice SELECT, INSERT, UPDATE, DELETE',
        'Learn JOIN operations',
        'Study aggregate functions',
      ],
    },
    {
      id: 'bb-day-6',
      day: 6,
      title: 'Networking Basics',
      description: 'Computer networks fundamentals',
      duration: '1.5 hours',
      resources: [
        { type: 'article', title: 'Networking', url: 'https://www.geeksforgeeks.org/basics-computer-networking/' },
      ],
      tasks: [
        'Study OSI and TCP/IP models',
        'Learn about IP addressing',
        'Understand network devices',
      ],
      quiz: [
        {
          question: 'How many layers are in the OSI model?',
          options: [
            '4',
            '5',
            '6',
            '7',
          ],
          correctAnswer: 3,
        },
        {
          question: 'Which device operates at the Network layer (Layer 3) of the OSI model?',
          options: [
            'Hub',
            'Switch',
            'Router',
            'Repeater',
          ],
          correctAnswer: 2,
        },
      ],
    },
    {
      id: 'bb-day-7',
      day: 7,
      title: 'Cyber Security Basics',
      description: 'Security concepts for banking',
      duration: '1 hour',
      resources: [
        { type: 'article', title: 'Cyber Security', url: 'https://www.geeksforgeeks.org/cyber-security-types-and-importance/' },
      ],
      tasks: [
        'Study encryption types',
        'Learn about firewalls',
        'Understand common cyber threats',
      ],
      quiz: [
        {
          question: 'Which type of encryption uses the same key for both encryption and decryption?',
          options: [
            'Asymmetric encryption',
            'Symmetric encryption',
            'Hashing',
            'Digital signature',
          ],
          correctAnswer: 1,
        },
        {
          question: 'What type of cyber attack involves tricking users into revealing sensitive information through fake emails or websites?',
          options: [
            'DDoS attack',
            'Man-in-the-middle attack',
            'Phishing',
            'SQL injection',
          ],
          correctAnswer: 2,
        },
      ],
    },
    {
      id: 'bb-day-8',
      day: 8,
      title: 'Programming Basics - C',
      description: 'C programming fundamentals',
      duration: '1.5 hours',
      resources: [
        { type: 'article', title: 'C Programming', url: 'https://www.learn-c.org/' },
      ],
      tasks: [
        'Review data types and operators',
        'Practice loops and conditions',
        'Write simple programs',
      ],
    },
    {
      id: 'bb-day-9',
      day: 9,
      title: 'Data Structures',
      description: 'Basic data structures',
      duration: '1.5 hours',
      resources: [
        { type: 'article', title: 'Data Structures', url: 'https://www.geeksforgeeks.org/data-structures/' },
      ],
      tasks: [
        'Study arrays and linked lists',
        'Learn stack and queue',
        'Understand trees basics',
      ],
      quiz: [
        {
          question: 'Which data structure follows the LIFO (Last In, First Out) principle?',
          options: [
            'Queue',
            'Stack',
            'Array',
            'Linked List',
          ],
          correctAnswer: 1,
        },
        {
          question: 'What is the time complexity of inserting an element at the beginning of a singly linked list?',
          options: [
            'O(n)',
            'O(log n)',
            'O(1)',
            'O(n^2)',
          ],
          correctAnswer: 2,
        },
      ],
    },
    {
      id: 'bb-day-10',
      day: 10,
      title: 'Algorithms',
      description: 'Basic algorithms',
      duration: '1.5 hours',
      resources: [
        { type: 'article', title: 'Algorithms', url: 'https://www.geeksforgeeks.org/fundamentals-of-algorithms/' },
      ],
      tasks: [
        'Study searching algorithms',
        'Learn sorting algorithms',
        'Understand time complexity',
      ],
      quiz: [
        {
          question: 'What is the time complexity of binary search on a sorted array?',
          options: [
            'O(n)',
            'O(log n)',
            'O(n log n)',
            'O(1)',
          ],
          correctAnswer: 1,
        },
        {
          question: 'Which sorting algorithm has the best average-case time complexity?',
          options: [
            'Bubble Sort - O(n^2)',
            'Selection Sort - O(n^2)',
            'Merge Sort - O(n log n)',
            'Insertion Sort - O(n^2)',
          ],
          correctAnswer: 2,
        },
      ],
    },
    // Days 11-15: Banking & IT in Banking
    {
      id: 'bb-day-11',
      day: 11,
      title: 'Banking Technology',
      description: 'IT in banking sector',
      duration: '1 hour',
      resources: [
        { type: 'article', title: 'Banking Technology', url: 'https://www.bb.org.bd/' },
      ],
      tasks: [
        'Study core banking systems',
        'Learn about RTGS, BEFTN, NPSB',
        'Understand mobile banking systems',
      ],
    },
    {
      id: 'bb-day-12',
      day: 12,
      title: 'Digital Bangladesh & e-Governance',
      description: 'Government IT initiatives',
      duration: '1 hour',
      resources: [
        { type: 'article', title: 'Digital Bangladesh', url: 'https://a2i.gov.bd/' },
      ],
      tasks: [
        'Study Vision 2041',
        'Learn about a2i initiatives',
        'Understand e-governance projects',
      ],
    },
    {
      id: 'bb-day-13',
      day: 13,
      title: 'Bangladesh Bank Functions',
      description: 'Central bank operations',
      duration: '1 hour',
      resources: [
        { type: 'article', title: 'BB Functions', url: 'https://www.bb.org.bd/aboutus/index.php' },
      ],
      tasks: [
        'Study BB organizational structure',
        'Learn about monetary policy',
        'Understand foreign exchange management',
      ],
    },
    // Days 14-20: MCQ Practice
    {
      id: 'bb-day-14',
      day: 14,
      title: 'Computer MCQ Practice - Set 1',
      description: 'Practice MCQ questions',
      duration: '1.5 hours',
      resources: [
        { type: 'practice', title: 'Computer MCQ', url: 'https://www.indiabix.com/computer-science/questions-and-answers/' },
      ],
      tasks: [
        'Solve 50 computer fundamentals MCQ',
        'Review wrong answers',
        'Note weak areas',
      ],
      quiz: [
        {
          question: 'What is the full form of CPU?',
          options: [
            'Central Processing Unit',
            'Computer Personal Unit',
            'Central Program Utility',
            'Computer Processing Unit',
          ],
          correctAnswer: 0,
        },
        {
          question: 'Which of the following is an example of secondary storage?',
          options: [
            'RAM',
            'Cache Memory',
            'Hard Disk Drive',
            'Register',
          ],
          correctAnswer: 2,
        },
      ],
    },
    {
      id: 'bb-day-15',
      day: 15,
      title: 'Programming MCQ Practice',
      description: 'C/C++ MCQ practice',
      duration: '1.5 hours',
      resources: [
        { type: 'practice', title: 'C MCQ', url: 'https://www.sanfoundry.com/c-programming-questions-answers/' },
      ],
      tasks: [
        'Solve 50 C programming MCQ',
        'Practice output prediction questions',
        'Review pointer-related questions',
      ],
    },
    {
      id: 'bb-day-16',
      day: 16,
      title: 'DBMS & SQL MCQ Practice',
      description: 'Database MCQ practice',
      duration: '1.5 hours',
      resources: [
        { type: 'practice', title: 'DBMS MCQ', url: 'https://www.sanfoundry.com/database-management-system-questions-answers/' },
      ],
      tasks: [
        'Solve 50 DBMS MCQ',
        'Practice normalization questions',
        'Review SQL query questions',
      ],
      quiz: [
        {
          question: 'Which SQL command is used to remove all rows from a table without logging individual row deletions?',
          options: [
            'DELETE',
            'DROP',
            'TRUNCATE',
            'REMOVE',
          ],
          correctAnswer: 2,
        },
        {
          question: 'A foreign key in a table refers to the ______ of another table.',
          options: [
            'Foreign key',
            'Primary key',
            'Candidate key',
            'Alternate key',
          ],
          correctAnswer: 1,
        },
      ],
    },
    {
      id: 'bb-day-17',
      day: 17,
      title: 'Networking MCQ Practice',
      description: 'Network MCQ practice',
      duration: '1.5 hours',
      resources: [
        { type: 'practice', title: 'Network MCQ', url: 'https://www.sanfoundry.com/computer-network-questions-answers/' },
      ],
      tasks: [
        'Solve 50 networking MCQ',
        'Practice OSI model questions',
        'Review protocol questions',
      ],
      quiz: [
        {
          question: 'Which protocol is used to send email?',
          options: [
            'FTP',
            'HTTP',
            'SMTP',
            'POP3',
          ],
          correctAnswer: 2,
        },
        {
          question: 'What is the maximum number of hosts in a Class C network?',
          options: [
            '256',
            '254',
            '128',
            '512',
          ],
          correctAnswer: 1,
        },
      ],
    },
    {
      id: 'bb-day-18',
      day: 18,
      title: 'Bangla & English',
      description: 'Language section preparation',
      duration: '1.5 hours',
      resources: [
        { type: 'article', title: 'BCS Preparation', url: 'https://www.bdjobs.com/bcs/' },
      ],
      tasks: [
        'Practice Bangla grammar',
        'Review English grammar rules',
        'Solve comprehension passages',
      ],
    },
    {
      id: 'bb-day-19',
      day: 19,
      title: 'General Knowledge - Bangladesh',
      description: 'Bangladesh affairs',
      duration: '1 hour',
      resources: [
        { type: 'article', title: 'Bangladesh GK', url: 'https://www.bdjobs.com/gk/' },
      ],
      tasks: [
        'Study Bangladesh history',
        'Learn about constitution',
        'Review recent developments',
      ],
    },
    {
      id: 'bb-day-20',
      day: 20,
      title: 'Current Affairs',
      description: 'Recent national and international news',
      duration: '1 hour',
      resources: [
        { type: 'article', title: 'Current Affairs', url: 'https://www.thedailystar.net/' },
      ],
      tasks: [
        'Read last 6 months banking news',
        'Study recent BB circulars',
        'Review technology news',
      ],
    },
    // Days 21-25: Written Exam Prep
    {
      id: 'bb-day-21',
      day: 21,
      title: 'Written Exam - Programming',
      description: 'Programming written test preparation',
      duration: '2 hours',
      resources: [
        { type: 'practice', title: 'Coding Practice', url: 'https://www.hackerrank.com/domains/c' },
      ],
      tasks: [
        'Write programs on paper',
        'Practice without IDE',
        'Solve 5 programming problems',
      ],
    },
    {
      id: 'bb-day-22',
      day: 22,
      title: 'Written Exam - SQL',
      description: 'SQL written test preparation',
      duration: '1.5 hours',
      resources: [
        { type: 'practice', title: 'SQL Practice', url: 'https://sqlzoo.net/' },
      ],
      tasks: [
        'Write complex queries on paper',
        'Practice JOIN queries',
        'Solve 10 SQL problems',
      ],
    },
    {
      id: 'bb-day-23',
      day: 23,
      title: 'Written Exam - Essay',
      description: 'Essay writing practice',
      duration: '1.5 hours',
      resources: [],
      tasks: [
        'Write essay on Digital Bangladesh',
        'Practice essay on Cyber Security',
        'Write about Banking Technology',
      ],
    },
    // Days 24-27: Practical Test
    {
      id: 'bb-day-24',
      day: 24,
      title: 'Practical - MS Office',
      description: 'Microsoft Office skills',
      duration: '1.5 hours',
      resources: [
        { type: 'article', title: 'MS Office Tutorial', url: 'https://support.microsoft.com/en-us/office' },
      ],
      tasks: [
        'Practice MS Word formatting',
        'Create Excel formulas and charts',
        'Make PowerPoint presentation',
      ],
    },
    {
      id: 'bb-day-25',
      day: 25,
      title: 'Practical - Database',
      description: 'Database practical skills',
      duration: '1.5 hours',
      resources: [],
      tasks: [
        'Create database and tables',
        'Write queries in SQL Server/MySQL',
        'Practice stored procedures',
      ],
    },
    {
      id: 'bb-day-26',
      day: 26,
      title: 'Practical - Programming',
      description: 'Programming practical skills',
      duration: '2 hours',
      resources: [],
      tasks: [
        'Write programs in C/C++',
        'Practice file handling',
        'Implement data structures',
      ],
    },
    // Days 27-30: Viva & Final Prep
    {
      id: 'bb-day-27',
      day: 27,
      title: 'Viva Preparation - Technical',
      description: 'Technical viva preparation',
      duration: '1.5 hours',
      resources: [],
      tasks: [
        'Review all technical concepts',
        'Prepare to explain projects',
        'Practice speaking about technology',
      ],
    },
    {
      id: 'bb-day-28',
      day: 28,
      title: 'Viva Preparation - General',
      description: 'General viva preparation',
      duration: '1.5 hours',
      resources: [],
      tasks: [
        'Prepare self introduction',
        'Why Bangladesh Bank?',
        'Prepare for HR questions',
      ],
    },
    {
      id: 'bb-day-29',
      day: 29,
      title: 'Full Mock Test',
      description: 'Complete mock examination',
      duration: '3 hours',
      resources: [],
      tasks: [
        'Take full-length MCQ test',
        'Practice written questions',
        'Time management practice',
      ],
    },
    {
      id: 'bb-day-30',
      day: 30,
      title: 'Final Review & Application',
      description: 'Final preparation',
      duration: '2 hours',
      resources: [
        { type: 'article', title: 'BB Recruitment', url: 'https://erecruitment.bb.org.bd/' },
      ],
      tasks: [
        'Review all weak areas',
        'Prepare documents',
        'Apply to Bangladesh Bank!',
        'Rest well before exam',
      ],
    },
  ],
}
