import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit?: number): string {
    if (!value) return '';
    const actualLimit = limit ?? 30;
    return value.length > actualLimit ? value.slice(0, actualLimit) + '...' : value;
  }
}
