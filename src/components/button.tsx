import { createContext, ReactNode, useContext} from 'react'
import { Text, TextProps, TouchableOpacity, TouchableOpacityProps, ActivityIndicator, PressableProps, Pressable } from "react-native";
import { clsx } from "clsx";

type Variants = 'primary' | 'secondary'

type ButtonProps = PressableProps & {
    variant?: Variants
    isLoading?: boolean
    children: ReactNode,
}

const ThemeContext = createContext<{ variant?: Variants }>({})

function Button({ variant = 'primary', children, isLoading, ...rest }: ButtonProps) {
    return (
        <Pressable 
            className={clsx(
                "w-full h-11 flex-row items-center justify-center rounded-lg gap-2 active:opacity-75",
                {
                    'bg-lime-300': variant === 'primary',
                    'bg-zinc-800': variant === 'secondary',
                }
            )} 
            // activeOpacity={0.7}
            disabled={isLoading}
            
            {...rest}
        >
            <ThemeContext.Provider value={{ variant }}>
                { isLoading ? <ActivityIndicator /> : children }
            </ThemeContext.Provider>
        </Pressable>
    )
}

function Title({ children }: TextProps) {
    const { variant } = useContext(ThemeContext)

    return (
        <Text className={clsx(
            'text-base font-semibold',
            {
                'text-lime-950': variant === 'primary',
                'text-zinc-200': variant === 'secondary',
            })}
        >
            {children}
        </Text>
    )
}

Button.Title = Title

export { Button }