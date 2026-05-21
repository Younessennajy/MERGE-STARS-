interface FlowStepperProps {
  steps: string[]
  current: number
}

/** Numbered step rail — no full-width bars or box borders */
export default function FlowStepper({ steps, current }: FlowStepperProps) {
  return (
    <ol className="flow-stepper" aria-label="Progress">
      {steps.map((label, i) => {
        const n = i + 1
        const active = n === current
        const done = n < current
        return (
          <li
            key={label}
            className={`flow-step ${active ? 'flow-step--active' : ''} ${done ? 'flow-step--done' : ''}`}
            aria-current={active ? 'step' : undefined}
          >
            <span className="flow-step-marker" aria-hidden>
              {done ? '✓' : n}
            </span>
            <span className="flow-step-text">{label}</span>
          </li>
        )
      })}
    </ol>
  )
}
