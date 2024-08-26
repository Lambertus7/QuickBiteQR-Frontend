interface GridCell {
  id: number;
  cell: string;
  start: string;
  handleMove: (id: number) => void; // Add a handler function for move
}

const Cell = ({ id, cell, start, handleMove }: GridCell) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.currentTarget.firstChild as HTMLElement;

    if (
      target &&
      !target.classList.contains("circle") &&
      !target.classList.contains("cross")
    ) {
      handleMove(id);
    }
  };

  return (
    <div className="square" onClick={handleClick}>
      <div className={cell}>{/* Use the cell state for class */}</div>
    </div>
  );
};

export default Cell;
