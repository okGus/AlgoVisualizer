"use client";

import { useCallback, useEffect, useState } from "react";

const SelectionSort = () => {
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

    function removeOne() {
        const oneclass = document.querySelectorAll('.one');
        oneclass.forEach(e => {
            e.classList.remove('one');
        })
    }

    function removeTwo() {
        const twoclass = document.querySelectorAll('.two');
        twoclass.forEach(e => {
            e.classList.remove('two');
        })
    }

    function removeSolved() {
        const solve = document.querySelectorAll('.solved');
        solve.forEach(e => {
            e.classList.remove('solved');
        })
    }

    function removeClasses() {
        removeOne();
        removeTwo();
        removeSolved();
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

    const selection_sort = async () => {
        let arr = [...vec];
        for (let j = 0; j < arr.length - 1; j++) {
            let iMin = j;

            let iminidx = document.getElementById(iMin.toString());
            iminidx?.classList.add('one');

            for (let i = j + 1; i < arr.length; i++) {
                const iidx = document.getElementById(i.toString());
                iidx?.classList.add('two');
                await delay(1000);
                if (arr[i] < arr[iMin]) {
                    iidx?.classList.remove('two');
                    iminidx?.classList.remove('one');
                    iMin = i;
                    iminidx = document.getElementById(iMin.toString());
                    iminidx?.classList.add('one');
                }
                
                iidx?.classList.remove('two');
            }
            await delay(1000);

            if (iMin != j) {
                let temp = arr[j];
                arr[j] = arr[iMin];
                arr[iMin] = temp;
            }
            document.getElementById(j.toString())?.classList.add('solved');

            removeOne();

            setVec([...arr]);
        }
        document.getElementById((arr.length - 1).toString())?.classList.add('solved');
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
                        <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-px px-3 rounded-2xl" onClick={() => selection_sort()}>Sort</button>
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

export default SelectionSort;