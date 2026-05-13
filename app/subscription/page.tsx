import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Choose Your Plan
          </h1>
          <p className="text-muted-foreground">
            Unlock unlimited research capabilities
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Free Plan */}
          <Card className="border border-border">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-1">Free</h2>
              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-muted-foreground">
                  <Check className="h-4 w-4 text-muted-foreground" />
                  <span>5 searches per day</span>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <Check className="h-4 w-4 text-muted-foreground" />
                  <span>Basic paper summaries</span>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <Check className="h-4 w-4 text-muted-foreground" />
                  <span>Limited export options</span>
                </li>
              </ul>

              <Button
                variant="secondary"
                className="w-full bg-muted text-muted-foreground hover:bg-muted cursor-default"
                disabled
              >
                Current Plan
              </Button>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="border-2 border-foreground/20 shadow-lg relative overflow-visible mt-4">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
              <span className="bg-foreground text-background text-xs font-medium px-4 py-1.5 rounded-full whitespace-nowrap">
                Recommended
              </span>
            </div>
            <CardContent className="p-6 pt-8">
              <h2 className="text-lg font-semibold text-foreground mb-1">Pro</h2>
              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">$29</span>
                <span className="text-muted-foreground">/month</span>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-foreground">
                  <Check className="h-4 w-4 text-foreground" />
                  <span>Unlimited searches</span>
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <Check className="h-4 w-4 text-foreground" />
                  <span>AI-powered analysis</span>
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <Check className="h-4 w-4 text-foreground" />
                  <span>Full methodology extraction</span>
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <Check className="h-4 w-4 text-foreground" />
                  <span>Export to CSV, PDF</span>
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <Check className="h-4 w-4 text-foreground" />
                  <span>Priority support</span>
                </li>
              </ul>

              <Button className="w-full bg-foreground text-background hover:bg-foreground/90">
                Upgrade to Pro
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
