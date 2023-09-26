// BusinessIdContext.js
import React, { createContext, useContext, useState } from 'react';

const BusinessIdContext = createContext();
const LatiLongiContext = createContext();

export const useBusinessId = () => {
    return useContext(BusinessIdContext);
}

export const useLatiLongi = () => {
    return useContext(LatiLongiContext);
}

export const BusinessIdProvider = ({ children }) => {
    const [businessId, setBusinessId] = useState(null);

    return (
        <BusinessIdContext.Provider value={{ businessId, setBusinessId }}>
            {children}
        </BusinessIdContext.Provider>
    )
}

export const LatiLongidProvider = ({ children }) => {
    const [lati, setLati] = useState(null);
    const [longi, setLongi] = useState(null);

    return (
               
        <LatiLongiContext.Provider value={{  lati, setLati, longi, setLongi }}>
            {children}
        </LatiLongiContext.Provider>
     
    )
}
