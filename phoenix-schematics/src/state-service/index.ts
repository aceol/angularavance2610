import {
  apply,
  chain,
  mergeWith,
  move,
  Rule,
  strings,
  template,
  url,
} from '@angular-devkit/schematics';
import { Schema } from './schema';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function stateService(options: Schema): Rule {
  return (tree, context) => {
    // Définit le chemin de destination dans le projet Angular
    const path = `src/app/${strings.dasherize(options.name)}`;

    const templateSource = url('./files');
    const templateProcessed = apply(templateSource, [
      template({
        ...options,
        ...strings,
      }),
      move(path),
    ]);

    return chain([mergeWith(templateProcessed)])(tree, context);
  };
}
