import dayjs from "dayjs"
import prisma from "../../prisma/client"
import GenerateRefreshToken from "../../provider/GenerateRefreshToken"
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider"

class RefreshTokenUserUseCase {
  async execute(refresh_token: string) {
    const refreshToken = await prisma.refreshToken.findFirst({
      where: {
        id: refresh_token
      }
    })

    if(!refreshToken) {
      throw new Error("Refresh token invalid")
    }

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn))

    const generateTokenProvider = new GenerateTokenProvider()

    const token = await generateTokenProvider.execute(refreshToken.userId)

    if(refreshTokenExpired) {
      await prisma.refreshToken.deleteMany({
       where: {
         userId: refreshToken.userId
       } 
      })

      const generateRefreshToken = new GenerateRefreshToken()

      const newRefreshToken = await generateRefreshToken.execute(refreshToken.userId)

      return { token, refreshToken: newRefreshToken }
    }

    return token
  }
}

export { RefreshTokenUserUseCase }
