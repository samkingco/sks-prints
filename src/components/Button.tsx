import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { LoadingIndicator } from "./LoadingIndicator";
import { BaseTextProps, Mono, monoStyles, uppercase } from "./Typography";

interface ButtonProps
  extends BaseTextProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  loadingMessage?: string;
  variant?: "primary" | "secondary";
}

export const buttonReset = css`
  font-weight: normal;
  line-height: 1.5;
  text-decoration: none;
  text-align: center;
  color: var(--foreground);
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
  overflow: hidden;
  background: transparent;
  cursor: pointer;
  transition: color 150ms ease-in-out, opacity 150ms ease-in-out,
    box-shadow 150ms ease;
`;

const slide = keyframes`
  0% { transform: translateX(-100%); }
	100% { transform: translateX(100%); }
`;

const StyledButton = styled.button<ButtonProps>`
  ${monoStyles};
  ${(p) => p.uppercase && uppercase};
  ${buttonReset};

  position: relative;
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  position: relative;
  overflow: hidden;

  ${(p) =>
    p.variant === "primary" &&
    css`
      background: var(--foreground);
      color: var(--background);
    `}

  ${(p) =>
    p.variant === "secondary" &&
    css`
      &:not(:disabled) {
        box-shadow: inset 0 0 0 1px rgba(var(--foreground-alpha), 0.2);
        &:hover {
          box-shadow: inset 0 0 0 1px rgba(var(--foreground-alpha), 1);
        }
      }
    `}

  &:after {
    content: "";
    top: 0;
    left: 0;
    opacity: 0;
    transform: translateX(100%);
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    animation: ${slide} 2.4s ease-in-out infinite;
    transition: opacity 150ms ease-in-out;
    background: linear-gradient(
      to right,
      rgba(var(--background-alpha), 0) 0%,
      rgba(var(--background-alpha), 0.24) 50%,
      rgba(var(--background-alpha), 0) 100%
    );
  }

  &:hover&:not(:disabled):after {
    opacity: 1;
  }

  &:disabled {
    background: var(--background-emphasis);
    color: rgba(var(--foreground-alpha), 0.48);
    cursor: not-allowed;
  }

  ${(p) =>
    p.isLoading &&
    css`
      &,
      &:disabled {
        color: transparent;
        cursor: not-allowed;
      }
    `}
`;

const LoadingWrapper = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
  color: rgba(var(--foreground-alpha), 0.64);
`;

export function Button({
  children,
  variant = "primary",
  isLoading,
  loadingMessage,
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      {...props}
      variant={variant}
      isLoading={isLoading}
      disabled={isLoading || props.disabled}
    >
      {isLoading && (
        <LoadingWrapper>
          <LoadingIndicator />
          {loadingMessage && <Mono as="span">{loadingMessage}</Mono>}
        </LoadingWrapper>
      )}
      {children}
    </StyledButton>
  );
}
