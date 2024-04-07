import * as React from 'react';

export type Segment = {section: string; color: string;};

export type SectionedNumberLineProps = {
  start: number;
  segments: Record<number, {section: string; color: string;}>;
  curVal?: number;
}

export function SectionedNumberLine({segments, start, curVal}: SectionedNumberLineProps) {
  const segmentsOrdered = Object.entries(segments)
    .map(([k, {section, color}]) => ({end: parseFloat(k), section, color}))
    .sort((a, b) => a.end - b.end);
  const max = segmentsOrdered[segmentsOrdered.length - 1].end;
  const range = max - start;
  let last = start;
  // https://daisyui.com/components/steps/
  return <div className='flex flex-row'>
    {curVal && (() => {
      const width = 2;
      const left = Math.round(100 * (curVal - start) / range);
      return <div className='absolute' style={{left: `${left}%`, marginLeft: (-1 * (width / 2)) + 'px', width, background: 'black', height: 50}}>
        <div className='absolute text-sm text-center' style={{bottom: -19, width: 50, marginLeft: -25}}>{curVal}</div>
      </div>
    })()}
    {segmentsOrdered.map(({end, section, color}, i) => {
      const startOfSection = last;
      last = end;
      const pctWidth = Math.round(100 * (end - startOfSection) / range);
      return <div style={{width: `${pctWidth}%`}} key={section}>
        <button className={`cursor-default text-center btn-sm ${color}`} style={{width: '100%'}}>
          {startOfSection} to {end}
        </button>
        <div className='text-center text-xs' style={{width: '100%'}}>
          {section}
        </div>
      </div>
    })}
  </div>
}