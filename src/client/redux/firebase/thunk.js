import { isValidUrl } from "src/client/helpers/commonFunctions";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateToken = createAsyncThunk(
  "firebase/updateToken",
  async ({ email, token }, thunkAPI) => {
    // domain will be passed to our central admin
    const domain = window.location.origin;
    let data = { email, token };
    if (process.env.NODE_ENV == "production" && isValidUrl(domain))
      data.domain = domain;
    const response = await fetch(`/api/firebaseToken`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    }).then((data) => data.json());
    return { response, token };
  }
);
