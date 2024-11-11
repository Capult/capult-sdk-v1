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
export type WithdrawRoyaltyInstructionAccounts = {
  royaltyConfig: PublicKey | Pda;
  withdrawAuthority: Signer;
  recipient?: PublicKey | Pda;
};

// Data.
export type WithdrawRoyaltyInstructionData = { discriminator: Uint8Array; lamportsToWithdraw: bigint };

export type WithdrawRoyaltyInstructionDataArgs = { lamportsToWithdraw: number | bigint };

export function getWithdrawRoyaltyInstructionDataSerializer(): Serializer<
  WithdrawRoyaltyInstructionDataArgs,
  WithdrawRoyaltyInstructionData
> {
  return mapSerializer<WithdrawRoyaltyInstructionDataArgs, any, WithdrawRoyaltyInstructionData>(
    struct<WithdrawRoyaltyInstructionData>(
      [
        ['discriminator', bytes({ size: 8 })],
        ['lamportsToWithdraw', u64()],
      ],
      { description: 'WithdrawRoyaltyInstructionData' }
    ),
    (value) => ({ ...value, discriminator: new Uint8Array([205, 93, 10, 10, 48, 197, 1, 85]) })
  ) as Serializer<WithdrawRoyaltyInstructionDataArgs, WithdrawRoyaltyInstructionData>;
}

// Args.
export type WithdrawRoyaltyInstructionArgs = WithdrawRoyaltyInstructionDataArgs;

// Instruction.
export function withdrawRoyalty(
  context: Pick<Context, 'identity' | 'programs'>,
  input: WithdrawRoyaltyInstructionAccounts & WithdrawRoyaltyInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'capultTokenLockVaults',
    'CPTLVeSKEXbPNZ4WnHTTGBX4J2uV3ktv3YkL9i7wSPwC'
  );

  // Accounts.
  const resolvedAccounts = {
    royaltyConfig: { index: 0, isWritable: true as boolean, value: input.royaltyConfig ?? null },
    withdrawAuthority: { index: 1, isWritable: false as boolean, value: input.withdrawAuthority ?? null },
    recipient: { index: 2, isWritable: true as boolean, value: input.recipient ?? null },
  } satisfies ResolvedAccountsWithIndices;

  // Arguments.
  const resolvedArgs: WithdrawRoyaltyInstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.recipient.value) {
    resolvedAccounts.recipient.value = context.identity.publicKey;
  }

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(resolvedAccounts).sort((a, b) => a.index - b.index);

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(orderedAccounts, 'programId', programId);

  // Data.
  const data = getWithdrawRoyaltyInstructionDataSerializer().serialize(
    resolvedArgs as WithdrawRoyaltyInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([{ instruction: { keys, programId, data }, signers, bytesCreatedOnChain }]);
}
