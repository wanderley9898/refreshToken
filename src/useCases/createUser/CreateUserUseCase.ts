import { hash } from "bcryptjs"
import IUserRequest from "../../interfaces/IUserRequest"
import prisma from "../../prisma/client"



class CreateUserUseCase {
  async execute ({name, username, password}: IUserRequest ) {
    //verificar se o usuário existe
    const userAlreadyExists = await prisma.user.findFirst({
      where: {
        username
      }
    })

    if (userAlreadyExists) {
      throw new Error("User already exists!")
    }
    
    // cadastrar o usuário

    const passwordHash = await hash(password, 8)

    const user = await prisma.user.create({
      data: {
        name,
        username,
        password: passwordHash
      }
    })

   return user
  }
}

export default CreateUserUseCase