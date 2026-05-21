import DashboardSimplePage from './DashboardSimplePage'

export default function SettingsPage() {
  return (
    <DashboardSimplePage
      titleKey="settings"
      description="Language, notifications, and account preferences. Connect your API keys and two-factor authentication here when backend services are live."
      links={[{ label: 'Privacy policy', to: '/privacy' }]}
    />
  )
}
