import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const initUser = createAsyncThunk(
  "auth/initUser",
  async (userEmail, thunkAPI) => {
    const res = await fetch(`/api/user/init?email=${userEmail}`).then((data) =>
      data.json()
    );
    return { response: res, email: userEmail };
  }
);

// this thunk is called to sync web redux with api database
export const syncUser = createAsyncThunk(
  "auth/syncUser",
  async (userEmail, thunkAPI) => {
    const res = await fetch(`/api/user/init?email=${userEmail}`).then((data) =>
      data.json()
    );
    return { response: res };
  }
);

export const generateNotionAccessToken = createAsyncThunk(
  "auth/generateNotionAccessToken",
  async ({ code, email, REDIRECT_URI }, thunkAPI) => {
    const URL = `/api/notion/oauth?code=${code}&email=${email}&redirect_uri=${REDIRECT_URI}`;
    const res = await fetch(URL, {
      method: "POST",
    }).then((data) => data.json());
    console.log(res);
    // also re-initialize user
    if (res.status == 200) {
      toast.success("Successful notion integration", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      thunkAPI.dispatch(initUser(email));
    } else {
      toast.error(res.message.split("_").join(" "), {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
    return res;
  }
);

export const updateOpenAIKey = createAsyncThunk(
  "auth/updateOpenAIKey",
  async ({ email, key, key_id = null }, thunkAPI) => {
    const URL = `/api/openAI`;
    // if key_id is passed we are updating previous key value
    // else we are creating a new one
    let method = "POST";
    let body = { email, key };
    if (key_id) {
      method = "PUT";
      body = { ...body, key_id };
    }
    const res = await fetch(URL, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method,
      body: JSON.stringify(body),
    }).then((data) => data.json());
    // also re-initialize user
    if (res.status == 200) {
      thunkAPI.dispatch(initUser(email));
    }
    return res;
  }
);
