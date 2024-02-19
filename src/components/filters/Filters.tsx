import React from 'react';
import { FilterIndexKey } from '../../modals/filterTypes';
import './Filters.scss';

interface FiltersProps {
    filters: FilterIndexKey;
    onFilterChange: (filterType: string, value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange  }) => {
    const handleSelectChange = (filterType: string, event: React.ChangeEvent<HTMLSelectElement>) => {
        onFilterChange(filterType, event.target.value);
    };
    return (
        <div className='filters'>
            {Object.keys(filters).map(filterKey => (
                <div key={filterKey} className='filter'>
                    <label>{filters[filterKey].label}</label>
                    <select onChange={(event) => handleSelectChange(filterKey, event)}>
                        {filters[filterKey].options.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
            ))}
        </div>
    )
}

export default Filters