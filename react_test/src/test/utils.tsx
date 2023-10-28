import React from "react";
import {MemoryRouter, Routes} from "react-router-dom";
import { ImageContext } from '../context/ImageProvider';
import ImageService from '../lib/services/ImageService';
import { SWRConfig } from 'swr/_internal';

export function withRouter(routes: React.ReactNode, pathInfo: string = "/") {
    return (
        <MemoryRouter initialEntries={[pathInfo]}>
            <Routes>
                {routes}
            </Routes>
        </MemoryRouter>
    )
}

export function withContext(children: React.ReactNode, imageService: ImageService) {
    return (
        <ImageContext.Provider value={{imageService}}>
            <SWRConfig value={{ provider: () => new Map() }}>
                {children}
            </SWRConfig>
        </ImageContext.Provider>
    )
}