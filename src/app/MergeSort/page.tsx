"use client";

import { useCallback, useEffect, useState } from "react";
// import { flushSync } from "react-dom";

const MergeSort = () => {
    const [length, setLength] = useState(1);
    const [vec, setVec] = useState<number[]>([]);

    const memoizeRender = useCallback(() => {
        return (
            <div className="flex flex-row justify-between">
                {vec.length > 0 && vec.map((value, index) => {
                    return (
                        <div key={index} id={index.toString()} className="bg-slate-600 mx-1 w-4" style={{ height: `${value / 2}em`, position: "sticky" }}></div>
                    )
                })}
            </div>
        )
    }, [vec]);

    useEffect(() => {
        memoizeRender();
    }, [memoizeRender, vec]);

    function randomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function removeClasses() {
    }

    function gen() {
        let arr: number[] = [];
        setVec([]);
        for (let i = 0; i < length; i++) {
            let el: number = randomInt(1, 100);
            arr.push(el);
        }
        setVec([...arr]);
        removeClasses();
    }

    const delay = (ms: number) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const merge = (left: number[], right: number[]) => {
        let result = [];
        let leftIndex = 0;
        let rightIndex = 0;
        console.log('merge');

        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] < right[rightIndex]) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }

        result = result.concat(left.slice(leftIndex))
        result = result.concat(right.slice(rightIndex));

        return result;
    }

    const mergesort = async (arr: number[]) => {
        if (arr.length <= 1) {
            return arr;
        }

        const middle = Math.floor(arr.length / 2);
        const leftHalf = arr.slice(0, middle);
        const rightHalf = arr.slice(middle);

        const [leftSorted, rightSorted] = await Promise.all([
            mergesort(leftHalf),
            mergesort(rightHalf)
        ]);

        // const leftSorted = mergesort(leftHalf);
        // const rightSorted = mergesort(rightHalf);

        const sorted = merge(leftSorted, rightSorted);

        setVec([...sorted]);
        await delay(2000);

        return sorted;
    }

    const merge_sort = async () => {
        let arr = [...vec];
        console.log(arr);

        const sortedArr = await mergesort(arr);
        console.log("sorted: ", sortedArr);
    }


    return (<>
        <div className="w-full h-10 bg-indigo-200 sticky top-0">
            <div className="container mx-auto px4 h-full">
                <div className="flex justify-start items-center h-full">
                    <ul className="pr-2">
                        <label>Max array length: </label>
                        <input type="number" id="length" name="length" min="1" max="100" value={length} onChange={e => setLength(parseInt(e.target.value))}></input>
                    </ul>
                    <ul className="pr-2">
                        <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-px px-3 rounded-2xl" onClick={() => gen()}>
                            Generate random array
                        </button>
                    </ul>
                    <ul>
                        <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-px px-3 rounded-2xl" onClick={() => merge_sort()}>Sort</button>
                    </ul>
                </div>
            </div>
        </div>
        <div className="flex flex-col items-center justify-between">
            <div className="z-10 max-w-5xl items-center justify-between font-mono text-sm">
                {memoizeRender()}
            </div>
        </div>
    </>)
};

export default MergeSort;