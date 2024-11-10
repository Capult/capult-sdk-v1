/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import { Context, Pda, PublicKey, Signer, TransactionBuilder, transactionBuilder } from '@metaplex-foundation/umi';
import { Serializer, bytes, mapSerializer, struct, u64 } from '@metaplex-foundation/umi/serializers';
import { ResolvedAccount, ResolvedAccountsWithIndices, getAccountMetasAndSigners } from '../shared';

// Accounts.
export type SetRewardConfigInstructionAccounts = {
  programConfig?: PublicKey | Pda;
  authority?: Signer;
};

// Data.
export type SetRewardConfigInstructionData = {
  discriminator: Uint8Array;
  ataInitReward: bigint;
  autoClaimReward: bigint;
};

export type SetRewardConfigInstructionDataArgs = { ataInitReward: number | bigint; autoClaimReward: number | bigint };

export function getSetRewardConfigInstructionDataSerializer(): Serializer<
  SetRewardConfigInstructionDataArgs,
  SetRewardConfigInstructionData
> {
  return mapSerializer<SetRewardConfigInstructionDataArgs, any, SetRewardConfigInstructionData>(
    struct<SetRewardConfigInstructionData>(
      [
        ['discriminator', bytes({ size: 8 })],
        ['ataInitReward', u64()],
        ['autoClaimReward', u64()],
      ],
      { description: 'SetRewardConfigInstructionData' }
    ),
    (value) => ({ ...value, discriminator: new Uint8Array([163, 34, 211, 14, 25, 118, 181, 233]) })
  ) as Serializer<SetRewardConfigInstructionDataArgs, SetRewardConfigInstructionData>;
}

// Args.
export type SetRewardConfigInstructionArgs = SetRewardConfigInstructionDataArgs;

// Instruction.
export function setRewardConfig(
  context: Pick<Context, 'eddsa' | 'identity' | 'programs'>,
  input: SetRewardConfigInstructionAccounts & SetRewardConfigInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'capultTokenLockVaults',
    'CPTLVeSKEXbPNZ4WnHTTGBX4J2uV3ktv3YkL9i7wSPwC'
  );

  // Accounts.
  const resolvedAccounts = {
    programConfig: { index: 0, isWritable: true as boolean, value: input.programConfig ?? null },
    authority: { index: 1, isWritable: false as boolean, value: input.authority ?? null },
  } satisfies ResolvedAccountsWithIndices;

  // Arguments.
  const resolvedArgs: SetRewardConfigInstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.programConfig.value) {
    resolvedAccounts.programConfig.value = context.eddsa.findPda(programId, [
      bytes().serialize(new Uint8Array([80, 82, 79, 71, 82, 65, 77, 95, 67, 79, 78, 70, 73, 71, 95, 83, 69, 69, 68])),
    ]);
  }
  if (!resolvedAccounts.authority.value) {
    resolvedAccounts.authority.value = context.identity;
  }

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(resolvedAccounts).sort((a, b) => a.index - b.index);

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(orderedAccounts, 'programId', programId);

  // Data.
  const data = getSetRewardConfigInstructionDataSerializer().serialize(
    resolvedArgs as SetRewardConfigInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([{ instruction: { keys, programId, data }, signers, bytesCreatedOnChain }]);
}
