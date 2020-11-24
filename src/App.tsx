import React, { useState } from 'react'
import { AnswerObject } from 'components/question-card'
import QuestionCard from './components/question-card'
import { fetchQuizQuestions, Difficulty, QuestionState } from './api'
import { GlobalStyle, Wrapper } from './App.styles'

const TOTAL_QUESTIONS = 10

export type AnswerObject1 = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

const App = (): JSX.Element => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  const startTrivia = async () => {
    setLoading(true)
    setGameOver(false)

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    )

    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
  }
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (gameOver) return undefined

    const answer = e.currentTarget.value
    const correct = questions[number].correct_answer === answer
    if (correct) setScore((prev) => prev + 1)
    const answerObject = {
      question: questions[number].question,
      answer,
      correct,
      correctAnswer: questions[number].correct_answer
    }
    setUserAnswers((prev) => [...prev, answerObject])

    return undefined
  }
  const nextQuestion = () => {
    const nextQuestionNumber = number + 1
    if (nextQuestionNumber === TOTAL_QUESTIONS) {
      setGameOver(true)
    } else {
      setNumber(nextQuestionNumber)
    }
  }
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZ</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button type="button" className="start" onClick={startTrivia}>
            start
          </button>
        ) : null}
        {!gameOver ? <p className="score">Score: {score}</p> : null}
        {loading && <p>Loading Questions ...</p>}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answer}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver &&
          !loading &&
          userAnswers.length === number + 1 &&
          number !== TOTAL_QUESTIONS - 1 && (
            <button type="button" className="next" onClick={nextQuestion}>
              Next Question
            </button>
          )}
      </Wrapper>
    </>
  )
}

export default App
