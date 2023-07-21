import { Theme, createTheme } from "@mui/material";
import { useAppSelector } from "./hooks/hook";

export const useTheme = () => {
  const darkMode = useAppSelector(state => state.app.darkTheme)
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });
  return theme
}
