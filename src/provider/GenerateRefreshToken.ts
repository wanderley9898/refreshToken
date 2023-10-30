import dayjs from "dayjs"
import prisma from "../prisma/client"

class GenerateRefreshToken {
  async execute(userId: string) {
    const expiresIn = dayjs().add(30, "second").unix()

    const generateRefreshToken = await prisma.refreshToken.create({
      data: {
        userId,
        expiresIn
      }
    })
    
    return generateRefreshToken
  }
}

export default GenerateRefreshToken