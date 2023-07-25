import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  public transform(value: any, metadata: ArgumentMetadata) {
    let formattedValue = '0';

    if (typeof value === 'number' || !isNaN(parseInt(value, 10))) {
      if (typeof value === 'number') formattedValue = value.toString(10);
      else formattedValue = value;

      formattedValue = formattedValue.replace(
        /(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g,
        '$1' + ' ',
      );
    }

    formattedValue += ' RUB';

    return formattedValue;
  }
}
