import { Check, FileText } from 'lucide-react'
import { Card, CardContent } from '@/src/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table'
import { appConfig } from '@/src/lib/config'

const comparisonData = [
  { 
    feature: 'Tiempo de configuración', 
    app: '0 minutos', 
    excel: '30 minutos', 
    software: '2+ horas', 
    highlight: true 
  },
  { 
    feature: 'Costo mensual', 
    app: '$0', 
    excel: '$0-15', 
    software: '$30-100', 
    highlight: true 
  },
  { 
    feature: 'Diseño profesional', 
    app: 'check', 
    excel: 'no', 
    software: 'Limitado', 
    highlight: false 
  },
  { 
    feature: 'Facilidad de uso', 
    app: 'check', 
    excel: 'Media', 
    software: 'Complejo', 
    highlight: false 
  },
  { 
    feature: 'Acceso desde cualquier lugar', 
    app: 'check', 
    excel: 'no', 
    software: 'check', 
    highlight: false 
  },
  { 
    feature: 'Actualizaciones automáticas', 
    app: 'check', 
    excel: 'no', 
    software: 'check', 
    highlight: false 
  },
  { 
    feature: 'Exportación a PDF', 
    app: 'check', 
    excel: 'Manual', 
    software: 'check', 
    highlight: false 
  },
]

export function ComparisonTable() {
  return (
    <>
      {/* Mobile Card Layout */}
      <div className="lg:hidden space-y-4">
        {comparisonData.map((row, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-muted/30 px-4 py-3 border-b border-border">
                <h3 className="font-semibold text-sm text-foreground">{row.feature}</h3>
              </div>
              <div className="grid grid-cols-3 gap-3 p-4">
                {/* App */}
                <div className="flex flex-col items-center justify-center text-center gap-2">
                  <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground mb-1">
                    <FileText className="w-3 h-3 text-primary" />
                    <span>{appConfig.name}</span>
                  </div>
                  {row.app === 'check' ? (
                    <Check className="w-5 h-5 text-primary" />
                  ) : (
                    <span className={`text-sm font-medium ${row.highlight ? 'text-primary' : 'text-foreground'}`}>
                      {row.highlight && <Check className="w-3 h-3 inline mr-1" />}
                      {row.app}
                    </span>
                  )}
                </div>
                {/* Excel/Word */}
                <div className="flex flex-col items-center justify-center text-center gap-2">
                  <span className="text-xs text-muted-foreground mb-1">Excel/Word</span>
                  {row.excel === 'no' ? (
                    <span className="text-muted-foreground text-xl">✗</span>
                  ) : (
                    <span className={`text-sm ${row.excel === 'Media' ? 'text-yellow-500' : 'text-muted-foreground'}`}>
                      {row.excel}
                    </span>
                  )}
                </div>
                {/* Software */}
                <div className="flex flex-col items-center justify-center text-center gap-2">
                  <span className="text-xs text-muted-foreground mb-1">Software</span>
                  {row.software === 'check' ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <span className={`text-sm ${row.software === 'Limitado' || row.software === 'Complejo' ? 'text-yellow-500' : 'text-muted-foreground'}`}>
                      {row.software}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden lg:block">
        <div className="overflow-hidden border border-border rounded-2xl shadow-sm">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="text-left font-semibold text-foreground">
                  Característica
                </TableHead>
                <TableHead className="text-center font-semibold text-foreground">
                  <div className="flex flex-col items-center gap-1">
                    <FileText className="w-5 h-5 text-primary" />
                    <span>{appConfig.name}</span>
                  </div>
                </TableHead>
                <TableHead className="text-center font-semibold text-muted-foreground">
                  Excel/Word
                </TableHead>
                <TableHead className="text-center font-semibold text-muted-foreground">
                  Software de Contabilidad
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-normal">Tiempo de configuración</TableCell>
                <TableCell className="text-center">
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    <Check className="w-4 h-4" />
                    0 minutos
                  </span>
                </TableCell>
                <TableCell className="text-center text-muted-foreground">30 minutos</TableCell>
                <TableCell className="text-center text-muted-foreground">2+ horas</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-normal">Costo mensual</TableCell>
                <TableCell className="text-center">
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    <Check className="w-4 h-4" />
                    $0
                  </span>
                </TableCell>
                <TableCell className="text-center text-muted-foreground">$0-15</TableCell>
                <TableCell className="text-center text-muted-foreground">$30-100</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-normal">Diseño profesional</TableCell>
                <TableCell className="text-center">
                  <Check className="w-5 h-5 text-primary mx-auto" />
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-muted-foreground text-xl">✗</span>
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-yellow-500 text-sm">Limitado</span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-normal">Facilidad de uso</TableCell>
                <TableCell className="text-center">
                  <Check className="w-5 h-5 text-primary mx-auto" />
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-yellow-500 text-sm">Media</span>
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-muted-foreground text-sm">Complejo</span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-normal">Acceso desde cualquier lugar</TableCell>
                <TableCell className="text-center">
                  <Check className="w-5 h-5 text-primary mx-auto" />
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-muted-foreground text-xl">✗</span>
                </TableCell>
                <TableCell className="text-center">
                  <Check className="w-5 h-5 text-green-500 mx-auto" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-normal">Actualizaciones automáticas</TableCell>
                <TableCell className="text-center">
                  <Check className="w-5 h-5 text-primary mx-auto" />
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-muted-foreground text-xl">✗</span>
                </TableCell>
                <TableCell className="text-center">
                  <Check className="w-5 h-5 text-green-500 mx-auto" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-normal">Exportación a PDF</TableCell>
                <TableCell className="text-center">
                  <Check className="w-5 h-5 text-primary mx-auto" />
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-yellow-500 text-sm">Manual</span>
                </TableCell>
                <TableCell className="text-center">
                  <Check className="w-5 h-5 text-green-500 mx-auto" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
