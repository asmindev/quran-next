"use client";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ModalContext } from "@/components/ModalContext";
const ModalSearch = () => {
    const { setContent } = useContext(ModalContext);
    return (
        <div className="w-full min-h-[50%] flex items-center justify-center">
            <div className="w-10/12 md:w-6/12 lg:w-2/5 mx-auto bg-white border rounded-xl">
                <div className="w-full flex justify-center">
                    <motion.button
                        onClick={() => setContent(null)}
                        type="button"
                        className="bg-gray-600 w-24 h-[2px] rounded mt-1"
                    />
                </div>
                <div className="p-3">
                    <div className="w-full flex items-center border-b text-gray-500 py-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-8 h-auto"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                        <input
                            placeholder="Cari yang mau kamu baca"
                            type="text"
                            className="w-full focus:outline-none text-xl px-2"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default function Jumbotron() {
    const { setContent } = useContext(ModalContext);
    return (
        <div className="relative w-full h-80 lg:h-96 object-fill object-center bg-[url('https://img.freepik.com/free-vector/mandala-illustration_53876-80591.jpg?w=1380&t=st=1692742279~hmac=b6626a47c72c77f636938bcea690329dde14ebf38b0beb1e57a62737c0bfc593')] before:absolute before:w-full before:h-full before:bg-orange-500 before:top-0 before:opacity-80 before:mix-blend-multiply">
            <div className="relative w-full h-full p-4">
                <div className="w-full h-full flex items-center justify-center">
                    <div className="w-10/12 md:w-8/12">
                        <h1 className="text-4xl lg:text-6xl text-gray-600 font-bold text-center">
                            Quran App
                        </h1>
                        <div className="mt-4 text-gray-500 hover:text-gray-700 transition-all duration-300">
                            <button
                                onClick={() =>
                                    setContent(
                                        <ModalSearch setContent={setContent} />
                                    )
                                }
                                type="button"
                                className="w-full py-5 rounded-full px-4 bg-white text-left flex gap-4"
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
                    </div>
                </div>
            </div>
        </div>
    );
}
