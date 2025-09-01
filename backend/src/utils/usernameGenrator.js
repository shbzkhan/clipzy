const generateRandomString = (length = 6) => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return str;
};

export const generateUniqueUsername = async (baseName = "user") => {
  let username;
  let userExists = true;

  while (userExists) {
    username = `${baseName}_${generateRandomString(5)}`;
    userExists = await User.findOne({ username });
  }

  return username;
};