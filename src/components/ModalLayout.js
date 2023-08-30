"use client";
import React, { useContext } from "react";
import { ModalContext } from "./ModalContext";
import { motion, AnimatePresence } from "framer-motion";

export default function ModalLayout() {
    const { content } = useContext(ModalContext);
    return (
        <AnimatePresence mode="wait">
            {content && (
                <motion.div
                    layoutId="modal"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    className="w-full fixed h-screen bg-white/50 z-[999999999999999] backdrop-blur"
                >
                    {content}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
