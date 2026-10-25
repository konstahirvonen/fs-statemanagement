import useCounterStore from "./useCounterStore"

const Buttons = () => {
  const increment = useCounterStore(state => state.increment)

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={() => increment("good")}>good</button>
      <button onClick={() => increment("neutral")}>neutral</button>
      <button onClick={() => increment("bad")}>bad</button>
    </div>
  )
}

export default Buttons
