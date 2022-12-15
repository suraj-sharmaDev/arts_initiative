export const rebuildProjectApi = async (email) => {
  try {
    // email is required to maintain firebase notification connection
    const response = await fetch("/api/systemProcess", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
