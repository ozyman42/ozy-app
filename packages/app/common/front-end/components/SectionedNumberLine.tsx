import * as React from 'react';

export type Segment = {section: string; color: string;};

export type SectionedNumberLineProps = {
  start: number;
  segments: Record<number, {section: string; color: string;}>;
  curVal?: number;
}

const Point = (props: {val: number; range: number; start: number; above: boolean}) => {
  const width = 2;
  const left = Math.round(100 * (props.val - props.start) / props.range);
  return <div className='absolute' style={{left: `${left}%`, marginLeft: (-1 * (width / 2)) + 'px', width, background: 'black', opacity: props.above ? 1 : '0.5', height: 50, top: props.above ? -18 : 0}}>
    <div className='absolute text-sm text-center' style={{bottom: props.above ? 50 : -19, width: 50, marginLeft: -25}}>{props.val}</div>
  </div>
}

export function SectionedNumberLine({segments, start, curVal}: SectionedNumberLineProps) {
  const segmentsOrdered = Object.entries(segments)
    .map(([k, {section, color}]) => ({end: parseFloat(k), section, color}))
    .sort((a, b) => a.end - b.end);
  const max = segmentsOrdered[segmentsOrdered.length - 1].end;
  const range = max - start;
  let last = start;
  // https://daisyui.com/components/steps/
  return <div className='flex flex-row relative mt-10 justify-between'>
    {curVal && <Point val={curVal} range={range} start={start} above={true} />}
    {segmentsOrdered.map(({end, section, color}, i) => {
      const startOfSection = last;
      last = end;
      const pctWidth = 100 * (end - startOfSection) / range;
      return <>
        <div style={{width: `${pctWidth}%`}} key={section} className='align-top'>
          <button className={`cursor-default text-center btn-sm text-xs ${color}`} style={{width: '100%'}}>
          {section}
          </button>
          <div className='text-center text-xs' style={{width: '100%'}}>
            
          </div>
        </div>
        {i + 1 < segmentsOrdered.length && <Point val={end} start={start} range={range} above={false} />}
      </>
    })}
  </div>
}