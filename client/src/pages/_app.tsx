import { ThemeProvider, CSSReset } from "@chakra-ui/react";

import theme from "../theme";
import "../styles/styles.css"

function MyApp({ Component, pageProps }: any) {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
