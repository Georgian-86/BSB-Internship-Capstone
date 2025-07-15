import React, { useState, useRef } from 'react';
import './App.css';
import { ICPAuthProvider, useICPAuth } from './ICPAuthContext';

// Token System Types
interface TokenReward {
  id: number;
  amount: number;
  reason: string;
  date: string;
  courseId?: number;
  lessonId?: number;
}

interface SwagItem {
  id: number;
  name: string;
  description: string;
  tokenCost: number;
  image: string;
  category: 'clothing' | 'accessories' | 'tech' | 'collectibles';
  available: boolean;
}

// Enhanced Course Types
interface Lesson {
  id: number;
  title: string;
  duration: string;
  type: 'video' | 'quiz' | 'exercise' | 'lab' | 'reading';
  content?: string;
  videoUrl?: string;
  quiz?: {
    title: string;
    questions: Array<{
      question: string;
      answers: string[];
      correctAnswer: number;
      explanation?: string;
    }>;
  };
  tokenReward: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface Chapter {
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];
  tokenReward: number;
}

interface Course {
  id: number;
  title: string;
  description: string;
  chapters: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  image: string;
  chaptersList: Chapter[];
  totalTokenReward: number;
  prerequisites?: string[];
  skills: string[];
}

const BlockchainSVG = () => (
  <svg className="blockchain-visual" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="110" cy="110" r="100" stroke="#00FFD1" strokeWidth="4" opacity="0.2" />
    <circle cx="110" cy="110" r="70" stroke="#FF0080" strokeWidth="3" opacity="0.3" />
    <circle cx="110" cy="110" r="40" stroke="#00FFD1" strokeWidth="2" opacity="0.5" />
    <g>
      <rect x="60" y="40" width="40" height="40" rx="10" fill="#00FFD1" fillOpacity="0.8">
        <animate attributeName="y" values="40;60;40" dur="2s" repeatCount="indefinite" />
      </rect>
      <rect x="120" y="140" width="40" height="40" rx="10" fill="#FF0080" fillOpacity="0.8">
        <animate attributeName="y" values="140;120;140" dur="2s" repeatCount="indefinite" />
      </rect>
      <rect x="140" y="60" width="30" height="30" rx="7" fill="#00FFD1" fillOpacity="0.7">
        <animate attributeName="x" values="140;160;140" dur="2s" repeatCount="indefinite" />
      </rect>
      <rect x="50" y="150" width="30" height="30" rx="7" fill="#FF0080" fillOpacity="0.7">
        <animate attributeName="x" values="50;70;50" dur="2s" repeatCount="indefinite" />
      </rect>
      <line x1="80" y1="80" x2="140" y2="60" stroke="#00FFD1" strokeWidth="3" opacity="0.7" />
      <line x1="100" y1="60" x2="120" y2="140" stroke="#FF0080" strokeWidth="3" opacity="0.7" />
      <line x1="80" y1="80" x2="50" y2="150" stroke="#00FFD1" strokeWidth="2" opacity="0.5" />
      <line x1="150" y1="170" x2="140" y2="60" stroke="#FF0080" strokeWidth="2" opacity="0.5" />
      <circle cx="110" cy="110" r="8" fill="#FFF" />
    </g>
  </svg>
);

// Navigation Component
const Navigation: React.FC<{ currentPage: string; setCurrentPage: (page: string) => void }> = ({ currentPage, setCurrentPage }) => {
  const { isAuthenticated, principal, login, logout, loading } = useICPAuth();
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-logo" onClick={() => setCurrentPage('home')}>
          <h2>BlockseBlock</h2>
        </div>
        <div className="nav-links">
          <button 
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => setCurrentPage('home')}
          >
            Home
          </button>
          <button 
            className={`nav-link ${currentPage === 'courses' ? 'active' : ''}`}
            onClick={() => setCurrentPage('courses')}
          >
            Courses
          </button>
          <button 
            className={`nav-link ${currentPage === 'hackathons' ? 'active' : ''}`}
            onClick={() => setCurrentPage('hackathons')}
          >
            Hackathons
          </button>
          <button 
            className={`nav-link ${currentPage === 'resources' ? 'active' : ''}`}
            onClick={() => setCurrentPage('resources')}
          >
            Resources
          </button>
          {isAuthenticated && (
            <button 
              className={`nav-link ${currentPage === 'profile' ? 'active' : ''}`}
              onClick={() => setCurrentPage('profile')}
            >
              Profile
            </button>
          )}
          {isAuthenticated && (
            <button 
              className={`nav-link admin-link ${currentPage === 'admin' ? 'active' : ''}`}
              onClick={() => setCurrentPage('admin')}
            >
              Admin
            </button>
          )}
          <div className="nav-auth">
            {loading ? (
              <span>Loading...</span>
            ) : isAuthenticated ? (
              <>
                <span className="principal">{principal?.slice(0, 8)}...</span>
                <button className="nav-link logout" onClick={logout}>Logout</button>
              </>
            ) : (
              <button className="nav-link login" onClick={login}>Login with Internet Identity</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Landing Page Component
const LandingPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="logo-container">
            <h1 className="logo">BlockseBlock</h1>
            <div className="logo-subtitle">Empowering Blockchain & Web3 Education</div>
          </div>
          <p className="hero-description">
            Master the future of technology with our comprehensive blockchain and Web3 courses. 
            From fundamentals to advanced DeFi protocols, we've got you covered.
          </p>
          <div className="cta-buttons">
            <button className="cta-primary">Start Learning</button>
            <button className="cta-secondary">Explore Courses</button>
          </div>
        </div>
        <div className="hero-visual">
          <BlockchainSVG />
          <div className="floating-elements">
            <div className="element element-1">⚡</div>
            <div className="element element-2">🔗</div>
            <div className="element element-3">💎</div>
            <div className="element element-4">🚀</div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about">
        <div className="container">
          <h2 className="section-title">About Us</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                At BlockseBlock, we're passionate about democratizing blockchain education. 
                Our mission is to bridge the gap between traditional education and the rapidly 
                evolving world of decentralized technologies.
              </p>
              <p>
                Founded by blockchain enthusiasts and industry experts, we've created a 
                comprehensive learning platform that combines theoretical knowledge with 
                hands-on practical experience.
              </p>
            </div>
            <div className="stats">
              <div className="stat">
                <div className="stat-number">50+</div>
                <div className="stat-label">Courses</div>
              </div>
              <div className="stat">
                <div className="stat-number">10K+</div>
                <div className="stat-label">Students</div>
              </div>
              <div className="stat">
                <div className="stat-number">95%</div>
                <div className="stat-label">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Aim Section */}
      <section className="aim">
        <div className="container">
          <h2 className="section-title">Our Aim</h2>
          <div className="aim-grid">
            <div className="aim-card">
              <div className="aim-icon">🎯</div>
              <h3>Democratize Education</h3>
              <p>Make blockchain and Web3 education accessible to everyone, regardless of their background or location.</p>
            </div>
            <div className="aim-card">
              <div className="aim-icon">🔬</div>
              <h3>Practical Learning</h3>
              <p>Focus on hands-on projects and real-world applications rather than just theoretical concepts.</p>
            </div>
            <div className="aim-card">
              <div className="aim-icon">🌍</div>
              <h3>Build the Future</h3>
              <p>Empower the next generation of developers to build the decentralized applications of tomorrow.</p>
            </div>
            <div className="aim-card">
              <div className="aim-icon">🤝</div>
              <h3>Community First</h3>
              <p>Foster a supportive community where learners can collaborate, share knowledge, and grow together.</p>
            </div>
            <div className="aim-card">
              <div className="aim-icon">🚀</div>
              <h3>Innovation Hub</h3>
              <p>Create a platform that fosters innovation and experimentation in blockchain and Web3 technologies.</p>
            </div>
            <div className="aim-card">
              <div className="aim-icon">💡</div>
              <h3>Industry Ready</h3>
              <p>Prepare students with the skills and knowledge needed to excel in the rapidly evolving blockchain industry.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="team">
        <div className="container">
          <h2 className="section-title">Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">
                <div className="avatar-placeholder">👨‍💻</div>
              </div>
              <h3>Golu Kumar</h3>
              <p className="member-role">3rd year B.Tech CSE and Blockchain Architect Enthusiast</p>
              {/* <p className="member-bio">Former senior developer at major DeFi protocols with 8+ years in blockchain development.</p> */}
            </div> 
            <div className="team-member">
              <div className="member-avatar">
                <div className="avatar-placeholder">👩‍🎓</div>
              </div>
              <h3>Bhawana Yadav </h3>
              <p className="member-role">Blockchain Developer and Blockchain Architect Enthusiast</p>
              { /* <p className="member-bio">PhD in Computer Science with expertise in curriculum development and educational technology.</p> */ }
            </div>
            <div className="team-member">
              <div className="member-avatar">
                <div className="avatar-placeholder">👨‍🔬</div>
              </div>
              <h3>Pooja Shree</h3>
              <p className="member-role">Blockchain Developer and Blockchain Architect Enthusiast</p>
              {/* <p className="member-bio">Leading researcher in distributed systems and consensus mechanisms with 50+ published papers.</p> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Define props interfaces above usage
interface CoursesPageProps {
  userTokens: number;
  setUserTokens: React.Dispatch<React.SetStateAction<number>>;
  tokenHistory: TokenReward[];
  setTokenHistory: React.Dispatch<React.SetStateAction<TokenReward[]>>;
  selectedCourse: number | null;
  setSelectedCourse: React.Dispatch<React.SetStateAction<number | null>>;
}

interface ProfilePageProps {
  userTokens: number;
}

// Courses Page Component
const CoursesPage: React.FC<CoursesPageProps> = ({ userTokens, setUserTokens, tokenHistory, setTokenHistory, selectedCourse, setSelectedCourse }) => {
  const [showTokenStore, setShowTokenStore] = useState(false);
  const [showTokenHistory, setShowTokenHistory] = useState(false);
  
  // Swag Store Items
  const swagItems: SwagItem[] = [
    {
      id: 1,
      name: "BlockseBlock T-Shirt",
      description: "Premium cotton t-shirt with our logo",
      tokenCost: 500,
      image: "👕",
      category: "clothing",
      available: true
    },
    {
      id: 2,
      name: "Blockchain Hoodie",
      description: "Warm hoodie with blockchain design",
      tokenCost: 800,
      image: "🧥",
      category: "clothing",
      available: true
    },
    {
      id: 3,
      name: "Crypto Coffee Mug",
      description: "Ceramic mug with crypto-themed design",
      tokenCost: 200,
      image: "☕",
      category: "accessories",
      available: true
    },
    {
      id: 4,
      name: "Hardware Wallet",
      description: "Ledger Nano S for secure crypto storage",
      tokenCost: 2000,
      image: "💳",
      category: "tech",
      available: true
    },
    {
      id: 5,
      name: "Blockchain Stickers Pack",
      description: "Set of 10 high-quality vinyl stickers",
      tokenCost: 100,
      image: "🏷️",
      category: "collectibles",
      available: true
    },
    {
      id: 6,
      name: "Crypto Keychain",
      description: "Metal keychain with blockchain symbol",
      tokenCost: 150,
      image: "🔑",
      category: "accessories",
      available: true
    }
  ];

  const courses: Course[] = [
    {
      id: 1,
      title: "Blockchain Fundamentals",
      description: "Master the core concepts of blockchain technology, from cryptographic foundations to consensus mechanisms. Perfect for beginners starting their blockchain journey.",
      chapters: 8,
      duration: "6 weeks",
      level: "Beginner",
      image: "🔗",
      totalTokenReward: 1200,
      prerequisites: [],
      skills: ["Blockchain Basics", "Cryptography", "Consensus Mechanisms", "Digital Signatures"],
      chaptersList: [
        {
          id: 1,
          title: "Introduction to Blockchain",
          description: "Understanding the revolutionary technology that powers cryptocurrencies",
          tokenReward: 150,
          lessons: [
            {
              id: 1,
              title: "What is Blockchain?",
              duration: "15 min",
              type: "reading",
              content: `A blockchain is a distributed, decentralized, public ledger that exists across a network. It's most commonly associated with cryptocurrencies like Bitcoin, but it has many other potential uses.

Key Concepts:
• Distributed Ledger: The ledger is shared across multiple computers
• Decentralized: No single entity controls the network
• Immutable: Once data is recorded, it cannot be altered
• Transparent: All transactions are visible to network participants

Blockchain technology was first introduced in 2008 by Satoshi Nakamoto as the underlying technology for Bitcoin. Since then, it has evolved into a platform for building decentralized applications.`,
              tokenReward: 25,
              difficulty: "easy"
        },
        {
          id: 2,
              title: "History of Blockchain",
              duration: "20 min",
              type: "reading",
              content: `The history of blockchain technology is fascinating and spans several decades:

1991-2008: Early Foundations
• Stuart Haber and W. Scott Stornetta created the first blockchain-like system
• They developed a cryptographically secured chain of blocks to prevent document tampering

2008: Bitcoin Whitepaper
• Satoshi Nakamoto published "Bitcoin: A Peer-to-Peer Electronic Cash System"
• Introduced the first practical implementation of blockchain technology

2009: Bitcoin Genesis Block
• The first Bitcoin block was mined on January 3, 2009
• Embedded with the message: "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks"

2015: Ethereum Launch
• Vitalik Buterin launched Ethereum, introducing smart contracts
• Opened the door for decentralized applications (DApps)`,
              tokenReward: 30,
              difficulty: "easy"
        },
        {
          id: 3,
              title: "Blockchain vs Traditional Systems",
              duration: "25 min",
              type: "reading",
              content: `Traditional centralized systems vs. decentralized blockchain networks:

Centralized Systems:
• Single point of control
• Single point of failure
• Requires trust in central authority
• Faster transaction processing
• Lower energy consumption

Blockchain Systems:
• Distributed control
• No single point of failure
• Trustless operation
• Slower transaction processing
• Higher energy consumption (for PoW)

Use Cases:
• Banking: Traditional for speed, Blockchain for transparency
• Supply Chain: Blockchain for traceability
• Voting: Blockchain for immutability
• Identity: Blockchain for self-sovereignty`,
              tokenReward: 35,
              difficulty: "medium"
            },
            {
              id: 4,
              title: "Quiz: Blockchain Basics",
              duration: "10 min",
              type: "quiz",
              tokenReward: 60,
              difficulty: "easy",
              quiz: {
                title: "Blockchain Fundamentals Quiz",
                questions: [
                  {
                    question: "What is the primary characteristic of a blockchain?",
                    answers: [
                      "It's controlled by a single entity",
                      "It's a distributed, decentralized ledger",
                      "It's faster than traditional databases",
                      "It's free to use"
                    ],
                    correctAnswer: 1,
                    explanation: "A blockchain is fundamentally a distributed, decentralized ledger that exists across a network of computers."
                  },
                  {
                    question: "Who created the Bitcoin whitepaper?",
                    answers: [
                      "Vitalik Buterin",
                      "Satoshi Nakamoto",
                      "Hal Finney",
                      "Nick Szabo"
                    ],
                    correctAnswer: 1,
                    explanation: "Satoshi Nakamoto published the Bitcoin whitepaper in 2008, introducing the first practical blockchain implementation."
                  },
                  {
                    question: "What happens once data is recorded on a blockchain?",
                    answers: [
                      "It can be easily modified",
                      "It becomes immutable",
                      "It gets deleted after a certain time",
                      "It's only visible to the creator"
                    ],
                    correctAnswer: 1,
                    explanation: "One of the key features of blockchain is immutability - once data is recorded, it cannot be altered."
                  }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Smart Contract Development",
      description: "Learn Solidity programming and build decentralized applications on Ethereum. Master the art of creating secure, efficient smart contracts.",
      chapters: 12,
      duration: "8 weeks",
      level: "Intermediate",
      image: "📜",
      totalTokenReward: 1800,
      prerequisites: ["Blockchain Fundamentals"],
      skills: ["Solidity", "Smart Contracts", "Ethereum", "DApp Development"],
      chaptersList: [
        {
          id: 1,
          title: "Introduction to Smart Contracts",
          description: "Understanding the foundation of programmable blockchain applications",
          tokenReward: 200,
          lessons: [
            {
              id: 1,
              title: "What are Smart Contracts?",
              duration: "20 min",
              type: "reading",
              content: `Smart contracts are self-executing contracts with the terms of the agreement directly written into code.

Definition:
A smart contract is a computer program that automatically executes when predetermined conditions are met.

Key Characteristics:
• Self-executing: No third party needed
• Immutable: Code cannot be changed once deployed
• Transparent: All code is visible on blockchain
• Deterministic: Same inputs always produce same outputs

Real-World Examples:
• Insurance: Automatic payout when conditions are met
• Supply Chain: Automatic payment when goods are delivered
• Voting: Automatic tallying of votes
• Gaming: Automatic distribution of rewards

Smart Contract Lifecycle:
1. Development: Write contract code
2. Compilation: Convert to bytecode
3. Deployment: Upload to blockchain
4. Execution: Contract runs automatically`,
              tokenReward: 30,
              difficulty: "easy"
        },
        {
          id: 2,
              title: "Ethereum Virtual Machine",
              duration: "25 min",
              type: "reading",
              content: `The Ethereum Virtual Machine (EVM) is the runtime environment for smart contracts on Ethereum.

EVM Architecture:
• Stack-based virtual machine
• 256-bit word size
• Turing complete
• Gas-based execution model

Key Concepts:
• Bytecode: Compiled smart contract code
• Gas: Unit of computational work
• Opcodes: Low-level instructions
• Memory: Temporary storage during execution

Gas System:
• Every operation costs gas
• Gas price determines transaction fee
• Gas limit prevents infinite loops
• Out of gas = transaction fails

Example Gas Costs:
• ADD: 3 gas
• MUL: 5 gas
• SSTORE: 20,000 gas (first time)
• SLOAD: 100 gas`,
              tokenReward: 35,
              difficulty: "medium"
            },
            {
              id: 3,
              title: "Gas and Transaction Costs",
              duration: "30 min",
              type: "reading",
              content: `Understanding gas is crucial for efficient smart contract development and deployment.

Gas Calculation:
Total Cost = Gas Used × Gas Price

Gas Price Options:
• Standard: Normal network conditions
• Fast: Higher priority, higher cost
• Instant: Maximum priority, highest cost

Factors Affecting Gas:
• Contract complexity
• Storage operations
• Computational operations
• Network congestion

Gas Optimization Techniques:
• Use events instead of storage for logs
• Batch operations when possible
• Avoid unnecessary loops
• Use appropriate data types

Example:
Simple transfer: 21,000 gas
Smart contract call: 50,000+ gas
Contract deployment: 500,000+ gas`,
              tokenReward: 40,
              difficulty: "medium"
            },
            {
              id: 4,
              title: "Quiz: Smart Contract Basics",
              duration: "10 min",
              type: "quiz",
              tokenReward: 95,
              difficulty: "easy",
              quiz: {
                title: "Smart Contract Fundamentals Quiz",
                questions: [
                  {
                    question: "What is the primary characteristic of smart contracts?",
                    answers: [
                      "They require human intervention",
                      "They are self-executing",
                      "They can be modified after deployment",
                      "They are free to deploy"
                    ],
                    correctAnswer: 1,
                    explanation: "Smart contracts are self-executing programs that automatically execute when predetermined conditions are met."
                  },
                  {
                    question: "What does EVM stand for?",
                    answers: [
                      "Ethereum Virtual Machine",
                      "Electronic Value Mechanism",
                      "Ethereum Verification Method",
                      "Encrypted Virtual Memory"
                    ],
                    correctAnswer: 0,
                    explanation: "EVM stands for Ethereum Virtual Machine, the runtime environment for smart contracts."
                  },
                  {
                    question: "How is transaction cost calculated in Ethereum?",
                    answers: [
                      "Gas Used × Gas Price",
                      "Contract Size × Network Fee",
                      "Block Number × Difficulty",
                      "Transaction Value × Percentage"
                    ],
                    correctAnswer: 0,
                    explanation: "Transaction cost = Gas Used × Gas Price, where gas is the unit of computational work."
                  }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Zero Knowledge Proofs",
      description: "Dive into the world of privacy-preserving cryptography and learn how ZKPs are revolutionizing blockchain scalability and privacy.",
      chapters: 7,
      duration: "5 weeks",
      level: "Advanced",
      image: "🕵️‍♂️",
      totalTokenReward: 1400,
      prerequisites: ["Blockchain Fundamentals", "Cryptographic Foundations"],
      skills: ["ZKP Theory", "zk-SNARKs", "zk-STARKs", "Privacy Protocols"],
      chaptersList: [
        {
          id: 1,
          title: "Introduction to ZKPs",
          description: "What are Zero Knowledge Proofs and why do they matter?",
          tokenReward: 200,
          lessons: [
            {
              id: 1,
              title: "ZKP Basics",
              duration: "20 min",
              type: "reading",
              content: `A Zero Knowledge Proof (ZKP) allows one party to prove to another that a statement is true, without revealing any information beyond the validity of the statement.\n\nApplications: Privacy coins, identity, voting, and more.`,
              tokenReward: 40,
              difficulty: "medium"
        },
        {
          id: 2,
              title: "Interactive vs Non-Interactive ZKPs",
              duration: "15 min",
              type: "reading",
              content: `Learn the difference between interactive and non-interactive ZKPs, and why non-interactive proofs (like zk-SNARKs) are so important for blockchains.`,
              tokenReward: 30,
              difficulty: "medium"
            },
            {
              id: 3,
              title: "Quiz: ZKP Fundamentals",
              duration: "10 min",
              type: "quiz",
              tokenReward: 60,
              difficulty: "medium",
              quiz: {
                title: "ZKP Quiz",
                questions: [
                  {
                    question: "What is the main benefit of a ZKP?",
                    answers: ["Faster transactions", "Privacy without revealing data", "Lower fees", "More validators"],
                    correctAnswer: 1,
                    explanation: "ZKPs allow privacy without revealing underlying data."
                  }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: 4,
      title: "Blockchain for Business",
      description: "Explore real-world enterprise blockchain use cases, from supply chain to finance, and how businesses are adopting DLT.",
      chapters: 6,
      duration: "4 weeks",
      level: "Intermediate",
      image: "��",
      totalTokenReward: 1000,
      prerequisites: ["Blockchain Fundamentals"],
      skills: ["DLT", "Enterprise Integration", "Smart Contracts", "Consortium Chains"],
      chaptersList: [
        {
          id: 1,
          title: "Enterprise Blockchain Overview",
          description: "How businesses use blockchain for transparency and efficiency.",
          tokenReward: 150,
          lessons: [
            {
              id: 1,
              title: "DLT in Supply Chain",
              duration: "20 min",
              type: "reading",
              content: `Distributed Ledger Technology (DLT) enables transparent, tamper-proof supply chains. Learn about real-world deployments by IBM, Maersk, and others.`,
              tokenReward: 30,
              difficulty: "easy"
        },
        {
          id: 2,
              title: "Quiz: Enterprise Blockchain",
              duration: "10 min",
              type: "quiz",
              tokenReward: 40,
              difficulty: "easy",
              quiz: {
                title: "Enterprise Blockchain Quiz",
                questions: [
                  {
                    question: "Which industry is a major adopter of blockchain for tracking goods?",
                    answers: ["Healthcare", "Supply Chain", "Gaming", "Education"],
                    correctAnswer: 1,
                    explanation: "Supply chain is a leading use case for enterprise blockchain."
                  }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: 5,
      title: "Crypto Trading & DeFi",
      description: "Master the essentials of crypto trading, DeFi protocols, yield farming, and risk management in decentralized finance.",
      chapters: 8,
      duration: "6 weeks",
      level: "Intermediate",
      image: "📈",
      totalTokenReward: 1200,
      prerequisites: ["Blockchain Fundamentals"],
      skills: ["DEXs", "Yield Farming", "Liquidity Pools", "Risk Management"],
      chaptersList: [
        {
          id: 1,
          title: "Intro to DeFi Trading",
          description: "How to trade safely and profitably on decentralized exchanges.",
          tokenReward: 200,
          lessons: [
            {
              id: 1,
              title: "What is a DEX?",
              duration: "15 min",
              type: "reading",
              content: `A Decentralized Exchange (DEX) allows peer-to-peer trading of crypto assets without intermediaries. Learn about Uniswap, SushiSwap, and more.`,
              tokenReward: 30,
              difficulty: "easy"
        },
        {
          id: 2,
              title: "Quiz: DEX Basics",
              duration: "10 min",
              type: "quiz",
              tokenReward: 40,
              difficulty: "easy",
              quiz: {
                title: "DEX Quiz",
                questions: [
                  {
                    question: "What is the main advantage of a DEX?",
                    answers: ["Centralized control", "No intermediaries", "Faster KYC", "Higher fees"],
                    correctAnswer: 1,
                    explanation: "DEXs allow trading without intermediaries."
                  }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: 6,
      title: "Web3 Social & DAOs",
      description: "Discover the future of decentralized social networks, DAOs, and on-chain governance for communities.",
      chapters: 5,
      duration: "3 weeks",
      level: "Beginner",
      image: "🤝",
      totalTokenReward: 800,
      prerequisites: ["Blockchain Fundamentals"],
      skills: ["DAOs", "On-chain Governance", "Web3 Social", "Token Voting"],
      chaptersList: [
        {
          id: 1,
          title: "Intro to DAOs",
          description: "What are Decentralized Autonomous Organizations and how do they work?",
          tokenReward: 120,
          lessons: [
            {
              id: 1,
              title: "DAO Basics",
              duration: "15 min",
              type: "reading",
              content: `DAOs are organizations governed by code and token holders, not centralized management. Learn about MakerDAO, ENS DAO, and more.`,
              tokenReward: 30,
              difficulty: "easy"
        },
        {
          id: 2,
              title: "Quiz: DAO Fundamentals",
              duration: "10 min",
              type: "quiz",
              tokenReward: 30,
              difficulty: "easy",
              quiz: {
                title: "DAO Quiz",
                questions: [
                  {
                    question: "What is a DAO?",
                    answers: ["A centralized company", "A decentralized organization run by code", "A type of NFT", "A blockchain explorer"],
                    correctAnswer: 1,
                    explanation: "DAOs are decentralized organizations governed by code and token holders."
                  }
                ]
              }
            }
          ]
        }
      ]
    }
  ];

  const handleRedeemItem = (item: SwagItem) => {
    if (userTokens >= item.tokenCost) {
      setUserTokens((prev: number) => prev - item.tokenCost);
      alert(`🎉 Successfully redeemed ${item.name}! You'll receive it within 5-7 business days.`);
    }
  };

  const addTokenReward = (amount: number, reason: string, courseId?: number, lessonId?: number) => {
    const newReward: TokenReward = {
      id: Date.now(),
      amount,
      reason,
      date: new Date().toLocaleDateString(),
      courseId,
      lessonId
    };
    
    setUserTokens((prev: number) => prev + amount);
    setTokenHistory((prev: TokenReward[]) => [newReward, ...prev]);
  };

  if (selectedCourse) {
    const course = courses.find(c => c.id === selectedCourse);
    if (!course) return <div>Course not found</div>;
    
    return (
      <CourseDetailPage 
        course={course} 
        onBack={() => setSelectedCourse(null)}
        onTokenReward={addTokenReward}
      />
    );
  }

  return (
    <div className="page-container">
      <div className="container">
        <div className="courses-header">
          <div className="courses-title-section">
        <h1 className="page-title">Courses</h1>
        <p className="page-subtitle">Master blockchain and Web3 technologies with our comprehensive course catalog</p>
          </div>
          
          <div className="token-section">
            <div className="token-display">
              <span className="token-icon">🪙</span>
              <span className="token-amount">{userTokens} Tokens</span>
            </div>
            <div className="token-actions">
              <button 
                className="token-btn history-btn"
                onClick={() => setShowTokenHistory(true)}
              >
                📊 History
              </button>
              <button 
                className="token-btn store-btn"
                onClick={() => setShowTokenStore(true)}
              >
                🛍️ Store
              </button>
            </div>
          </div>
        </div>
        
        <div className="courses-grid">
          {courses.map(course => (
            <div key={course.id} className="course-card">
              <div className="course-image">
                <span className="course-icon">{course.image}</span>
                <div className="course-token-reward">
                  <span className="token-icon">🪙</span>
                  <span>{course.totalTokenReward}</span>
                </div>
              </div>
              <div className="course-content">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="course-meta">
                  <span className="meta-item">📚 {course.chapters} Chapters</span>
                  <span className="meta-item">⏱️ {course.duration}</span>
                  <span className="meta-item">📊 {course.level}</span>
                  <span className="meta-item">🪙 {course.totalTokenReward} Tokens</span>
                </div>
                <div className="course-skills">
                  <h4>Skills you'll learn:</h4>
                  <div className="skills-tags">
                    {course.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
                {course.prerequisites && course.prerequisites.length > 0 && (
                  <div className="course-prerequisites">
                    <h4>Prerequisites:</h4>
                    <div className="prerequisites-list">
                      {course.prerequisites.map((prereq, index) => (
                        <span key={index} className="prerequisite-item">• {prereq}</span>
                      ))}
                    </div>
                  </div>
                )}
                <button 
                  className="course-btn"
                  onClick={() => setSelectedCourse(course.id)}
                >
                  Start Course
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showTokenStore && (
        <TokenStore
          userTokens={userTokens}
          onRedeem={handleRedeemItem}
          onClose={() => setShowTokenStore(false)}
          swagItems={swagItems}
        />
      )}

      {showTokenHistory && (
        <TokenHistory
          tokenHistory={tokenHistory}
          onClose={() => setShowTokenHistory(false)}
        />
      )}
    </div>
  );
};

// Confetti Animation Component
const Confetti: React.FC<{ trigger: boolean }> = ({ trigger }) => {
  const ref = useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (trigger && ref.current) {
      ref.current.classList.add('confetti-animate');
      setTimeout(() => {
        ref.current && ref.current.classList.remove('confetti-animate');
      }, 1200);
    }
  }, [trigger]);
  return <div ref={ref} className="confetti" />;
};

// Add TokenChestModal Component
const TokenChestModal: React.FC<{ open: boolean; amount: number; onClose: () => void }> = ({ open, amount, onClose }) => {
  React.useEffect(() => {
    if (open) {
      const timer = setTimeout(onClose, 1500);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="token-chest-modal-overlay">
      <div className="token-chest-modal">
        <div className="chest-emoji">🪙<span className="chest">🧰</span></div>
        <div className="chest-message">Completed!<br/>Token Reward</div>
        <div className="chest-amount">+{amount} Tokens</div>
        <button className="chest-close-btn" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

// Course Detail Page Component
const CourseDetailPage: React.FC<{ course: Course; onBack: () => void; onTokenReward: (amount: number, reason: string, courseId?: number, lessonId?: number) => void }> = ({ course, onBack, onTokenReward }) => {
  const [selectedChapter, setSelectedChapter] = useState<number | null>(course.chaptersList[0]?.id || null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(course.chaptersList[0]?.lessons[0] || null);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());
  const [quizScores, setQuizScores] = useState<{[key: number]: number}>({});
  const [activeTab, setActiveTab] = useState<'overview' | 'lessons' | 'forum' | 'certificate'>('overview');
  const [courseCompleted, setCourseCompleted] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showChest, setShowChest] = useState(false);
  const [chestAmount, setChestAmount] = useState(0);

  const handleLessonComplete = (lessonId: number) => {
    if (!completedLessons.has(lessonId)) {
      setCompletedLessons(prev => {
        const updated = new Set(prev).add(lessonId);
        return updated;
      });
      // Award tokens for lesson completion
      const lesson = course.chaptersList
        .flatMap((chapter: Chapter) => chapter.lessons)
        .find((l: Lesson) => l.id === lessonId);
      if (lesson) {
        onTokenReward(
          lesson.tokenReward,
          `Completed lesson: ${lesson.title}`,
          course.id,
          lessonId
        );
        setChestAmount(lesson.tokenReward);
        setShowChest(true);
      }
    }
    // Check if course is completed
    const totalLessons = course.chaptersList.reduce((acc, chapter) => acc + chapter.lessons.length, 0);
    const newCompletedLessons = new Set(completedLessons).add(lessonId);
    if (newCompletedLessons.size === totalLessons) {
      setCourseCompleted(true);
      onTokenReward(
        course.totalTokenReward * 0.1,
        `Course completed: ${course.title}`,
        course.id
      );
    }
  };

  const handleQuizComplete = (lessonId: number, score: number) => {
    setQuizScores(prev => ({ ...prev, [lessonId]: score }));
    if (!completedLessons.has(lessonId)) {
      setCompletedLessons(prev => {
        const updated = new Set(prev).add(lessonId);
        return updated;
      });
      // Always award base tokens for quiz completion
      const lesson = course.chaptersList
        .flatMap((chapter: Chapter) => chapter.lessons)
        .find((l: Lesson) => l.id === lessonId);
      if (lesson) {
        onTokenReward(
          lesson.tokenReward,
          `Completed quiz: ${lesson.title}`,
          course.id,
          lessonId
        );
        setChestAmount(lesson.tokenReward);
        setShowChest(true);
        if (score >= 80) {
          const bonusTokens = Math.floor(lesson.tokenReward * 0.5);
          onTokenReward(
            bonusTokens,
            `High quiz score (${score}%): ${lesson.title}`,
            course.id,
            lessonId
          );
          setTimeout(() => {
            setChestAmount(bonusTokens);
            setShowChest(true);
          }, 1600);
        }
      }
    }
    // Check if course is completed
    const totalLessons = course.chaptersList.reduce((acc, chapter) => acc + chapter.lessons.length, 0);
    const newCompletedLessons = new Set(completedLessons).add(lessonId);
    if (newCompletedLessons.size === totalLessons) {
      setCourseCompleted(true);
      onTokenReward(
        course.totalTokenReward * 0.1,
        `Course completed: ${course.title}`,
        course.id
        );
    }
  };

  const getProgressPercentage = () => {
    const totalLessons = course.chaptersList.reduce((acc, chapter) => acc + chapter.lessons.length, 0);
    return Math.round((completedLessons.size / totalLessons) * 100);
  };

  // Hero section
  const HeroSection = () => (
    <div className="course-hero">
      <div className="course-hero-icon">{course.image}</div>
      <div className="course-hero-content">
        <h1 className="course-hero-title">{course.title}</h1>
        <p className="course-hero-desc">{course.description}</p>
        <div className="course-hero-meta">
          <span>Level: <b>{course.level}</b></span>
          <span>Duration: <b>{course.duration}</b></span>
          <span>Chapters: <b>{course.chapters}</b></span>
          <span>🪙 <b>{course.totalTokenReward} Tokens</b></span>
            </div>
        <div className="course-hero-skills">
          <span>Skills:</span>
          {course.skills.map((skill, i) => <span key={i} className="skill-tag">{skill}</span>)}
            </div>
        {course.prerequisites && course.prerequisites.length > 0 && (
          <div className="course-hero-prereq">
            <span>Prerequisites:</span>
            {course.prerequisites.map((pr, i) => <span key={i} className="prerequisite-item">{pr}</span>)}
            </div>
        )}
            </div>
      <button className="back-btn" onClick={onBack}>← Back to Courses</button>
          </div>
  );

  // Sidebar
  const Sidebar = () => (
    <div className="course-sidebar">
      <div className="sidebar-section">
        <h4>Progress</h4>
          <div className="progress-bar-large">
            <div className="progress-fill-large" style={{ width: `${getProgressPercentage()}%` }}></div>
          </div>
        <div className="progress-label">{getProgressPercentage()}% Complete</div>
            </div>
      <div className="sidebar-section">
        <h4>Chapters</h4>
        <ul className="sidebar-chapters-list">
          {course.chaptersList.map(chapter => (
            <li key={chapter.id} className={selectedChapter === chapter.id ? 'active' : ''} onClick={() => {
              setSelectedChapter(chapter.id);
              setSelectedLesson(chapter.lessons[0]);
            }}>
              {chapter.title}
            </li>
          ))}
        </ul>
        </div>
      <div className="sidebar-section">
        <h4>Lessons</h4>
        <ul className="sidebar-lessons-list">
          {selectedChapter && course.chaptersList.find(c => c.id === selectedChapter)?.lessons.map(lesson => (
            <li key={lesson.id} className={selectedLesson?.id === lesson.id ? 'active' : ''} onClick={() => setSelectedLesson(lesson)}>
              {lesson.title} {completedLessons.has(lesson.id) && <span className="lesson-completed">✓</span>}
            </li>
          ))}
        </ul>
            </div>
    </div>
  );

  // Main lesson/video/content area
  const LessonContent = () => (
    <div className="lesson-main-content">
      {selectedLesson ? (
        <div className="lesson-main-card">
          {selectedLesson.type === 'video' && (
            <div className="lesson-video-preview">
              <VideoPlayer 
                videoUrl={selectedLesson.videoUrl || "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"}
                onComplete={() => handleLessonComplete(selectedLesson.id)}
              />
                          </div>
          )}
          <div className="lesson-details">
            <h2>{selectedLesson.title}</h2>
            <div className="lesson-meta">
              <span>{selectedLesson.duration}</span>
              <span className={`lesson-difficulty ${selectedLesson.difficulty}`}>{selectedLesson.difficulty}</span>
              <span className="lesson-tokens"><span className="token-icon">🪙</span>{selectedLesson.tokenReward} Tokens</span>
                          </div>
            {selectedLesson.type === 'reading' && (
              <div className="lesson-content reading-lesson">
                <pre className="content-text">{selectedLesson.content}</pre>
                <button className="complete-lesson-btn" onClick={() => handleLessonComplete(selectedLesson.id)}>Mark as Complete</button>
                        </div>
            )}
            {(selectedLesson.type === 'exercise' || selectedLesson.type === 'lab') && (
              <div className="lesson-content practical-lesson">
                <pre className="content-text">{selectedLesson.content}</pre>
                <button className="complete-lesson-btn" onClick={() => handleLessonComplete(selectedLesson.id)}>Mark as Complete</button>
                    </div>
                  )}
            {selectedLesson.type === 'quiz' && (
              <Quiz 
                quiz={selectedLesson.quiz}
                onComplete={(score) => handleQuizComplete(selectedLesson.id, score)}
              />
              )}
            </div>
          </div>
      ) : (
        <div className="lesson-main-card empty">
          <h3>Select a lesson to begin</h3>
          </div>
        )}
          </div>
  );

  return (
    <div className="course-detail-page">
      <TokenChestModal open={showChest} amount={chestAmount} onClose={() => setShowChest(false)} />
      <HeroSection />
      <div className="course-detail-body">
        <Sidebar />
        <LessonContent />
          </div>
    </div>
  );
};

// Video Player Component
const VideoPlayer: React.FC<{ videoUrl: string; onComplete: () => void }> = ({ videoUrl, onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    const progress = (video.currentTime / video.duration) * 100;
    setProgress(progress);
    setCurrentTime(video.currentTime);
    
    // Mark as complete when 90% watched
    if (progress >= 90) {
      onComplete();
    }
  };

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setDuration(e.currentTarget.duration);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="video-player">
      <video
        src={videoUrl}
        controls
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="video-element"
      />
      <div className="video-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="time-display">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
      {progress >= 90 && (
        <div className="completion-notice">
          ✅ Lesson completed! You can now proceed to the next lesson.
        </div>
      )}
    </div>
  );
};

// Quiz Component
const Quiz: React.FC<{ quiz: any; onComplete: (score: number) => void }> = ({ quiz, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[currentQuestion] = answerIndex;
      return newAnswers;
    });
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    quiz.questions.forEach((question: any, index: number) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    const finalScore = Math.round((correctAnswers / quiz.questions.length) * 100);
    setScore(finalScore);
    setShowResults(true);
    onComplete(finalScore);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (showResults) {
    return (
      <div className="quiz-results">
        <h3>Quiz Results</h3>
        <div className="score-display">
          <div className="score-circle">
            <span className="score-number">{score}%</span>
          </div>
          <p className="score-message">
            {score >= 80 ? "Excellent! You've mastered this topic!" :
             score >= 60 ? "Good job! Keep practicing to improve." :
             "Keep studying! Review the material and try again."}
          </p>
        </div>
        <div className="question-review">
          {quiz.questions.map((question: any, index: number) => (
            <div key={index} className={`question-result ${selectedAnswers[index] === question.correctAnswer ? 'correct' : 'incorrect'}`}>
              <h4>Question {index + 1}</h4>
              <p>{question.question}</p>
              <p className="your-answer">Your answer: {question.answers[selectedAnswers[index]]}</p>
              {selectedAnswers[index] !== question.correctAnswer && (
                <p className="correct-answer">Correct answer: {question.answers[question.correctAnswer]}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h3>Quiz: {quiz.title}</h3>
        <div className="quiz-progress">
          Question {currentQuestion + 1} of {quiz.questions.length}
        </div>
      </div>
      
      <div className="question-container">
        <h4>{question.question}</h4>
        <div className="answers-list">
          {question.answers.map((answer: string, index: number) => (
            <label key={index} className="answer-option">
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                checked={selectedAnswers[currentQuestion] === index}
                onChange={() => handleAnswerSelect(index)}
              />
              <span className="answer-text">{answer}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="quiz-navigation">
        <button 
          className="nav-btn" 
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          Previous
        </button>
        
        {currentQuestion === quiz.questions.length - 1 ? (
          <button 
            className="submit-btn"
            onClick={handleSubmit}
            disabled={selectedAnswers[currentQuestion] === undefined}
          >
            Submit Quiz
          </button>
        ) : (
          <button 
            className="nav-btn"
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

// Certificate Component
const Certificate: React.FC<{ course: any; userName: string; completionDate: string }> = ({ course, userName, completionDate }) => {
  return (
    <div className="certificate">
      <div className="certificate-content">
        <div className="certificate-header">
          <h1>Certificate of Completion</h1>
          <p>This is to certify that</p>
        </div>
        
        <div className="certificate-name">
          <h2>{userName}</h2>
        </div>
        
        <div className="certificate-body">
          <p>has successfully completed the course</p>
          <h3>{course.title}</h3>
          <p>on {completionDate}</p>
        </div>
        
        <div className="certificate-footer">
          <div className="signature-section">
            <div className="signature-line"></div>
            <p>Course Instructor</p>
          </div>
          <div className="signature-section">
            <div className="signature-line"></div>
            <p>BlockseBlock CEO</p>
          </div>
        </div>
        
        <div className="certificate-seal">
          <div className="seal-content">
            <span>✓</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Discussion Forum Component
const DiscussionForum: React.FC<{ courseId: number }> = ({ courseId }) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Alice Johnson",
      title: "Question about Smart Contracts",
      content: "I'm having trouble understanding the gas optimization techniques. Can someone help?",
      replies: [
        { id: 1, author: "Bob Smith", content: "Great question! Gas optimization is crucial..." },
        { id: 2, author: "Carol Davis", content: "I found this resource helpful..." }
      ],
      timestamp: "2 hours ago",
      likes: 5
    },
    {
      id: 2,
      author: "David Wilson",
      title: "DeFi Protocol Discussion",
      content: "What are your thoughts on the latest DeFi protocols?",
      replies: [],
      timestamp: "1 day ago",
      likes: 3
    }
  ]);

  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  const handleCreatePost = () => {
    if (newPost.title && newPost.content) {
      const post = {
        id: posts.length + 1,
        author: "Current User",
        title: newPost.title,
        content: newPost.content,
        replies: [],
        timestamp: "Just now",
        likes: 0
      };
      setPosts([post, ...posts]);
      setNewPost({ title: "", content: "" });
      setShowNewPostForm(false);
    }
  };

  return (
    <div className="discussion-forum">
      <div className="forum-header">
        <h3>Course Discussion</h3>
        <button 
          className="new-post-btn"
          onClick={() => setShowNewPostForm(true)}
        >
          New Post
        </button>
      </div>

      {showNewPostForm && (
        <div className="new-post-form">
          <h4>Create New Post</h4>
          <input
            type="text"
            placeholder="Post title"
            value={newPost.title}
            onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
            className="post-title-input"
          />
          <textarea
            placeholder="Post content"
            value={newPost.content}
            onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
            className="post-content-input"
            rows={4}
          />
          <div className="post-actions">
            <button className="submit-post-btn" onClick={handleCreatePost}>
              Post
            </button>
            <button className="cancel-post-btn" onClick={() => setShowNewPostForm(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="posts-list">
        {posts.map(post => (
          <div key={post.id} className="forum-post">
            <div className="post-header">
              <h4>{post.title}</h4>
              <div className="post-meta">
                <span className="post-author">by {post.author}</span>
                <span className="post-time">{post.timestamp}</span>
              </div>
            </div>
            <div className="post-content">
              <p>{post.content}</p>
            </div>
            <div className="post-actions">
              <button className="like-btn">👍 {post.likes}</button>
              <button className="reply-btn">💬 Reply</button>
            </div>
            {post.replies.length > 0 && (
              <div className="replies-section">
                <h5>Replies ({post.replies.length})</h5>
                {post.replies.map(reply => (
                  <div key={reply.id} className="reply">
                    <div className="reply-header">
                      <span className="reply-author">{reply.author}</span>
                    </div>
                    <p>{reply.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Hackathons Page Component
const HackathonsPage: React.FC = () => {
  const [hackathons] = useState([
    {
      id: 1,
      title: "DeFi Innovation Hackathon",
      description: "Build the next generation of decentralized finance protocols",
      startDate: "2025-02-15",
      endDate: "2025-02-28",
      prize: "$50,000",
      participants: 150,
      status: "upcoming"
    },
    {
      id: 2,
      title: "NFT Marketplace Challenge",
      description: "Create innovative NFT marketplaces and trading platforms",
      startDate: "2025-01-20",
      endDate: "2025-02-05",
      prize: "$25,000",
      participants: 89,
      status: "ongoing"
    },
    {
      id: 3,
      title: "Blockchain Gaming Hackathon",
      description: "Develop blockchain-based games and gaming infrastructure",
      startDate: "2024-12-01",
      endDate: "2024-12-15",
      prize: "$30,000",
      participants: 120,
      status: "completed"
    }
  ]);

  return (
    <div className="page-container">
      <div className="container">
        <h1 className="page-title">Hackathons</h1>
        <p className="page-description">
          Join exciting blockchain hackathons and compete with developers worldwide
        </p>

        <div className="hackathons-grid">
          {hackathons.map(hackathon => (
            <div key={hackathon.id} className={`hackathon-card ${hackathon.status}`}>
              <div className="hackathon-header">
                <h3>{hackathon.title}</h3>
                <span className={`status-badge ${hackathon.status}`}>
                  {hackathon.status}
                </span>
              </div>
              <p className="hackathon-description">{hackathon.description}</p>
              <div className="hackathon-details">
                <div className="detail-item">
                  <span className="detail-label">Start:</span>
                  <span className="detail-value">{hackathon.startDate}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">End:</span>
                  <span className="detail-value">{hackathon.endDate}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Prize Pool:</span>
                  <span className="detail-value prize">{hackathon.prize}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Participants:</span>
                  <span className="detail-value">{hackathon.participants}</span>
                </div>
              </div>
              <button className="hackathon-btn">
                {hackathon.status === 'upcoming' ? 'Register' : 
                 hackathon.status === 'ongoing' ? 'Join Now' : 'View Results'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Resources Page Component
const ResourcesPage: React.FC = () => {
  const [resources] = useState([
    {
      id: 1,
      title: "Blockchain Development Guide",
      type: "documentation",
      description: "Comprehensive guide to blockchain development",
      url: "#",
      icon: "📚"
    },
    {
      id: 2,
      title: "Smart Contract Security Best Practices",
      type: "guide",
      description: "Learn how to write secure smart contracts",
      url: "#",
      icon: "🔒"
    },
    {
      id: 3,
      title: "DeFi Protocol Analysis",
      type: "research",
      description: "In-depth analysis of popular DeFi protocols",
      url: "#",
      icon: "📊"
    },
    {
      id: 4,
      title: "Web3 Development Tools",
      type: "tools",
      description: "Essential tools for Web3 development",
      url: "#",
      icon: "🛠️"
    },
    {
      id: 5,
      title: "Blockchain Whitepapers",
      type: "research",
      description: "Collection of important blockchain whitepapers",
      url: "#",
      icon: "📄"
    },
    {
      id: 6,
      title: "Community Discord",
      type: "community",
      description: "Join our Discord community for discussions",
      url: "#",
      icon: "💬"
    }
  ]);

  return (
    <div className="page-container">
      <div className="container">
        <h1 className="page-title">Resources</h1>
        <p className="page-description">
          Access comprehensive resources to enhance your blockchain knowledge
        </p>

        <div className="resources-grid">
          {resources.map(resource => (
            <div key={resource.id} className="resource-card">
              <div className="resource-icon">{resource.icon}</div>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <span className="resource-type">{resource.type}</span>
              <button className="resource-btn">Access Resource</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Profile Page Component
const ProfilePage: React.FC<ProfilePageProps> = ({ userTokens }) => {
  const { isAuthenticated, loading } = useICPAuth();
  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div style={{textAlign: 'center', marginTop: '2rem'}}>Please log in with Internet Identity to view your profile.</div>;
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Blockchain enthusiast and developer",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    twitter: "@johndoe",
    github: "johndoe",
    linkedin: "johndoe"
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };
  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          {profilePicture ? (
            <img src={profilePicture} alt="Profile" className="avatar-image" />
          ) : (
            <div className="avatar-placeholder">👤</div>
          )}
          <label className="avatar-upload-label">
            <input type="file" accept="image/*" onChange={handleFileChange} className="avatar-upload" />
            Change
          </label>
        </div>
        <div className="profile-info">
          <h2>{profile.name}</h2>
          <div className="profile-email">{profile.email}</div>
          <div className="profile-bio">{profile.bio}</div>
        </div>
      </div>
      <div className="profile-token-balance">
        <span className="profile-token-icon">🪙</span>
        <span className="profile-token-amount">{userTokens} Tokens</span>
      </div>
      <div className="profile-details">
        <div className="detail-section">
          <h3>Personal Information</h3>
          <div className="detail-item">
            <span className="detail-label">Location:</span>
            <span className="detail-value">{profile.location}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Website:</span>
            <span className="detail-value">
              <a href={profile.website} target="_blank" rel="noopener noreferrer">
                {profile.website}
              </a>
            </span>
          </div>
        </div>
        
        <div className="detail-section">
          <h3>Social Links</h3>
          <div className="social-links-display">
            <a href={`https://twitter.com/${profile.twitter}`} target="_blank" rel="noopener noreferrer" className="social-link">
              <span className="social-icon">🐦</span>
              <span>Twitter</span>
            </a>
            <a href={`https://github.com/${profile.github}`} target="_blank" rel="noopener noreferrer" className="social-link">
              <span className="social-icon">📦</span>
              <span>GitHub</span>
            </a>
            <a href={`https://linkedin.com/in/${profile.linkedin}`} target="_blank" rel="noopener noreferrer" className="social-link">
              <span className="social-icon">💼</span>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
      <div className="form-actions">
        <button className="save-btn" onClick={handleSave}>Save Changes</button>
        <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

// Admin Panel Component
const AdminPanel: React.FC = () => {
  const { isAuthenticated, loading } = useICPAuth();
  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div style={{textAlign: 'center', marginTop: '2rem'}}>Admin access requires Internet Identity login.</div>;
  const [activeTab, setActiveTab] = useState('courses');
  const [courses, setCourses] = useState([
    { id: 1, title: "Blockchain Fundamentals", status: "published", students: 1250 },
    { id: 2, title: "Smart Contract Development", status: "draft", students: 890 },
    { id: 3, title: "DeFi Protocols", status: "published", students: 567 }
  ]);

  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    level: "Beginner",
    duration: "",
    chapters: ""
  });

  const handleCreateCourse = () => {
    if (newCourse.title && newCourse.description) {
      const course = {
        id: courses.length + 1,
        title: newCourse.title,
        status: "draft",
        students: 0
      };
      setCourses([...courses, course]);
      setNewCourse({ title: "", description: "", level: "Beginner", duration: "", chapters: "" });
    }
  };

  return (
    <div className="page-container">
      <div className="container">
        <h1 className="page-title">Admin Panel</h1>
        
        <div className="admin-tabs">
          <button 
            className={`admin-tab ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            Courses
          </button>
          <button 
            className={`admin-tab ${activeTab === 'videos' ? 'active' : ''}`}
            onClick={() => setActiveTab('videos')}
          >
            Videos
          </button>
          <button 
            className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button 
            className={`admin-tab ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
        </div>

        {activeTab === 'courses' && (
          <div className="admin-content">
            <div className="admin-section">
              <h3>Create New Course</h3>
              <div className="course-form">
                <input
                  type="text"
                  placeholder="Course Title"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, title: e.target.value }))}
                  className="admin-input"
                />
                <textarea
                  placeholder="Course Description"
                  value={newCourse.description}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, description: e.target.value }))}
                  className="admin-textarea"
                  rows={3}
                />
                <select
                  value={newCourse.level}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, level: e.target.value }))}
                  className="admin-select"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                <input
                  type="text"
                  placeholder="Duration (e.g., 6 weeks)"
                  value={newCourse.duration}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, duration: e.target.value }))}
                  className="admin-input"
                />
                <input
                  type="number"
                  placeholder="Number of Chapters"
                  value={newCourse.chapters}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, chapters: e.target.value }))}
                  className="admin-input"
                />
                <button className="create-course-btn" onClick={handleCreateCourse}>
                  Create Course
                </button>
              </div>
            </div>

            <div className="admin-section">
              <h3>Manage Courses</h3>
              <div className="courses-table">
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Status</th>
                      <th>Students</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map(course => (
                      <tr key={course.id}>
                        <td>{course.title}</td>
                        <td>
                          <span className={`status-badge ${course.status}`}>
                            {course.status}
                          </span>
                        </td>
                        <td>{course.students}</td>
                        <td>
                          <button className="action-btn edit">Edit</button>
                          <button className="action-btn delete">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="admin-content">
            <VideoManagement />
          </div>
        )}

        {activeTab === 'users' && (
          <div className="admin-content">
            <h3>User Management</h3>
            <p>User management features will be implemented here.</p>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="admin-content">
            <h3>Analytics Dashboard</h3>
            <div className="analytics-grid">
              <div className="analytics-card">
                <h4>Total Students</h4>
                <div className="analytics-number">2,707</div>
              </div>
              <div className="analytics-card">
                <h4>Active Courses</h4>
                <div className="analytics-number">6</div>
              </div>
              <div className="analytics-card">
                <h4>Completion Rate</h4>
                <div className="analytics-number">78%</div>
              </div>
              <div className="analytics-card">
                <h4>Revenue</h4>
                <div className="analytics-number">$45,230</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Video Upload Component
const VideoUpload: React.FC<{ onUploadComplete: (videoUrl: string) => void }> = ({ onUploadComplete }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const { principal } = useICPAuth();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('video', selectedFile);
      formData.append('title', videoTitle || selectedFile.name);
      formData.append('description', videoDescription);
      formData.append('course', selectedCourse);

      const response = await fetch('http://localhost:3001/api/upload-video', {
        method: 'POST',
        headers: {
          ...(principal ? { 'X-Principal': principal } : {}),
        },
        body: formData
      });

      const result = await response.json();
      
      if (result.success) {
        // Get the full URL for the uploaded video
        const videoUrl = `http://localhost:3001${result.video.url}`;
        onUploadComplete(videoUrl);
        
        // Clean up
        setSelectedFile(null);
        setPreviewUrl(null);
        setUploadProgress(0);
        setVideoTitle('');
        setVideoDescription('');
        setSelectedCourse('');
        
        alert('Video uploaded successfully!');
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="video-upload">
      <h4>Upload Video</h4>
      
      <div className="upload-form">
        <div className="form-group">
          <label>Video Title</label>
          <input
            type="text"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            placeholder="Enter video title"
            className="upload-input"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={videoDescription}
            onChange={(e) => setVideoDescription(e.target.value)}
            placeholder="Enter video description"
            className="upload-textarea"
            rows={3}
          />
        </div>

        <div className="form-group">
          <label>Course</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="upload-select"
          >
            <option value="">Select a course</option>
            <option value="Blockchain Fundamentals">Blockchain Fundamentals</option>
            <option value="Smart Contract Development">Smart Contract Development</option>
            <option value="DeFi Protocols">DeFi Protocols</option>
            <option value="Web3 Development">Web3 Development</option>
            <option value="NFT Development">NFT Development</option>
            <option value="Blockchain Security">Blockchain Security</option>
          </select>
        </div>
      </div>
      
      <div className="upload-area">
        <input
          type="file"
          accept="video/*"
          onChange={handleFileSelect}
          className="file-input"
          id="video-upload"
          disabled={uploading}
        />
        <label htmlFor="video-upload" className="upload-label">
          {selectedFile ? (
            <div className="file-selected">
              <span>📹 {selectedFile.name}</span>
              <span className="file-size">({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</span>
            </div>
          ) : (
            <div className="upload-placeholder">
              <span className="upload-icon">📁</span>
              <span>Click to select video file</span>
              <span className="upload-hint">Supports: MP4, WebM, MOV (Max: 500MB)</span>
            </div>
          )}
        </label>
      </div>

      {previewUrl && (
        <div className="video-preview">
          <h5>Preview:</h5>
          <video 
            src={previewUrl} 
            controls 
            className="preview-video"
            style={{ maxWidth: '100%', maxHeight: '200px' }}
          />
        </div>
      )}

      {uploading && (
        <div className="upload-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <span className="progress-text">Uploading... Please wait</span>
        </div>
      )}

      <button
        className="upload-btn"
        onClick={handleUpload}
        disabled={!selectedFile || uploading}
      >
        {uploading ? 'Uploading...' : 'Upload Video'}
      </button>
    </div>
  );
};

// Video Management Component
const VideoManagement: React.FC = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const { principal } = useICPAuth();

  // Fetch videos from backend
  const fetchVideos = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/videos', {
        headers: {
          ...(principal ? { 'X-Principal': principal } : {}),
        },
      });
      const result = await response.json();
      
      if (result.success) {
        setVideos(result.videos);
      } else {
        console.error('Failed to fetch videos:', result.error);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load videos on component mount
  React.useEffect(() => {
    fetchVideos();
  }, []);

  const handleVideoUpload = (videoUrl: string) => {
    // Refresh the video list after upload
    fetchVideos();
    setShowUpload(false);
  };

  const handleDeleteVideo = async (videoId: number) => {
    if (confirm('Are you sure you want to delete this video?')) {
      try {
        const response = await fetch(`http://localhost:3001/api/videos/${videoId}`, {
          method: 'DELETE',
          headers: {
            ...(principal ? { 'X-Principal': principal } : {}),
          },
        });
        
        const result = await response.json();
        
        if (result.success) {
          setVideos(videos.filter(v => v.id !== videoId));
          alert('Video deleted successfully!');
        } else {
          alert('Failed to delete video: ' + result.error);
        }
      } catch (error) {
        console.error('Error deleting video:', error);
        alert('Error deleting video. Please try again.');
      }
    }
  };

  const handleEditVideo = async (videoId: number, updates: any) => {
    try {
      const response = await fetch(`http://localhost:3001/api/videos/${videoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(principal ? { 'X-Principal': principal } : {}),
        },
        body: JSON.stringify(updates)
      });
      
      const result = await response.json();
      
      if (result.success) {
        setVideos(videos.map(v => v.id === videoId ? result.video : v));
        alert('Video updated successfully!');
      } else {
        alert('Failed to update video: ' + result.error);
      }
    } catch (error) {
      console.error('Error updating video:', error);
      alert('Error updating video. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="video-management">
        <div className="loading-state">
          <h3>Loading videos...</h3>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="video-management">
      <div className="video-management-header">
        <h3>Video Management ({videos.length} videos)</h3>
        <button 
          className="upload-video-btn"
          onClick={() => setShowUpload(true)}
        >
          📹 Upload New Video
        </button>
      </div>

      {showUpload && (
        <div className="upload-modal">
          <div className="upload-modal-content">
            <div className="upload-modal-header">
              <h4>Upload New Video</h4>
              <button 
                className="close-upload-btn"
                onClick={() => setShowUpload(false)}
              >
                ×
              </button>
            </div>
            <VideoUpload onUploadComplete={handleVideoUpload} />
          </div>
        </div>
      )}

      {videos.length === 0 ? (
        <div className="no-videos">
          <h4>No videos uploaded yet</h4>
          <p>Click "Upload New Video" to add your first video!</p>
        </div>
      ) : (
        <div className="videos-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Course</th>
                <th>Size</th>
                <th>Duration</th>
                <th>Upload Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {videos.map(video => (
                <tr key={video.id}>
                  <td>
                    <div className="video-title">
                      <span className="video-icon">🎥</span>
                      {video.title}
                    </div>
                  </td>
                  <td>{video.course}</td>
                  <td>{video.size}</td>
                  <td>{video.duration}</td>
                  <td>{video.uploadDate}</td>
                  <td>
                    <div className="video-actions">
                      <button 
                        className="action-btn preview"
                        onClick={() => setSelectedVideo(video)}
                      >
                        👁️ Preview
                      </button>
                      <button 
                        className="action-btn edit"
                        onClick={() => {
                          const newTitle = prompt('Enter new title:', video.title);
                          if (newTitle && newTitle !== video.title) {
                            handleEditVideo(video.id, { title: newTitle });
                          }
                        }}
                      >
                        ✏️ Edit
                      </button>
                      <button 
                        className="action-btn delete"
                        onClick={() => handleDeleteVideo(video.id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedVideo && (
        <div className="video-preview-modal">
          <div className="video-preview-content">
            <div className="video-preview-header">
              <h4>{selectedVideo.title}</h4>
              <button 
                className="close-preview-btn"
                onClick={() => setSelectedVideo(null)}
              >
                ×
              </button>
            </div>
            <video 
              src={`http://localhost:3001${selectedVideo.url}`}
              controls 
              className="preview-video-full"
              style={{ width: '100%', maxHeight: '400px' }}
            />
            <div className="video-details">
              <p><strong>Course:</strong> {selectedVideo.course}</p>
              <p><strong>Size:</strong> {selectedVideo.size}</p>
              <p><strong>Duration:</strong> {selectedVideo.duration}</p>
              <p><strong>Upload Date:</strong> {selectedVideo.uploadDate}</p>
              {selectedVideo.description && (
                <p><strong>Description:</strong> {selectedVideo.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Token Store Component
const TokenStore: React.FC<{ 
  userTokens: number; 
  onRedeem: (item: SwagItem) => void; 
  onClose: () => void;
  swagItems: SwagItem[];
}> = ({ userTokens, onRedeem, onClose, swagItems }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredItems = selectedCategory === 'all' 
    ? swagItems 
    : swagItems.filter(item => item.category === selectedCategory);

  return (
    <div className="token-store-overlay">
      <div className="token-store-modal">
        <div className="token-store-header">
          <h2>🛍️ Token Store</h2>
          <div className="token-balance">
            <span className="token-icon">🪙</span>
            <span className="token-amount">{userTokens} Tokens</span>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="token-store-categories">
          <button 
            className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All Items
          </button>
          <button 
            className={`category-btn ${selectedCategory === 'clothing' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('clothing')}
          >
            👕 Clothing
          </button>
          <button 
            className={`category-btn ${selectedCategory === 'accessories' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('accessories')}
          >
            🎒 Accessories
          </button>
          <button 
            className={`category-btn ${selectedCategory === 'tech' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('tech')}
          >
            💻 Tech
          </button>
          <button 
            className={`category-btn ${selectedCategory === 'collectibles' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('collectibles')}
          >
            🏷️ Collectibles
          </button>
        </div>

        <div className="swag-items-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="swag-item-card">
              <div className="swag-item-image">
                <span className="item-icon">{item.image}</span>
              </div>
              <div className="swag-item-content">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="swag-item-meta">
                  <span className="token-cost">
                    <span className="token-icon">🪙</span>
                    {item.tokenCost} Tokens
                  </span>
                  <span className={`availability ${item.available ? 'available' : 'unavailable'}`}>
                    {item.available ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                <button 
                  className={`redeem-btn ${userTokens >= item.tokenCost && item.available ? 'enabled' : 'disabled'}`}
                  onClick={() => onRedeem(item)}
                  disabled={userTokens < item.tokenCost || !item.available}
                >
                  {userTokens >= item.tokenCost ? 'Redeem' : 'Not Enough Tokens'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Token History Component
const TokenHistory: React.FC<{ 
  tokenHistory: TokenReward[]; 
  onClose: () => void;
}> = ({ tokenHistory, onClose }) => {
  return (
    <div className="token-history-overlay">
      <div className="token-history-modal">
        <div className="token-history-header">
          <h2>🪙 Token History</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="token-history-list">
          {tokenHistory.length === 0 ? (
            <div className="empty-history">
              <p>No tokens earned yet. Start learning to earn tokens!</p>
            </div>
          ) : (
            tokenHistory.map(reward => (
              <div key={reward.id} className="token-reward-item">
                <div className="reward-info">
                  <span className="reward-amount">+{reward.amount} 🪙</span>
                  <span className="reward-reason">{reward.reason}</span>
                </div>
                <span className="reward-date">{reward.date}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [userTokens, setUserTokens] = useState(0);
  const [tokenHistory, setTokenHistory] = useState<TokenReward[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage />;
      case 'courses':
        return <CoursesPage userTokens={userTokens} setUserTokens={setUserTokens} tokenHistory={tokenHistory} setTokenHistory={setTokenHistory} selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} />;
      case 'hackathons':
        return <HackathonsPage />;
      case 'resources':
        return <ResourcesPage />;
      case 'profile':
        return <ProfilePage userTokens={userTokens} />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <ICPAuthProvider>
      <div className="app">
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        {renderPage()}
        
        {/* Footer - only show on home page */}
        {currentPage === 'home' && (
          <footer className="footer">
            <div className="footer-content">BlockseBlock © 2023</div>
          </footer>
        )}
      </div>
    </ICPAuthProvider>
  );
};

export default App; 