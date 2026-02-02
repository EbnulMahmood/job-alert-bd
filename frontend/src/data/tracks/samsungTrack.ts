import type { CompanyTrack } from '../learningTypes'

export const samsungTrack: CompanyTrack = {
  companyName: 'Samsung R&D',
  companyType: 'private',
  description: 'MNC - Strong DSA focus, system design, competitive programming background helps',
  totalDays: 15,
  interviewTips: [
    'Multiple technical rounds',
    'Strong DSA is essential',
    'System design for senior roles',
    'Competitive programming experience is a plus',
  ],
  topics: [
    // Day 1: Arrays & Strings
    {
      id: 'samsung-day-1',
      day: 1,
      title: 'Arrays & Strings',
      description: 'Master array manipulation, two-pointer technique, and sliding window patterns',
      duration: '2 hours',
      resources: [
        {
          type: 'video',
          title: 'NeetCode - Arrays & Hashing',
          url: 'https://www.youtube.com/watch?v=KLlXCFG5TnA',
        },
        {
          type: 'practice',
          title: 'LeetCode - Two Sum',
          url: 'https://leetcode.com/problems/two-sum/',
        },
        {
          type: 'practice',
          title: 'LeetCode - Best Time to Buy and Sell Stock',
          url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
        },
      ],
      tasks: [
        'Solve Two Sum and understand hash map approach',
        'Practice two-pointer technique on Container With Most Water',
        'Solve Best Time to Buy and Sell Stock using Kadane\'s variant',
        'Implement sliding window for Longest Substring Without Repeating Characters',
      ],
      quiz: [
        {
          question: 'What is the time complexity of finding two numbers that add up to a target using a hash map?',
          options: ['O(n^2)', 'O(n)', 'O(n log n)', 'O(1)'],
          correctAnswer: 1,
        },
        {
          question: 'In the two-pointer technique on a sorted array, when the sum is less than the target, which pointer do you move?',
          options: ['Left pointer to the right', 'Right pointer to the left', 'Both pointers inward', 'Neither pointer'],
          correctAnswer: 0,
        },
      ],
    },

    // Day 2: Linked Lists
    {
      id: 'samsung-day-2',
      day: 2,
      title: 'Linked Lists',
      description: 'LinkedList operations, cycle detection, and merge techniques',
      duration: '1.5 hours',
      resources: [
        {
          type: 'video',
          title: 'NeetCode - Reverse Linked List',
          url: 'https://www.youtube.com/watch?v=G0_I-ZF0S38',
        },
        {
          type: 'practice',
          title: 'LeetCode - Reverse Linked List',
          url: 'https://leetcode.com/problems/reverse-linked-list/',
        },
        {
          type: 'practice',
          title: 'LeetCode - Linked List Cycle',
          url: 'https://leetcode.com/problems/linked-list-cycle/',
        },
      ],
      tasks: [
        'Implement reverse linked list both iteratively and recursively',
        'Detect cycle in a linked list using Floyd\'s algorithm',
        'Merge two sorted linked lists',
        'Find the middle of a linked list using slow/fast pointers',
      ],
    },

    // Day 3: Stacks & Queues
    {
      id: 'samsung-day-3',
      day: 3,
      title: 'Stacks & Queues',
      description: 'Stack/Queue problems, monotonic stack, and priority queues',
      duration: '1.5 hours',
      resources: [
        {
          type: 'video',
          title: 'NeetCode - Valid Parentheses',
          url: 'https://www.youtube.com/watch?v=WTzjTskDFMg',
        },
        {
          type: 'practice',
          title: 'LeetCode - Valid Parentheses',
          url: 'https://leetcode.com/problems/valid-parentheses/',
        },
        {
          type: 'practice',
          title: 'LeetCode - Min Stack',
          url: 'https://leetcode.com/problems/min-stack/',
        },
      ],
      tasks: [
        'Solve Valid Parentheses using a stack',
        'Implement Min Stack with O(1) getMin operation',
        'Solve Next Greater Element using monotonic stack',
        'Implement a queue using two stacks',
      ],
      quiz: [
        {
          question: 'What data structure is best suited for matching opening and closing brackets?',
          options: ['Queue', 'Stack', 'Linked List', 'Array'],
          correctAnswer: 1,
        },
        {
          question: 'What is the time complexity of push and pop operations in a stack implemented with a linked list?',
          options: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'],
          correctAnswer: 2,
        },
      ],
    },

    // Day 4: Trees
    {
      id: 'samsung-day-4',
      day: 4,
      title: 'Trees',
      description: 'Binary tree traversals, BST operations, and tree-based problem solving',
      duration: '2 hours',
      resources: [
        {
          type: 'video',
          title: 'NeetCode - Invert Binary Tree',
          url: 'https://www.youtube.com/watch?v=OnSn2XEQ4MY',
        },
        {
          type: 'practice',
          title: 'LeetCode - Maximum Depth of Binary Tree',
          url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
        },
        {
          type: 'practice',
          title: 'LeetCode - Validate Binary Search Tree',
          url: 'https://leetcode.com/problems/validate-binary-search-tree/',
        },
      ],
      tasks: [
        'Implement inorder, preorder, and postorder traversals (recursive + iterative)',
        'Solve Maximum Depth of Binary Tree using DFS',
        'Validate a BST using in-order traversal property',
        'Find Lowest Common Ancestor of two nodes in a BST',
      ],
    },

    // Day 5: Graphs - BFS/DFS
    {
      id: 'samsung-day-5',
      day: 5,
      title: 'Graphs - BFS/DFS',
      description: 'Graph traversals, connected components, and island problems',
      duration: '2 hours',
      resources: [
        {
          type: 'video',
          title: 'NeetCode - Number of Islands',
          url: 'https://www.youtube.com/watch?v=pV2kpPD66nE',
        },
        {
          type: 'practice',
          title: 'LeetCode - Number of Islands',
          url: 'https://leetcode.com/problems/number-of-islands/',
        },
        {
          type: 'article',
          title: 'NeetCode - Graph BFS/DFS Roadmap',
          url: 'https://neetcode.io/roadmap',
        },
      ],
      tasks: [
        'Implement BFS and DFS for an adjacency list graph',
        'Solve Number of Islands using DFS flood fill',
        'Find connected components in an undirected graph',
        'Solve Clone Graph using BFS with a hash map',
      ],
      quiz: [
        {
          question: 'Which data structure does BFS use internally?',
          options: ['Stack', 'Queue', 'Priority Queue', 'Hash Map'],
          correctAnswer: 1,
        },
        {
          question: 'What is the time complexity of BFS/DFS on a graph with V vertices and E edges?',
          options: ['O(V)', 'O(E)', 'O(V + E)', 'O(V * E)'],
          correctAnswer: 2,
        },
      ],
    },

    // Day 6: Graphs - Advanced
    {
      id: 'samsung-day-6',
      day: 6,
      title: 'Graphs - Advanced',
      description: 'Shortest path algorithms, topological sort, and union-find',
      duration: '2 hours',
      resources: [
        {
          type: 'video',
          title: 'Back To Back SWE - Dijkstra\'s Algorithm',
          url: 'https://www.youtube.com/watch?v=pSqmAO-m7Lk',
        },
        {
          type: 'practice',
          title: 'LeetCode - Course Schedule',
          url: 'https://leetcode.com/problems/course-schedule/',
        },
        {
          type: 'practice',
          title: 'LeetCode - Network Delay Time',
          url: 'https://leetcode.com/problems/network-delay-time/',
        },
      ],
      tasks: [
        'Implement Dijkstra\'s shortest path algorithm with a priority queue',
        'Solve Course Schedule using topological sort (Kahn\'s BFS)',
        'Implement Union-Find with path compression and union by rank',
        'Solve Network Delay Time using Dijkstra',
      ],
    },

    // Day 7: Dynamic Programming - Fundamentals
    {
      id: 'samsung-day-7',
      day: 7,
      title: 'Dynamic Programming',
      description: 'DP fundamentals: overlapping subproblems, optimal substructure, memoization vs tabulation',
      duration: '2 hours',
      resources: [
        {
          type: 'video',
          title: 'NeetCode - Climbing Stairs (DP Intro)',
          url: 'https://www.youtube.com/watch?v=Y0lT9Fck7qI',
        },
        {
          type: 'practice',
          title: 'LeetCode - Climbing Stairs',
          url: 'https://leetcode.com/problems/climbing-stairs/',
        },
        {
          type: 'practice',
          title: 'LeetCode - Coin Change',
          url: 'https://leetcode.com/problems/coin-change/',
        },
      ],
      tasks: [
        'Solve Climbing Stairs with memoization and tabulation',
        'Solve Coin Change using bottom-up DP',
        'Implement House Robber using 1D DP',
        'Solve Longest Increasing Subsequence with O(n^2) DP',
      ],
      quiz: [
        {
          question: 'What are the two key properties a problem must have to be solvable with Dynamic Programming?',
          options: [
            'Greedy choice and optimal substructure',
            'Overlapping subproblems and optimal substructure',
            'Divide and conquer and overlapping subproblems',
            'Memoization and tabulation',
          ],
          correctAnswer: 1,
        },
        {
          question: 'In the Coin Change problem, what does dp[i] represent?',
          options: [
            'The number of coins with value i',
            'The maximum amount achievable with i coins',
            'The minimum number of coins to make amount i',
            'The number of ways to make amount i',
          ],
          correctAnswer: 2,
        },
      ],
    },

    // Day 8: DP - Advanced
    {
      id: 'samsung-day-8',
      day: 8,
      title: 'DP - Advanced',
      description: 'Complex DP: 2D DP, LCS, knapsack, and interval DP patterns',
      duration: '2 hours',
      resources: [
        {
          type: 'video',
          title: 'NeetCode - Longest Common Subsequence',
          url: 'https://www.youtube.com/watch?v=Ua0GhsJSlWM',
        },
        {
          type: 'practice',
          title: 'LeetCode - Longest Common Subsequence',
          url: 'https://leetcode.com/problems/longest-common-subsequence/',
        },
        {
          type: 'practice',
          title: 'LeetCode - 0/1 Knapsack (Partition Equal Subset Sum)',
          url: 'https://leetcode.com/problems/partition-equal-subset-sum/',
        },
      ],
      tasks: [
        'Solve Longest Common Subsequence using 2D DP table',
        'Implement 0/1 Knapsack via Partition Equal Subset Sum',
        'Solve Edit Distance with 2D DP',
        'Practice Unique Paths on a grid using DP',
      ],
    },

    // Day 9: Backtracking
    {
      id: 'samsung-day-9',
      day: 9,
      title: 'Backtracking',
      description: 'Backtracking algorithms: pruning, constraint satisfaction, and exhaustive search',
      duration: '1.5 hours',
      resources: [
        {
          type: 'video',
          title: 'NeetCode - N-Queens',
          url: 'https://www.youtube.com/watch?v=Ph95IHmRp5M',
        },
        {
          type: 'practice',
          title: 'LeetCode - N-Queens',
          url: 'https://leetcode.com/problems/n-queens/',
        },
        {
          type: 'practice',
          title: 'LeetCode - Subsets',
          url: 'https://leetcode.com/problems/subsets/',
        },
      ],
      tasks: [
        'Solve N-Queens problem with backtracking and pruning',
        'Generate all Subsets (power set) using backtracking',
        'Solve Permutations using swap-based backtracking',
        'Implement Sudoku Solver with constraint checking',
      ],
      quiz: [
        {
          question: 'What is the key difference between backtracking and brute force?',
          options: [
            'Backtracking uses iteration, brute force uses recursion',
            'Backtracking prunes invalid paths early, brute force checks all possibilities',
            'Backtracking is always faster than brute force',
            'There is no difference',
          ],
          correctAnswer: 1,
        },
        {
          question: 'In the N-Queens problem, how many queens can attack each other in a valid solution?',
          options: ['N-1 pairs', '1 pair', '0 pairs', 'N pairs'],
          correctAnswer: 2,
        },
      ],
    },

    // Day 10: Sorting & Searching
    {
      id: 'samsung-day-10',
      day: 10,
      title: 'Sorting & Searching',
      description: 'Advanced sorting algorithms and binary search patterns',
      duration: '1.5 hours',
      resources: [
        {
          type: 'video',
          title: 'NeetCode - Binary Search',
          url: 'https://www.youtube.com/watch?v=s4DPM8ct1pI',
        },
        {
          type: 'practice',
          title: 'LeetCode - Search in Rotated Sorted Array',
          url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
        },
        {
          type: 'practice',
          title: 'LeetCode - Merge Intervals',
          url: 'https://leetcode.com/problems/merge-intervals/',
        },
      ],
      tasks: [
        'Implement QuickSort with random pivot and analyze worst case',
        'Implement MergeSort and understand its stability property',
        'Solve Search in Rotated Sorted Array using modified binary search',
        'Solve Merge Intervals by sorting and merging overlapping ranges',
      ],
    },

    // Day 11: System Design Basics
    {
      id: 'samsung-day-11',
      day: 11,
      title: 'System Design Basics',
      description: 'Design fundamentals: scalability, load balancing, caching, and databases',
      duration: '2 hours',
      resources: [
        {
          type: 'video',
          title: 'NeetCode - System Design for Beginners',
          url: 'https://www.youtube.com/watch?v=lX4CjIFCErI',
        },
        {
          type: 'article',
          title: 'System Design Primer - GitHub',
          url: 'https://github.com/donnemartin/system-design-primer',
        },
        {
          type: 'video',
          title: 'Gaurav Sen - System Design Introduction',
          url: 'https://www.youtube.com/watch?v=xpDnVSmNFX0',
        },
      ],
      tasks: [
        'Design a URL shortener (like bit.ly) end to end',
        'Design a rate limiter using token bucket algorithm',
        'Understand CAP theorem and how it applies to distributed databases',
        'Study load balancing strategies: round-robin, least connections, consistent hashing',
      ],
      quiz: [
        {
          question: 'According to the CAP theorem, a distributed system can guarantee at most how many of the three properties (Consistency, Availability, Partition tolerance)?',
          options: ['1', '2', '3', 'All of them with trade-offs'],
          correctAnswer: 1,
        },
        {
          question: 'Which caching strategy writes data to both the cache and the database at the same time?',
          options: ['Cache-aside', 'Write-through', 'Write-behind', 'Read-through'],
          correctAnswer: 1,
        },
      ],
    },

    // Day 12: System Design Advanced
    {
      id: 'samsung-day-12',
      day: 12,
      title: 'System Design Advanced',
      description: 'Distributed systems: message queues, microservices, and real-world design problems',
      duration: '2 hours',
      resources: [
        {
          type: 'video',
          title: 'NeetCode - Design Twitter',
          url: 'https://www.youtube.com/watch?v=o5n85GRKuzk',
        },
        {
          type: 'article',
          title: 'System Design Primer - Scaling',
          url: 'https://github.com/donnemartin/system-design-primer#system-design-topics-start-here',
        },
        {
          type: 'video',
          title: 'Gaurav Sen - Consistent Hashing',
          url: 'https://www.youtube.com/watch?v=zaRkONvyGr8',
        },
      ],
      tasks: [
        'Design a Twitter-like news feed with fan-out approaches',
        'Design a chat application with WebSocket and message queues',
        'Study database sharding and replication strategies',
        'Design a notification system with push and pull models',
      ],
    },

    // Day 13: LeetCode Marathon
    {
      id: 'samsung-day-13',
      day: 13,
      title: 'LeetCode Marathon',
      description: 'Intensive timed practice simulating real Samsung interview conditions',
      duration: '3 hours',
      resources: [
        {
          type: 'practice',
          title: 'LeetCode - Top Interview Questions (Medium)',
          url: 'https://leetcode.com/problem-list/top-interview-questions/',
        },
        {
          type: 'practice',
          title: 'LeetCode - Product of Array Except Self',
          url: 'https://leetcode.com/problems/product-of-array-except-self/',
        },
        {
          type: 'practice',
          title: 'LeetCode - Word Break',
          url: 'https://leetcode.com/problems/word-break/',
        },
      ],
      tasks: [
        'Solve Product of Array Except Self without division in O(n)',
        'Solve Word Break using DP with string matching',
        'Solve Rotate Image (matrix rotation) in-place',
        'Complete 10 medium problems with 20-minute time limit each',
      ],
      quiz: [
        {
          question: 'When solving a LeetCode problem in an interview, what should you do FIRST?',
          options: [
            'Start coding immediately',
            'Ask clarifying questions and discuss approach',
            'Write test cases',
            'Optimize for time complexity',
          ],
          correctAnswer: 1,
        },
        {
          question: 'What is the best strategy when you are stuck on a problem during an interview?',
          options: [
            'Stay silent and keep thinking',
            'Give up and move to the next problem',
            'Think aloud and communicate your thought process to the interviewer',
            'Ask for the solution',
          ],
          correctAnswer: 2,
        },
      ],
    },

    // Day 14: Mock Technical Interview
    {
      id: 'samsung-day-14',
      day: 14,
      title: 'Mock Technical Interview',
      description: 'Full simulation of a Samsung R&D technical interview round',
      duration: '2 hours',
      resources: [
        {
          type: 'video',
          title: 'NeetCode - Coding Interview Tips',
          url: 'https://www.youtube.com/watch?v=SVvr3ZjtjI8',
        },
        {
          type: 'practice',
          title: 'LeetCode - Trapping Rain Water',
          url: 'https://leetcode.com/problems/trapping-rain-water/',
        },
        {
          type: 'article',
          title: 'NeetCode Roadmap - All Patterns',
          url: 'https://neetcode.io/roadmap',
        },
      ],
      tasks: [
        'Solve 2 medium/hard coding problems back to back in 45 minutes',
        'Practice explaining your approach before writing code',
        'Do a system design mock: design a file storage service like Google Drive',
        'Review and analyze time/space complexity of all your solutions aloud',
      ],
    },

    // Day 15: Final Preparation
    {
      id: 'samsung-day-15',
      day: 15,
      title: 'Final Preparation',
      description: 'Review weak areas, refine strategies, and finalize your application',
      duration: '2 hours',
      resources: [
        {
          type: 'article',
          title: 'NeetCode - Blind 75 Problem List',
          url: 'https://neetcode.io/practice',
        },
        {
          type: 'video',
          title: 'NeetCode - How I Got Into FAANG',
          url: 'https://www.youtube.com/watch?v=SVvr3ZjtjI8',
        },
        {
          type: 'article',
          title: 'Samsung R&D Interview Experiences - GeeksforGeeks',
          url: 'https://www.geeksforgeeks.org/samsung-interview-experience/',
        },
      ],
      tasks: [
        'Revisit and re-solve 5 problems from your weakest topics',
        'Review all common patterns: sliding window, two pointers, BFS/DFS, DP',
        'Prepare your introduction and project discussion points',
        'Apply to Samsung R&D and finalize your resume!',
      ],
    },
  ],
}
