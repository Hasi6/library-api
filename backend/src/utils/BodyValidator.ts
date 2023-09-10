import { validationResult } from 'express-validator';

function bodyValidator(): (
  target: object,
  functionName: string,
  descriptor: PropertyDescriptor
) => PropertyDescriptor {
  return function (_target: object, _functionName: string, descriptor: PropertyDescriptor) {
    const originalMethod: any = descriptor.value;

    descriptor.value = async function (...args: any) {
      const errors = validationResult(args[0]);
      if (!errors.isEmpty()) {
        return args[1].status(400).json({ success: false, errors: errors.array(), data: null });
      }

      const output: object = await originalMethod.apply(this, args);
      return output;
    };

    return descriptor;
  };
}
export { bodyValidator as BodyValidator };
