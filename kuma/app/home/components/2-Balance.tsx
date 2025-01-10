'use client';

import { NumberTicker } from '@/components/ui/number-ticker';
import { useMe } from '@/providers';
import { Anybody } from 'next/font/google';
const anybody = Anybody({ subsets: ['latin'] });

export function Balance() {
  const { balances } = useMe();

  const totalBalance = parseFloat(balances.balance) + parseFloat(balances.stakedBalance);

  return (
    <div className="flex h-[20vh] w-auto items-center justify-center">
      <h1 className={`px-2 text-7xl font-black ${anybody.className}`}>
        $
        {balances.balance ? (
          <NumberTicker value={totalBalance} decimalPlaces={2} delay={0} from={0} />
        ) : (
          'NOT LOADED'
        )}
      </h1>
    </div>
  );
}