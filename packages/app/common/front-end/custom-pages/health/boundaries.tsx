export function Boundaries() {
  const boundaries = {
    'Alcohol': 'Two drinks per month and only on vacation or my birthday',
    'Fast food': 'Once per month',
    'Dates': 'Two per week',
    'Dance Socials': 'Three per week',
    'Calories': '1000 per day while on a cut',
    'Weight': '133 pounds with clothes off'
  }
  return <div>
    <table>
      {Object.entries(boundaries).map(
        ([category, boundary], i) => <tr key={i}>
          <th>{category}</th>
          <td>{boundary}</td>
        </tr>
      )}
    </table>
  </div>
}