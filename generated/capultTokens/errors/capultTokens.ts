/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import { Program, ProgramError } from '@metaplex-foundation/umi';

type ProgramErrorConstructor = new (program: Program, cause?: Error) => ProgramError;
const codeToErrorMap: Map<number, ProgramErrorConstructor> = new Map();
const nameToErrorMap: Map<string, ProgramErrorConstructor> = new Map();

/** NotAuthorized: You are not authorized to perform this action. */
export class NotAuthorizedError extends ProgramError {
  override readonly name: string = 'NotAuthorized';

  readonly code: number = 0x1770; // 6000

  constructor(program: Program, cause?: Error) {
    super('You are not authorized to perform this action.', program, cause);
  }
}
codeToErrorMap.set(0x1770, NotAuthorizedError);
nameToErrorMap.set('NotAuthorized', NotAuthorizedError);

/** TokenMintMismatch: Token details and token mint account mismatch */
export class TokenMintMismatchError extends ProgramError {
  override readonly name: string = 'TokenMintMismatch';

  readonly code: number = 0x1771; // 6001

  constructor(program: Program, cause?: Error) {
    super('Token details and token mint account mismatch', program, cause);
  }
}
codeToErrorMap.set(0x1771, TokenMintMismatchError);
nameToErrorMap.set('TokenMintMismatch', TokenMintMismatchError);

/**
 * Attempts to resolve a custom program error from the provided error code.
 * @category Errors
 */
export function getCapultTokensErrorFromCode(code: number, program: Program, cause?: Error): ProgramError | null {
  const constructor = codeToErrorMap.get(code);
  return constructor ? new constructor(program, cause) : null;
}

/**
 * Attempts to resolve a custom program error from the provided error name, i.e. 'Unauthorized'.
 * @category Errors
 */
export function getCapultTokensErrorFromName(name: string, program: Program, cause?: Error): ProgramError | null {
  const constructor = nameToErrorMap.get(name);
  return constructor ? new constructor(program, cause) : null;
}
