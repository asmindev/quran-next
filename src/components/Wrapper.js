"use client";

import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { QuranProvider } from "@/components/QuranContext";
import { ModalProvider } from "@/components/ModalContext";
import { AudioProvider } from "./AudioContext";
import ModalLayout from "./ModalLayout";
import BottomBar from "./BottomBar";
import Footer from "./Footer";
export default function Wrapper({ children }) {
    return (
        <ModalProvider>
            <AudioProvider>
                <QuranProvider>
                    <main className="w-full flex flex-col md:flex-row items-start divide-x">
                        <ModalLayout />
                        <nav className="hidden md:block w-0 md:w-1/4 lg:w-1/5 sticky left-0 top-0 z-50 overflow-hidden">
                            <Navbar />
                        </nav>
                        <div className="w-full flex flex-col divide-y">
                            <AnimatePresence mode="wait">
                                <motion.section
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1 }}
                                    className="w-full flex-1 min-h-screen"
                                >
                                    {children}
                                </motion.section>
                            </AnimatePresence>
                            <footer>
                                <Footer />
                            </footer>
                        </div>

                        <nav className="fixed bottom-0 w-full md:hidden ">
                            <BottomBar />
                        </nav>
                    </main>
                </QuranProvider>
            </AudioProvider>
        </ModalProvider>
    );
}
