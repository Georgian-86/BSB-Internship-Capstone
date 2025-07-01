import React, { useState } from 'react';
import './App.css';

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
          <button 
            className={`nav-link ${currentPage === 'profile' ? 'active' : ''}`}
            onClick={() => setCurrentPage('profile')}
          >
            Profile
          </button>
          <button 
            className={`nav-link admin-link ${currentPage === 'admin' ? 'active' : ''}`}
            onClick={() => setCurrentPage('admin')}
          >
            Admin
          </button>
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

// Courses Page Component
const CoursesPage: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  
  const courses = [
    {
      id: 1,
      title: "Blockchain Fundamentals",
      description: "Learn the basics of blockchain technology, consensus mechanisms, and cryptographic principles.",
      chapters: 8,
      duration: "6 weeks",
      level: "Beginner",
      image: "🔗",
      chaptersList: [
        {
          id: 1,
          title: "Introduction to Blockchain",
          lessons: [
            { id: 1, title: "What is Blockchain?", duration: "15 min", type: "video" },
            { id: 2, title: "History of Blockchain", duration: "20 min", type: "video" },
            { id: 3, title: "Blockchain vs Traditional Systems", duration: "25 min", type: "video" },
            { id: 4, title: "Quiz: Blockchain Basics", duration: "10 min", type: "quiz" }
          ]
        },
        {
          id: 2,
          title: "Cryptographic Foundations",
          lessons: [
            { id: 5, title: "Hash Functions", duration: "30 min", type: "video" },
            { id: 6, title: "Public Key Cryptography", duration: "35 min", type: "video" },
            { id: 7, title: "Digital Signatures", duration: "25 min", type: "video" },
            { id: 8, title: "Practical Exercise: Creating Keys", duration: "45 min", type: "exercise" }
          ]
        },
        {
          id: 3,
          title: "Consensus Mechanisms",
          lessons: [
            { id: 9, title: "Proof of Work", duration: "40 min", type: "video" },
            { id: 10, title: "Proof of Stake", duration: "35 min", type: "video" },
            { id: 11, title: "Other Consensus Algorithms", duration: "30 min", type: "video" },
            { id: 12, title: "Quiz: Consensus Mechanisms", duration: "15 min", type: "quiz" }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Smart Contract Development",
      description: "Master Solidity programming and build decentralized applications on Ethereum.",
      chapters: 12,
      duration: "8 weeks",
      level: "Intermediate",
      image: "📜",
      chaptersList: [
        {
          id: 1,
          title: "Introduction to Smart Contracts",
          lessons: [
            { id: 1, title: "What are Smart Contracts?", duration: "20 min", type: "video" },
            { id: 2, title: "Ethereum Virtual Machine", duration: "25 min", type: "video" },
            { id: 3, title: "Gas and Transaction Costs", duration: "30 min", type: "video" },
            { id: 4, title: "Quiz: Smart Contract Basics", duration: "10 min", type: "quiz" }
          ]
        },
        {
          id: 2,
          title: "Solidity Fundamentals",
          lessons: [
            { id: 5, title: "Solidity Syntax", duration: "45 min", type: "video" },
            { id: 6, title: "Variables and Data Types", duration: "40 min", type: "video" },
            { id: 7, title: "Functions and Modifiers", duration: "50 min", type: "video" },
            { id: 8, title: "Lab: Your First Smart Contract", duration: "60 min", type: "lab" }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "DeFi Protocols",
      description: "Explore decentralized finance protocols, yield farming, and liquidity pools.",
      chapters: 10,
      duration: "7 weeks",
      level: "Advanced",
      image: "💰",
      chaptersList: [
        {
          id: 1,
          title: "Introduction to DeFi",
          lessons: [
            { id: 1, title: "What is DeFi?", duration: "25 min", type: "video" },
            { id: 2, title: "DeFi vs Traditional Finance", duration: "30 min", type: "video" },
            { id: 3, title: "DeFi Ecosystem Overview", duration: "35 min", type: "video" },
            { id: 4, title: "Quiz: DeFi Fundamentals", duration: "15 min", type: "quiz" }
          ]
        },
        {
          id: 2,
          title: "Lending and Borrowing",
          lessons: [
            { id: 5, title: "Compound Protocol", duration: "45 min", type: "video" },
            { id: 6, title: "Aave Protocol", duration: "50 min", type: "video" },
            { id: 7, title: "Yield Farming Strategies", duration: "60 min", type: "video" },
            { id: 8, title: "Lab: DeFi Lending", duration: "90 min", type: "lab" }
          ]
        }
      ]
    },
    {
      id: 4,
      title: "Web3 Development",
      description: "Build full-stack Web3 applications using modern frameworks and tools.",
      chapters: 15,
      duration: "10 weeks",
      level: "Advanced",
      image: "🌐",
      chaptersList: [
        {
          id: 1,
          title: "Web3 Architecture",
          lessons: [
            { id: 1, title: "Web3 Stack Overview", duration: "30 min", type: "video" },
            { id: 2, title: "Frontend Integration", duration: "40 min", type: "video" },
            { id: 3, title: "Wallet Integration", duration: "45 min", type: "video" },
            { id: 4, title: "Quiz: Web3 Basics", duration: "15 min", type: "quiz" }
          ]
        },
        {
          id: 2,
          title: "React and Web3",
          lessons: [
            { id: 5, title: "Web3.js Integration", duration: "50 min", type: "video" },
            { id: 6, title: "Ethers.js with React", duration: "55 min", type: "video" },
            { id: 7, title: "State Management", duration: "60 min", type: "video" },
            { id: 8, title: "Lab: Building a DApp", duration: "120 min", type: "lab" }
          ]
        }
      ]
    },
    {
      id: 5,
      title: "NFT Development",
      description: "Create, deploy, and trade non-fungible tokens with advanced features.",
      chapters: 6,
      duration: "4 weeks",
      level: "Intermediate",
      image: "🎨",
      chaptersList: [
        {
          id: 1,
          title: "NFT Standards",
          lessons: [
            { id: 1, title: "ERC-721 Standard", duration: "35 min", type: "video" },
            { id: 2, title: "ERC-1155 Standard", duration: "30 min", type: "video" },
            { id: 3, title: "Metadata Standards", duration: "25 min", type: "video" },
            { id: 4, title: "Quiz: NFT Standards", duration: "10 min", type: "quiz" }
          ]
        },
        {
          id: 2,
          title: "NFT Marketplace",
          lessons: [
            { id: 5, title: "Building an NFT Contract", duration: "60 min", type: "video" },
            { id: 6, title: "Marketplace Features", duration: "45 min", type: "video" },
            { id: 7, title: "Royalty Systems", duration: "40 min", type: "video" },
            { id: 8, title: "Lab: NFT Marketplace", duration: "150 min", type: "lab" }
          ]
        }
      ]
    },
    {
      id: 6,
      title: "Blockchain Security",
      description: "Learn security best practices and audit smart contracts for vulnerabilities.",
      chapters: 9,
      duration: "6 weeks",
      level: "Advanced",
      image: "🔒",
      chaptersList: [
        {
          id: 1,
          title: "Security Fundamentals",
          lessons: [
            { id: 1, title: "Common Vulnerabilities", duration: "40 min", type: "video" },
            { id: 2, title: "Reentrancy Attacks", duration: "45 min", type: "video" },
            { id: 3, title: "Integer Overflow", duration: "35 min", type: "video" },
            { id: 4, title: "Quiz: Security Basics", duration: "15 min", type: "quiz" }
          ]
        },
        {
          id: 2,
          title: "Auditing Techniques",
          lessons: [
            { id: 5, title: "Static Analysis", duration: "50 min", type: "video" },
            { id: 6, title: "Dynamic Testing", duration: "55 min", type: "video" },
            { id: 7, title: "Formal Verification", duration: "60 min", type: "video" },
            { id: 8, title: "Lab: Security Audit", duration: "180 min", type: "lab" }
          ]
        }
      ]
    }
  ];

  if (selectedCourse) {
    const course = courses.find(c => c.id === selectedCourse);
    if (!course) return <div>Course not found</div>;
    
    return <CourseDetailPage course={course} onBack={() => setSelectedCourse(null)} />;
  }

  return (
    <div className="page-container">
      <div className="container">
        <h1 className="page-title">Courses</h1>
        <p className="page-subtitle">Master blockchain and Web3 technologies with our comprehensive course catalog</p>
        
        <div className="courses-grid">
          {courses.map(course => (
            <div key={course.id} className="course-card">
              <div className="course-image">
                <span className="course-icon">{course.image}</span>
              </div>
              <div className="course-content">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="course-meta">
                  <span className="meta-item">📚 {course.chapters} Chapters</span>
                  <span className="meta-item">⏱️ {course.duration}</span>
                  <span className="meta-item">📊 {course.level}</span>
                </div>
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
    </div>
  );
};

// Course Detail Page Component
const CourseDetailPage: React.FC<{ course: any; onBack: () => void }> = ({ course, onBack }) => {
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());
  const [quizScores, setQuizScores] = useState<{[key: number]: number}>({});
  const [activeTab, setActiveTab] = useState<'lessons' | 'forum' | 'certificate'>('lessons');
  const [courseCompleted, setCourseCompleted] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const handleLessonComplete = (lessonId: number) => {
    setCompletedLessons(prev => new Set(Array.from(prev).concat(lessonId)));
    
    // Check if course is completed
    const totalLessons = course.chaptersList.reduce((acc: number, chapter: any) => acc + chapter.lessons.length, 0);
    const newCompletedLessons = new Set(Array.from(completedLessons).concat(lessonId));
    if (newCompletedLessons.size === totalLessons) {
      setCourseCompleted(true);
    }
  };

  const handleQuizComplete = (lessonId: number, score: number) => {
    setQuizScores(prev => ({ ...prev, [lessonId]: score }));
    handleLessonComplete(lessonId);
  };

  const getProgressPercentage = () => {
    const totalLessons = course.chaptersList.reduce((acc: number, chapter: any) => acc + chapter.lessons.length, 0);
    return Math.round((completedLessons.size / totalLessons) * 100);
  };

  const renderLessonContent = () => {
    if (!selectedLesson) return null;

    switch (selectedLesson.type) {
      case 'video':
        return (
          <VideoPlayer 
            videoUrl={selectedLesson.videoUrl || "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"}
            onComplete={() => handleLessonComplete(selectedLesson.id)}
          />
        );
      case 'quiz':
        return (
          <Quiz 
            quiz={selectedLesson.quiz || {
              title: "Chapter Quiz",
              questions: [
                {
                  question: "What is a blockchain?",
                  answers: [
                    "A type of cryptocurrency",
                    "A distributed ledger technology",
                    "A programming language",
                    "A database management system"
                  ],
                  correctAnswer: 1
                },
                {
                  question: "Which consensus mechanism does Bitcoin use?",
                  answers: [
                    "Proof of Stake",
                    "Proof of Work",
                    "Delegated Proof of Stake",
                    "Proof of Authority"
                  ],
                  correctAnswer: 1
                }
              ]
            }}
            onComplete={(score) => handleQuizComplete(selectedLesson.id, score)}
          />
        );
      default:
        return (
          <div className="lesson-content">
            <h3>{selectedLesson.title}</h3>
            <p>{selectedLesson.content || "Lesson content will be displayed here."}</p>
            <button 
              className="complete-lesson-btn"
              onClick={() => handleLessonComplete(selectedLesson.id)}
            >
              Mark as Complete
            </button>
          </div>
        );
    }
  };

  return (
    <div className="page-container">
      <div className="container">
        <div className="course-header">
          <button className="back-btn" onClick={onBack}>
            ← Back to Courses
          </button>
          <h1 className="course-title">{course.title}</h1>
          <p className="course-description">{course.description}</p>
          
          <div className="course-overview">
            <div className="overview-item">
              <span className="overview-label">Level:</span>
              <span className="overview-value">{course.level}</span>
            </div>
            <div className="overview-item">
              <span className="overview-label">Duration:</span>
              <span className="overview-value">{course.duration}</span>
            </div>
            <div className="overview-item">
              <span className="overview-label">Chapters:</span>
              <span className="overview-value">{course.chapters}</span>
            </div>
            <div className="overview-item">
              <span className="overview-label">Progress:</span>
              <span className="overview-value">{getProgressPercentage()}%</span>
            </div>
          </div>

          <div className="progress-bar-large">
            <div className="progress-fill-large" style={{ width: `${getProgressPercentage()}%` }}></div>
          </div>

          {courseCompleted && (
            <div className="course-completion-banner">
              <h3>🎉 Congratulations! You've completed this course!</h3>
              <button 
                className="view-certificate-btn"
                onClick={() => setShowCertificate(true)}
              >
                View Certificate
              </button>
            </div>
          )}
        </div>

        <div className="course-tabs">
          <button 
            className={`course-tab ${activeTab === 'lessons' ? 'active' : ''}`}
            onClick={() => setActiveTab('lessons')}
          >
            Lessons
          </button>
          <button 
            className={`course-tab ${activeTab === 'forum' ? 'active' : ''}`}
            onClick={() => setActiveTab('forum')}
          >
            Discussion Forum
          </button>
          {courseCompleted && (
            <button 
              className={`course-tab ${activeTab === 'certificate' ? 'active' : ''}`}
              onClick={() => setActiveTab('certificate')}
            >
              Certificate
            </button>
          )}
        </div>

        {activeTab === 'lessons' && (
          <div className="course-content-grid">
            <div className="chapters-sidebar">
              <h3>Course Chapters</h3>
              {course.chaptersList.map((chapter: any) => (
                <div 
                  key={chapter.id} 
                  className={`chapter-item ${selectedChapter === chapter.id ? 'active' : ''}`}
                  onClick={() => setSelectedChapter(chapter.id)}
                >
                  <div className="chapter-header">
                    <span className="chapter-title">{chapter.title}</span>
                    <span className="chapter-lessons">{chapter.lessons.length} lessons</span>
                  </div>
                  <div className="chapter-progress">
                    <div className="chapter-progress-bar">
                      <div 
                        className="chapter-progress-fill" 
                        style={{ 
                          width: `${Math.round((chapter.lessons.filter((l: any) => completedLessons.has(l.id)).length / chapter.lessons.length) * 100)}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lessons-content">
              {selectedChapter ? (
                <div className="lessons-container">
                  <h3>{course.chaptersList.find((c: any) => c.id === selectedChapter)?.title}</h3>
                  <div className="lessons-list">
                    {course.chaptersList.find((c: any) => c.id === selectedChapter)?.lessons.map((lesson: any) => (
                      <div key={lesson.id} className={`lesson-item ${completedLessons.has(lesson.id) ? 'completed' : ''} ${selectedLesson?.id === lesson.id ? 'selected' : ''}`}>
                        <div className="lesson-info" onClick={() => setSelectedLesson(lesson)}>
                          <div className="lesson-icon">
                            {lesson.type === 'video' && '🎥'}
                            {lesson.type === 'quiz' && '📝'}
                            {lesson.type === 'exercise' && '💻'}
                            {lesson.type === 'lab' && '🔬'}
                          </div>
                          <div className="lesson-details">
                            <h4>{lesson.title}</h4>
                            <span className="lesson-duration">{lesson.duration}</span>
                            {quizScores[lesson.id] && (
                              <span className="quiz-score">Score: {quizScores[lesson.id]}%</span>
                            )}
                          </div>
                        </div>
                        <div className="lesson-actions">
                          {completedLessons.has(lesson.id) ? (
                            <span className="completed-badge">✓ Completed</span>
                          ) : (
                            <button 
                              className="start-lesson-btn"
                              onClick={() => setSelectedLesson(lesson)}
                            >
                              Start Lesson
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {selectedLesson && (
                    <div className="lesson-viewer">
                      <div className="lesson-viewer-header">
                        <h4>{selectedLesson.title}</h4>
                        <button 
                          className="close-lesson-btn"
                          onClick={() => setSelectedLesson(null)}
                        >
                          ×
                        </button>
                      </div>
                      <div className="lesson-viewer-content">
                        {renderLessonContent()}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="select-chapter">
                  <h3>Select a Chapter</h3>
                  <p>Choose a chapter from the sidebar to start learning</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'forum' && (
          <div className="forum-container">
            <DiscussionForum courseId={course.id} />
          </div>
        )}

        {activeTab === 'certificate' && courseCompleted && (
          <div className="certificate-container">
            <Certificate 
              course={course}
              userName="John Doe"
              completionDate={new Date().toLocaleDateString()}
            />
          </div>
        )}
      </div>

      {showCertificate && (
        <div className="certificate-modal">
          <div className="certificate-modal-content">
            <button 
              className="close-certificate-btn"
              onClick={() => setShowCertificate(false)}
            >
              ×
            </button>
            <Certificate 
              course={course}
              userName="John Doe"
              completionDate={new Date().toLocaleDateString()}
            />
          </div>
        </div>
      )}
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
const ProfilePage: React.FC = () => {
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
    <div className="page-container">
      <div className="container">
        <h1 className="page-title">Profile</h1>
        
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-avatar">
              {profilePicture ? (
                <img src={profilePicture} alt="Profile" className="avatar-image" />
              ) : (
                <div className="avatar-placeholder">👤</div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="avatar-upload"
                id="avatar-upload"
              />
              <label htmlFor="avatar-upload" className="avatar-upload-label">
                📷
              </label>
            </div>
            
            <div className="profile-info">
              <h2>{profile.name}</h2>
              <p className="profile-email">{profile.email}</p>
              <p className="profile-bio">{profile.bio}</p>
            </div>
            
            <button 
              className="edit-profile-btn"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {isEditing ? (
            <div className="profile-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Bio</label>
                <textarea
                  value={editedProfile.bio}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={editedProfile.location}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Website</label>
                <input
                  type="url"
                  value={editedProfile.website}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, website: e.target.value }))}
                />
              </div>
              <div className="social-links">
                <div className="form-group">
                  <label>Twitter</label>
                  <input
                    type="text"
                    value={editedProfile.twitter}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, twitter: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>GitHub</label>
                  <input
                    type="text"
                    value={editedProfile.github}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, github: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>LinkedIn</label>
                  <input
                    type="text"
                    value={editedProfile.linkedin}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, linkedin: e.target.value }))}
                  />
                </div>
              </div>
              <div className="form-actions">
                <button className="save-btn" onClick={handleSave}>Save Changes</button>
                <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

// Admin Panel Component
const AdminPanel: React.FC = () => {
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

  // Fetch videos from backend
  const fetchVideos = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/videos');
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
          method: 'DELETE'
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
          'Content-Type': 'application/json'
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

// Main App Component
const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage />;
      case 'courses':
        return <CoursesPage />;
      case 'hackathons':
        return <HackathonsPage />;
      case 'resources':
        return <ResourcesPage />;
      case 'profile':
        return <ProfilePage />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="app">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
      
      {/* Footer - only show on home page */}
      {currentPage === 'home' && (
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-section">
                <h3>BlockseBlock</h3>
                <p>Empowering the future of blockchain education</p>
              </div>
              <div className="footer-section">
                <h4>Quick Links</h4>
                <ul>
                  <li><a href="#courses">Courses</a></li>
                  <li><a href="#hackathons">Hackathons</a></li>
                  <li><a href="#resources">Resources</a></li>
                  <li><a href="#profile">Profile</a></li>
                </ul>
              </div>
              <div className="footer-section">
                <h4>Connect</h4>
                <ul>
                  <li><a href="#twitter">Twitter</a></li>
                  <li><a href="#discord">Discord</a></li>
                  <li><a href="#github">GitHub</a></li>
                  <li><a href="#linkedin">LinkedIn</a></li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2025 BlockseBlock. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App; 