'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Check, Moon, Sun, Maximize2, PenTool, Sparkle, Briefcase } from 'lucide-react'
import { Card } from '@/src/components/ui/card'
import { Button } from '@/src/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/src/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui/tabs'

export function InvoiceShowcase() {
    const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light')

    const features = [
        { icon: Check, text: 'PDF de alta calidad' },
        { icon: Check, text: '2 temas incluidos' },
        { icon: Check, text: 'Sin marcas de agua' },
    ]

    return (
        <section className="py-24 sm:py-32 bg-linear-to-b from-background to-muted/30">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
                        Facturas que te hacen ver como
                        <br />
                        <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            la empresa seria que eres
                        </span>
                    </h2>
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                        Tema claro para el día. Tema oscuro para impresionar.
                        <br />
                        Siempre profesional, siempre listo.
                    </p>
                </div>

                {/* Theme Toggle Tabs */}
                <Tabs defaultValue="light" className="w-full">
                    <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 h-12">
                        <TabsTrigger value="light" className="text-base gap-2 hover:cursor-pointer dark:data-[state=active]:bg-foreground/10">
                            <Briefcase className="size-5" />
                            Clásico
                        </TabsTrigger>
                        <TabsTrigger value="dark" className="text-base gap-2 hover:cursor-pointer dark:data-[state=active]:bg-foreground/10">
                            <Sparkle className="size-5" />
                            Moderno
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="light" className="mt-0">
                        <div className="max-w-4xl w-fit mx-auto">
                            <Card className="overflow-hidden w-fit border-2 shadow-2xl hover:shadow-3xl transition-shadow duration-300 py-0">
                                <div className="relative group">
                                    <Image
                                        src="/images/examples/invoice-light.jpg"
                                        alt="Ejemplo de factura con tema claro - Paper Kit"
                                        height={1200}
                                        width={800}
                                        className="h-[900px] w-fit"
                                        preload
                                    />
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                size="icon"
                                                variant="secondary"
                                                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg"
                                            >
                                                <Maximize2 className="w-4 h-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-5xl w-full p-2">
                                            <Image
                                                src="/images/examples/invoice-light.jpg"
                                                alt="Ejemplo de factura con tema claro - Paper Kit"
                                                height={1200}
                                                width={800}
                                                className="w-full h-auto rounded-lg"
                                                preload
                                            />
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="dark" className="mt-0">
                        <div className="max-w-4xl w-fit mx-auto">
                            <Card className="overflow-hidden border-2 shadow-2xl hover:shadow-3xl transition-shadow duration-300 py-0">
                                <div className="relative group">
                                    <Image
                                        src="/images/examples/invoice-dark.jpg"
                                        alt="Ejemplo de factura con tema oscuro - Paper Kit"
                                        height={1200}
                                        width={800}
                                        className="h-[900px] w-fit"
                                        preload
                                    />
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                size="icon"
                                                variant="secondary"
                                                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg"
                                            >
                                                <Maximize2 className="w-4 h-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-5xl w-full p-2">
                                            <Image
                                                src="/images/examples/invoice-dark.jpg"
                                                alt="Ejemplo de factura con tema oscuro - Paper Kit"
                                                height={1200}
                                                width={800}
                                                className="w-full h-auto rounded-lg"
                                                preload
                                            />
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto mt-12">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 justify-center p-4 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors"
                        >
                            <feature.icon className="w-4 h-4 text-primary shrink-0" />
                            <span className="text-sm font-medium text-foreground">{feature.text}</span>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-12">
                    <p className="text-sm text-muted-foreground mb-4">
                        ¿Listo para crear facturas así de profesionales?
                    </p>
                    <Button size="lg" className="text-base px-8 h-12 rounded-full">
                        Crea la tuya ahora - Es gratis
                    </Button>
                </div>
            </div>
        </section>
    )
}
