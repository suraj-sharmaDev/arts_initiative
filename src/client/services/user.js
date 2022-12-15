export const getInvitedUserData = async (key_id) => {
  try {
    const user = await fetch(`/api/user?key_id=${key_id}`).then((data) =>
      data.json()
    );
    return user?.users[0];
  } catch (error) {
    console.log(error);
  }
};

export const updateUserPassword = async (data) => {
  try {
    const res = await fetch("/api/user/updateUser", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getUsers = async () => {
  const response = await fetch("/api/user");
  const result = await response.json();
  return result;
};
