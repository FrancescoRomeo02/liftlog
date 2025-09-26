"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";

export function AvatarCarousel({
  onSelectAction,
}: {
  onSelectAction?: (id: number) => void;
}) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    onSelectAction?.(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      const selected = api.selectedScrollSnap() + 1;
      setCurrent(selected);
      onSelectAction?.(selected);
    });
  }, [api, onSelectAction]);

  return (
    <div className="mx-auto max-w-xs">
      <Carousel
        setApi={setApi}
        className="w-full max-w-xs"
        opts={{ loop: true }}
      >
        <CarouselContent>
          {Array.from({ length: 4 }).map((_, index) => (
            <CarouselItem key={index}>
              <Card className="bg-transparent border-transparent">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <Image
                    src={`/avatars/${index + 1}.svg`}
                    alt={`Avatar ${index + 1}`}
                    width={720}
                    height={720}
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="text-muted-foreground py-2 text-center text-sm">
        Avatar {current} of {count}
      </div>
    </div>
  );
}
