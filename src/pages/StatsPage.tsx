import { format } from "date-fns";
import { getGameScore } from "../utils/storage";

const StatsPage = () => {

  const scores = getGameScore();

  console.log(scores);

  return (
    <>
      <h1>Score</h1>
      <>
      {scores.map((score) => {
        return <div>{score.time}Seconds {format(new Date(score.createdDate), 'yyyy-MM-dd HH:mm:SS')}</div>
      })}
      </>
    </>
  );
}

export default StatsPage;
