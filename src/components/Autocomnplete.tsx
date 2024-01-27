import React, { useState, useRef, useCallback, useMemo, useLayoutEffect } from 'react';
import './Autocomplete.scss';
import { FaCheck, FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface Hobby {
    id: number;
    name: string;
}

interface AutocompleteProps {
    items: Hobby[];
    value: number | null;
    setValue: (value: number | null) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ items, value, setValue }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isInputClicked, setIsInputClicked] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const suggestions = useMemo(() => {
        if (isInputClicked) {
            return items.filter(
                (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        } else {
            return [];
        }
    }, [items, searchTerm, isInputClicked]);

    useLayoutEffect(() => {
        const handleDocumentClick = (event: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setIsInputClicked(false);
            }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [inputRef]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(null);
        setSearchTerm(event.target.value);
    };

    const handleInputClick = () => {
        setIsInputClicked(true);
    };

    const handleSuggestionClick = useCallback(
        (suggestion: Hobby) => {
            setSearchTerm(suggestion.name);
            setValue(suggestion.id);
            setIsInputClicked(false);
        },
        [setValue]
    );

    return (
        <div className={`autocomplete-container ${isInputClicked ? 'active' : ''}`}>
            <div className={'input-with-icon'}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onClick={handleInputClick}
                    placeholder="Type to search..."
                    className="autocomplete-input"
                    ref={inputRef}
                />
                {isInputClicked ? (
                    <FaChevronUp className={'icon'} />
                ) : (
                    <FaChevronDown className={'icon'} />
                )}
            </div>
            {isInputClicked && (
                <ul className="suggestions-list">
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion.id}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className={`suggestion-item ${value === suggestion.id ? 'selected' : ''}`}
                        >
                            {suggestion.name}
                            {value === suggestion.id && <FaCheck />}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Autocomplete;
