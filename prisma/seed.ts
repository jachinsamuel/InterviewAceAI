import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding achievements...');

  // Standard achievements definition
  const achievements = [
    {
      name: 'First Steps',
      description: 'Complete your very first mock interview!',
      icon: 'trophy',
      rarity: 'common',
    },
    {
      name: 'Streak Master',
      description: 'Maintain a 5-day mock interview streak.',
      icon: 'flame',
      rarity: 'rare',
    },
    {
      name: 'Perfect Score',
      description: 'Score 95% or higher on a mock interview.',
      icon: 'star',
      rarity: 'epic',
    },
    {
      name: 'System Architect',
      description: 'Complete 3 System Design interviews.',
      icon: 'construction',
      rarity: 'epic',
    },
    {
      name: 'Speech King',
      description: 'Achieve a 90% communication score with 0 filler words.',
      icon: 'microphone',
      rarity: 'legendary',
    },
  ];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _achievements = achievements;

  for (const achievement of achievements) {
    const exists = await prisma.achievement.findFirst({
      where: { name: achievement.name }
    });
    if (!exists) {
      // In a real app we associate with users, but here we might just seed a global template.
      // Since Achievement model requires a user, we will just comment out the achievements seeding for now.
      // We will skip creating them since they require a userId.
    }
  }

  // We seed achievements per user dynamically when they do tasks,
  // but let's pre-populate the coding arena problems so they are available.
  console.log('Seeding coding problems...');

  const codingProblems = [
    {
      title: 'Two Sum',
      description: `Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to \`target\`*.

You may assume that each input would have ***exactly* one solution**, and you may not use the *same* element twice.

You can return the answer in any order.

### Example 1:
\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
\`\`\`

### Example 2:
\`\`\`
Input: nums = [3,2,4], target = 6
Output: [1,2]
\`\`\``,
      difficulty: 'easy',
      topic: 'Arrays & Hashing',
      hints: [
        'A brute force approach is O(N^2), can we do better using space?',
        'Try using a Hash Map to store numbers and their indices as you traverse.'
      ],
      optimalSolution: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      testCases: {
        create: [
          {
            input: 'nums = [2,7,11,15], target = 9',
            expectedOutput: '[0,1]',
            explanation: 'nums[0] + nums[1] = 2 + 7 = 9'
          },
          {
            input: 'nums = [3,2,4], target = 6',
            expectedOutput: '[1,2]',
            explanation: 'nums[1] + nums[2] = 2 + 4 = 6'
          }
        ]
      }
    },
    {
      title: 'Reverse String',
      description: `Write a function that reverses a string. The input string is given as an array of characters \`s\`.

You must do this by modifying the input array **in-place** with \`O(1)\` extra memory.

### Example 1:
\`\`\`
Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]
\`\`\`

### Example 2:
\`\`\`
Input: s = ["H","a","n","n","a","h"]
Output: ["h","a","n","n","a","H"]
\`\`\``,
      difficulty: 'easy',
      topic: 'Two Pointers',
      hints: [
        'Use two pointers, one at the start and one at the end.',
        'Swap the characters at the pointers, then move them towards the center.'
      ],
      optimalSolution: `function reverseString(s) {
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    const temp = s[left];
    s[left] = s[right];
    s[right] = temp;
    left++;
    right--;
  }
  return s;
}`,
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      testCases: {
        create: [
          {
            input: 's = ["h","e","l","l","o"]',
            expectedOutput: '["o","l","l","e","h"]',
            explanation: 'Modified in-place'
          },
          {
            input: 's = ["H","a","n","n","a","h"]',
            expectedOutput: '["h","a","n","n","a","H"]',
            explanation: 'Case preserved'
          }
        ]
      }
    },
    {
      title: 'Valid Parentheses',
      description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

### Example 1:
\`\`\`
Input: s = "()"
Output: true
\`\`\`

### Example 2:
\`\`\`
Input: s = "()[]{}"
Output: true
\`\`\`

### Example 3:
\`\`\`
Input: s = "(]"
Output: false
\`\`\``,
      difficulty: 'easy',
      topic: 'Stack',
      hints: [
        'A Stack is the perfect data structure for keeping track of nested brackets.',
        'Push open brackets onto the stack. For a closing bracket, check if it matches the top of the stack.'
      ],
      optimalSolution: `function isValid(s) {
  const stack = [];
  const map = {
    ')': '(',
    '}': '{',
    ']': '['
  };
  for (let char of s) {
    if (char in map) {
      const top = stack.length > 0 ? stack.pop() : '#';
      if (map[char] !== top) {
        return false;
      }
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}`,
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      testCases: {
        create: [
          {
            input: 's = "()"',
            expectedOutput: 'true',
            explanation: 'Simple match'
          },
          {
            input: 's = "([)]"',
            expectedOutput: 'false',
            explanation: 'Incorrect nesting order'
          }
        ]
      }
    }
  ];

  for (const problem of codingProblems) {
    // Check if problem already exists before seeding
    const exists = await prisma.codingProblem.findFirst({
      where: { title: problem.title }
    });

    if (!exists) {
      await prisma.codingProblem.create({
        data: problem
      });
      console.log(`Seeded problem: ${problem.title}`);
    } else {
      console.log(`Problem already exists: ${problem.title}`);
    }
  }

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during database seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
