import React, {createContext, ReactNode, useContext, useState} from 'react';

interface CardContextType {
    isFlipped: boolean;
    toggleFlip: () => void;
}

interface CardProviderProps {
    children: ReactNode;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

const useCardContext = () => {
    const context = useContext(CardContext);

    if (!context) {
        throw new Error('useCardContext must be used within a CardProvider');
    }

    return context;
}

const CardProvider = ({children}: CardProviderProps) => {
    const [isFlipped, setIsFlipped] = useState<boolean>(true);

    const toggleFlip = () => {
        setIsFlipped(!isFlipped);
    }

    return (
        <CardContext.Provider value={{isFlipped, toggleFlip}}>
            {children}
        </CardContext.Provider>
    )
}

export {CardProvider, useCardContext};