type AvailableRoles = {
  [key: string]: {
    id: string;
    name: string;
    redirectAfterAuth: string;
  };
};

type WhiteListedPathForRole = {
  [key: string]: string;
};

type BlackListedPathForRole = {
  [key: string]: Array<string>;
};

export const availableRoles: AvailableRoles = {
  member: {
    id: "member",
    name: "Member",
    redirectAfterAuth: "/",
  },
  admin: {
    id: "admin",
    name: "Admin",
    redirectAfterAuth: "/admin",
  },
  artist: {
    id: "artist",
    name: "Artist",
    redirectAfterAuth: "/artist",
  },
};

export const whiteListedPathForRole: WhiteListedPathForRole = {
  member: "/",
  admin: "/admin",
  artist: "/artist",
};

export const blackListedPathForRole: BlackListedPathForRole = {
  member: ["admin, artist"],
  admin: [],
  artist: ["admin"],
};
