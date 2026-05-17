import type { ApplicationStatus } from '@/shared/types/api.types'

const STATUS_STYLES: Record<ApplicationStatus, string> = {
  submitted:       'bg-[#6B728020] text-[#6B7280]',
  under_review:    'bg-[#F59E0B20] text-[#F59E0B]',
  sent_to_crystal: 'bg-[#8B5CF620] text-[#8B5CF6]',
  approved:        'bg-[#22C55E20] text-[#22C55E]',
  rejected:        'bg-[#EF444420] text-[#EF4444]',
  funds_received:  'bg-[#3B82F620] text-[#3B82F6]',
  production_queue:'bg-[#3B82F620] text-[#3B82F6]',
  in_production:   'bg-[#3B82F620] text-[#3B82F6]',
  quality_check:   'bg-[#F59E0B20] text-[#F59E0B]',
  ready:           'bg-[#D4AF3720] text-[#D4AF37]',
  delivered:       'bg-[#D4AF3720] text-[#D4AF37]',
}

const STATUS_LABELS: Record<ApplicationStatus, string> = {
  submitted:       'Submitted',
  under_review:    'Under Review',
  sent_to_crystal: 'Sent to Crystal',
  approved:        'Approved',
  rejected:        'Rejected',
  funds_received:  'Funds Received',
  production_queue:'Production Queue',
  in_production:   'In Production',
  quality_check:   'Quality Check',
  ready:           'Ready',
  delivered:       'Delivered',
}

interface BadgeProps {
  status: ApplicationStatus
}

export default function Badge({ status }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  )
}
