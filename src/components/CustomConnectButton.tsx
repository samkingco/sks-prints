import { ConnectButton } from "@rainbow-me/rainbowkit";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { Button } from "./Button";

export function CustomConnectButton() {
  const { address } = useAccount();
  const { data: session } = useSession();

  // Sign out when switching address in wallet
  useEffect(() => {
    async function disconnect() {
      if (session && session.address !== address) {
        await signOut({ redirect: false });
      }
    }

    disconnect();
  }, [session, address]);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const isAuthed =
          !authenticationStatus || authenticationStatus === "authenticated";
        const connected = ready && account && chain && isAuthed;

        console.log({ ready, account, authenticationStatus });

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!mounted) {
                return null;
              }

              if (account && !isAuthed) {
                return (
                  <Button uppercase onClick={openConnectModal}>
                    Sign in
                  </Button>
                );
              }

              if (!connected) {
                return (
                  <Button uppercase onClick={openConnectModal}>
                    Connect
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button uppercase onClick={openChainModal}>
                    Wrong network
                  </Button>
                );
              }

              return (
                <Button
                  uppercase
                  variant="secondary"
                  onClick={openAccountModal}
                >
                  {account.displayName}
                </Button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
