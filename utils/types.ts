export type CloudflareFunctionArgs = {
    request: Request;
    next: () => Promise<Response>;
    env: { CFP_PASSWORD?: string };
  }