import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import DashboardLayout from '../../components/DashboardLayout'

interface Props {
  titleKey: string
  description: string
  links?: { label: string; to: string }[]
}

export default function DashboardSimplePage({ titleKey, description, links = [] }: Props) {
  const { t } = useTranslation()
  const title = t(`dashboard.titles.${titleKey}`)

  return (
    <DashboardLayout titleKey={titleKey}>
      <div className="dash-panel max-w-2xl">
        <p className="landing-sans-head mb-4">{title}</p>
        <p className="landing-body mb-8">{description}</p>
        {links.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="luxury-btn-glass">
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
