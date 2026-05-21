import DashboardSimplePage from './DashboardSimplePage'

export default function SupportPage() {
  return (
    <DashboardSimplePage
      titleKey="support"
      description="Our team is available for application, payment, and delivery questions."
      links={[
        { label: 'Contact us', to: '/contact' },
        { label: 'FAQ', to: '/faq' },
        { label: 'AI assistant', to: '/dashboard/ai' },
      ]}
    />
  )
}
