'use client';

import { NumberTicker } from '@/components/ui/number-ticker';
import { useMe } from '@/providers';
import { Anybody } from 'next/font/google';
const anybody = Anybody({ subsets: ['latin'] });

export function Balance() {
  const { received } = useMe();

  return (
    <div className="flex h-[20vh] w-auto items-center justify-center">
      <h1 className={`px-2 text-7xl font-black ${anybody.className}`}>
        $
        {received ? (
          <NumberTicker value={2.76} decimalPlaces={2} delay={0} from={0} />
        ) : (
          <NumberTicker value={0} decimalPlaces={0} delay={0} from={0} />
        )}
      </h1>
    </div>
  );
}
