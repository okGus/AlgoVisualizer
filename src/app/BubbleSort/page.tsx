"use client";

import { useCallback, useEffect, useState } from "react";

const BubbleSort = () => {
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
        const oneclass = document.querySelectorAll('.one');
        oneclass.forEach(e => {
            e.classList.remove('one');
        })
        const twoclass = document.querySelectorAll('.two');
        twoclass.forEach(e => {
            e.classList.remove('two');
        })
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

    const sort = async () => {
        let temp = 0;
        let arr = [...vec];

        for (let i = 1; i < arr.length; i++) {
            removeClasses();
            for (let j = 0; j < arr.length - 1; j++) {
                removeClasses();

                const onea = document.getElementById(j.toString());
                const twoa = document.getElementById((j + 1).toString());
                onea?.classList.add('two');
                twoa?.classList.add('two');
                if (arr[j] > arr[j + 1]) {
                    twoa?.classList.remove('two');
                    twoa?.classList.add('one');
                
                    temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    setVec([...arr]);

                    // await delay(2000);
                }
                await delay(1000);
            }
        }
        removeClasses();
    }

    return <>
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
                        <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-px px-3 rounded-2xl" onClick={() => sort()}>Sort</button>
                    </ul>
                </div>
            </div>
        </div>
        <div className="flex flex-col items-center justify-between">
            <div className="z-10 max-w-5xl items-center justify-between font-mono text-sm">
                {memoizeRender()}
            </div>
        </div>
    </>
};

export default BubbleSort;