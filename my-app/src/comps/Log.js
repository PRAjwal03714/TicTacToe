export default function Log({ turn }) {
  return (
    <ol id="log">
      {turn.map((item) => (
        <li key={`${item.square.row}${item.square.col}`}>
          {item.player} Selected {item.square.row},{item.square.col}
        </li>
      ))}
    </ol>
  );
}
 