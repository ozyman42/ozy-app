import * as React from 'react';
import { SectionedNumberLine, Segment } from '@/common/front-end/components/SectionedNumberLine';

const birthday = new Date('05/28/1996'); // TODO: move to db
const now = new Date();
let age = now.getFullYear() - birthday.getFullYear();
if (now.getMonth() < birthday.getMonth() || (now.getMonth() === birthday.getMonth() && now.getDate() < birthday.getDate())) {
  age--;
}
const defaultAge = age;

type NumSliderProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  display?: (value: number) => string;
  increment?: number;
}

function NumSlder({label, value, onChange, min, max, display, increment}: NumSliderProps) {
  const finalDisplay = display ?? ((num: number) => num + "");
  const finalIncrement = increment ?? 1;
  return <div>
    <div>
      {label}: {finalDisplay(value)}
      <button className="btn-sm btn-primary" onClick={() => {onChange(value-finalIncrement)}}>-</button>
      <button className="btn-sm btn-primary" onClick={() => {onChange(value+finalIncrement)}}>+</button>
    </div>
    <div>
      <input type="range" min={min} max={max} value={value} className="range" onChange={e => { onChange(e.target.valueAsNumber) }} />
    </div>
  </div>
}

function getBMI(lbs: number, inches: number) {
  // https://www.cdc.gov/healthyweight/assessing/bmi/childrens_BMI/childrens_BMI_formula.html
  return 703 * lbs / (inches * inches);
}

const Segments: Record<number, Segment> = {
  18.5: {section: 'Underweight', color: 'bg-accent'},
  24.9: {section: 'Normal', color: 'bg-info'},
  30: {section: 'Overweight', color: 'bg-accent'},
  35: {section: 'Obese', color: 'bg-error'}
};

function getCategory(bmi: number): string {
  const sortedSegments = Object.keys(Segments).map(parseFloat).sort();
  for (const upperBound of sortedSegments) {
    if (bmi < upperBound) {
      return Segments[upperBound].section;
    }
  }
  return 'off the charts';
}

export function BodyComp() {
  const [age, setAge] = React.useState(defaultAge);
  const [weight, setWeight] = React.useState(135);
  const [height, setHeight] = React.useState(5 * 12 + 6.5);

  function heightDisplay(inches: number): string {
    const feet = Math.floor(inches / 12);
    return `${feet}' ${inches % 12}"`;
  }

  const bmi = Math.round(getBMI(weight, height) * 100) / 100;

  return <div>
    <h1>BMI</h1>
    <NumSlder label='Age' value={age} onChange={setAge} min={0} max={100} />
    <NumSlder label='Height' value={height} onChange={setHeight} min={0} max={7 * 12} increment={0.5} display={heightDisplay} />
    <NumSlder label='Weight' value={weight} onChange={setWeight} min={100} max={200} display={lbs => `${lbs}lbs`} />
    <div>
      BMI: {bmi}; {getCategory(bmi)}
    </div>
    <SectionedNumberLine
      start={12}
      segments={Segments}
      curVal={bmi}
    />
  </div>
}
