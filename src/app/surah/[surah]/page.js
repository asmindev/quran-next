import React from "react";
import Link from "next/link";
import Wrapper from "@/components/Wrapper";
import Topbar from "@/components/Topbar";
import Content from "./Content";
import Header from "./Header";
import AudioController from "./AudioController";

export default function Surah({ params }) {
    return (
        <Wrapper>
            <Header />
            <div className="w-full min-h-screen p-0 md:p-2 lg:p-4">
                <Content surah={params.surah} />
            </div>
            <div className="w-full mt-4 text-sm text-gray-600 pb-4">
                <div className="w-2/3 md:w-1/3 flex justify-center gap-4 mx-auto">
                    <a
                        href="#top-surah"
                        className="w-fit border border-gray-400 py-2 px-3"
                    >
                        <span>Awal Surah</span>
                    </a>
                    <div className="w-fit border border-gray-400 py-2 px-3">
                        <Link href={`/surah/${parseInt(params.surah, 10) + 1}`}>
                            Selanjutnya
                        </Link>
                    </div>
                </div>
            </div>
            <div className="w-full sticky bottom-12 md:bottom-0">
                <AudioController />
            </div>
        </Wrapper>
    );
}
