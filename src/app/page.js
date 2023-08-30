import React from "react";
import Wrapper from "@/components/Wrapper";
import Jumbotron from "./Jumbotron";
import Content from "./Content";
import Topbar from "@/components/Topbar";

export default function Home() {
    return (
        <Wrapper>
            {/* <Topbar /> */}
            <div className="w-full">
                <Jumbotron />
            </div>
            <div className="lg:w-3/4 my-4 p-4">
                <Content />
            </div>
        </Wrapper>
    );
}
