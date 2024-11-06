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
export type EndSaleInstructionAccounts = {
  tokenSale: PublicKey | Pda;
  authority?: Signer;
};

// Data.
export type EndSaleInstructionData = { discriminator: Uint8Array };

export type EndSaleInstructionDataArgs = {};

export function getEndSaleInstructionDataSerializer(): Serializer<EndSaleInstructionDataArgs, EndSaleInstructionData> {
  return mapSerializer<EndSaleInstructionDataArgs, any, EndSaleInstructionData>(
    struct<EndSaleInstructionData>([['discriminator', bytes({ size: 8 })]], { description: 'EndSaleInstructionData' }),
    (value) => ({ ...value, discriminator: new Uint8Array([37, 239, 52, 17, 120, 44, 213, 125]) })
  ) as Serializer<EndSaleInstructionDataArgs, EndSaleInstructionData>;
}

// Instruction.
export function endSale(
  context: Pick<Context, 'identity' | 'programs'>,
  input: EndSaleInstructionAccounts
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey('capultTokenSales', 'CPTSoDzrvBad8fW2DWRgXhb2R5pa8sVdBJvZhfhuyYKe');

  // Accounts.
  const resolvedAccounts = {
    tokenSale: { index: 0, isWritable: true as boolean, value: input.tokenSale ?? null },
    authority: { index: 1, isWritable: false as boolean, value: input.authority ?? null },
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
  const data = getEndSaleInstructionDataSerializer().serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([{ instruction: { keys, programId, data }, signers, bytesCreatedOnChain }]);
}
