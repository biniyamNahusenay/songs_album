import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"
import songReducer from "./slices/songSlice"
import statReducer from "./slices/statSlice"
import rootSaga from "./sagas/rootSaga"

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: {
        songs: songReducer,
        statistics: statReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store