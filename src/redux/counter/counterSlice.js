import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 0,
    loadingRequestsIds: [],
    loadingRequests: {},
  },
  reducers: {
    increment: (state, { payload: { step = 1 } }) => {
      state.count += step;
    },
    reset: () => ({ ...initialState }),
    incrementAsync: (state) => state,
    cancelAsync: (state) => state,
    loadingStart: (state, { payload: { reqId, max } }) => {
      state.loadingRequestsIds.push(reqId);
      state.loadingRequests[reqId] = { reqId, max };
    },
    loadingUpdate: (state, { payload: { reqId, progression } }) => {
      state.loadingRequests[reqId].progression = progression;
    },
    loadingEnd: (state, { payload: { reqId } }) => {
      state.loadingRequestsIds = state.loadingRequestsIds.filter(
        (loadingRequestsId) => loadingRequestsId !== reqId
      );
      delete state.loadingRequests[reqId];
    },
  },
});

export default counterSlice;
