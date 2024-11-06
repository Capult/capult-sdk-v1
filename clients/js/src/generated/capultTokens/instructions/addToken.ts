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
export type AddTokenInstructionAccounts = {
  tokenDetails: PublicKey | Pda;
  authority?: Signer;
  tokenMint: PublicKey | Pda;
  systemProgram?: PublicKey | Pda;
};

// Data.
export type AddTokenInstructionData = { discriminator: Uint8Array };

export type AddTokenInstructionDataArgs = {};

export function getAddTokenInstructionDataSerializer(): Serializer<
  AddTokenInstructionDataArgs,
  AddTokenInstructionData
> {
  return mapSerializer<AddTokenInstructionDataArgs, any, AddTokenInstructionData>(
    struct<AddTokenInstructionData>([['discriminator', bytes({ size: 8 })]], {
      description: 'AddTokenInstructionData',
    }),
    (value) => ({ ...value, discriminator: new Uint8Array([237, 255, 26, 54, 56, 48, 68, 52]) })
  ) as Serializer<AddTokenInstructionDataArgs, AddTokenInstructionData>;
}

// Instruction.
export function addToken(
  context: Pick<Context, 'identity' | 'programs'>,
  input: AddTokenInstructionAccounts
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey('capultTokens', 'CPLT8dWFQ1VH4ZJkvqSrLLFFPtCcKDm4XJ51t4K4mEiN');

  // Accounts.
  const resolvedAccounts = {
    tokenDetails: { index: 0, isWritable: true as boolean, value: input.tokenDetails ?? null },
    authority: { index: 1, isWritable: true as boolean, value: input.authority ?? null },
    tokenMint: { index: 2, isWritable: false as boolean, value: input.tokenMint ?? null },
    systemProgram: { index: 3, isWritable: false as boolean, value: input.systemProgram ?? null },
  } satisfies ResolvedAccountsWithIndices;

  // Default values.
  if (!resolvedAccounts.authority.value) {
    resolvedAccounts.authority.value = context.identity;
  }
  if (!resolvedAccounts.systemProgram.value) {
    resolvedAccounts.systemProgram.value = context.programs.getPublicKey(
      'splSystem',
      '11111111111111111111111111111111'
    );
    resolvedAccounts.systemProgram.isWritable = false;
  }

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(resolvedAccounts).sort((a, b) => a.index - b.index);

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(orderedAccounts, 'programId', programId);

  // Data.
  const data = getAddTokenInstructionDataSerializer().serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([{ instruction: { keys, programId, data }, signers, bytesCreatedOnChain }]);
}
