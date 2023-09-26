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

