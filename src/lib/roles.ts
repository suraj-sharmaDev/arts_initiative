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

export const availableRoles: AvailableRoles = {
  member: {
    id: "member",
    name: "Member",
    redirectAfterAuth: "/account",
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
  member: "account",
  admin: "admin",
  artist: "artist",
};
