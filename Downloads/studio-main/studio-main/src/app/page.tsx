
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlatformLogo } from '@/components/platform-logo';
import { ArrowRight, BarChart, CheckCircle, PieChart, Star } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function LandingPage() {
  const dashboardPreviewImage = PlaceHolderImages.find(p => p.id === 'dashboard-preview');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <PlatformLogo className="w-8 h-8 text-primary" />
            <span className="text-lg">Insightify</span>
          </Link>
          <nav className="ml-auto flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">
                Get Started <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="container grid lg:grid-cols-2 gap-12 items-center py-20 md:py-32 px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Uncover Market Insights, Instantly
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
              Insightify provides real-time consumer interest data and competitive analysis to help you make smarter business decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Sign Up for Free
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                  <Link href="#features">
                    Learn More
                  </Link>
              </Button>
            </div>
          </div>
          <div>
            {dashboardPreviewImage && (
              <Image
                src={dashboardPreviewImage.imageUrl}
                alt="Dashboard Preview"
                width={1200}
                height={783}
                data-ai-hint={dashboardPreviewImage.imageHint}
                className="rounded-xl shadow-2xl ring-1 ring-black/10"
              />
            )}
          </div>
        </section>

        <section id="features" className="bg-secondary py-20 md:py-32">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight">Features Built for Growth</h2>
              <p className="mt-2 text-muted-foreground">Everything you need to stay ahead of the curve.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm">
                <div className="p-3 bg-primary/10 rounded-full">
                  <BarChart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">Trend Analysis</h3>
                <p className="mt-2 text-sm text-muted-foreground">Analyze real-time consumer interest data and identify top trending keywords in your sector.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm">
                <div className="p-3 bg-primary/10 rounded-full">
                  <PieChart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">Competitor Comparison</h3>
                <p className="mt-2 text-sm text-muted-foreground">Benchmark platforms against each other on key metrics like market cap, revenue, and user base.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm">
                <div className="p-3 bg-primary/10 rounded-full">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">Sentiment Analysis</h3>
                <p className="mt-2 text-sm text-muted-foreground">Gauge user sentiment from online reviews and social media to understand brand perception.</p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 md:py-32">
          <div className="container px-4 sm:px-6 lg:px-8">
             <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tight">What Our Customers Say</h2>
                <p className="mt-2 text-muted-foreground">Hear from teams who trust Insightify.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
                {[...Array(3)].map((_, i) => {
                    const testimonialImage = PlaceHolderImages.find(p => p.id === `testimonial-${i+1}`);
                    return (
                        <div key={i} className="p-6 bg-card rounded-lg shadow-sm">
                           <div className="flex items-center gap-4 mb-4">
                                {testimonialImage && <Image src={testimonialImage.imageUrl} alt="User" width={48} height={48} data-ai-hint={testimonialImage.imageHint} className="rounded-full" />}
                                <div>
                                    <p className="font-semibold">User {i + 1}</p>
                                    <p className="text-sm text-muted-foreground">Startup Founder</p>
                                </div>
                            </div>
                            <div className="flex gap-0.5 mb-2">
                                {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                            </div>
                            <p className="text-sm text-muted-foreground">"Insightify has been a game-changer for us. The real-time data allows us to pivot our strategy quickly and stay ahead of the competition."</p>
                        </div>
                    );
                })}
            </div>
          </div>
        </section>

        <section className="bg-primary text-primary-foreground py-20 md:py-32">
            <div className="container text-center px-4 sm:px-6 lg:px-8">
                 <h2 className="text-3xl font-bold tracking-tight">Ready to Dive In?</h2>
                 <p className="mt-2 text-muted-foreground/80">Start analyzing your market today. No credit card required.</p>
                 <div className="mt-8">
                    <Button size="lg" variant="secondary" asChild>
                        <Link href="/signup">
                           Get Started for Free <ArrowRight className="ml-2" />
                        </Link>
                    </Button>
                 </div>
            </div>
        </section>

      </main>

      <footer className="border-t">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex items-center gap-2">
            <PlatformLogo className="w-6 h-6 text-primary" />
            <p className="text-sm font-medium">Insightify</p>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Insightify, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
