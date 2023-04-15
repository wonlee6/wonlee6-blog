import React, {Component, ErrorInfo} from 'react'

type MyProps = {
  children: React.ReactNode
}
type MyState = {
  hasError: boolean
}

class ErrorBoundary extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props)

    // Define a state variable to track whether is an error or not
    this.state = {hasError: false}
  }
  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI

    return {hasError: true}
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can use your own error logging service here
    console.error({error, errorInfo})
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <button
            type='button'
            onClick={() => this.setState({hasError: false})}>
            Try again?
          </button>
        </div>
      )
    }
    // Return children components in case of no error
    return this.props.children
  }
}

export default ErrorBoundary
