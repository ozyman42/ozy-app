import * as React from 'react';

type CheckList = {
  title: string;
  checks: Record<string, boolean>;
}

export function Listening() {
  const [checklist, setChecklist] = React.useState<CheckList[]>([
    {
      title: 'Personal Checklist',
      checks: {
        "Be Patient": false,
        "Ask How They're Feeling": false,
        "Ask What I did to make them feel that way": false,
        "Ask What I can do in the moment": false,
        "Ask What they want me to change": false,
        "If disagree with change or perception, don't invalidate their emotion, be open minded to their truth": false,
        "Repeat back what they said": false
      }
    },
    {
      title: 'GIVE',
      checks: {
        "Gentle: be courteous and temperate; no attacks threats, judging": false,
        "Interested: listen; be interested in them": false,
        "Validate: validate the person's feelings, wants, difficulties and opinions": false,
        "Easy manner: use humor; smile; be diplomatic; soft sell over hard sell": false
      }
    },
    {
      title: "Assertive (both people's needs)",
      checks: {
        "Listens Without Interruption": false,
        "Willing to compromise": false,
        "Good Eye Contact": false,
        "Stands up for own rights": false
      }
    }
  ]);
  function updateCheck(idx: number, check: string) {
    const newChecklist = [...checklist];
    const old = checklist[idx];
    newChecklist[idx] = {
      ...old,
      checks: {
        ...old.checks,
        [check]: !old.checks[check]
      }
    };
    setChecklist(newChecklist);
  };
  return <div className='h-full'>
    <div>
      {
        checklist.map((cl, idx) => {
          return <div key={idx} className='mb-5'>
            <b>{cl.title}</b>
            <br />
            <table cellPadding={2}><tbody>
              {
                Object.entries(cl.checks).map(([desc, checked]) => 
                  <tr key={desc}>
                    <td>
                      <input type='checkbox' checked={checked} 
                      onClick={() => { updateCheck(idx, desc) }} />
                    </td>
                    <td>{desc}</td> 
                  </tr>
                )
              }
            </tbody></table>
          </div>
        })
      }
    </div>
  </div>
}
