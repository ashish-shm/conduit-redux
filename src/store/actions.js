import {
  ADD_ARTICLES,
  ADD_TAGS,
  LOGGED_USER,
  ERROR,
  UPDATE_USER,
  IS_LOGGED_IN,
  SINGLE_ARTICLE,
  ADD_COMMENT
} from "./types";

export function fetchArticles(url) {
  return function (dispatch) {
    fetch(url)
      .then((res) => res.json())
      .then(({ articles }) =>
        dispatch({
          type: ADD_ARTICLES,
          payload: articles,
        })
      )
      .catch((error) => console.log(error));
  };
}

export function fetchTags(url) {
  return function (dispatch) {
    fetch(url)
      .then((res) => res.json())
      .then(({ tags }) =>
        dispatch({
          type: ADD_TAGS,
          payload: tags,
        })
      )
      .catch((error) => console.log(error));
  };
}

export function loginUser(url, userInputData, history) {
  return function (dispatch) {
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: userInputData }),
    })
      .then((res) => {
        if (res.status === 200) {
          history.push("/");
        } else {
          dispatch({
            type: ERROR,
            payload: "Something went wrong",
          });
        }
        return res.json();
      })
      .then(({ user }) => {
        user &&
          dispatch({
            type: ERROR,
            payload: "",
          });

        user &&
          dispatch({
            type: IS_LOGGED_IN,
            payload: true,
          });

        user && localStorage.setItem("authToken", user.token);
        dispatch({
          type: LOGGED_USER,
          payload: user,
        });
      });
  };
}

export function updateUser(url, userInputData, history) {
  return function (dispatch) {
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
      body: JSON.stringify({ user: userInputData }),
    })
      .then((res) => {
        if (res.status === 200) {
          history.push("/");
        }

        return res.json();
      })
      .then(({ user }) => {
        user &&
          dispatch({
            type: ERROR,
            payload: "",
          });

        user &&
          dispatch({
            type: UPDATE_USER,
            payload: user,
          });
      });
  };
}

export function singleArticle(url) {
  return function (dispatch) {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
    })
      .then((res) => res.json())
      .then(({ article }) =>
        dispatch({ type: SINGLE_ARTICLE, payload: article })
      );
  };
}

export function fetchComments(url) {
  return function (dispatch) {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
    })
      .then((res) => res.json())
      .then(({ comments }) =>
        dispatch({ type: ADD_COMMENT, payload: comments })
      );
  };
}

export function addComment(url, userInputData, history, slug) {
  return function (dispatch) {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
      body: JSON.stringify({comment : userInputData})
    }).then((res) => {
      if (res.status === 200) {
        history.push(`/`)
        
      }
      return res.json();
    }).then(({comment} )=> {
     comment && dispatch({ type: ADD_COMMENT, payload: comment })

    })

    
  };
}
