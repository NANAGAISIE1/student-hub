// eslint-disable-next-line import/no-anonymous-default-export
export default {
  providers: [
    {
      domain: process.env.KINDE_ISSUER_URL,
      applicationID: "convex",
    },
  ],
};
