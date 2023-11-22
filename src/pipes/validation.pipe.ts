import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from 'src/expections/validation.excpetion';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const object = plainToClass(metadata.metatype, value);

    const errors = await validate(object);

    if (errors.length) {
      // eslint-disable-next-line prefer-const
      let message = errors.map((errors) => {
        return `${errors.property} - ${Object.values(errors.constraints).join(
          ', ',
        )}`;
      });

      throw new ValidationException(message);
    }
    return value;
  }
}
