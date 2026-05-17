import { Sidebar, Header, PageWrapper } from '@/shared/components/layout'

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-[#0A0A0A]">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <PageWrapper title="Dashboard">
          {/* TODO: add widgets — MergeCoinBalance, ApplicationStatus, TotalInvestments, QuickActions */}
          <p className="text-[#A0A0A0]">Dashboard widgets — coming soon</p>
        </PageWrapper>
      </div>
    </div>
  )
}
