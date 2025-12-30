import { cn } from '@/lib/utils'
import TrainingPackageCard from '@/components/common/training-package-card'
import { TrainingPackage } from '@/sanity/types'

type Variant = 'preview' | 'page'

function getGridClass(count: number, variant: Variant) {
  if (count <= 1) return 'grid-cols-1 max-w-xl mx-auto'
  if (count === 2) return 'grid-cols-1 sm:grid-cols-2 max-w-5xl mx-auto'

  return variant === 'preview'
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
}

export default function TrainingPackageGrid({
  items,
  variant = 'page',
  showHighlights,
  highlightLimit = 4,
  className
}: {
  items: TrainingPackage[]
  variant?: Variant
  showHighlights?: boolean
  highlightLimit?: number
  className?: string
}) {
  return (
    <div
      className={cn(
        // ✅ auto-rows-fr bikin semua “row height” seragam
        'grid gap-6 auto-rows-fr items-stretch',
        getGridClass(items.length, variant),
        className
      )}
    >
      {items.map((item) => (
        <div key={item._id} className='h-full'>
          <TrainingPackageCard
            item={item}
            variant={variant}
            showHighlights={showHighlights}
            highlightLimit={highlightLimit}
          />
        </div>
      ))}
    </div>
  )
}
