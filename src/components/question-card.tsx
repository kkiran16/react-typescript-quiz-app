import React from 'react'
import { Wrapper, ButtonWrapper } from './question-card.styles'

// import { AnswerObject } from '../App'
export type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

type Props = {
  question: string
  answers: Array<string>
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void
  userAnswer: AnswerObject | undefined
  questionNr: number
  totalQuestions: number
}
const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions
}: Props) => (
  <Wrapper>
    <p className="number">
      Question: {questionNr}/{totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }} />
    <div>
      {answers.map((answer) => (
        <ButtonWrapper
          key={answer}
          correct={userAnswer?.correctAnswer === answer}
          userClicked={userAnswer?.answer === answer}>
          <button
            type="button"
            disabled={!!userAnswer} // disabled={userAnswer ? true : false}
            value={answer}
            onClick={callback}>
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        </ButtonWrapper>
      ))}
    </div>
  </Wrapper>
)

export default QuestionCard
