import { useEffect, useState } from "react";
import quran from "./quran.json";

const useQuranSearch = (query) => {
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (query) {
            const nama = quran.chapters.filter((item) =>
                item.name_simple.toLowerCase().startsWith(query.toLowerCase())
            );
            setSearchResults(nama);
        }
    }, [query]);

    return searchResults;
};

export default useQuranSearch;
