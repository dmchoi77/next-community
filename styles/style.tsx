// GlobalStyle
// UPDATE :
import { css, Global, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

export const globalStyles = (
  <Global
    styles={css`
      html,
      body {
        // width: 100vh;
      }

      * {
        text-decoration: none;
      }

      a {
        color: black;
      }
    `}
  />
);
