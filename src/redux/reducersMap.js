import counterSlice from './counter/counterSlice';

const mapSlicesToReducersMap = (slicesList) =>
  slicesList.reduce(
    (acc, slice) => ({
      ...acc,
      [slice.name]: slice.reducer,
    }),
    {}
  );

export default mapSlicesToReducersMap([counterSlice]);
