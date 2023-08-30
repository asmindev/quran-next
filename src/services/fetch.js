import { useState } from "react";
const url = process.env.NEXT_PUBLIC_QURAN_API;
const getData = async (path, arg) => {
    // update arg
    const params = new URLSearchParams(arg);
    params.set("language", "id");
    const res = await fetch(`${url}/${path}?${params.toString()}`);
    const json = await res.json();
    return json;
};

export default function useFetch(path, arg) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    useState(() => {
        getData(path, arg)
            .then((res) => {
                setData(res);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsError(err);
                setIsLoading(false);
            });
    }, [path, arg]);
    return { data, isLoading, isError };
}
