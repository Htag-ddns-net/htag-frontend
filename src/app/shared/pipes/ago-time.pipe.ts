import { Pipe, PipeTransform } from '@angular/core';

const INTERVAL = [
  { label: 'year', seconds: 31536000 },
  { label: 'month', seconds: 2592000 },
  { label: 'day', seconds: 86400 },
  { label: 'hour', seconds: 3600 },
  { label: 'minute', seconds: 60 },
  { label: 'second', seconds: 1 },
];

const QUOTES = [
  'I Guess You Guys Aren’t Ready For That Yet. But Your Kids Are Gonna Love It.',
  'Roads? Where We’re Going, We Don’t Need Roads.',
  'Wait A Minute, Doc. Are You Telling Me You Built A Time Machine...Out Of A Hentai?',
];
const QUOTE = QUOTES[Math.floor(Math.random() * QUOTES.length)];

@Pipe({
  name: 'agoTime',
})
export class AgoTimePipe implements PipeTransform {
  transform(value: string): string {
    const seconds = Math.floor((Date.now() - new Date(value).getTime()) / 1000);
    const interval = INTERVAL.find(i => i.seconds < seconds) || {
      label: QUOTE,
      seconds: 1,
    };
    const count = Math.floor(seconds / interval.seconds);

    if (count === 0) {
      return `${interval.label}`;
    }
    if (count === 1) {
      return `${count} ${interval.label} ago`;
    }
    return `${count} ${interval.label}s ago`;
  }
}
