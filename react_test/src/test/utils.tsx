import React from "react";
import {MemoryRouter, Routes} from "react-router-dom";

export function withRouter(routes: React.ReactNode, pathInfo: string = "/") {
    return (
        <MemoryRouter initialEntries={[pathInfo]}>
            <Routes>
                {routes}
            </Routes>
        </MemoryRouter>
    )
}