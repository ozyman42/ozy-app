import * as React from 'react';
import { trpc } from '@/common/front-end/clients/trpc';
import { gql } from '@/common/front-end/clients/graphql';
import { Pencil } from '@/common/front-end/components/icons/Pencil';
import { Trash } from '@/common/front-end/components/icons/Trash';

type Item = {
    steps: number;
    start: string;
    end: string;
    id: string;
}

export function Steps() {
    const [original, setOriginal] = React.useState<Item | undefined>(undefined);
    const [steps, setSteps] = React.useState<number | undefined>(undefined);
    const [startDate, setStartDate] = React.useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = React.useState<Date | undefined>(undefined);
    const [error, setError] = React.useState<string | undefined>(undefined);
    const stepsData = gql.subscribe({
        steps: {
            user_id: true,
            start_time: true,
            end_time: true,
            steps: true
        }
    });

    const modSteps = trpc.modSteps.useMutation();
    const modActive = 
        steps !== undefined &&
        steps > 0 &&
        startDate && endDate &&
        endDate.getTime() > startDate.getTime()
    ;
    const updating = original !== undefined;
    function sanitizeSteps(newSteps: string) {
        const asNum = parseInt(newSteps);
        setSteps(isNaN(asNum) ? undefined : asNum);
    }
    function upDate(date: string, setter: (newD: Date | undefined) => void) {
        const newDate = new Date(date);
        if (newDate.toString() === 'Invalid Date') {
            setter(undefined);
        } else {
            setter(newDate);
        }
    }
    async function maybeModSteps() {
        if (!modActive) return;
        setError(undefined);
        let result: {success: true} | {success: false; error: string;};
        try {
            result = await modSteps.mutateAsync({
                stepCount: steps,
                startTime: startDate.toUTCString(),
                endTime: endDate.toUTCString(),
                id: original?.id,
            });
        } catch (e) {
            const error = e as Error;
            result = {
                success: false,
                error: error.message
            };
        }
        if (result.success) {
            setSteps(undefined);
            setStartDate(undefined);
            setEndDate(undefined);
            setOriginal(undefined);
        } else {
            setError(result.error);
        }
    }
    function clear() {
        if (original) {
            const { steps: originalSteps, start, end } = original;
            setSteps(originalSteps);
            setStartDate(new Date(start));
            setEndDate(new Date(end));
        } else {
            setSteps(undefined);
            setStartDate(undefined);
            setEndDate(undefined);
        }
    }
    function dateToString(d: Date | undefined): string {
        if (d === undefined) return "";
        const adjustedDate = new Date(
            d.getTime() - 
            (60000 * d.getTimezoneOffset())
        );
        const [dayHour, minute] = adjustedDate.toISOString().split(':');
        const result = `${dayHour}:${minute}`;
        return result;
    }
    const timeFrames: Map<number, number> = new Map();
    if (stepsData !== undefined) {
      for (const stepData of stepsData.steps) {
        const start = new Date(stepData.start_time);
        const daysAgo = (Date.now() - start.getTime()) / 1000 / 60 / 60 / 24;
        for (const timeFrame of [1, 7, 30, 90, 365]) {
          if (daysAgo < timeFrame) {
            if (!timeFrames.has(timeFrame)) {
              timeFrames.set(timeFrame, 0);
            }
            timeFrames.set(timeFrame, timeFrames.get(timeFrame)! + stepData.steps);
          }
        }
      }
    }
    return <div>
        <div className='divider my-1'></div>
        <div className='flex flex-row justify-around h-14'>
            <div className='flex flex-col justify-between px-1' style={{width:'30%'}}>
                <input 
                    type="number" 
                    placeholder={'Steps'} 
                    onChange={e => {sanitizeSteps(e.target.value)}}
                    value={steps ?? ""}
                    min={0}
                    className="input input-bordered input-sm h-full w-full"
                />
            </div>
            <div className='flex flex-col justify-around'>
                <div>
                    <input
                        placeholder='Start'
                        type="datetime-local"
                        className='input input-bordered input-xs'
                        value={dateToString(startDate)}
                        onChange={e => {upDate(e.target.value, setStartDate)}}
                    />
                </div>
                <div className='divider my-0 text-xs'>to</div>
                <div>
                    <input
                        placeholder='End'
                        type="datetime-local"
                        className='input input-bordered input-xs'
                        value={dateToString(endDate)}
                        onChange={e => {upDate(e.target.value, setEndDate)}}
                    />
                </div>
            </div>
            <div className='flex flex-col h-full justify-between w-20'>
                <div 
                    className={`w-full btn btn-xs ${modActive ? '' : 'btn-disabled'}`}
                    onClick={() => {maybeModSteps();}}>
                    {updating ? 'Update' : 'Add'}
                </div>
                <div className='w-full btn btn-xs' onClick={() => {clear();}}>
                    {updating ? 'Reset' : 'Clear'}
                </div>
            </div>
        </div>
        {error && <div className='w-full mt-5 flex flex-row justify-around'>
            <div className='text-center mt-4 badge badge-error px-5'>
                {error}
            </div>
        </div>}
        <div className='divider'></div>
        Average steps over the past
        <div className='flex flex-row justify-between'>
          {Array.from(timeFrames.entries()).map(([timeFrame, total]) => {
            const average = Math.floor(total / timeFrame);
            return <div key={timeFrame} className='p-1'>
              <b>{timeFrame} days</b><br />
              {readableNumber(average)}
            </div>
          })}
        </div>
        <div className='divider'></div>
        {stepsData === undefined && 'loading...'}
        {stepsData !== undefined && 
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th>Steps</th>
                <th>Start</th>
                <th>End</th>
              </tr>
            </thead>
            <tbody>
              {stepsData.steps.reverse().map((stepsEntry, i) => {
                return <tr key={i}>
                  <td>
                    <button className="btn btn-circle btn-sm">
                      <Pencil />
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-circle btn-sm">
                      <Trash />
                    </button>
                  </td>
                  <td>{readableNumber(stepsEntry.steps)}</td>
                  <td>{readableDate(new Date(stepsEntry.start_time))}</td>
                  <td>{readableDate(new Date(stepsEntry.end_time))}</td>
                </tr>
              })}
            </tbody>
          </table>
        </div>}  
    </div>
}

function readableNumber(n: number) {
  return n > 1000 ? `${Math.round(n / 100) / 10}k` : n;
}
 
function readableDate(d: Date) {
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear() - 2000} ${d.getHours()}:${d.getMinutes()}`;
}