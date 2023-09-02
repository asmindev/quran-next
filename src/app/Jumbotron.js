"use client";
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ModalContext } from "@/components/ModalContext";
import Image from "next/image";
import Link from "next/link";
import useSearch from "@/services/search";
const ModalSearch = () => {
    const { setContent } = useContext(ModalContext);
    const [query, setQuery] = useState("");
    const searchResult = useSearch(query);
    useEffect(() => {
        if (window) {
            const handleEscKey = (e) => {
                if (e.key === "Escape") {
                    setContent(null);
                }
            };
            window.addEventListener("keydown", handleEscKey);
        }
        console.log({ searchResult });
    }, [searchResult]);
    return (
        <div className="w-full min-h-full flex items-center justify-center">
            <div className="w-10/12 md:w-6/12 lg:w-2/5 mx-auto bg-white border rounded-xl overflow-hidden">
                <div className="w-full flex justify-center">
                    <motion.button
                        onClick={() => setContent(null)}
                        type="button"
                        className="bg-gray-600 w-24 h-[2px] rounded mt-1"
                    />
                </div>
                <div className="px-3 py-2">
                    <div className="w-full flex items-center border-b text-gray-500 py-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-auto"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Cari yang mau kamu baca"
                            type="text"
                            className="w-full focus:outline-none text-xl px-2"
                        />
                    </div>
                </div>
                <div className="divide-y h-96 overflow-auto">
                    {searchResult.length ? (
                        searchResult.map((item) => (
                            <Link href={`/surah/${item.id}`} key={item.id}>
                                <div
                                    key={item.id}
                                    className="px-4 py-3 hover:bg-gray-100 flex gap-2 group text-gray-400  transition-all duration-200"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                        />
                                    </svg>

                                    <span className="group-hover:text-orange-500">
                                        {item.name_simple}
                                    </span>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <span className="text-2xl text-gray-400">Cari</span>
                        </div>
                    )}
                </div>
                <div className="w-full flex justify-end px-3 py-2 bg-gray-50">
                    <span className="text-sm text-gray-600">Powered by Me</span>
                </div>
            </div>
        </div>
    );
};
export default function Jumbotron() {
    const { setContent } = useContext(ModalContext);
    return (
        <div className="relative w-full h-80 lg:h-96 object-fill object-center bg-[url('https://img.freepik.com/free-vector/mandala-illustration_53876-80591.jpg?w=1380&t=st=1692742279~hmac=b6626a47c72c77f636938bcea690329dde14ebf38b0beb1e57a62737c0bfc593')] before:absolute before:w-full before:h-full before:bg-orange-500 before:top-0 before:opacity-3 before:mix-blend-multiply">
            <div className="relative w-full h-full p-4">
                <div className="w-full h-full flex items-center justify-center">
                    <div className="w-10/12 md:w-8/12">
                        <div className="w-fit mx-auto">
                            <Image
                                className="w-96 h-auto"
                                src="https://www.freepnglogos.com/uploads/bismillah-png/bismillah-png-images-download-bismillah-cdr-files-9.png"
                                width={1800}
                                height={900}
                                alt="calligraphy"
                            />
                        </div>
                        <div className="w-10/12 md:w-1/2 mx-auto mt-4 text-gray-500 hover:text-gray-700 transition-all duration-300">
                            <button
                                onClick={() =>
                                    setContent(
                                        <ModalSearch setContent={setContent} />
                                    )
                                }
                                type="button"
                                className="w-full py-5 rounded-full px-4 bg-white text-left flex gap-4 shadow-xl"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                    />
                                </svg>
                                <span>Apa yang kamu cari?</span>
                            </button>
                        </div>
                        <div className="flex w-fit mx-auto mt-4 gap-2">
                            <Link
                                href="/surah/113"
                                className="py-2 px-3 rounded-full bg-gray-100 text-gray-600 flex gap-2 text-xs"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-3"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>

                                <span>Al Falaq</span>
                            </Link>
                            <Link
                                href="/surah/112"
                                className="py-2 px-3 rounded-full bg-gray-100 text-gray-600 flex gap-2 text-xs"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-3 h-auto"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                    />
                                </svg>
                                <span>Al Ikhlas</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
