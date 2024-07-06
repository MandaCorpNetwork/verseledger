import chalk from 'chalk';
export const methodToColor = (method: string) => {
  switch (method) {
    case 'GET': {
      return chalk.bold.green('GET');
    }
    case 'POST': {
      return chalk.bold.yellow('POST');
    }
    case 'PUT': {
      return chalk.bold.blue('PUT');
    }
    case 'PATCH': {
      return chalk.bold.keyword('purple')('PATCH');
    }
    case 'DELETE': {
      return chalk.bold.red('DELETE');
    }
    case 'HEAD': {
      return chalk.bold.green('HEAD');
    }
    case 'OPTIONS': {
      return chalk.bold.magenta('OPTIONS');
    }
    default: {
      return chalk.bold.bgRed(method);
    }
  }
};
