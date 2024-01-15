"use client";

import { Key, useEffect, useState } from "react";
import Node from "./Node/Node";

const Dijkstra = () => {
    const [vec, setVec] = useState<any[]>([]);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);

    const START_NODE_ROW = 12;
    const START_NODE_COL = 21;
    const END_NODE_ROW = 12;
    const END_NODE_COL = 62;

    const getNewGridWithWallToggled = (v: any[], row: number, col: number) => {
        const newv = v.map(row => row.map((col: any) => col));
        const node = newv[row][col];
        const newNode = {
            ...node,
            isWall: !node.isWall,
        };
        newv[row][col] = newNode;
        return newv;
    };

    const handleMouseDown = (row: number, col: number) => {
        const newVec = getNewGridWithWallToggled(vec, row, col);
        setVec(newVec.map(row => row.map((col: any) => col)));
        setMouseIsPressed(true);
    };

    const handleMouseEnter = (row: number, col: number) => {
        if (!mouseIsPressed) return;
        const newVec = getNewGridWithWallToggled(vec, row, col);
        setVec(newVec.map(row => row.map((col: any) => col)));
    };

    const handleMouseUp = () => {
        setMouseIsPressed(false);
    };

    const createNode = (row: number, col: number) => {
        return {
            col,
            row,
            isStart: row === START_NODE_ROW && col === START_NODE_COL,
            isFinish: row === END_NODE_ROW && col === END_NODE_COL,
            distance: Infinity,
            isVisited: false,
            isWall: false,
            previousNode: null,
        };
    };

    const getAllNodes = (v: any[][]) => {
        const nodes = [];
        for (const row of v) {
            for (const node of row) {
                nodes.push(node);
            }
        }
        return nodes;
    };

    const sortNodesByDistance = (unvisitedNodes: any[]) => {
        unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
    };

    const getUnvisitedNeighbors = (node: any, v: any[][]) => {
        const neighbors = []
        const { row, col } = node;
        if (row > 0) neighbors.push(v[row - 1][col]);
        if (row < v.length - 1) neighbors.push(v[row + 1][col]);
        if (col > 0) neighbors.push(v[row][col - 1]);
        if (col < v[0].length - 1) neighbors.push(v[row][col + 1]);

        return neighbors.filter(neighbor => !neighbor.isVisited);
    };

    const updateUnvisitedNeighbors = (node: any, v: any[][]) => {
        const unvisitedNeighbors = getUnvisitedNeighbors(node, v);
        for (const neighbor of unvisitedNeighbors) {
            neighbor.distance = node.distance + 1;
            neighbor.previousNode = node;
        }
    };

    const dijkstra = (v: any[][], startNode: any, finishNode: any) => {
        const visitedNodesInOrder: any[] = [];
        startNode.distance = 0;
        const unvisitedNodes: any[] = getAllNodes(v);
        while (!!unvisitedNodes.length) {
            sortNodesByDistance(unvisitedNodes);
            const closestNode = unvisitedNodes.shift(); // pop first element

            if (closestNode.isWall) continue;

            if (closestNode.distance === Infinity) return visitedNodesInOrder;

            closestNode.isVisited = true;
            visitedNodesInOrder.push(closestNode);

            if (closestNode === finishNode) return visitedNodesInOrder;
            updateUnvisitedNeighbors(closestNode, v);
        }
    };

    const getNodesInShortestPathOrder = (finishNode: any) => {
        const nodesInShortestPathOrder = [];
        let currentNode = finishNode;
        while (currentNode !== null) {
            nodesInShortestPathOrder.unshift(currentNode);
            currentNode = currentNode.previousNode;
        }
        return nodesInShortestPathOrder;
    };

    const animateShortestPath = (nodesInShortestPathOrder: any[]) => {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`)!.className = 'node node-shortest-path';
            }, 50 * i);
        }
    };

    const animateDijkstra = (visitedNodesInOrder: any[] | undefined, nodesInShortestPathOrder: any[]) => {
        for (let i = 0; i <= visitedNodesInOrder?.length!; i++) {
            if (i === visitedNodesInOrder?.length) {
                setTimeout(() => {
                    animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder![i];
                document.getElementById(`node-${node!.row}-${node!.col}`)!.className = 'node node-visited';
            }, 10 * i);
        }
    };

    const visualizeDijkstra = () => {
        const v = vec.map((row: any[]) => row.map((col: any) => col));
        const startNode = v[START_NODE_ROW][START_NODE_COL];
        const finishNode = v[END_NODE_ROW][END_NODE_COL];
        const visitedNodesInOrder: any[] | undefined = dijkstra(v, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    };

    useEffect(() => {
        const v = [];
        for (let row = 0; row < 28; row++) {
            const currentRow = [];
            for (let col = 0; col < 85; col++) {
                currentRow.push(createNode(row, col));
            }
            v.push(currentRow);
        }

        // Deep copy 2D v into vec
        setVec(v.map(row => row.map(col => col)));
    }, []);

    return (<>
        <div className="w-full h-10 bg-indigo-200 sticky top-0">
            <div className="container mx-auto px4 h-full">
                <div className="flex justify-start items-center h-full">
                    <ul>
                        <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-px px-3 rounded-2xl" onClick={() => visualizeDijkstra()}>Visualize</button>
                    </ul>
                </div>
            </div>
        </div>
        <div className="font-mono text-sm m-1 p-1">
            {vec.map((row, rowIndex) => {
                return (
                    <div key={rowIndex} className="flex">
                        {row.map((node: { row: number; col: number; isFinish: boolean; isStart: boolean; isWall: boolean; }, nodeIdx: Key) => {
                            const { row, col, isFinish, isStart, isWall } = node;
                            return (<Node
                                key={nodeIdx}
                                row={row}
                                col={col}
                                isFinish={isFinish}
                                isStart={isStart}
                                isWall={isWall}
                                // mouseIsPressed={mouseIsPressed}
                                onMouseDown={(row: number, col: number) => handleMouseDown(row, col)}
                                onMouseEnter={(row: number, col: number) => handleMouseEnter(row, col)}
                                onMouseUp={() => handleMouseUp()}></Node>)
                        })}
                    </div>
                )
            })}
        </div>
    </>)
};

export default Dijkstra;
