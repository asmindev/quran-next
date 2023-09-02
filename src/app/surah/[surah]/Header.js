"use client";
import React, { useContext, useEffect } from "react";
import useFetch from "@/services/fetch";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { AudioContext } from "@/components/AudioContext";
import { ModalContext } from "@/components/ModalContext";
import Detail from "./Detail";

export default function Header() {
    const { surah } = useParams();
    const { setSurah, setFirst } = useContext(AudioContext);
    const { setModal, setContent } = useContext(ModalContext);
    const { data, isLoading, isError } = useFetch(`/chapters/${surah}`);
    const nextPage = () => {
        const currentPage = parseInt(surah, 10);
        return currentPage < 114 ? `/surah/${currentPage + 1}` : "/";
    };

    const prevPage = () => {
        const currentPage = parseInt(surah, 10);
        return currentPage > 1 ? `/surah/${currentPage - 1}` : "/";
    };
    useEffect(() => {
        setSurah({
            simple: data?.chapter?.name_simple,
            arabic: data?.chapter?.name_arabic,
            verses: data?.chapter?.verses_count,
        });
    }, [data, setSurah]);
    return (
        <div className="bg-white">
            <div className="w-full p-4 flex justify-center items-center">
                <Link href={prevPage()}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-auto text-gray-500"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                    </svg>
                </Link>
                <div className="flex-1 flex items-center justify-center text-center">
                    {isLoading ? (
                        <div className="flex flex-col items-center">
                            <div className="w-36 h-7 bg-gray-100 animate-pulse rounded-lg"></div>
                        </div>
                    ) : (
                        <div>
                            <h1 className="text-base md:text-lg lg:text-xl font-medium text-gray-700">
                                {data?.chapter?.name_simple}
                            </h1>
                        </div>
                    )}
                </div>
                <Link href={nextPage()}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-auto text-gray-500"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                    </svg>
                </Link>
            </div>
            <div className="p-2 w-full md:w-10/12 mx-auto flex items-center overflow-hidden">
                <div className="flex flex-col md:flex-row w-full h-full justify-between md:items-end">
                    <div className="flex-1 flex justify-between h-full px-2">
                        <div className="flex-1 flex flex-col justify-center">
                            <h1 className="text-base md:text-lg lg:text-xl font-medium text-gray-700">
                                {data?.chapter?.name_simple}
                                <span className="px-2 font-arabic">
                                    ({data?.chapter?.name_arabic})
                                </span>
                            </h1>
                            <h3 className="text-xs md:text-sm text-gray-500">
                                {data?.chapter?.translated_name?.name} -{" "}
                                {data?.chapter?.verses_count} ayat
                            </h3>
                        </div>
                    </div>
                    <div className="w-fit h-full flex items-end p-2 gap-x-4 justify-end">
                        <span className="flex gap-1">
                            <motion.button
                                onClick={() => setFirst(1)}
                                whileTap={{ scale: 0.8 }}
                                className="flex items-center gap-1 text-gray-600"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-auto"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                                    />
                                </svg>
                            </motion.button>
                            <span className="text-gray-600 text-sm">
                                Putar Audio
                            </span>
                        </span>
                        <span className="flex gap-1">
                            <motion.button
                                onClick={() => {
                                    setModal(true);
                                    setContent(<Detail {...data?.chapter} />);
                                }}
                                whileTap={{ scale: 0.8 }}
                                className="flex items-center gap-1 text-gray-600"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-auto"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                                    />
                                </svg>
                            </motion.button>
                            <span className="text-gray-600 text-sm">Info</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
