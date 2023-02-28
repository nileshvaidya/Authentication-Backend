import { verifyAccessJWT } from "../helper/jwt.helper";
import { getJWT, deleteJWT } from "../helper/redis.helper";

interface CustomRequest extends Request {
  userId: string;
}

export const userAuthorization = async (req: {
  [userId: string]: {}; headers: { authorization: any; }; 
}, res: any, next: any) => {
  const { authorization } = req.headers;
  console.log("In User Authorization...", authorization);
  
  const decoded = await verifyAccessJWT(authorization);
  console.log("Verification Done...");
  if (decoded.email) {
    const userId = await getJWT(authorization);
    console.log("user ID...", userId);
    if (!userId) {
      return res.status(403).json({ message: "Forbidded" });
    }

    req.userId = userId;

    return next();
  }

  deleteJWT(authorization);

  return res.status(403).json({ message: "Forbidded" });
};