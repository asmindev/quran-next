"use client";
import React, { useContext, useRef, useEffect } from "react";
import Action from "./Action";

import { AudioContext } from "@/components/AudioContext";

const ArabText = ({ word }) => {
    const { ayah, segment } = useContext(AudioContext);

    return (
        <div
            className={`font-medium my-2 text-xl md:text-2xl lg:text-4xl hover:text-orange-500 transition-all duration-300 ${
                ayah === word.verse_key && segment === word.segment
                    ? "text-orange-500"
                    : "text-gray-600"
            }`}
        >
            {word.text_uthmani}
        </div>
    );
};

export default function Verse({ item }) {
    const { ayah } = useContext(AudioContext);

    const translation = item.words.map((word) => {
        if (word.char_type_name === "word") {
            return word.translation.text;
        }
    });

    const activeRef = useRef(null);
    // update word

    item.words.map((word) => {
        // update word with audio
        if (word.char_type_name === "word") {
            word.segment = item.audio.segments[word.position - 1];
            word.verse_key = item.verse_key;
        }
        return word;
    });
    const finalText = translation.join(" ").trim();
    useEffect(() => {
        if (ayah === item.verse_key) {
            activeRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [ayah, item.verse_key]);
    return (
        <div
            ref={activeRef}
            id={item.verse_key}
            className="w-full p-2 md:pb-4 px-4 hover:bg-gray-50"
        >
            <div className="w-full flex text-xs text-gray-400 gap-x-2">
                <span className="bg-orange-50 text-orange-500 px-3 py-1">
                    {item.verse_number}
                </span>
                <span className="bg-orange-50 text-orange-500 px-3 py-1">
                    {item.verse_key}
                </span>
            </div>
            <div className="w-full pt-8">
                <div
                    dir="rtl"
                    className="flex flex-wrap w-full gap-x-[1px] rtl:text-right font-arabic"
                >
                    {item.words.map(
                        (word, index) =>
                            word.char_type_name === "word" && (
                                <ArabText
                                    word={word}
                                    key={`${item.verse_key}-${index}`}
                                />
                            )
                    )}
                </div>
                <div className="w-fit flex overflow-hidden gap-x-2 mt-4 md:mt-8 lg:mt-12">
                    <p className="text-sm text-gray-500 first-letter:uppercase text-justify">
                        {finalText}
                    </p>
                </div>
            </div>
            <Action item={item} />
        </div>
    );
}
