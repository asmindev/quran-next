/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AudioContext } from "@/components/AudioContext";
import { motion, AnimatePresence } from "framer-motion";
import config from "@/services/quran.config";

// Komponen Tombol Audio
const AudioButton = ({ icon, onClick }) => (
    <motion.button whileTap={{ scale: 0.9 }} onClick={onClick} type="button">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 md:w-5 h-auto text-gray-500"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
        </svg>
    </motion.button>
);

export default function AudioController() {
    const {
        listAudio,
        active,
        first,
        setFirst,
        setActive,
        setAyah,
        setSegment,
        surah,
    } = useContext(AudioContext);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [reciter, setReciter] = useState({}); // [id, name
    const [time, setTime] = useState("00:00"); // "00:00/00:00
    const [duration, setDuration] = useState("00:00"); // "00:00/00:00
    const audioRef = useRef(null);
    const playByIndex = (index) => {
        const { audio } = listAudio[index];
        const source = `https://verses.quran.com/${audio.url}`;
        audioRef.current = new Audio(source);
        audioRef.current.play();
    };
    const handleNext = () => {
        if (currentIndex < listAudio.length - 1) {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            setCurrentIndex(currentIndex + 1);
            playByIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            setCurrentIndex(currentIndex - 1);
            playByIndex(currentIndex - 1);
        }
    };
    const baseUrl = process.env.NEXT_PUBLIC_QURAN_API;
    const getReciter = async () => {
        // https://api.quran.com/api/v4/resources/recitations
        const res = await fetch(`${baseUrl}/resources/recitations`);
        const data = await res.json();
        const result = data.recitations?.find(
            (item) => item.id === config.audio
        );
        setReciter(result);
    };

    useEffect(() => {
        if (!reciter?.id) {
            getReciter();
        }
        const updateTime = () => {
            const { currentTime, duration } = audioRef.current;
            if (duration) {
                const minutes = Math.floor(duration / 60)
                    .toString()
                    .padStart(2, "0");
                const seconds = Math.floor(duration % 60)
                    .toString()
                    .padStart(2, "0");
                const time = `${minutes}:${seconds}`;
                setDuration(time);
            }
            const progress = (currentTime / duration) * 100;
            const current = Math.floor(currentTime * 1000);
            const { segments } = listAudio[currentIndex].audio;
            const index = segments.findIndex(
                (item) => current >= item[2] && current <= item[3]
            );
            if (index !== -1) {
                setSegment(segments[index]);
                setAyah(listAudio[currentIndex].verse_key);
            }

            if (progress > 99 && currentIndex < listAudio.length - 1) {
                setCurrentIndex(currentIndex + 1);
                playByIndex(currentIndex + 1);
                setLoading(true);
            }
            const minutes = Math.floor(currentTime / 60)
                .toString()
                .padStart(2, "0");
            const seconds = Math.floor(currentTime % 60)
                .toString()
                .padStart(2, "0");
            const time = `${minutes}:${seconds}`;
            setTime(time);
            setProgress(progress);
        };

        if (first) {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            setActive(true);
            playByIndex(first - 1);
            setCurrentIndex(first - 1);
            setFirst(null);
        }

        audioRef.current?.addEventListener("timeupdate", updateTime);

        // check if audio is ready
        audioRef.current?.addEventListener("canplay", () => {
            setLoading(false);
        });
        return () => {
            audioRef.current?.removeEventListener("timeupdate", updateTime);
        };
    }, [
        first,
        currentIndex,
        listAudio,
        setActive,
        setAyah,
        setFirst,
        setSegment,
        loading,
        reciter,
    ]);

    return (
        <AnimatePresence>
            {active && (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                >
                    <div className="w-full relative bg-gradient-to-tr from-white/50 to-white/80 backdrop-blur rounded-none text-xs">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress || 0}%` }}
                            className="h-[1px] bg-orange-500 rounded-md absolute top-0 left-0 after:rounded-md after:w-[5px] after:h-[5px] after:absolute after:-top-[2px] after:-right-[2px] after:shadow-lg after:bg-orange-500 after:shadow-orange-600"
                        ></motion.div>
                        <div className="w-full flex items-center gap-2 p-2 md:p-4">
                            <div className="flex gap-2 items-center">
                                <div className="flex gap-1 items-center">
                                    <p className="text-gray-500 w-8">{time}</p>
                                    {"-"}
                                    <p className="text-gray-500">
                                        {duration || "00:00"}
                                    </p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    {loading ? (
                                        <div className="animate-spin flex items-center">
                                            <AudioButton icon="M12 3C16.9706 3 21 7.02944 21 12H19C19 8.13401 15.866 5 12 5V3Z" />
                                        </div>
                                    ) : (
                                        <AudioButton
                                            icon={
                                                audioRef.current?.paused
                                                    ? "M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                                                    : "M15.75 5.25v13.5m-7.5-13.5v13.5"
                                            }
                                            onClick={() => {
                                                if (audioRef.current.paused) {
                                                    audioRef.current.play();
                                                } else {
                                                    audioRef.current.pause();
                                                }
                                            }}
                                        />
                                    )}

                                    <AudioButton
                                        icon="M15 19L8 12L15 5"
                                        onClick={handlePrev}
                                    />
                                    <AudioButton
                                        icon="M9 5L16 12L9 19"
                                        onClick={handleNext}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2 items-center">
                                <AnimatePresence>
                                    <motion.span
                                        initial={{ y: 3, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -3, opacity: 0 }}
                                        className="text-gray-500"
                                    >
                                        {listAudio[currentIndex]?.verse_number}{" "}
                                        / {surah?.verses}
                                    </motion.span>
                                </AnimatePresence>
                                <span className="text-sm font-medium text-gray-600">
                                    {surah?.simple}
                                </span>
                                <span className="px-2 font-arabic hidden md:block">
                                    ({surah?.arabic})
                                </span>
                                <span className="text-sm font-medium text-gray-600">
                                    {reciter.reciter_name}
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
