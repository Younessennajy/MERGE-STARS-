import DashboardSimplePage from './DashboardSimplePage'

export default function ProfilePage() {
  return (
    <DashboardSimplePage
      titleKey="profile"
      description="Manage your account details, KYC information, and security preferences. Full profile editing will connect to the backend API."
      links={[
        { label: 'New application', to: '/apply' },
        { label: 'Settings', to: '/dashboard/settings' },
      ]}
    />
  )
}
