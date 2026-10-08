interface SkeletonProps {
  className?: string
}

/** Bloco de loading placeholder genérico */
export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={[
        'animate-pulse rounded-card bg-ivory-200',
        className,
      ].join(' ')}
    />
  )
}

/** Skeleton de página inteira — usado em Suspense fallbacks */
export function PageSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-4 pt-8" aria-busy="true" aria-label="Carregando">
      <Skeleton className="h-8 w-40" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  )
}

/** Skeleton de card de oração */
export function PrayerCardSkeleton() {
  return (
    <div className="flex flex-col gap-2 p-4" aria-hidden="true">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  )
}
