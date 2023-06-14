import { CreateComponentDto } from './create-component.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateComponentDto extends PartialType(CreateComponentDto) {}
