import jwt from "jsonwebtoken";

const conf = {
  secret: 'avcbdfhgryfbfdgh25wgy56',
  expiresIn: "360 days",
};

export async function checkAccessToken(accessToken: string) {
  try {
    var r: any = await jwt.verify(accessToken, conf.secret);
    return { data: r, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function generateTokens(_id: string, name: string, role: any,) {
  var r = await jwt.sign({ user: { _id, name, role } }, conf.secret, {
    expiresIn: conf.expiresIn,
  });
  return { accessToken: r };
}
