"use client";

import { useCallback, useEffect, useState } from "react";

const InsertionSort = () => {
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

    function replaceOne() {
        const oneclass = document.querySelectorAll('.one');
        oneclass.forEach(e => {
            e.classList.remove('one');
            e.classList.add('solved')
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

    const insertion_sort = async () => {
        let arr = [...vec];
        let i, key, j;
        for (i = 1; i < arr.length; i++) {
            key = arr[i];
            j = i - 1;

            while (j >= 0 && arr[j] > key) {
                const jminus = document.getElementById(j.toString());
                const jplus = document.getElementById((j + 1).toString());

                if (jminus?.classList.contains('solved')) {
                    jminus.classList.remove('solved');
                }

                jminus?.classList.add('two');
                jplus?.classList.add('two');
                await delay(500);
                arr[j + 1] = arr[j];
                jplus?.classList.remove('two');
                jplus?.classList.add('one');
                await delay(500);
                j = j - 1;
                setVec([...arr]);
                await delay(1000);
            }
            arr[j + 1] = key;
            removeTwo();
            replaceOne();
        
            setVec([...arr]);
            document.getElementById(j.toString())?.classList.add('solved');
            document.getElementById((j + 1).toString())?.classList.add('solved');
        }
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
                        <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-px px-3 rounded-2xl" onClick={() => insertion_sort()}>Sort</button>
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

export default InsertionSort;