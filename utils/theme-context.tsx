import React, {
  useState,
  FC,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react'
import { THEME } from '../assets/themes'

type IChangeTheme<T> = Dispatch<SetStateAction<T>>

export type Theme = 'Dark' | 'Light'

type Context = {
  theme: Theme
  changeTheme: IChangeTheme<Theme>
}

export const ThemeContext = createContext<Context>({
  theme: 'Dark',
  changeTheme: () => {},
})

type ContextProp = {
  children: React.ReactNode
}

export const ContextProvider: FC<ContextProp> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('Light')
  return (
    <ThemeContext.Provider value={{ theme, changeTheme: setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  return useContext(ThemeContext)
}

export const useThemedStyles = (styles: any) => {
  const { theme } = useTheme()
  return styles(theme)
}
