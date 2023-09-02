import React from "react";

export default function Navbar() {
    return (
        <div className="h-screen p-4 w-full overflow-hidden bg-white">
            <div className="h-full flex flex-col gap-2 divide-y">
                <div className="h-1/5 flex items-center justify-center">
                    <h1 className="relative text-3xl font-bold text-gray-800 underline">
                        Qur&apos;an
                    </h1>
                </div>
                <div className="flex-1">
                    <div className="w-full h-full py-4">
                        <button
                            type="button"
                            className="w-full  py-4 rounded-xl border"
                        >
                            Home
                        </button>
                    </div>
                </div>
                <div className="h-[10%] bg-orange-500">
                    <div className="w-full h-full flex items-center justify-center">
                        <button type="button" className="py-3 px-6 text-white">
                            Jadi Sponsor
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
