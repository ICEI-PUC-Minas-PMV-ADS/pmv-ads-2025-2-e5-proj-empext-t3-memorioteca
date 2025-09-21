import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  className?: string
  children: React.ReactNode
}

export const Card: React.FC<CardProps> = ({ className, children }) => (
  <div
    className={cn(
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      className
    )}
  >
    {children}
  </div>
)

interface CardHeaderProps {
  className?: string
  children: React.ReactNode
}

export const CardHeader: React.FC<CardHeaderProps> = ({ className, children }) => (
  <div className={cn('flex flex-col space-y-1.5 p-6', className)}>
    {children}
  </div>
)

interface CardTitleProps {
  className?: string
  children: React.ReactNode
}

export const CardTitle: React.FC<CardTitleProps> = ({ className, children }) => (
  <h3 className={cn('text-2xl font-semibold leading-none tracking-tight', className)}>
    {children}
  </h3>
)

interface CardDescriptionProps {
  className?: string
  children: React.ReactNode
}

export const CardDescription: React.FC<CardDescriptionProps> = ({ className, children }) => (
  <p className={cn('text-sm text-muted-foreground', className)}>
    {children}
  </p>
)

interface CardContentProps {
  className?: string
  children: React.ReactNode
}

export const CardContent: React.FC<CardContentProps> = ({ className, children }) => (
  <div className={cn('p-6 pt-0', className)}>
    {children}
  </div>
)

interface CardFooterProps {
  className?: string
  children: React.ReactNode
}

export const CardFooter: React.FC<CardFooterProps> = ({ className, children }) => (
  <div className={cn('flex items-center p-6 pt-0', className)}>
    {children}
  </div>
)