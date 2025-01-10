'use client';

import { useEffect, useState } from 'react';
import { Area, AreaChart } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { cn } from '@/lib/utils';
import { useMe } from '@/providers';
import { setTimeout } from 'timers';

const initialChartData = [
  { month: 'January', balance: 1 },
  { month: 'February', balance: 1 },
  { month: 'March', balance: 1 },
  { month: 'April', balance: 1 },
  { month: 'May', balance: 1 },
  { month: 'June', balance: 1 },
];

const targetChartData = [
  { month: 'January', balance: 1 },
  { month: 'February', balance: 1 },
  { month: 'March', balance: 1 },
  { month: 'April', balance: 1.8 },
  { month: 'May', balance: 1.85 },
  { month: 'June', balance: 1.9 },
];

const chartConfig = {
  balance: {
    label: 'Balance',
    color: '#000',
  },
} satisfies ChartConfig;

export function Chart() {
  const { received } = useMe();
  const [period, setPeriod] = useState('1H');
  const [chartData, setChartData] = useState(initialChartData);

  useEffect(() => {
    const animationDuration = 4000;
    const steps = 244;
    const stepDuration = animationDuration / steps;
    let currentStep = 0;

    const animate = () => {
      const progress = currentStep / steps;
      const newData = initialChartData.map((item, index) => ({
        month: item.month,
        balance: item.balance + (targetChartData[index].balance - item.balance) * progress,
      }));
      setChartData(newData);
      currentStep++;

      if (currentStep <= steps) {
        setTimeout(animate, stepDuration);
      }
    };

    if (received) {
      animate();
    }
  }, [received]);

  return (
    <div className="flex h-[35vh] flex-col items-center justify-center ">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 4,
          }}>
          <defs>
            <linearGradient id="fillArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#000" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#000" stopOpacity={0} />
            </linearGradient>
          </defs>
          {/* <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          /> */}
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
          <Area
            dataKey="balance"
            type="natural"
            fill="url(#fillArea)"
            fillOpacity={1}
            stroke="#000"
            strokeWidth={0}
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
      <div className="flex h-[5vh] w-full items-center justify-center gap-8">
        <button
          className={cn(
            'rounded-full  p-2 text-sm font-bold text-gray-400',
            period === '1H' && 'bg-gray-200 text-gray-800'
          )}
          onClick={() => {
            setPeriod('1H');
          }}>
          1H
        </button>
        <button
          className={cn(
            'rounded-full  p-2 text-sm font-bold text-gray-400',
            period === '1D' && 'bg-gray-200 text-gray-800'
          )}
          onClick={() => {
            setPeriod('1D');
          }}>
          1D
        </button>
        <button
          className={cn(
            'rounded-full  p-2 text-sm font-bold text-gray-400',
            period === '1W' && 'bg-gray-200 text-gray-800'
          )}
          onClick={() => {
            setPeriod('1W');
          }}>
          1W
        </button>
        <button
          className={cn(
            'rounded-full p-2 text-sm font-bold text-gray-400',
            period === '1M' && 'bg-gray-200 text-gray-800'
          )}
          onClick={() => {
            setPeriod('1M');
          }}>
          1M
        </button>
      </div>
    </div>
  );
}
