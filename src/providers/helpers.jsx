const AUTH_LOCAL_STORAGE_KEY = "onward";

const getAuth = () => {
  if (!localStorage) {
    return null;
  }

  const lsValue = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY);
  if (!lsValue) {
    return null;
  }

  try {
    const auth = JSON.parse(lsValue)
    if (auth) {
      // You can easily check auth_token expiration also
      return auth;
    }
    return null;

  } catch (error) {
    console.error("AUTH LOCAL STORAGE PARSE ERROR", error);
    return null;
  }
};


const setAuth = (auth) => {
  if (!localStorage) {
    return;
  }

  try {
    const lsValue = JSON.stringify(auth);
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue);
  } catch (error) {
    console.error("AUTH LOCAL STORAGE SAVE ERROR", error);
  }
};

const removeAuth = () => {
  if (!localStorage) {
    return;
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);

  } catch (error) {
    console.error("AUTH LOCAL STORAGE REMOVE ERROR", error);
  }
};

function setupAxios(axios) {
  axios.defaults.headers.Accept = "application/json";
  axios.interceptors.request.use(
    (config) => {
      const auth = getAuth();
      if (auth) {
        // config.headers.employee_id = `${auth.user.global_id}`;
      }
      return config;
    },
    (err) => Promise.reject(err),
  );
}

export { AUTH_LOCAL_STORAGE_KEY, getAuth, removeAuth, setAuth, setupAxios };
