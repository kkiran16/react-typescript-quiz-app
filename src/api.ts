import { shuffleArray } from './utils'

export type Question = {
  category: string
  correct_answer: string
  difficulty: string
  incorrect_answers: Array<string>
  question: string
  type: string
}

export type QuestionState = Question & { answer: Array<string> }

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'h ard'
}
export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
  const data = await (await fetch(endpoint)).json()
  return data.results.map((question: Question) => ({
    ...question,
    answer: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer
    ])
  }))
}
