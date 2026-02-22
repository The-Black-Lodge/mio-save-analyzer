import { Component } from "react"

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <p className="text-small">
            The save file may be malformed or unsupported.
          </p>
          <button onClick={() => this.setState({ error: null })}>
            Try again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
