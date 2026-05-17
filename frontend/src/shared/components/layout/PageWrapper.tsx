interface PageWrapperProps {
  children: React.ReactNode
  title?: string
}

export default function PageWrapper({ children, title }: PageWrapperProps) {
  return (
    <main className="flex-1 overflow-y-auto p-6">
      {title && (
        <h1 className="text-2xl font-display text-white mb-6">{title}</h1>
      )}
      {children}
    </main>
  )
}
