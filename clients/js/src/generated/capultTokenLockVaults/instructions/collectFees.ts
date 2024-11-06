/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import { Context, Pda, PublicKey, Signer, TransactionBuilder, transactionBuilder } from '@metaplex-foundation/umi';
import { Serializer, bytes, mapSerializer, struct } from '@metaplex-foundation/umi/serializers';
import { ResolvedAccount, ResolvedAccountsWithIndices, getAccountMetasAndSigners } from '../shared';

// Accounts.
export type CollectFeesInstructionAccounts = {
  withdrawAuthority: Signer;
  recipient: PublicKey | Pda;
  programConfig: PublicKey | Pda;
};

// Data.
export type CollectFeesInstructionData = { discriminator: Uint8Array };

export type CollectFeesInstructionDataArgs = {};

export function getCollectFeesInstructionDataSerializer(): Serializer<
  CollectFeesInstructionDataArgs,
  CollectFeesInstructionData
> {
  return mapSerializer<CollectFeesInstructionDataArgs, any, CollectFeesInstructionData>(
    struct<CollectFeesInstructionData>([['discriminator', bytes({ size: 8 })]], {
      description: 'CollectFeesInstructionData',
    }),
    (value) => ({ ...value, discriminator: new Uint8Array([164, 152, 207, 99, 30, 186, 19, 182]) })
  ) as Serializer<CollectFeesInstructionDataArgs, CollectFeesInstructionData>;
}

// Instruction.
export function collectFees(
  context: Pick<Context, 'programs'>,
  input: CollectFeesInstructionAccounts
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'capultTokenLockVaults',
    'CPTLVeSKEXbPNZ4WnHTTGBX4J2uV3ktv3YkL9i7wSPwC'
  );

  // Accounts.
  const resolvedAccounts = {
    withdrawAuthority: { index: 0, isWritable: false as boolean, value: input.withdrawAuthority ?? null },
    recipient: { index: 1, isWritable: true as boolean, value: input.recipient ?? null },
    programConfig: { index: 2, isWritable: false as boolean, value: input.programConfig ?? null },
  } satisfies ResolvedAccountsWithIndices;

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(resolvedAccounts).sort((a, b) => a.index - b.index);

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(orderedAccounts, 'programId', programId);

  // Data.
  const data = getCollectFeesInstructionDataSerializer().serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([{ instruction: { keys, programId, data }, signers, bytesCreatedOnChain }]);
}
