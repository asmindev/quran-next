"use client";
import React, { useEffect, useContext } from "react";
import Card from "@/components/Card";
import { motion, AnimatePresence } from "framer-motion";
import { QuranContext } from "@/components/QuranContext";
import Link from "next/link";

import useFetch from "@/services/fetch";
export default function Content() {
    const { quran, setQuran } = useContext(QuranContext);

    const { data, isLoading, isError } = useFetch(`/chapters`);

    useEffect(() => {
        if (data?.chapters) {
            setQuran(data.chapters);
        }
    }, [data, setQuran]);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <AnimatePresence>
                {isLoading
                    ? Array(20)
                          .fill(0)
                          .map((_, index) => (
                              // skeleton
                              <div key={index} className="animate-pulse">
                                  <div className="w-full h-16 rounded-xl bg-gray-200 p-3">
                                      <div className="w-1/2 h-4 bg-gray-100 rounded-md"></div>
                                      <div className="w-1/3 h-3 my-2 bg-gray-100 rounded"></div>
                                  </div>
                              </div>
                          ))
                    : quran?.map((item) => (
                          <motion.div
                              initial={{ opacity: 0, y: -100 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -100 }}
                              key={item.id}
                              layoutId={item.id}
                          >
                              <Link href={`/surah/${item.id}`}>
                                  <Card
                                      number={item.id}
                                      name={{
                                          arab: item.name_arabic,
                                          complex: item.name_complex,
                                          simple: item.name_simple,
                                          translation:
                                              item.translated_name.name,
                                      }}
                                      verseCount={item.verses_count}
                                  />
                              </Link>
                          </motion.div>
                      ))}
            </AnimatePresence>
        </div>
    );
}
