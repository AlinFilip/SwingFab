import React, { useState } from 'react';
import { XIcon } from './Icons';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Checkbox: React.FC<{ label: string }> = ({ label }) => {
    const [checked, setChecked] = useState(false);
    const id = `checkbox-${label.replace(/\s+/g, '-')}`;
    return (
        <div className="flex items-center">
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={() => setChecked(!checked)}
                className="h-4 w-4 rounded bg-slate-700 border-slate-600 text-brand-primary focus:ring-brand-primary"
            />
            <label htmlFor={id} className="ml-3 text-sm font-medium text-brand-text">
                {label}
            </label>
        </div>
    );
};

const RangeSlider: React.FC<{ label: string; min: number; max: number; value: number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; unit: string }> = ({ label, min, max, value, onChange, unit }) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-brand-text">{label}</label>
                <span className="text-sm font-bold text-brand-primary">{`${value}${unit}`}</span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={onChange}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-primary"
            />
        </div>
    );
};


const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose }) => {
  const [age, setAge] = useState(35);
  const [distance, setDistance] = useState(50);
    
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="filter-modal-title"
    >
      <div
        className="bg-brand-surface w-full max-w-md rounded-2xl shadow-2xl shadow-black/50 flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 id="filter-modal-title" className="text-lg font-semibold text-white">More Filters</h2>
          <button onClick={onClose} className="p-2 text-brand-text-muted hover:text-white hover:bg-slate-700/50 rounded-full">
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto">
          <div>
            <h3 className="text-base font-semibold text-white mb-3">I'm interested in</h3>
            <div className="grid grid-cols-2 gap-3">
                <Checkbox label="Single Men" />
                <Checkbox label="Single Women" />
                <Checkbox label="Couples (MF)" />
                <Checkbox label="Couples (FF)" />
                <Checkbox label="Couples (MM)" />
                <Checkbox label="Groups" />
            </div>
          </div>

          <RangeSlider label="Age" min={18} max={99} value={age} onChange={(e) => setAge(Number(e.target.value))} unit="" />
          <RangeSlider label="Distance" min={5} max={500} value={distance} onChange={(e) => setDistance(Number(e.target.value))} unit=" miles" />
        
          <div>
              <label htmlFor="location" className="block text-sm font-medium text-brand-text mb-1">Location</label>
              <input type="text" id="location" placeholder="Enter city or zip code" className="w-full bg-brand-bg border border-slate-700 rounded-lg py-2 px-3 text-brand-text placeholder-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"/>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-900/50 border-t border-slate-700 rounded-b-2xl">
            <button className="px-4 py-2 text-sm font-semibold rounded-full text-brand-text-muted hover:text-white transition-colors">
                Reset
            </button>
            <button onClick={onClose} className="px-6 py-2 text-sm font-bold rounded-full bg-brand-primary text-white hover:bg-opacity-90 transition-opacity">
                Apply Filters
            </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
