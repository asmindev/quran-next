import React from "react";
import Link from "next/link";

export default function Footer() {
    return (
        <div className="w-ful bg-gray-100 p-2 md:p-4">
            <div className="md:w-11/12 mx-auto">
                <h1 className=" my-2 text-gray-800 text-4xl font-bold">
                    Quran
                </h1>
                <div className="md:flex gap-4 ">
                    <div className="w-full md:w-2/4">
                        <h1 className="text-xl font-medium text-gray-700">
                            Tentang
                        </h1>
                        <span className="my-2 block text-gray-600 text-sm text-justify">
                            <p>
                                Quran adalah Shadaqah Jariyah. Kami berharap
                                dapat memberikan kemudahan bagi semua orang
                                untuk membaca, mempelajari, dan mempelajari
                                Al-Quran yang Mulia. Al-Quran Mulia memiliki
                                banyak nama diantaranya Al-Quran Al-Kareem,
                                Al-Ketab, Al-Furqan, Al-Maw&lsquo;itha,
                                Al-Thikr, dan Al-Noor.
                            </p>
                        </span>
                    </div>
                    <div className="flex-1 flex gap-2">
                        <div>
                            <h1 className="text-xl font-medium text-gray-700">
                                Jaringan
                            </h1>
                            <ul className=" my-2 text-gray-600 text-sm">
                                <li>
                                    <a
                                        href="https://quran.com/"
                                        target="_blank"
                                        className="hover:text-orange-400"
                                    >
                                        Quran.com
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://quran.com/developers"
                                        target="_blank"
                                        className="hover:text-orange-400"
                                    >
                                        Quran.com API
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="h-12"></div>
                </div>
            </div>
        </div>
    );
}
