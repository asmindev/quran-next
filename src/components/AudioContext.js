"use client";
import React, { useState, createContext } from "react";

const AudioContext = createContext();

const AudioProvider = ({ children }) => {
    const [active, setActive] = useState(false);
    const [surah, setSurah] = useState({});
    const [listAudio, setListAudio] = useState([]);
    const [first, setFirst] = useState(null);
    const [ayah, setAyah] = useState(null);
    const [segment, setSegment] = useState(null);
    return (
        <AudioContext.Provider
            value={{
                active,
                setActive,
                listAudio,
                setListAudio,
                first,
                setFirst,
                ayah,
                setAyah,
                segment,
                setSegment,
                surah,
                setSurah,
            }}
        >
            {children}
        </AudioContext.Provider>
    );
};

export { AudioContext, AudioProvider };
