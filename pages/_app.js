import '@/styles/globals.css'
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import createEmotionCache from "@/lib/createEmotionCache";
import { CacheProvider, ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { Provider as ReduxProvider } from 'react-redux'
import store from "@/lib/store";

const clientSideEmotionCache = createEmotionCache();
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          '&:last-child': {
            paddingBottom: 16
          }
        }
      }
    }
  }
});

export default function App(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return <>
    <ReduxProvider store={store}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={darkTheme}>
          <EmotionThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <Component {...pageProps} />
          </EmotionThemeProvider>
        </ThemeProvider>
      </CacheProvider>
    </ReduxProvider>
  </>
}
