import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEqual = () => {
    if (operation && previousValue !== null) {
      const inputValue = parseFloat(display);
      const newValue = calculate(previousValue, inputValue, operation);
      
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  return (
    <div className="w-80 mx-auto bg-card rounded-2xl shadow-2xl p-6 border border-border">
      {/* Display */}
      <div className="bg-calc-display rounded-lg p-6 mb-6 text-right">
        <div className="text-calc-display-text text-4xl font-mono font-light leading-none truncate">
          {display}
        </div>
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <Button
          variant="calc-clear"
          onClick={clear}
          className="col-span-2"
        >
          AC
        </Button>
        <Button
          variant="calc-operation"
          onClick={() => performOperation('÷')}
        >
          ÷
        </Button>
        <Button
          variant="calc-operation"
          onClick={() => performOperation('×')}
        >
          ×
        </Button>

        {/* Row 2 */}
        <Button
          variant="calc-number"
          onClick={() => inputNumber('7')}
        >
          7
        </Button>
        <Button
          variant="calc-number"
          onClick={() => inputNumber('8')}
        >
          8
        </Button>
        <Button
          variant="calc-number"
          onClick={() => inputNumber('9')}
        >
          9
        </Button>
        <Button
          variant="calc-operation"
          onClick={() => performOperation('-')}
        >
          −
        </Button>

        {/* Row 3 */}
        <Button
          variant="calc-number"
          onClick={() => inputNumber('4')}
        >
          4
        </Button>
        <Button
          variant="calc-number"
          onClick={() => inputNumber('5')}
        >
          5
        </Button>
        <Button
          variant="calc-number"
          onClick={() => inputNumber('6')}
        >
          6
        </Button>
        <Button
          variant="calc-operation"
          onClick={() => performOperation('+')}
        >
          +
        </Button>

        {/* Row 4 */}
        <Button
          variant="calc-number"
          onClick={() => inputNumber('1')}
        >
          1
        </Button>
        <Button
          variant="calc-number"
          onClick={() => inputNumber('2')}
        >
          2
        </Button>
        <Button
          variant="calc-number"
          onClick={() => inputNumber('3')}
        >
          3
        </Button>
        <Button
          variant="calc-operation"
          onClick={handleEqual}
          className="row-span-2"
        >
          =
        </Button>

        {/* Row 5 */}
        <Button
          variant="calc-number"
          onClick={() => inputNumber('0')}
          className="col-span-2"
        >
          0
        </Button>
        <Button
          variant="calc-number"
          onClick={inputDecimal}
        >
          .
        </Button>
      </div>
    </div>
  );
};

export default Calculator;