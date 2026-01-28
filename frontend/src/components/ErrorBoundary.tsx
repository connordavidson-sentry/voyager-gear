import type { ErrorInfo, ReactNode } from 'react'
import React, { Component } from 'react'
import * as Sentry from '@sentry/react'

interface Props {
  children?: ReactNode
}

interface State {
  error: Error | null
  info: ErrorInfo | null
}
class ErrorBoundary extends Component<Props, State> {
  state = {
    error: null,
    info: null,
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.log('ErrorBoundary caught error:', error);
    this.setState({ error, info })
    console.log('Sending error to Sentry...');
    Sentry.captureException(error);
    console.log('Error sent to Sentry');
  }

  render(): ReactNode {
    const { error } = this.state
    if (error) {
      return <ErrorBoundaryFallbackComponent />
    }
    return this.props.children
  }
}

export default ErrorBoundary

const LayoutStyle: React.CSSProperties = {
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  minHeight: '100vh',
  minWidth: '100%',
}

const MessageStyle: React.CSSProperties = {
  border: '2px #78909c solid',
  borderRadius: '5px',
  color: '#78909c',
  fontSize: '24px',
  padding: '40px',
}

export const ErrorBoundaryFallbackComponent: React.FC<
  React.PropsWithChildren<unknown>
> = () => (
  <main style={LayoutStyle}>
    <section style={MessageStyle}>
      Something Error Ooccurring
      <span style={{ paddingLeft: 3 }} role="img" aria-label="face-emoji">
        😞
      </span>
    </section>
  </main>
)
