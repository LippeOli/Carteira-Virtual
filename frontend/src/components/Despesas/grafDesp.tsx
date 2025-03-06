"use client"

import { useState, useEffect } from "react"
import { TrendingUp, RefreshCw } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"

// Configuração do gráfico
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
} satisfies ChartConfig

// Adicionamos uma propriedade opcional para receber a referência da função
interface GrafDespProps {
  onInitialize?: (recarregarFn: () => Promise<void>) => void;
}

// Adicionamos uma propriedade opcional para receber a referência da função
interface GrafDespProps {
  onInitialize?: (recarregarFn: () => Promise<void>) => void;
}

export function GrafDesp({ onInitialize }: GrafDespProps) {
  const [chartData, setChartData] = useState([
    { visitors: 0 }
  ])
  const [isLoading, setIsLoading] = useState(false)

  // Função para buscar dados da API extraída para fora do useEffect
  const fetchDespesas = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:3333/despesas/soma")
      const data = await response.json()

      // Mapear dados da API para o formato esperado
      const updatedData = data.map((despesa: { tipo: string; total: string }) => {
        const colorMapping: Record<string, string> = {
          comida: "lightblue",
          milho: "lightgreen",
          bebida: "purple",
          transporte: "lightpink",
        }

        return {
          browser: despesa.tipo,
          visitors: parseFloat(despesa.total),
          fill: colorMapping[despesa.tipo] || "var(--color-other)",
        }
      })

      setChartData(updatedData)
    } catch (error) {
      console.error("Erro ao buscar despesas:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Função explícita para recarregar o gráfico que pode ser chamada de qualquer lugar
  const recarregarGrafico = () => {
    fetchDespesas()
  }

  // Efeito para carregar os dados inicialmente e expor a função de recarga
  useEffect(() => {
    fetchDespesas()
    
    // Se a prop onInitialize for fornecida, passamos a função recarregarGrafico
    if (onInitialize) {
      onInitialize(fetchDespesas)
    }
  }, [onInitialize])

  // Calcular o total das despesas
  const totalDespesas = chartData.length
    ? chartData.reduce((acc, curr) => acc + (Number(curr.visitors) || 0), 0)
    : 0;

  return (
    <Card className="w-80 h-96 flex flex-col bg-slate-900 border-slate-600">
      <CardHeader className="items-center pb-0">
        <CardTitle>Despesas - Mensais</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData} 
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-slate-300 text-3xl font-bold"
                        >
                          {isLoading ? '...' : totalDespesas.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-slate-300 text-sm"
                        >
                          $$ Reais
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}