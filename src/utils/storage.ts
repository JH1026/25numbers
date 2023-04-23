const storageKey = {
  score: 'score',
}

type Score = {
  time: string;
  createdDate: string;
}

export const getGameScore = (): Score[] => {
  const score = localStorage.getItem(storageKey.score)

  return JSON.parse(score ?? '[]')
}

export const addGameScore = (time: number) => {
  const currentScore = getGameScore();
  const newScore = {
    time,
    createdDate: new Date(),
  }
  localStorage.setItem(storageKey.score,
    JSON.stringify([
      ...currentScore,
      newScore
    ])
  )
}