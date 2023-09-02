"use client";
import React, { useState, useContext, useEffect, useRef } from "react";
import { usePathname, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { AudioContext } from "@/components/AudioContext";

export default function Action({ item }) {
    const params = useParams();
    const path = usePathname();
    const { listAudio, setFirst } = useContext(AudioContext);
    const [bookmark, setBookmark] = useState(false);

    const playAudio = (key) => {
        const index = listAudio.findIndex((item) => item.verse_key === key);
        setFirst(index + 1);
    };
    const copyToClipboard = async (id) => {
        try {
            const url = new URL(window.location.href);
            await navigator.clipboard.writeText(
                `${url.origin}/${url.pathname}#${id}`
            );
        } catch (error) {
            console.error("Failed to copy:", error);
        }
    };
    useEffect(() => {
        if (window) {
            const url = window.location.hash;
            const parent = document.getElementById(item.verse_key);
            if (url === `#${parent.id}`) {
                parent.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }
        }
    }, [item.verse_key]);
    return (
        <div className="w-full mt-4 flex gap-4 items-center">
            <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={playAudio.bind(this, item.verse_key)}
                type="button"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 md:w-5 h-auto text-gray-500"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                    />
                </svg>
            </motion.button>
            <motion.button
                onClick={() => copyToClipboard(item.verse_key)}
                whileTap={{ scale: 0.9 }}
                type="button"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 md:w-5 h-auto text-gray-500"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                    />
                </svg>
            </motion.button>
            <motion.button
                onClick={() => setBookmark(!bookmark)}
                whileTap={{ scale: 0.9 }}
                type="button"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-4 md:w-5 h-auto text-gray-500 transition-all duration-150 ${
                        bookmark && "fill-yellow-400 text-yellow-400"
                    }`}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                    />
                </svg>
            </motion.button>
        </div>
    );
}
