import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

function Square({ value, onClick, isWinning }) {
  return (
    <button
      className={`w-20 h-20 text-4xl font-bold rounded-lg shadow-md transition-all duration-200 ${
        isWinning
          ? 'bg-green-400 text-white'
          : value
          ? 'bg-white text-gray-800'
          : 'bg-gray-100 hover:bg-gray-200'
      }`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    if (calculateWinner(squares).winner || squares[i]) return;
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const { winner, line } = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (squares.every(Boolean)) {
    status = 'Draw!';
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  const renderSquare = (i) => (
    <Square
      value={squares[i]}
      onClick={() => handleClick(i)}
      isWinning={line && line.includes(i)}
    />
  );

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-2xl font-bold text-gray-800">{status}</div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button
        onClick={resetGame}
        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200"
      >
        <RefreshCw className="mr-2" size={20} />
        Play Again
      </button>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return { winner: null, line: null };
}

export default function Game() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Tic Tac Toe</h1>
        <Board />
      </div>
    </div>
  );
}