import React from "react";
import "../styles/difficulty-selector.css";

interface DifficultySelectorProps {
    difficulties: string[];
    level: string;
    handleChange: (level: string) => void;
}

export default function DifficultySelector({difficulties, level, handleChange}: DifficultySelectorProps) {

    return (
        <div>
            <div className="difficulty-buttons">
                {difficulties.map((difficulty) => (
                    <button
                        key={difficulty}
                        className={`difficulty-button ${level === difficulty ? 'selected' : ''}`}
                        onClick={() => handleChange(difficulty)}>
                        {difficulty}
                    </button>
                ))}
            </div>
        </div>
    )
}