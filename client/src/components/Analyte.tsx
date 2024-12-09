import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

interface AnalyteProps {
  name: string;
  acronym: string;
  minLevel: number;
  maxLevel: number;
  measUnit: string;
  value: string;
  titerMin?: string;
  titerMax?: string;
  type: 'quantitative' | 'qualitative' | 'qualitative_titer';
  expectedRange?: string;
  handleInputChange: (value: string) => void;
}

const Analyte = forwardRef((props: AnalyteProps, ref) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(props.value);
  }, [props.value]);

  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    inputRef,
    selectRef,
    nameRef,
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (props.type === 'quantitative'){
      props.handleInputChange(value);
    }
    else if (props.type === 'qualitative' && selectRef.current) {
      const className = value === props.expectedRange ? 'bg-[#00FF00]' : 'bg-[#FF0000]';
      selectRef.current.className = `text-base sm:w-[4.5rem] sm:h-10 w-16 h-8 absolute rounded-lg text-center top-0 right-0 border border-solid border-[#7F9458] ${className}`;
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && props.type === 'qualitative_titer') {
      const value = e.currentTarget.value;
      setInputValue(value);
      props.handleInputChange(value);

      const [inputNumerator, inputDenominator] = value.split(':').map(Number);
      const [titerMinNumerator, titerMinDenominator] = props.titerMin?.split(':').map(Number) || [NaN, NaN];
      const [titerMaxNumerator, titerMaxDenominator] = props.titerMax?.split(':').map(Number) || [NaN, NaN];

      const inputRatio = inputNumerator / inputDenominator;
      const titerMinRatio = titerMinNumerator / titerMinDenominator;
      const titerMaxRatio = titerMaxNumerator / titerMaxDenominator;

      console.log(inputRatio, titerMinRatio, titerMaxRatio);

      const className = (inputRatio >= titerMaxRatio && inputRatio <= titerMinRatio) ? 'bg-[#00FF00]' : 'bg-[#FF0000]';
      e.currentTarget.className = `text-base sm:w-[4.5rem] sm:h-10 w-16 h-8 absolute rounded-lg text-center top-0 right-0 border border-solid border-[#7F9458] ${className}`;
    }
  };

  return (
    <div
      className={`analyte-container sm:w-56 sm:h-fit px-4 sm:space-y-3 w-48 space-y-2 bg-[#B4C7E7] border-2 border-solid border-[#7F9458] rounded-xl relative`}
    >
      {props.type === 'quantitative' && (
        <input
          type="number"
          ref={inputRef}
          value={inputValue}
          className="text-base sm:w-[4.5rem] sm:h-10 w-16 h-8 absolute rounded-lg text-center top-0 right-0 border border-solid border-[#7F9458]"
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const newInput = (+inputValue).toFixed(2).replace(/^0+(?!\.|$)/, "");

              if (
                isNaN(+event.currentTarget.value) ||
                +event.currentTarget.value < +props.minLevel ||
                +event.currentTarget.value > +props.maxLevel
              ) {
                event.currentTarget.classList.remove("bg-[#00FF00]");
                event.currentTarget.classList.add("bg-[#FF0000]");
              } else {
                event.currentTarget.classList.remove("bg-[#FF0000]");
                event.currentTarget.classList.add("bg-[#00FF00]");
              }

              setInputValue(newInput);
              //props.handleInputChange(event.currentTarget.value);
            }
          }}
         onChange={handleChange}
        />
      )}
      {props.type === 'qualitative' && (
        <select
          ref={selectRef}
          value={inputValue}
          className="text-base sm:w-[4.5rem] sm:h-10 w-16 h-8 absolute rounded-lg text-center top-0 right-0 border border-solid border-[#7F9458]"
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Positive">Positive</option>
          <option value="Negative">Negative</option>
        </select>
      )}
      {props.type === 'qualitative_titer' && (
        <input
          type="text"
          ref={inputRef}
          value={inputValue}
          className="text-base sm:w-[4.5rem] sm:h-10 w-16 h-8 absolute rounded-lg text-center top-0 right-0 border border-solid border-[#7F9458]"
          pattern="^\d+:\d+$"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      )}
      <div
        className="analyte-acronym text-2xl font-semibold"
        dangerouslySetInnerHTML={{ __html: props.acronym }}
        ref={nameRef}
      />
      <div className="ananlyte-desc">
        <div className="analyte-name peer text-base truncate">{props.name}</div>
        <div className="absolute invisible transition-all ease-in delay-100 peer-hover:visible text-white text-sm bg-slate-500 max-sm:text-center border border-solid border-gray-300 rounded-lg p-2">{props.name}</div>
        <div className="analyte-range text-xs">
          Range: {props.minLevel} - {props.maxLevel} {props.measUnit}
        </div>
      </div>
    </div>
  );
});

export default Analyte;