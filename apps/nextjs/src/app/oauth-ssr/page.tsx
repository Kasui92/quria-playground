import { AuthButton } from "./AuthButton";
import { getAccessTokenFromCookie } from "./actions";

import { PageHead } from "@/components/page";
import {
  Block,
  BlockCode,
  BlockContent,
  BlockKey,
  BlockSeparator,
  BlockTitle,
  BlockValue,
} from "@/components/block";

export default async function BtoaSSR() {
  const oauth = await getAccessTokenFromCookie();

  return (
    <>
      <PageHead />
      <div className="flex flex-col items-center justify-center mt-8 mb-12">
        <AuthButton />
        <div className="mt-16 w-full max-w-2xl">
          {oauth && (
            <Block>
              <BlockTitle>OAuth Response:</BlockTitle>
              <BlockContent>
                {Object.entries(oauth).map(([key, value]) => (
                  <div key={key}>
                    <BlockCode>
                      <BlockKey>{key}</BlockKey>
                      <BlockValue>{value}</BlockValue>
                      <BlockSeparator />
                    </BlockCode>
                  </div>
                ))}
              </BlockContent>
            </Block>
          )}
        </div>
      </div>
    </>
  );
}
