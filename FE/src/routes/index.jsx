import { default as React, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import DetailCard from "../pages/cards/detail-card/DetailCard";
import EditCard from "../pages/cards/edit-card/EditCard";
import HomePage from "../pages/home-pages/HomePage";

export function MainRoutes() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route exact path="/" element=<HomePage /> />
                <Route exact path="/edit-card/:id" element=<EditCard /> />
                <Route exact path="/detail-card/:id" element=<DetailCard /> />
            </Routes>{" "}
        </Suspense>
    );
}