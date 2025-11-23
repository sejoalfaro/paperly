import Link from 'next/link'
import { Navbar } from '@/src/components/navbar'
import { Footer } from '@/src/components/footer'
import { FAQ } from '@/src/components/common/faq'
import { ComparisonTable } from '@/src/components/common/comparison-table'
import { Button } from '@/src/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { ArrowRight, FileText, Download, Edit3, Star, Users, Clock, Shield, Check, TrendingUp, Sparkles, Lock, Globe } from 'lucide-react'
import { appConfig } from '@/src/lib/config'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-24 sm:pt-32 sm:pb-32 lg:pt-36 lg:pb-36">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center space-y-8">            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
              Crea facturas
              <br />
              <span className="bg-linear-to-r from-foreground to-foreground/40 bg-clip-text text-transparent">
                profesionales al instante
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {appConfig.name} es el generador de facturas más elegante y fácil de usar. 
              Crea, personaliza y descarga facturas profesionales en segundos.
            </p>
            
            {/* Social Proof Metrics */}
            <div className="flex flex-col items-center gap-3 py-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>Únete a <strong className="text-foreground">{appConfig.stats.users} {appConfig.stats.userDescription}</strong> que ya confían en {appConfig.name}</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm font-medium text-foreground">{appConfig.stats.rating}/5</span>
                <span className="text-sm text-muted-foreground ml-1">({appConfig.stats.reviewCount} opiniones)</span>
              </div>
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/20">
                <Lock className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium text-foreground">100% Seguro</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/20">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium text-foreground">Sin Instalación</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/20">
                <Globe className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium text-foreground">Compatible con todos los navegadores</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href={appConfig.routes.invoice}>
                <Button size="lg" className="text-base px-8 h-12 rounded-full">
                  Crear Mi Primera Factura Gratis
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-base px-8 h-12 rounded-full">
                Ver Demo Interactiva
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
              Todo lo que necesitas
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Diseño profesional, cálculos automáticos y exportación instantánea. 
              Enfócate en tu negocio, nosotros nos encargamos del resto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Feature 1 */}
            <Card className="group relative hover:bg-accent/5 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                  <Edit3 className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Edición en Tiempo Real</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Olvídate de plantillas aburridas de Excel. Crea facturas que impresionen 
                  a tus clientes en 2 minutos. Agrega tu logo, información del cliente y productos 
                  con un editor tan fácil como escribir un email.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="group relative hover:bg-accent/5 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Diseño Profesional</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Deja de enviar facturas que parecen hechas en 1995. Diseño elegante y moderno 
                  que refleja la calidad de tu trabajo. Tus clientes notarán la diferencia y te 
                  verán más profesional desde el primer vistazo.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="group relative hover:bg-accent/5 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                  <Download className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Exportación Instantánea</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  De la creación a tu bandeja de salida en 30 segundos. Sin complicaciones técnicas, 
                  sin software que instalar. Un clic y tu factura en PDF está lista para enviar. 
                  Tan rápido que te preguntarás cómo lo hacías antes.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 sm:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
              Perfecto para todo tipo de negocios
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Miles de profesionales y empresas confían en {appConfig.name} para su facturación
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Freelancers', desc: 'Factura tus proyectos de forma rápida y profesional' },
              { title: 'Pequeñas Empresas', desc: 'Gestiona tu facturación sin complicaciones técnicas' },
              { title: 'Consultores', desc: 'Presenta facturas elegantes a tus clientes' },
              { title: 'Agencias', desc: 'Crea múltiples facturas para diferentes proyectos' },
              { title: 'Contadores', desc: 'Genera facturas para tus clientes de manera eficiente' },
              { title: 'Startups', desc: 'Solución profesional sin costos iniciales' },
            ].map((useCase, i) => (
              <Card key={i} className="hover:shadow-lg transition-all">
                <CardContent className="flex items-start gap-3 pt-6">
                  <div className="mt-1">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base mb-2">{useCase.title}</CardTitle>
                    <CardDescription>{useCase.desc}</CardDescription>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-24 sm:py-32">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
              ¿Por qué elegir {appConfig.name}?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comparación directa con las alternativas tradicionales
            </p>
          </div>

          <ComparisonTable />

          <div className="mt-12 text-center">
            <Link href={appConfig.routes.invoice}>
              <Button size="lg" className="text-base px-8 h-12 rounded-full">
                Comenzar Gratis Ahora
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 sm:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
              ¿Por qué confiar en {appConfig.name}?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="flex gap-4 pt-6">
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <CardTitle className="text-lg mb-2">Privacidad Garantizada</CardTitle>
                  <CardDescription className="leading-relaxed">
                    Tus datos se procesan localmente en tu navegador. No almacenamos ni compartimos tu información financiera.
                  </CardDescription>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex gap-4 pt-6">
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <CardTitle className="text-lg mb-2">Siempre Disponible</CardTitle>
                  <CardDescription className="leading-relaxed">
                    Accede desde cualquier dispositivo, en cualquier momento. Sin instalaciones ni descargas necesarias.
                  </CardDescription>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex gap-4 pt-6">
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <CardTitle className="text-lg mb-2">Sin Registro Requerido</CardTitle>
                  <CardDescription className="leading-relaxed">
                    Empieza a crear facturas inmediatamente. Sin formularios largos, sin verificaciones de email.
                  </CardDescription>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex gap-4 pt-6">
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <CardTitle className="text-lg mb-2">Actualizaciones Constantes</CardTitle>
                  <CardDescription className="leading-relaxed">
                    Mejoramos continuamente basándonos en el feedback de nuestra comunidad de usuarios.
                  </CardDescription>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 sm:py-32 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-lg text-muted-foreground">
              Todo lo que necesitas saber sobre {appConfig.name}
            </p>
          </div>

          <FAQ />

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              ¿Tienes más preguntas?
            </p>
            <a 
              href={`mailto:${appConfig.contact.email}`} 
              className="text-sm font-medium text-primary hover:underline"
            >
              Contáctanos en {appConfig.contact.email}
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-8">
            Comienza a crear
            <br />
            tus facturas hoy
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Gratis, sin registro, sin complicaciones. 
            Crea facturas profesionales en minutos y descárgalas al instante.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={appConfig.routes.invoice}>
              <Button size="lg" className="text-base px-8 h-12 rounded-full">
                Crear Mi Primera Factura Gratis
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="ghost" className="text-base px-8 h-12 rounded-full">
              Ver Demo Interactiva
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
