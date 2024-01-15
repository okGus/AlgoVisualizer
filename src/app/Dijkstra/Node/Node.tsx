import './Node.css'

const Node: React.FC<{row: number, 
        col: number,
        isFinish: boolean,
        isStart: boolean,
        isWall: boolean,
        onMouseDown: any,
        onMouseEnter: any,
        onMouseUp: any,}> = ({row, col, isFinish, isStart, isWall, onMouseDown, onMouseEnter, onMouseUp}) => {

    const extractClassName = isFinish ? 'node-finish'
            : isStart ? 'node-start'
            : isWall ? 'node-wall'
            : '';

    return (<div
        id={`node-${row}-${col}`}
        className={`node ${extractClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp(row, col)}></div>);
};

export default Node;