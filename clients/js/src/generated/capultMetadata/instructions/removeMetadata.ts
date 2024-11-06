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
export type RemoveMetadataInstructionAccounts = {
  metadata: PublicKey | Pda;
  capultOwnedPda: PublicKey | Pda;
  authority?: Signer;
  recipient: PublicKey | Pda;
};

// Data.
export type RemoveMetadataInstructionData = { discriminator: Uint8Array };

export type RemoveMetadataInstructionDataArgs = {};

export function getRemoveMetadataInstructionDataSerializer(): Serializer<
  RemoveMetadataInstructionDataArgs,
  RemoveMetadataInstructionData
> {
  return mapSerializer<RemoveMetadataInstructionDataArgs, any, RemoveMetadataInstructionData>(
    struct<RemoveMetadataInstructionData>([['discriminator', bytes({ size: 8 })]], {
      description: 'RemoveMetadataInstructionData',
    }),
    (value) => ({ ...value, discriminator: new Uint8Array([81, 68, 231, 49, 91, 8, 111, 160]) })
  ) as Serializer<RemoveMetadataInstructionDataArgs, RemoveMetadataInstructionData>;
}

// Instruction.
export function removeMetadata(
  context: Pick<Context, 'identity' | 'programs'>,
  input: RemoveMetadataInstructionAccounts
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey('capultMetadata', 'CPMDk1zycejhBAPLUiCrYfQWDD5Kdi19zzM4s1ts6EkQ');

  // Accounts.
  const resolvedAccounts = {
    metadata: { index: 0, isWritable: true as boolean, value: input.metadata ?? null },
    capultOwnedPda: { index: 1, isWritable: false as boolean, value: input.capultOwnedPda ?? null },
    authority: { index: 2, isWritable: false as boolean, value: input.authority ?? null },
    recipient: { index: 3, isWritable: true as boolean, value: input.recipient ?? null },
  } satisfies ResolvedAccountsWithIndices;

  // Default values.
  if (!resolvedAccounts.authority.value) {
    resolvedAccounts.authority.value = context.identity;
  }

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(resolvedAccounts).sort((a, b) => a.index - b.index);

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(orderedAccounts, 'programId', programId);

  // Data.
  const data = getRemoveMetadataInstructionDataSerializer().serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([{ instruction: { keys, programId, data }, signers, bytesCreatedOnChain }]);
}
