export interface LoginPayload {
  identifier: string   // email or phone
  password: string
  rememberMe?: boolean
}

export interface RegisterStep1Payload {
  firstName: string
  lastName: string
  personalId: string
  phone: string
}

export interface RegisterStep2Payload {
  email: string
  password: string
  confirmPassword: string
  verificationCode: string
}

export interface RegisterStep3Payload {
  agreedToTerms: boolean
  agreedToPrivacy: boolean
  agreedToFinancing: boolean
  agreedToEvaluation: boolean
  agreedToAccuracy: boolean
}

export interface AuthTokens {
  accessToken: string
}
