"use client";

import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { ModalContext } from "@/components/ModalContext";
import useFetch from "@/services/fetch";

export default function Detail(props) {
    const { setContent } = useContext(ModalContext);

    const { data, isLoadinng } = useFetch(`chapters/${props.id}/info`);

    useEffect(() => {
        if (window) {
            const handleEscKey = (e) => {
                if (e.key === "Escape") {
                    setContent(null);
                }
            };
            window.addEventListener("keydown", handleEscKey);
        }
    });
    return (
        <div className="w-full h-full flex justify-center items-end md:items-center">
            <div className="w-full md:w-1/2 mx-auto bg-white rounded-t-xl md:rounded-xl border">
                <div className="w-full flex justify-center mt-1 mb-4">
                    <motion.button
                        onClick={() => {
                            setContent(null);
                        }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-[3px] bg-gray-300 rounded"
                    ></motion.button>
                </div>
                <div className="w-full p-4">
                    <div className="w-full flex justify-between">
                        <div className="">
                            <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-gray-700">
                                {props.name_simple}
                            </h1>
                            <h3 className="text-xs text-gray-500">
                                {props.translated_name.name} -{" "}
                                {props.revelation_place}
                            </h3>
                        </div>
                    </div>
                    <div className="my-4 overflow-auto max-h-80">
                        <h3 className="text-lg font-bold text-gray-600">
                            Deskripsi Singkat
                        </h3>
                        <p className="text-sm text-gray-600 text-justify">
                            {data?.chapter_info.short_text}
                        </p>
                        <div className="mt-4">
                            <h3 className="text-lg font-bold text-gray-600">
                                Deskripsi Full
                            </h3>
                            <div
                                className="text-sm text-gray-600 text-justify"
                                dangerouslySetInnerHTML={{
                                    __html: data?.chapter_info.text,
                                }}
                            />
                        </div>
                    </div>
                    <span className="text-sm text-gray-600">
                        Sumber: {data?.chapter_info.source}
                    </span>
                </div>
            </div>
        </div>
    );
}
