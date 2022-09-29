import counterSlice from './counterSlice';

export const counterSelector = (state) => {
  const { count, loadingRequests, loadingRequestsIds } =
    state[counterSlice.name];

  return {
    count,
    loadingRequestsIds,
    loadingRequests,
    countIsLoading: loadingRequestsIds.length > 0,
  };
};
