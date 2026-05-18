export type AppTheme = "dark" | "light" | "system"

export interface AppSlice {
    width: number,
    height: number,
    theme: AppTheme
}