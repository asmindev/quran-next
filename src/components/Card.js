import React from "react";

export default function Card({ number, name, verseCount }) {
    return (
        <div className="w-full h-full bg-white rounded-xl p-3 flex gap-2 overflow-hidden">
            <div className="w-8">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    id="octagon"
                    className="w-full h-auto text-gray-300 stroke-orange-300 fill-none"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="10"
                        d="M164.45079,32H91.54921a8,8,0,0,0-5.65686,2.34315l-51.5492,51.5492A8,8,0,0,0,32,91.54921v72.90158a8,8,0,0,0,2.34315,5.65686l51.5492,51.5492A8,8,0,0,0,91.54921,224h72.90158a8,8,0,0,0,5.65686-2.34315l51.5492-51.5492A8,8,0,0,0,224,164.45079V91.54921a8,8,0,0,0-2.34315-5.65686l-51.5492-51.5492A8,8,0,0,0,164.45079,32Z"
                    ></path>
                    <text
                        x="50%"
                        y="52%"
                        textAnchor="middle"
                        dy=".3em"
                        className="fill-orange-400 text-8xl"
                    >
                        {number}
                    </text>
                </svg>
            </div>
            <div className="flex-1">
                <div className="flex justify-between">
                    <h1 className="text-md text-gray-600">{name.simple}</h1>
                    <h2 className="text-md text-orange-400 font-arabic">
                        {name.arab}
                    </h2>
                </div>
                <div className="flex justify-between">
                    <p className="text-xs text-gray-400">{name.translation}</p>
                    <p className="text-xs text-gray-400">{verseCount} Ayat</p>
                </div>
            </div>
        </div>
    );
}
