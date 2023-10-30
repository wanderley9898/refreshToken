import { compare } from "bcryptjs"
import IRequest from "../../interfaces/IRequest"
import prisma from "../../prisma/client"
import GenerateRefreshToken from "../../provider/GenerateRefreshToken"
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider"

class AuthenticateUserUseCase {
  async execute ({username, password }: IRequest) {

    //verificar se o usuário existe
    const userAlreadyExists = await prisma.user.findFirst({
      where: {
        username
      }
    })

    if (!userAlreadyExists) {
      throw new Error("User name or password incorrect!")
    }

    // verificar se a senha esta correta

    const passwordMatch = await compare(password, userAlreadyExists.password)

    if (!passwordMatch) {
      throw new Error("User name or password incorrect!")
    }

    // gerar o token
    const generateTokenProvider = new GenerateTokenProvider()

    const token = await generateTokenProvider.execute(userAlreadyExists.id)

    await prisma.refreshToken.deleteMany({
      where: {
        userId: userAlreadyExists.id
      }
    })
    
    const generateRefreshToken = new GenerateRefreshToken()

    const refreshToken = await generateRefreshToken.execute(userAlreadyExists.id)

    return { token, refreshToken }
  }
}

export default AuthenticateUserUseCase
