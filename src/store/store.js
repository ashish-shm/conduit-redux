import { createStore, applyMiddleware } from "redux";
import {
  ADD_ARTICLES,
  ADD_TAGS,
  SELECT_TAG,
  LOGGED_USER,
  ERROR,
  IS_LOGGED_IN,
} from "./types";

const initalState = {
  articles: [],
  tags: [],
  loggedUser: [],
  isLoggedIn: false,
  error: "",
};

function reducer(state = initalState, action) {
  switch (action.type) {
    case ADD_ARTICLES:
      return { ...state, articles: action.payload };
    case ADD_TAGS:
      return { ...state, tags: action.payload };
    case SELECT_TAG:
      return { ...state, articles: action.payload };
    case LOGGED_USER:
      return { ...state, loggedUser: action.payload };
    case IS_LOGGED_IN:
      return { ...state, isLoggedIn: action.payload };
    case ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
}

function reduxmiddleware(store) {
  return function (next) {
    return function (action) {
      if (typeof action == "function") {
        return action(store.dispatch);
      }
      return next(action);
    };
  };
}

export let store = createStore(reducer, applyMiddleware(reduxmiddleware));
