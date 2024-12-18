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
export type SetFeeConfigAuthorityInstructionAccounts = {
  feeConfig?: PublicKey | Pda;
  authority?: Signer;
  newAuthority?: PublicKey | Pda;
};

// Data.
export type SetFeeConfigAuthorityInstructionData = { discriminator: Uint8Array };

export type SetFeeConfigAuthorityInstructionDataArgs = {};

export function getSetFeeConfigAuthorityInstructionDataSerializer(): Serializer<
  SetFeeConfigAuthorityInstructionDataArgs,
  SetFeeConfigAuthorityInstructionData
> {
  return mapSerializer<SetFeeConfigAuthorityInstructionDataArgs, any, SetFeeConfigAuthorityInstructionData>(
    struct<SetFeeConfigAuthorityInstructionData>([['discriminator', bytes({ size: 8 })]], {
      description: 'SetFeeConfigAuthorityInstructionData',
    }),
    (value) => ({ ...value, discriminator: new Uint8Array([40, 140, 167, 0, 88, 73, 202, 142]) })
  ) as Serializer<SetFeeConfigAuthorityInstructionDataArgs, SetFeeConfigAuthorityInstructionData>;
}

// Instruction.
export function setFeeConfigAuthority(
  context: Pick<Context, 'eddsa' | 'identity' | 'programs'>,
  input: SetFeeConfigAuthorityInstructionAccounts
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey('capultTokenSales', 'CPTSoDzrvBad8fW2DWRgXhb2R5pa8sVdBJvZhfhuyYKe');

  // Accounts.
  const resolvedAccounts = {
    feeConfig: { index: 0, isWritable: true as boolean, value: input.feeConfig ?? null },
    authority: { index: 1, isWritable: false as boolean, value: input.authority ?? null },
    newAuthority: { index: 2, isWritable: false as boolean, value: input.newAuthority ?? null },
  } satisfies ResolvedAccountsWithIndices;

  // Default values.
  if (!resolvedAccounts.feeConfig.value) {
    resolvedAccounts.feeConfig.value = context.eddsa.findPda(programId, [
      bytes().serialize(
        new Uint8Array([83, 65, 76, 69, 83, 95, 70, 69, 69, 95, 67, 79, 78, 70, 73, 71, 95, 83, 69, 69, 68])
      ),
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
  const data = getSetFeeConfigAuthorityInstructionDataSerializer().serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([{ instruction: { keys, programId, data }, signers, bytesCreatedOnChain }]);
}
