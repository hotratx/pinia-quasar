export interface Credentials {
  email?: string | undefined
  password?: string | undefined
  username?: string | undefined
  provider?: 'bitbucket' | 'github' | 'gitlab' | 'google' | undefined
}

export interface DataLogin {
  email: string
  password: string
}

export type LocationQueryValue = string | null

export type LocationQuery = Record<
  string,
  LocationQueryValue | LocationQueryValue[]
>
