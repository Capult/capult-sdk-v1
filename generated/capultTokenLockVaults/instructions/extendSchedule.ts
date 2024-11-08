/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import { Context, Pda, PublicKey, Signer, TransactionBuilder, transactionBuilder } from '@metaplex-foundation/umi';
import { Serializer, bytes, i64, mapSerializer, struct } from '@metaplex-foundation/umi/serializers';
import { ResolvedAccount, ResolvedAccountsWithIndices, getAccountMetasAndSigners } from '../shared';

// Accounts.
export type ExtendScheduleInstructionAccounts = {
  tokenLockVault: PublicKey | Pda;
  withdrawAuthority: Signer;
};

// Data.
export type ExtendScheduleInstructionData = { discriminator: Uint8Array; newEndDate: bigint };

export type ExtendScheduleInstructionDataArgs = { newEndDate: number | bigint };

export function getExtendScheduleInstructionDataSerializer(): Serializer<
  ExtendScheduleInstructionDataArgs,
  ExtendScheduleInstructionData
> {
  return mapSerializer<ExtendScheduleInstructionDataArgs, any, ExtendScheduleInstructionData>(
    struct<ExtendScheduleInstructionData>(
      [
        ['discriminator', bytes({ size: 8 })],
        ['newEndDate', i64()],
      ],
      { description: 'ExtendScheduleInstructionData' }
    ),
    (value) => ({ ...value, discriminator: new Uint8Array([93, 234, 12, 90, 58, 84, 74, 38]) })
  ) as Serializer<ExtendScheduleInstructionDataArgs, ExtendScheduleInstructionData>;
}

// Args.
export type ExtendScheduleInstructionArgs = ExtendScheduleInstructionDataArgs;

// Instruction.
export function extendSchedule(
  context: Pick<Context, 'programs'>,
  input: ExtendScheduleInstructionAccounts & ExtendScheduleInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'capultTokenLockVaults',
    'CPTLVeSKEXbPNZ4WnHTTGBX4J2uV3ktv3YkL9i7wSPwC'
  );

  // Accounts.
  const resolvedAccounts = {
    tokenLockVault: { index: 0, isWritable: true as boolean, value: input.tokenLockVault ?? null },
    withdrawAuthority: { index: 1, isWritable: false as boolean, value: input.withdrawAuthority ?? null },
  } satisfies ResolvedAccountsWithIndices;

  // Arguments.
  const resolvedArgs: ExtendScheduleInstructionArgs = { ...input };

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(resolvedAccounts).sort((a, b) => a.index - b.index);

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(orderedAccounts, 'programId', programId);

  // Data.
  const data = getExtendScheduleInstructionDataSerializer().serialize(
    resolvedArgs as ExtendScheduleInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([{ instruction: { keys, programId, data }, signers, bytesCreatedOnChain }]);
}
