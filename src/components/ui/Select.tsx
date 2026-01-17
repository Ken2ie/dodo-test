import * as React from "react"
import { cn } from "@/utils/cn"
import { ChevronDown, Loader2, Check } from "lucide-react"

export interface SelectOption {
    label: string
    value: string
    icon?: React.ElementType
}

export interface SelectProps {
    label?: string
    error?: string
    options: SelectOption[]
    value?: string
    onChange?: (value: string) => void
    placeholder?: string
    disabled?: boolean
    isLoading?: boolean
    className?: string
    renderTrigger?: (selectedOption: SelectOption | undefined) => React.ReactNode
    footer?: React.ReactNode
    popoverClassName?: string
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
    ({ className, label, error, options, value, onChange, placeholder = "Select...", disabled, isLoading, renderTrigger, footer, popoverClassName }, ref) => {
        const [isOpen, setIsOpen] = React.useState(false)
        const containerRef = React.useRef<HTMLDivElement>(null)

        const selectedOption = options.find(opt => opt.value === value)

        React.useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                    setIsOpen(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside)
            return () => document.removeEventListener("mousedown", handleClickOutside)
        }, [])

        const handleSelect = (optionValue: string) => {
            if (onChange) {
                onChange(optionValue)
            }
            setIsOpen(false)
        }

        return (
            <div className={cn("relative flex flex-col gap-1.5", className)} ref={containerRef}>
                {label && (
                    <label className="text-sm font-medium bg-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => !disabled && !isLoading && setIsOpen(!isOpen)}
                        className={cn(
                            "flex h-9 w-full items-center justify-between rounded-md bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
                            error && "border-red-500 focus:ring-red-500",
                            renderTrigger && "h-auto bg-transparent hover:bg-accent hover:text-accent-foreground px-2 py-1.5"
                        )}
                        disabled={disabled || isLoading}
                    >
                        {renderTrigger ? (
                            renderTrigger(selectedOption)
                        ) : (
                            <>
                                <span className={cn("flex items-center gap-2 truncate", !selectedOption && "text-muted-foreground")}>
                                    {selectedOption ? (
                                        <>
                                            {selectedOption.icon && <selectedOption.icon className="w-4 h-4 text-muted-foreground" />}
                                            {selectedOption.label}
                                        </>
                                    ) : (
                                        placeholder
                                    )}
                                </span>
                                {isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin opacity-50" />
                                ) : (
                                    <ChevronDown className={cn("h-4 w-4 opacity-50 transition-transform", isOpen && "rotate-180")} />
                                )}
                            </>
                        )}
                    </button>

                    {isOpen && (
                        <div className={cn(
                            "absolute z-50 bg-white mt-1 max-h-60 w-full overflow-auto rounded-md bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
                            popoverClassName
                        )}>
                            <div className="p-1 !bg-white">
                                {options.map((option) => (
                                    <div
                                        key={option.value}
                                        onClick={() => handleSelect(option.value)}
                                        className={cn(
                                            "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer",
                                            option.value === value && "bg-accent/50 text-accent-foreground font-medium"
                                        )}
                                    >
                                        <div className="flex items-center gap-2 w-full">
                                            {option.icon && <option.icon className="w-4 h-4 text-muted-foreground" />}
                                            {option.label}
                                        </div>
                                        {option.value === value && (
                                            <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                                                <Check className="h-4 w-4" />
                                            </span>
                                        )}
                                    </div>
                                ))}
                                {options.length === 0 && (
                                    <div className="py-2 px-2 text-sm text-muted-foreground text-center">
                                        No options
                                    </div>
                                )}
                                {footer && (
                                    <div className="pt-1 mt-1 border-muted">
                                        {footer}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                {
                    error && (
                        <p className="text-sm text-red-500">{error}</p>
                    )
                }
            </div >
        )
    }
)
Select.displayName = "Select"

export { Select }