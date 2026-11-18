
import { useState } from "react";
import "./App.css";

const topics = [
  "Core Java",
  "Java 8",
  "Java 17",
  "Spring Boot",
  "Spring MVC",
  "Spring Security",
  "Spring Data JPA",
  "Hibernate",
  "Microservices",
  "REST API",
  "SQL",
  "MySQL",
  "Data Structures and Algorithms",
  "React.js",
  "JavaScript",
  "HTML and CSS",
  "Python",
  "Operating System",
  "Computer Networks",
  "DBMS",
  "Docker",
  "AWS",
  "Kafka",
  "Git and GitHub",
];

function App() {
  const [language, setLanguage] = useState("Java");
  const [topic, setTopic] = useState("Spring Boot");
  const [difficulty, setDifficulty] = useState("Beginner");

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [hasTypedTopic, setHasTypedTopic] = useState(false);

  const [questions, setQuestions] = useState([]);
  const [visibleAnswers, setVisibleAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Show every topic before the user starts typing.
  // Filter topics only after the user types something.
  const filteredTopics = !hasTypedTopic
    ? topics
    : topics.filter((item) =>
        item.toLowerCase().includes(topic.trim().toLowerCase())
      );

  const generateQuestions = async () => {
    if (!topic.trim()) {
      setError("Please enter an interview topic.");
      return;
    }

    setShowSuggestions(false);
    setLoading(true);
    setError("");
    setQuestions([]);
    setVisibleAnswers({});

    try {
      const response = await fetch(
        "http://localhost:8080/api/interview/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language,
            topic: topic.trim(),
            difficulty,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Unable to generate questions. Please try again.");
      }

      const data = await response.json();
      setQuestions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleAnswer = (index) => {
    setVisibleAnswers((previous) => ({
      ...previous,
      [index]: !previous[index],
    }));
  };

  const copyAnswer = async (answer) => {
    try {
      await navigator.clipboard.writeText(answer);
      alert("Answer copied successfully!");
    } catch {
      setError("Unable to copy answer.");
    }
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="brand">
          <div className="brand-icon">AI</div>
          <span>
            Interview<span className="brand-highlight">Pro</span>
          </span>
        </div>

        <div className="nav-label">
          AI POWERED PREPARATION
        </div>
      </nav>

      <main className="main-content">
        <section className="hero">
          <div className="hero-badge">
            <span className="status-dot"></span>
            YOUR PERSONAL AI INTERVIEW COACH
          </div>

          <h1>
            Prepare smarter.
            <br />
            <span>Interview better.</span>
          </h1>

          <p>
            Generate personalized technical interview questions
            and answers with the power of AI.
          </p>
        </section>

        <section className="generator-card">
          <div className="section-heading">
            <div>
              <span className="section-label">GET STARTED</span>
              <h2>Build your practice session</h2>
              <p>
                Choose your preferences to generate interview questions.
              </p>
            </div>

            <div className="sparkle-icon">✦</div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="language">Programming Language</label>

              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="Java">Java</option>
                <option value="Python">Python</option>
                <option value="JavaScript">JavaScript</option>
                <option value="C">C</option>
                <option value="C++">C++</option>
                <option value="C#">C#</option>
                <option value="PHP">PHP</option>
                <option value="Go">Go</option>
                <option value="Kotlin">Kotlin</option>
                <option value="TypeScript">TypeScript</option>
                <option value="Ruby">Ruby</option>
                <option value="Swift">Swift</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="difficulty">Difficulty Level</label>

              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="form-group full-width topic-group">
              <label htmlFor="topic">Interview Topic</label>

              <div className="topic-input-wrapper">
                <input
                  id="topic"
                  type="text"
                  value={topic}
                  placeholder="Select or type any topic..."
                  autoComplete="off"
                  onFocus={() => {
                    setHasTypedTopic(false);
                    setShowSuggestions(true);
                  }}
                  onChange={(e) => {
                    setTopic(e.target.value);
                    setHasTypedTopic(true);
                    setShowSuggestions(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setShowSuggestions(false);
                    }

                    if (e.key === "Enter") {
                      setShowSuggestions(false);
                    }
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      setShowSuggestions(false);
                    }, 150);
                  }}
                />

                <button
                  type="button"
                  className="topic-arrow"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    if (!showSuggestions) {
                      setHasTypedTopic(false);
                    }
                    setShowSuggestions((previous) => !previous);
                  }}
                  aria-label="Toggle topic suggestions"
                >
                  {showSuggestions ? "▲" : "▼"}
                </button>

                {showSuggestions && (
                  <div className="topic-dropdown">
                    {filteredTopics.length > 0 ? (
                      filteredTopics.map((item) => (
                        <button
                          type="button"
                          className="topic-option"
                          key={item}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            setTopic(item);
                            setHasTypedTopic(false);
                            setShowSuggestions(false);
                          }}
                        >
                          {item}
                        </button>
                      ))
                    ) : (
                      <div className="no-topics">
                        No matching suggestion.
                        <br />
                        You can still use your own topic:
                        <strong>{topic}</strong>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <span className="input-hint">
                Select a suggested topic or type your own topic.
              </span>
            </div>
          </div>

          <button
            className="generate-button"
            onClick={generateQuestions}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Generating questions...
              </>
            ) : (
              <>
                <span>✦</span>
                Generate Interview Questions
                <span className="button-arrow">→</span>
              </>
            )}
          </button>

          {error && <p className="error-message">{error}</p>}
        </section>

        {questions.length > 0 && (
          <section className="results-section">
            <div className="results-heading">
              <div>
                <span className="section-label">YOUR PRACTICE SET</span>
                <h2>Generated Questions</h2>
                <p>
                  Try answering each question before revealing the answer.
                </p>
              </div>

              <div className="question-count">
                {questions.length} Questions
              </div>
            </div>

            {questions.map((item, index) => (
              <article className="question-card" key={index}>
                <div className="question-top">
                  <span className="question-number">
                    QUESTION {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="difficulty-tag">{difficulty}</span>
                </div>

                <h3>{item.question}</h3>

                <div className="question-actions">
                  <button
                    className="show-button"
                    onClick={() => toggleAnswer(index)}
                  >
                    {visibleAnswers[index] ? "↑ Hide Answer" : "↓ Show Answer"}
                  </button>

                  {visibleAnswers[index] && (
                    <button
                      className="copy-button"
                      onClick={() => copyAnswer(item.answer)}
                    >
                      Copy Answer
                    </button>
                  )}
                </div>

                {visibleAnswers[index] && (
                  <div className="answer-box">
                    <div className="answer-title">
                      <span>✦</span> Suggested Answer
                    </div>
                    <p>{item.answer}</p>
                  </div>
                )}
              </article>
            ))}
          </section>
        )}

        <footer>
          <p>
            Powered by AI <span>•</span> Built for better interview preparation
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
