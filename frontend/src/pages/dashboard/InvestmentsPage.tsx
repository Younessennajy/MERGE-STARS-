import DashboardSimplePage from './DashboardSimplePage'

export default function InvestmentsPage() {
  return (
    <DashboardSimplePage
      titleKey="investments"
      description="Portfolio value $24,850 with +14.6% this month. Review holdings, allocations, and performance history."
      links={[
        { label: 'Price calculator', to: '/calculator' },
        { label: 'Merge coin', to: '/merge-coin' },
      ]}
    />
  )
}
