export function QuoteSkeleton() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-background animate-pulse">
      <div className="max-w-5xl mx-auto mb-6 flex justify-between items-center">
        <div className="h-10 w-64 bg-muted rounded"></div>
        <div className="flex gap-3">
          <div className="h-10 w-32 bg-muted rounded"></div>
          <div className="h-10 w-32 bg-muted rounded"></div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto rounded-xl shadow-lg border bg-card border-border p-8 md:p-16">
        <div className="space-y-8">
          <div className="h-8 bg-muted rounded w-1/2"></div>
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-32 bg-muted rounded w-full"></div>
        </div>
      </div>
    </div>
  )
}
