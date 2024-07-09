import { ThemeOptions } from "@mui/material/styles";
import { OverridableStringUnion } from "@mui/types";

type ExtendedColor = OverridableStringUnion<
  "error" | "primary" | "secondary" | "info" | "success" | "warning" | "input" // Add the new color type
  // Add other components that use this color type
>;

declare module "@mui/material/styles" {
  interface Palette {
    input?: PaletteColor;
  }
  interface PaletteOptions {
    input?: PaletteColorOptions;
  }
}
