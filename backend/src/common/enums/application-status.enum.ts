export enum ApplicationStatus {
  Submitted = 'submitted',
  UnderReview = 'under_review',
  SentToCrystal = 'sent_to_crystal',
  Approved = 'approved',
  Rejected = 'rejected',
  FundsReceived = 'funds_received',
  ProductionQueue = 'production_queue',
  InProduction = 'in_production',
  QualityCheck = 'quality_check',
  Ready = 'ready',
  Delivered = 'delivered',
}

/** Valid transitions keyed by current status */
export const APPLICATION_TRANSITIONS: Record<
  ApplicationStatus,
  ApplicationStatus[]
> = {
  [ApplicationStatus.Submitted]: [ApplicationStatus.UnderReview],
  [ApplicationStatus.UnderReview]: [
    ApplicationStatus.SentToCrystal,
    ApplicationStatus.Approved,
    ApplicationStatus.Rejected,
  ],
  [ApplicationStatus.SentToCrystal]: [
    ApplicationStatus.Approved,
    ApplicationStatus.Rejected,
  ],
  [ApplicationStatus.Approved]: [ApplicationStatus.FundsReceived],
  [ApplicationStatus.Rejected]: [],
  [ApplicationStatus.FundsReceived]: [ApplicationStatus.ProductionQueue],
  [ApplicationStatus.ProductionQueue]: [ApplicationStatus.InProduction],
  [ApplicationStatus.InProduction]: [ApplicationStatus.QualityCheck],
  [ApplicationStatus.QualityCheck]: [ApplicationStatus.Ready],
  [ApplicationStatus.Ready]: [ApplicationStatus.Delivered],
  [ApplicationStatus.Delivered]: [],
};
