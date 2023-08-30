"use client";
import React, { useEffect, useContext, useState } from "react";
import { useInView } from "react-intersection-observer";
import Verse from "./Verse";
import { AudioContext } from "@/components/AudioContext";

// Di luar komponen
const apiBaseUrl = process.env.NEXT_PUBLIC_QURAN_API;

const Skeleton = () => (
    <div className="w-full bg-white flex flex-col items-end gap-2 p-4">
        <div className="w-full h-12 animate-pulse bg-gray-200 rounded"></div>
        <div className="w-1/4 h-12 animate-pulse bg-gray-200 rounded"></div>
        <div className="mt-4 w-full h-6 animate-pulse bg-gray-200 rounded"></div>
    </div>
);

// Di dalam komponen
export default function Content({ surah }) {
    const [hasNextPage, setHasNextPage] = useState(false);
    const [verses, setVerses] = useState([]);
    const { ref, inView } = useInView({
        threshold: 0,
    });
    const { setListAudio } = useContext(AudioContext);
    const [pagination, setPagination] = useState([]);

    const fetchVerses = async (page = 1) => {
        const params = {
            words: true,
            translations: "en-sahih-international",
            audio: 5,
            word_fields: "text_uthmani",
            page,
            language: "id",
        };

        const res = await fetch(
            `${apiBaseUrl}/verses/by_chapter/${surah}?${new URLSearchParams(
                params
            ).toString()}`
        );

        const data = await res.json();
        setVerses((prev) => [...prev, ...data.verses]);
        const audio = data.verses.map((item) => ({
            audio: item.audio,
            verse_key: item.verse_key,
            verse_number: item.verse_number,
        }));
        setListAudio((prev) => [...prev, ...audio]);
        setPagination(data.pagination);
        if (data.pagination.next_page) {
            setHasNextPage(true);
        } else {
            setHasNextPage(false);
        }
    };

    useEffect(() => {
        if (!pagination?.current_page) {
            fetchVerses();
        }
        if (inView && hasNextPage) {
            const nextPage = pagination.current_page + 1;
            fetchVerses(nextPage);
        }
    }, [inView, hasNextPage, verses, pagination]);

    return (
        <div
            id="top-surah"
            className="w-full bg-white divide-y rounded-none md:rounded-xl overflow-hidden"
        >
            {verses.length
                ? verses.map((item) => <Verse item={item} key={item.id} />)
                : Array(5)
                      .fill(0)
                      .map((_, index) => <Skeleton key={index} />)}
            {hasNextPage && (
                <div ref={ref} className="w-full divide-y">
                    {Array(3)
                        .fill(0)
                        .map((_, index) => (
                            <Skeleton key={index} />
                        ))}
                </div>
            )}
        </div>
    );
}
