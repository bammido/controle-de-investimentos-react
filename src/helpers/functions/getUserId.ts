import getTokenLocal from "./getTokenLocal";
import verifyToken from "./verifyToken";

async function getUserId(): Promise<string> {
    const token = getTokenLocal()

    const { payload } = await verifyToken(token)

    const user = payload?.data || {}

    return user.id
}

export default getUserId;