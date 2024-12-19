import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { AUTHOR_BY_GOOGLE_ID_QUERY } from "./sanity/lib/queries";
import { client } from "./sanity/lib/client";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, profile }) {
      const googleId = profile?.sub;
      if (!googleId) {
        return false;
      }
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GOOGLE_ID_QUERY, {
          id: googleId,
        });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id: googleId,
          name: user?.name,
          username: profile?.nickname,
          email: user?.email,
          image: user?.image,
          bio: profile?.bio || "",
        });
      }
      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const googleId = profile?.sub;
        if (!googleId) {
          return token;
        }
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GOOGLE_ID_QUERY, {
            id: googleId,
          });
        token.id = user?._id;
      }
      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
