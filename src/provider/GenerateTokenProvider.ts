import { sign } from "jsonwebtoken";

class GenerateTokenProvider {
  async execute(userId: string) {
    const token = sign({}, "9f9c9d5a8d6e5f6d6e5f6d6e5f6d6e5f6d6e5f6", {
      subject: userId,
      expiresIn: "20s"
    })

    return token
  }
}

export { GenerateTokenProvider };

