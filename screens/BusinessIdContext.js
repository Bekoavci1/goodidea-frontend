// BusinessIdContext.js
import React, { createContext, useContext, useState } from 'react';

const BusinessIdContext = createContext();

export const useBusinessId = () => {
    return useContext(BusinessIdContext);
}

export const BusinessIdProvider = ({ children }) => {
    const [businessId, setBusinessId] = useState(null);

    return (
        <BusinessIdContext.Provider value={{ businessId, setBusinessId }}>
            {children}
        </BusinessIdContext.Provider>
    )
}
