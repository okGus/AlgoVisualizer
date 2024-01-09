"use client";

import { useCallback, useEffect, useState } from "react";

const CountSort = () => {
    const [length, setLength] = useState(1);
    const [vec, setVec] = useState<number[]>([]);

    const [shapemap, setShapemap] = useState(new Map());
    const [sortedvec, setSortedvec] = useState<number[]>([]);

    const colorMap = new Map([
        [0, 'bg-red-600'],
        [1, 'bg-orange-600'],
        [2, 'bg-lime-600'],
        [3, 'bg-emerald-600'],
        [4, 'bg-cyan-900'],
        [5, 'bg-blue-600'],
        [6, 'bg-violet-600'],
        [7, 'bg-pink-600'],
        [8, 'bg-amber-600'],
        [9, 'bg-yellow-600'],
    ]);

    const memoizeRenderShape = useCallback(() => {
        return (
            <div className="flex flex-row justify-between mx-3 my-3 px-5 py-5">
                {vec.length > 0 && vec.map((value, index) => {
                    return (
                        <div key={index} id={"render_shape_" + index.toString()} className="m-1 p-1">
                            <div id={"array_" + index.toString()} className={`outline outline-4 w-8 h-8 rounded-full` + ` ${colorMap.get(value)}`}></div>
                        </div>
                    )
                })}
            </div>
        )
    }, [vec]);


    const memoizeRenderShapeMap = useCallback(() => {
        const shapemaparr = Array.from(shapemap.keys());
        console.log(shapemaparr);
        return (
            <div className="flex flex-row justify-between mx-3 my-3 px-5 py-5">
                {shapemaparr.map((value, index) => {
                    return (
                        <div key={index} className="huh">
                            <div id={"map_" + value?.toString()} className="flex justify-center items-center outline outline-4 mx-4 my-4 w-10 h-10">
                                <div>{shapemap.get(value)}</div>
                            </div>
                            <div key={index} id={index.toString()} className={`outline outline-4 mx-5 my-4 w-8 h-8 rounded-full` + ` ${colorMap.get(value)}`}></div>
                        </div>
                    )
                })}
            </div>
        )
    }, [shapemap]);

    const memoizeRenderShapeSorted = useCallback(() => {
        return (
            <div className="flex flex-row justify-between">
                {sortedvec.length > 0 && sortedvec.map((value, index) => {
                    return (
                        <div key={index} className="flex flex-col justify-center items-center">
                            <div key={index} id={"sorted_" + index.toString()} className={`outline outline-4 mx-2 w-8 h-8 rounded-full` + ` ${colorMap.get(value)}`}></div>
                            <div className="mx-1 my-1">{index}</div>
                        </div>
                    )
                })}
            </div>
        )
    }, [sortedvec]);

    useEffect(() => {
        memoizeRenderShape();
    }, [memoizeRenderShape, vec]);

    useEffect(() => {
        memoizeRenderShapeMap();
    }, [memoizeRenderShapeMap, shapemap]);

    useEffect(() => {
        memoizeRenderShapeSorted();
    }, [memoizeRenderShapeSorted, sortedvec]);

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
            let el: number = randomInt(0, 9);
            arr.push(el);
        }
        setVec([...arr]);

        setShapemap(new Map());

        setSortedvec(new Array());
    }

    const delay = (ms: number) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const createhashmap = async () => {
        let arr = [...vec];

        let temp = new Map<number, number>();

        // Create hashmap from array
        for (let index = 0; index < arr.length; index++) {
            const selected = document.getElementById("array_" + index.toString());
            selected?.classList.add('yep');

            if (temp.has(arr[index])) {
                temp.set(arr[index], temp.get(arr[index])! + 1);
            } else {
                temp.set(arr[index], 1);
            }

            await delay(1000);

            setShapemap(new Map(temp));

            selected?.classList.remove('yep');

            await delay(1000);
        }

        return temp;
    }

    const prefixsummap = async (tempmap: Map<number, number>) => {
        let prev = 0;
        for (let [k, v] of tempmap) {
            const selected = document.getElementById("map_" + k.toString());
            selected?.classList.add('yep');

            await delay(1000);

            prev = v + prev;
            tempmap.set(k, prev);

            setShapemap(new Map(tempmap));

            await delay(1000);

            selected?.classList.remove('yep');
        }

        return tempmap;
    }

    const countsort = async (tempmap: Map<number, number>) => {
        let arr = [...vec];
        let sortedarray = [...sortedvec];

        while (arr.length > 0) {
            const selected = document.getElementById("render_shape_" + (arr.length - 1).toString());

            const key = arr[arr.length-1];
            const count = tempmap.get(key)!;
            
            const value = count - 1; // new value

            tempmap.set(key, value)

            sortedarray[count - 1] = key;

            const sortedindex = count - 1;

            const sortedselected = document.getElementById("sorted_" + sortedindex.toString());
            const offset = sortedselected?.getBoundingClientRect();

            const offsetx = Math.floor(offset?.x!);
            const offsety = Math.floor(offset?.y!);

            const s = selected?.getBoundingClientRect();
            
            const x = Math.floor(s?.x!);
            const y = Math.floor(s?.y!);

            const keyframes = [
                { opacity: 1}, // from
                { opacity: 1, transform: `translate(${offsetx!-x!-4}px, ${offsety!-y!-4}px)`}, // to
            ];

            const options: KeyframeAnimationOptions = {
                duration: 1000, // is or 1000 milliseconds
                easing: 'ease-in-out',
                fill: 'forwards'
            };

            selected?.animate(keyframes, options);

            await delay(1000);

            setSortedvec([...sortedarray]);

            await delay(1000);

            const popped = arr.pop();

            setVec([...arr]);

            setShapemap(new Map(tempmap));

            await delay(2000);
        }
    }

    const count_sort = async () => {
        const temp = await createhashmap();
        setSortedvec([...new Array(length)]);

        // Loop hashmap to create prefix sum
        const tempmap = await prefixsummap(temp);

        await countsort(tempmap);
    }

    return (<>
        <div className="w-full h-10 bg-indigo-200 sticky top-0">
            <div className="container mx-auto px4 h-full">
                <div className="flex justify-start items-center h-full">
                    <ul className="pr-2">
                        <label>Max array length: </label>
                        <input type="number" id="length" name="length" min="0" max="10" value={length} onChange={e => setLength(parseInt(e.target.value))}></input>
                    </ul>
                    <ul className="pr-2">
                        <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-px px-3 rounded-2xl" onClick={() => gen()}>
                            Generate random array
                        </button>
                    </ul>
                    <ul className="pr-2">
                        <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-px px-3 rounded-2xl" onClick={() => count_sort()}>Sort</button>
                    </ul>
                    {/* <ul className="pr-2">
                        <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-px px-3 rounded-2xl" onClick={toggleNum}>Number</button>
                    </ul> */}
                    {/* <ul className="pr-2">
                        <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-px px-3 rounded-2xl" onClick={toggleShape}>Shape</button>
                    </ul> */}
                </div>
            </div>
        </div>
        <div className="flex flex-col items-center justify-between">
            <div className="z-10 w-fit items-center justify-between font-mono text-sm">
                {/* {num && memoizeRenderNum()} ^ max-w-5xl */}
                {memoizeRenderShape()}
                {memoizeRenderShapeMap()}
                {memoizeRenderShapeSorted()}
            </div>
        </div>
    </>)
};

export default CountSort;