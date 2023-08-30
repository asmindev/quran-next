"use client";
import React, { createContext, useState } from "react";

const ModalContext = createContext();

function ModalProvider({ children }) {
    const [modal, setModal] = useState(false);
    const [content, setContent] = useState(null);
    return (
        <ModalContext.Provider value={{ modal, setModal, content, setContent }}>
            {children}
        </ModalContext.Provider>
    );
}

export { ModalContext, ModalProvider };
