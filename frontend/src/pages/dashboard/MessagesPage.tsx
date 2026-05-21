import DashboardSimplePage from './DashboardSimplePage'

export default function MessagesPage() {
  return (
    <DashboardSimplePage
      titleKey="messages"
      description="Your inbox for application updates, payment confirmations, and support replies. You have 3 unread notifications."
      links={[
        { label: 'View application status', to: '/status' },
        { label: 'AI assistant', to: '/dashboard/ai' },
      ]}
    />
  )
}
