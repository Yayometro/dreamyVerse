import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
// export const useAppSelector = useSelector.withTypes<RootState>()


// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: (selector: (state: RootState) => any) => any = useSelector;
// import { useDispatch, useSelector } from "react-redux";
// import type { RootState, AppDispatch } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: <TSelected>(selector: (state: RootState) => TSelected) => TSelected = useSelector;
