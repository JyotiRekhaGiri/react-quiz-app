import React, { useState, useEffect } from 'react';
import "./Quiz.css";
import questionsData from './questions.json';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { MdLightbulbOutline } from 'react-icons/md';
import { HiOutlineSpeakerWave } from 'react-icons/hi2';
import { HiOutlinePlusSm } from 'react-icons/hi';
import { GoHome } from 'react-icons/go';

const Quiz = () => {
    const [quizState, setQuizState] = useState('start');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('');
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(0);
    const [showOptions, setShowOptions] = useState(false);
    const [heading, setHeading] = useState('');
    const [userAnswers, setUserAnswers] = useState([]);

    useEffect(() => {
        const storedAnswers = JSON.parse(localStorage.getItem('userAnswers'));
        if (storedAnswers) {
            setUserAnswers(storedAnswers);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
    }, [userAnswers]);

    const handleStartQuiz = () => {
        setQuizState('subject');
        setHeading('Select a Subject');
    };

    const handleSubjectSelection = (subject) => {
        setSelectedSubject(subject);
        setQuizState('topic');
        setHeading(subject);
    };

    const handleTopicSelection = (topic) => {
        setSelectedTopic(topic);
        const topicQuestions = questionsData[topic];
        setQuestions(topicQuestions);
        setQuizState('quiz');
        setHeading(`${topic} (${selectedSubject})`);
    };

    const handleAnswerSubmit = (option) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestion] = option;
        setUserAnswers(newAnswers);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setQuizState('score');
            calculateScore();
        }
    };

    const calculateScore = () => {
        let newScore = 0;
        userAnswers.forEach((answer, index) => {
            if (answer === questions[index].answer) {
                newScore += 1;
            }
        });
        setScore(newScore);
    };

    const handleResetQuiz = () => {
        setScore(0);
        setCurrentQuestion(0);
        setSelectedSubject('');
        setSelectedTopic('');
        setUserAnswers(Array.from({ length: questionsData.length }, () => null));
        localStorage.removeItem('userAnswers');
        setQuizState('start');
        setHeading('');
    };

    const refreshQuiz = () => {
        setScore(0);
        setCurrentQuestion(0);
        setSelectedSubject('');
        setSelectedTopic('');
        setUserAnswers([]);
        localStorage.removeItem('userAnswers');
        setQuizState('start');
        setHeading('');
    };

    const renderQuizContent = () => {
        switch (quizState) {
            case 'start':
                return <button onClick={handleStartQuiz}>Start Quiz</button>;
            case 'subject':
                return (
                    <div>
                        <button onClick={() => handleSubjectSelection('Mathematics')}>Mathematics</button>
                        <button onClick={() => handleSubjectSelection('Science')}>Science</button>
                        <button onClick={() => handleSubjectSelection('SocialScience')}>Social Science</button>
                        <button onClick={() => handleSubjectSelection('Hindi')}>Hindi</button>
                        <button onClick={() => handleSubjectSelection('English')}>English</button>
                    </div>
                );
            case 'topic':
                return (
                    <div>
                        {selectedSubject === 'Mathematics' && (
                            <div>
                                <button onClick={() => handleTopicSelection('Relations and Functions')}>Relations and Functions</button>
                                <button onClick={() => handleTopicSelection('General')}>General</button>
                                <button onClick={() => handleTopicSelection('Sets')}>Sets</button>
                                <button onClick={() => handleTopicSelection('Probability')}>Probability</button>
                            </div>
                        )}

                        {selectedSubject === 'Science' && (
                            <div>
                                <button onClick={() => handleTopicSelection('Physics')}>Physics</button>
                                <button onClick={() => handleTopicSelection('General')}>General</button>
                                <button onClick={() => handleTopicSelection('Biology')}>Biology</button>
                                <button onClick={() => handleTopicSelection('Chemistry')}>Chemistry</button>
                            </div>
                        )}

                        {selectedSubject === 'SocialScience' && (
                            <div>
                                <button onClick={() => handleTopicSelection('Sociology')}>Sociology</button>
                                <button onClick={() => handleTopicSelection('Economics')}>Economics</button>
                                <button onClick={() => handleTopicSelection('Anthropology')}>Anthropology</button>
                                <button onClick={() => handleTopicSelection('Psychology')}>Psychology</button>
                            </div>
                        )}

                        {selectedSubject === 'Hindi' && (
                            <div>
                                <button onClick={() => handleTopicSelection('Poem')}>Poem</button>
                                <button onClick={() => handleTopicSelection('Poet')}>Poet</button>
                                <button onClick={() => handleTopicSelection('Story')}>Story</button>
                                <button onClick={() => handleTopicSelection('Summary')}>Summary</button>
                            </div>
                        )}

                        {selectedSubject === 'English' && (
                            <div>
                                <button onClick={() => handleTopicSelection('Poem')}>Poem</button>
                                <button onClick={() => handleTopicSelection('Poet')}>Poet</button>
                                <button onClick={() => handleTopicSelection('Story')}>Story</button>
                                <button onClick={() => handleTopicSelection('Summary')}>Summary</button>
                            </div>
                        )}
                    </div>
                );
            case 'quiz':
                return (
                    <div style={{alignItems: 'center'}}>
                        {/* <p>Question {currentQuestion + 1}/{questions.length}</p> */}
                        <p>{questions[currentQuestion].question}</p>
                        <div>
                            {questions[currentQuestion].options.map((option, index) => (
                                <div key={index} className={userAnswers[currentQuestion] === option ? 'selected' : ''}>
                                    {showOptions && (
                                        <input
                                            type="checkbox"
                                            id={index}
                                            name="answer"
                                            value={option}
                                            checked={userAnswers[currentQuestion] === option}
                                            onChange={() => handleAnswerSubmit(option)}
                                        />
                                    )}
                                    <label htmlFor={index} onClick={() => handleAnswerSubmit(option)}>{option}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'score':
                return (
                    <div>
                        <p>Your score: {score}/{questions.length}</p>
                        <button onClick={handleResetQuiz}>Start Over</button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className='container1'>
            <div>
                <GoHome />
                {selectedSubject && ` > ${selectedSubject}`}
                {selectedTopic && ` > ${selectedTopic}`}
                {quizState === 'quizQuestions' && ` > Flashcard`}
            </div>

            <div>
                <h3 style={{ color: '#164EC0', fontWeight: 'bold', marginTop: '1rem' }}>{heading}</h3>
            </div>

            <div className='container'>
                <div className='links'>
                    <a href="/" className="link" style={{ color: !showOptions ? 'blue' : 'black' }} onClick={() => { setShowOptions(false); setQuizState('study'); }}>Study</a>
                    <a href="/" className="link" style={{ color: showOptions ? 'blue' : 'black' }} onClick={() => { setShowOptions(true); setQuizState('start'); }}>Quiz</a>
                    <a href="/" className="link">Test</a>
                    <a href="/" className="link">Game</a>
                    <a href="/" className="link">Others</a>
                </div>

                <div className='card'>
                    <div className='icons'>
                        <MdLightbulbOutline className='bulb' />
                        <HiOutlineSpeakerWave className='volume' />
                    </div>
                    <div className='questions'>
                        {renderQuizContent()}
                    </div>
                </div>
                <div className='all-icons'>
                    <div>
                        <img src={require('./image/refresh.png')} alt='' onClick={refreshQuiz} />
                    </div>
                    <div className='left-right'>
                        <div className='lef-icon'>
                        <FaAngleLeft onClick={() => currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1)} />
                        </div>
                        <div>{`${currentQuestion + 1}/${questions.length}`}</div>
                        <div className='righ-icon'>
                        <FaAngleRight onClick={() => currentQuestion < questions.length - 1 && setCurrentQuestion(currentQuestion + 1)} />
                        </div>
                    </div>
                    <div>
                        <img src={require('./image/full.png')} alt='' />
                    </div>
                </div>
            </div>

            <div className='cont-footer'>
                <div className='left-foot'>
                    <div className=''>
                        <img className='circle-img' src={require('./image/logo1.png')} alt='' />
                    </div>
                    <div className='left-content'>
                        <p>Published by</p>
                        <img className='second-image' src={require('./image/name.png')} alt='' />
                    </div>
                </div>
                <div className='right-foot'>
                    <div className='right-content'>
                        <HiOutlinePlusSm className='plus-icon' />
                    </div>
                    <div className='pa'>
                        <p>Create Flashcard</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quiz;
