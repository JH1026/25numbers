import { useCallback, useState } from "react";
import styled from "styled-components";

const maxNumber = 25;

const numbers25 = (() => {
  const res = [];
  for (let i=1;i<=maxNumber;i++) {
    res.push(i);
  }
  return res;
})();

const getRandomizeNumbers = (): number[] => {
  return numbers25.reduce((_, current, index) => {
    const r = Math.floor(Math.random() * (numbers25.length));
    numbers25[index] = numbers25[r]
    numbers25[r] = current;
    return numbers25;
  }, [] as number[])
}

const TopPage = () => {
  const [displayNumbers, setDisplayNumbers] = useState<number[]>(numbers25);
  const [startTime, setStartTime] = useState<Date | undefined>();
  const [nextNumber, setNextNumber] = useState<number>(1);
  const [correctNumber, setCorrect] = useState<number>();
  const [wrongNumber, setWrong] = useState<number>();

  const clickNumber = useCallback((num: number) => {
    if (!startTime) {
      return;
    }
    if (nextNumber === num) {
      if (num === maxNumber) {
        const currentTime = new Date();
        const time = currentTime.getTime() - startTime.getTime();
        alert(`Time: ${time/1000}秒`);
        return;
      }
      setNextNumber((current) => current + 1);
      setCorrect(num);
    } else {
      setWrong(num);
    }
    
    setTimeout(() => {
      setWrong(undefined);
      setCorrect(undefined);
    }, 750)
    
  }, [nextNumber, startTime]);

  const startGame = () => {
    setDisplayNumbers([...getRandomizeNumbers()]);

    setStartTime(new Date());
    setNextNumber(1);
  };

  const resetGame = () => {
    setStartTime(undefined);

  }

  return (
    <Root>
      <Container>
        <NumberField>
          {displayNumbers.map((num) => {
            return (
              <NumberButton
                onClick={() => clickNumber(num)}
                correct={num === correctNumber}
                wrong={num === wrongNumber}
              >
                {num}
              </NumberButton>
            )
          })}
        </NumberField>
        <NextNumber>
          {startTime && <>NextNumber: {nextNumber}</>}
        </NextNumber>
        <ButtonContainer>
          {!startTime ? (
            <CommonButton onClick={() => startGame()}>
              Start
            </CommonButton>
          ) : (
            <CommonButton onClick={() => resetGame()}>
              Reset
            </CommonButton>
          )}
        </ButtonContainer>
      </Container>
    </Root>
  );
}

export default TopPage;

const Root = styled.div`
  min-width: 800px;
`

const NextNumber = styled.div`
  font-size: 36px;
`

const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const NumberButton = styled.button<{ correct: boolean; wrong: boolean; }>`
  text-decoration: none;
  border: 1px solid #333;

  color: ${({ correct, wrong }) => correct ? "#00f" : wrong ? "#f00" : "000"};
  
  cursor: pointer;
  width: 120px;
  height: 120px;
  font-size: 36px;
  box-sizing: border-box;

  :hover {
    opacity: 0.7;
  }
`

const ButtonContainer = styled.div`
  margin-top: 20px;
`

const CommonButton = styled.button`
  text-decoration: none;
  background: #eee;

  cursor: pointer;
  width: 150px;
  font-size: 36px;
  box-sizing: border-box;

  :hover {
    opacity: 0.7;
  }
`

const NumberField = styled.div`
  width: 600px;
  height: 600px;
`