import { css } from "@emotion/react";
import styled from "@emotion/styled";
import withMargin, { WithMarginProp } from "./withMargin";

export interface BaseTextProps extends WithMarginProp {
  size?: "small" | "large";
  subdued?: boolean;
  uppercase?: boolean;
}

export const subdued = css`
  opacity: 0.48;
`;

export const uppercase = css`
  text-transform: uppercase;
`;

const titleStyles = css`
  font-family: var(--font-heading);
  font-weight: bold;
  font-style: italic;
  font-size: 3.2em;
`;

export const Title = styled.h1<BaseTextProps>`
  ${titleStyles};
  ${(p) => p.subdued && subdued};
  ${(p) => p.uppercase && uppercase};
  ${withMargin};
`;

const headingStyles = css`
  font-family: var(--font-heading);
  font-weight: bold;
  font-style: italic;
  font-size: 2em;
`;

export const Heading = styled.h2<BaseTextProps>`
  ${headingStyles};
  ${(p) => p.subdued && subdued};
  ${(p) => p.uppercase && uppercase};
  ${withMargin};
`;

const subheadingStyles = css`
  font-family: var(--font-heading);
  font-weight: bold;
  font-style: italic;
  font-size: 1.6rem;
`;

export const Subheading = styled.h3<BaseTextProps>`
  ${subheadingStyles};
  ${(p) => p.subdued && subdued};
  ${(p) => p.uppercase && uppercase};
  ${withMargin};
`;

const bodyStyles = css`
  margin: 0;
  font-family: var(--font-sans);
  font-size: 1rem;
`;

export const Body = styled.p<BaseTextProps>`
  ${bodyStyles};
  ${(p) => p.subdued && subdued};
  ${(p) => p.uppercase && uppercase};
  ${(p) => {
    switch (p.size) {
      case "small":
        return css`
          font-size: 0.75rem;
        `;
      case "large":
        return css`
          font-size: 1.6rem;
        `;
      default:
        break;
    }
  }}
  & + & {
    margin-top: 0.5em;
  }
  ${withMargin};
`;

export const monoStyles = css`
  font-family: var(--font-mono);
  font-size: 0.875rem;
`;

export const Mono = styled.p<BaseTextProps>`
  ${monoStyles};
  ${(p) => p.subdued && subdued};
  ${(p) => p.uppercase && uppercase};
  ${(p) => {
    switch (p.size) {
      case "small":
        return css`
          font-size: 0.7rem;
        `;
      default:
        break;
    }
  }}
  ${withMargin};
`;
