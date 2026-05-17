import { Sidebar, Header, PageWrapper } from '@/shared/components/layout'

export default function AdminPage() {
  return (
    <div className="flex h-screen bg-[#0A0A0A]">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <PageWrapper title="Admin — Applications">
          {/* TODO: ApplicationsTable, filters, ApplicationDetail */}
          <p className="text-[#A0A0A0]">Admin panel — coming soon</p>
        </PageWrapper>
      </div>
    </div>
  )
}
