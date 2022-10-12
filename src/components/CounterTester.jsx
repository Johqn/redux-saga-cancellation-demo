import { connect } from 'react-redux';
import counterSlice from '../redux/counter/counterSlice';
import { counterSelector } from '../redux/counter/counterSelectors';
import { useState } from 'react';

const CounterTester = ({
  count,
  countIsLoading,
  loadingRequestsIds,
  loadingRequests,
  increment,
  incrementAsync,
  cancelAsync,
}) => {
  const [step, setStep] = useState(1);
  const [delay, setDelay] = useState(2000);
  return (
    <>
      <p>
        Count is :{' '}
        <span className={countIsLoading ? 'loading' : ''}>{count}</span>
      </p>
      <p>
        <label htmlFor="increment_step">Increment step</label>{' '}
        <input
          id="increment_step"
          type="number"
          value={step}
          onInput={(e) => setStep(Number(e.target.value))}
        />
      </p>
      <p>
        <button onClick={() => increment({ step })}>+</button>
        <button onClick={() => incrementAsync({ step })}>+ async</button>
        <br />
        <button onClick={() => increment({ step: -step })}>-</button>
        <button onClick={() => incrementAsync({ step: -step })}>- async</button>
        <br />
        <button onClick={() => cancelAsync()}>Cancel async</button>
      </p>
      <p>
        <label htmlFor="request_ids">Async request IDs : </label>
        {loadingRequestsIds.length == 0 && <span id="request_ids">none</span>}
      </p>
      {loadingRequestsIds.length > 0 && (
        <ul id="request_ids">
          {loadingRequestsIds.map((reqId) => {
            const { progression, max } = loadingRequests[reqId];
            return (
              <li key={reqId}>
                {reqId} <progress max={max} value={progression} />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  ...counterSelector(state),
});

const mapDispatchToProps = {
  ...counterSlice.actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(CounterTester);
