import usePlead from "stateID/StateID";

const App = () => {
  // const value = useParams();
  const [state] = usePlead();
  console.log(usePlead);
  return (
    <div>
      <div>
        <div>This is from The checkout service</div>
        <div>showing: {state}</div>
      </div>
    </div>
  );
};

export default App;
