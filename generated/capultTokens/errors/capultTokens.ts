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

/** Unauthorized: You are not authorized to perform this action. */
export class UnauthorizedError extends ProgramError {
  override readonly name: string = 'Unauthorized';

  readonly code: number = 0x1770; // 6000

  constructor(program: Program, cause?: Error) {
    super('You are not authorized to perform this action.', program, cause);
  }
}
codeToErrorMap.set(0x1770, UnauthorizedError);
nameToErrorMap.set('Unauthorized', UnauthorizedError);

/** NotAllowed: Not allowed */
export class NotAllowedError extends ProgramError {
  override readonly name: string = 'NotAllowed';

  readonly code: number = 0x1771; // 6001

  constructor(program: Program, cause?: Error) {
    super('Not allowed', program, cause);
  }
}
codeToErrorMap.set(0x1771, NotAllowedError);
nameToErrorMap.set('NotAllowed', NotAllowedError);

/** MathOverflow: Math operation overflow */
export class MathOverflowError extends ProgramError {
  override readonly name: string = 'MathOverflow';

  readonly code: number = 0x1772; // 6002

  constructor(program: Program, cause?: Error) {
    super('Math operation overflow', program, cause);
  }
}
codeToErrorMap.set(0x1772, MathOverflowError);
nameToErrorMap.set('MathOverflow', MathOverflowError);

/** InvalidMetadataProgram: Invalid metadata program */
export class InvalidMetadataProgramError extends ProgramError {
  override readonly name: string = 'InvalidMetadataProgram';

  readonly code: number = 0x1773; // 6003

  constructor(program: Program, cause?: Error) {
    super('Invalid metadata program', program, cause);
  }
}
codeToErrorMap.set(0x1773, InvalidMetadataProgramError);
nameToErrorMap.set('InvalidMetadataProgram', InvalidMetadataProgramError);

/** InvalidTokenProgram: Invalid token program */
export class InvalidTokenProgramError extends ProgramError {
  override readonly name: string = 'InvalidTokenProgram';

  readonly code: number = 0x1774; // 6004

  constructor(program: Program, cause?: Error) {
    super('Invalid token program', program, cause);
  }
}
codeToErrorMap.set(0x1774, InvalidTokenProgramError);
nameToErrorMap.set('InvalidTokenProgram', InvalidTokenProgramError);

/** TokenMintMismatch: Token details and token mint account mismatch */
export class TokenMintMismatchError extends ProgramError {
  override readonly name: string = 'TokenMintMismatch';

  readonly code: number = 0x1775; // 6005

  constructor(program: Program, cause?: Error) {
    super('Token details and token mint account mismatch', program, cause);
  }
}
codeToErrorMap.set(0x1775, TokenMintMismatchError);
nameToErrorMap.set('TokenMintMismatch', TokenMintMismatchError);

/** TokenProgramMismatch: Token program mismatch */
export class TokenProgramMismatchError extends ProgramError {
  override readonly name: string = 'TokenProgramMismatch';

  readonly code: number = 0x1776; // 6006

  constructor(program: Program, cause?: Error) {
    super('Token program mismatch', program, cause);
  }
}
codeToErrorMap.set(0x1776, TokenProgramMismatchError);
nameToErrorMap.set('TokenProgramMismatch', TokenProgramMismatchError);

/** InvalidDecimals: Invalid decimals */
export class InvalidDecimalsError extends ProgramError {
  override readonly name: string = 'InvalidDecimals';

  readonly code: number = 0x1777; // 6007

  constructor(program: Program, cause?: Error) {
    super('Invalid decimals', program, cause);
  }
}
codeToErrorMap.set(0x1777, InvalidDecimalsError);
nameToErrorMap.set('InvalidDecimals', InvalidDecimalsError);

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
