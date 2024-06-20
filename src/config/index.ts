interface Config {
  googleClientId: string;
  googleClientSecret: string;
  backofficeApiBaseUrl: string;
  spaceEndPoint: string;
  spaceAccessKeyId: string;
  spaceSecretKey: string;
  orderAppUrl: string;
  orderApiBaseUrl: string;
}

export const config: Config = {
  googleClientId: process.env.GOOGLE_ID || "",
  googleClientSecret: process.env.GOOGLE_SECRET || "",
  backofficeApiBaseUrl: process.env.NEXT_PUBLIC_BACKOFFICE_API_BASE_URL || "",
  spaceEndPoint: process.env.SPACE_ENDPOINT || "",
  spaceAccessKeyId: process.env.SPACE_ACCESS_KEY_ID || "",
  spaceSecretKey: process.env.SPACE_SECRET_ACCESS_KEY || "",
  orderAppUrl: process.env.NEXT_PUBLIC_ORDER_APP_URL || "",
  orderApiBaseUrl: process.env.NEXT_PUBLIC_ORDER_API_BASE_URL || "",
};
