import React, { useContext, createContext, useReducer } from 'react';

interface IState {
  tabs: null | Array<string>;
  currentTab: string;
  results: {
    duration: number;
    principal: number;
    recurringAmount: number;
    frequency: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  };
  selectedGoal: string;
}

interface IActionCreator {
  type: string;
  data: any;
}

type IDispatch = ({ type, data }: { type: string; data: any }) => null | void;

type IReducer = (state: IState, action: IActionCreator) => IState;

interface IActionType {
  SET_FLOW: string;
  SET_ACTIVE_TAB: string;
  SET_RESULT: string;
  SET_GOAL: string;
}

const initialState: IState = {
  tabs: null,
  currentTab: 'goal',
  selectedGoal: '',
  results: {
    duration: 0,
    principal: 0,
    recurringAmount: 0,
    frequency: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  },
};

export const actionType: IActionType = {
  SET_FLOW: 'SET_FLOW',
  SET_GOAL: 'SET_GOAL',
  SET_ACTIVE_TAB: 'SET_ACTIVE_TAB',
  SET_RESULT: 'SET_RESULT',
};

const reducer: IReducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_FLOW:
      return {
        ...state,
        currentFlow: action.data,
      };
    case actionType.SET_ACTIVE_TAB:
      return {
        ...state,
        currentTab: action.data,
      };
    case actionType.SET_GOAL:
      return {
        ...state,
        selectedGoal: action.data,
      };
    case actionType.SET_RESULT:
      return {
        ...state,
        results: {
          ...state.results,
          [action.data.key]: action.data.value,
        },
      };
    default:
      return state;
  }
};

const GoalsStateContext = createContext<IState | undefined>(initialState);
const GoalsDispatchContext = createContext<IDispatch | undefined>(undefined);

export function useGoalsState() {
  const state = useContext(GoalsStateContext);

  if (state === undefined) {
    throw new Error('You can only use useGoalsState inside a context provider');
  }

  return state;
}

export function useGoalsDispatch() {
  const dispatch = useContext(GoalsDispatchContext);

  if (dispatch === undefined) {
    throw new Error(
      'You can only use GoalsDispatchContext inside a context provider'
    );
  }

  return dispatch;
}

export function GoalsProvider({ children }: { children: any }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GoalsStateContext.Provider value={state}>
      <GoalsDispatchContext.Provider value={dispatch}>
        {children}
      </GoalsDispatchContext.Provider>
    </GoalsStateContext.Provider>
  );
}
