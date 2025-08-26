import { AlertCircle, Home, RefreshCw } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'

export default function ErrorPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  
  const errorMessage = searchParams.get('message') || 'Something went wrong'
  const errorCode = searchParams.get('code') || 'ERROR'
  const errorDetails = searchParams.get('details')

  const handleGoHome = () => {
    navigate('/')
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleRetry = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Error Icon */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Oops!</h1>
          <p className="text-xl text-muted-foreground mt-2">
            We encountered an unexpected error
          </p>
        </div>

        {/* Error Details Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              Error Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">Error Code</div>
              <div className="font-mono text-sm bg-muted px-2 py-1 rounded mt-1">
                {errorCode}
              </div>
            </div>
            
            <div>
              <div className="text-sm font-medium text-muted-foreground">Message</div>
              <div className="text-sm mt-1">{errorMessage}</div>
            </div>

            {errorDetails && (
              <div>
                <div className="text-sm font-medium text-muted-foreground">Details</div>
                <div className="text-xs font-mono bg-muted px-2 py-1 rounded mt-1 whitespace-pre-wrap">
                  {errorDetails}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={handleGoHome} className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Go to Home
          </Button>
          
          <Button onClick={handleGoBack} variant="outline" className="flex items-center gap-2">
            Back
          </Button>
          
          <Button onClick={handleRetry} variant="outline" className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
        </div>

        {/* Help Section */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            If this problem persists, please contact support or try refreshing the page.
          </p>
          <p className="mt-2">
            <span className="font-medium">Need help?</span> Check your internet connection 
            or try searching for flights again.
          </p>
        </div>
      </div>
    </div>
  )
}
