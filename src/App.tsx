import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  setTimeout(() => {
    setCount(count + 1);
  }, 1000);

  return (
    <>
      <div>test {count}</div>
    </>
  );
}

export default App;
