import React, { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAF9F6] text-[#2c2c2c] px-6 text-center">
          <h1 className="text-3xl font-serif text-[#4A5D23] mb-4">Something went wrong.</h1>
          <p className="text-lg max-w-md">
            We are sorry, but an unexpected error occurred. Please try refreshing the page or navigating back home.
          </p>
          <a
            href="/"
            className="mt-8 px-6 py-3 bg-[#4A5D23] text-white rounded hover:bg-[#3A4A1C] transition-colors font-medium"
          >
            Return to Home
          </a>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
