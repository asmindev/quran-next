/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState, createContext, useEffect } from "react";

const QuranContext = createContext();

function QuranProvider({ children }) {
    const [quran, setQuran] = useState([]);

    return (
        <QuranContext.Provider value={{ quran, setQuran }}>
            {children}
        </QuranContext.Provider>
    );
}

export { QuranContext, QuranProvider };
