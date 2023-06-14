import { ComponentType } from '../common/component.enum';

export class CreateComponentDto {
  type: ComponentType;
  content: string;
}
