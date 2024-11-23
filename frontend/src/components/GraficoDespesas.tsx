"use client"

import { useState, useEffect, useMemo } from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart"

// Configuração do gráfico
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
} satisfies ChartConfig

export function GraficoDespesas() {
  const [chartData, setChartData] = useState([
    {visitors: 0}
  ]) // Mantém chartData, mas permite atualização dinâmica

  // Função para buscar dados da API e mapear para o formato necessário
  useEffect(() => {
    async function fetchDespesas() {
      try {
        const response = await fetch("http://localhost:3333/despesas/soma-por-tipo") // Substitua pela URL da API
        const data = await response.json()

        // Mapear dados da API para o formato esperado
        const updatedData = data.map((despesa: { tipo: string; total: string }) => {
          const colorMapping: Record<string, string> = {
            Mercado: "lightblue",
            bandeco: "lightgreen",
            saida: "purple",
            mercado: "lightpink",
          }

          return {
            browser: despesa.tipo,
            visitors: parseFloat(despesa.total),
            fill: colorMapping[despesa.tipo] || "var(--color-other)",
          }
        })

        setChartData(updatedData) // Atualiza o estado com os dados da API
      } catch (error) {
        console.error("Erro ao buscar despesas:", error)
      }
    }

    fetchDespesas()
  }, [])

  
  return (
    <Card className="w-80 h-96 flex flex-col">
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

                    // Evita NaN enquanto os dados da API não estão carregados
                    const totalDespesas = chartData.length
                    ? chartData.reduce((acc, curr) => acc + (Number(curr.visitors) || 0), 0)
                    : 0;

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
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalDespesas.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
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
