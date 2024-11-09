/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import { Context, Pda, PublicKey, Signer, TransactionBuilder, transactionBuilder } from '@metaplex-foundation/umi';
import { Serializer, bytes, mapSerializer, struct, u16, u64 } from '@metaplex-foundation/umi/serializers';
import { ResolvedAccount, ResolvedAccountsWithIndices, getAccountMetasAndSigners } from '../shared';

// Accounts.
export type CreateFeeConfigInstructionAccounts = {
  feeConfig: PublicKey | Pda;
  payer?: Signer;
  authority?: PublicKey | Pda;
  program: PublicKey | Pda;
  programData: PublicKey | Pda;
  withdrawAuthority: PublicKey | Pda;
  systemProgram?: PublicKey | Pda;
};

// Data.
export type CreateFeeConfigInstructionData = {
  discriminator: Uint8Array;
  createSaleFee: bigint;
  botTax: bigint;
  buyFeeBasisPoints: number;
  withdrawFeeBasisPoints: number;
};

export type CreateFeeConfigInstructionDataArgs = {
  createSaleFee: number | bigint;
  botTax: number | bigint;
  buyFeeBasisPoints: number;
  withdrawFeeBasisPoints: number;
};

export function getCreateFeeConfigInstructionDataSerializer(): Serializer<
  CreateFeeConfigInstructionDataArgs,
  CreateFeeConfigInstructionData
> {
  return mapSerializer<CreateFeeConfigInstructionDataArgs, any, CreateFeeConfigInstructionData>(
    struct<CreateFeeConfigInstructionData>(
      [
        ['discriminator', bytes({ size: 8 })],
        ['createSaleFee', u64()],
        ['botTax', u64()],
        ['buyFeeBasisPoints', u16()],
        ['withdrawFeeBasisPoints', u16()],
      ],
      { description: 'CreateFeeConfigInstructionData' }
    ),
    (value) => ({ ...value, discriminator: new Uint8Array([214, 172, 105, 64, 8, 228, 209, 204]) })
  ) as Serializer<CreateFeeConfigInstructionDataArgs, CreateFeeConfigInstructionData>;
}

// Args.
export type CreateFeeConfigInstructionArgs = CreateFeeConfigInstructionDataArgs;

// Instruction.
export function createFeeConfig(
  context: Pick<Context, 'identity' | 'payer' | 'programs'>,
  input: CreateFeeConfigInstructionAccounts & CreateFeeConfigInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey('capultTokenSales', 'CPTSoDzrvBad8fW2DWRgXhb2R5pa8sVdBJvZhfhuyYKe');

  // Accounts.
  const resolvedAccounts = {
    feeConfig: { index: 0, isWritable: true as boolean, value: input.feeConfig ?? null },
    payer: { index: 1, isWritable: true as boolean, value: input.payer ?? null },
    authority: { index: 2, isWritable: false as boolean, value: input.authority ?? null },
    program: { index: 3, isWritable: false as boolean, value: input.program ?? null },
    programData: { index: 4, isWritable: false as boolean, value: input.programData ?? null },
    withdrawAuthority: { index: 5, isWritable: false as boolean, value: input.withdrawAuthority ?? null },
    systemProgram: { index: 6, isWritable: false as boolean, value: input.systemProgram ?? null },
  } satisfies ResolvedAccountsWithIndices;

  // Arguments.
  const resolvedArgs: CreateFeeConfigInstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.payer.value) {
    resolvedAccounts.payer.value = context.payer;
  }
  if (!resolvedAccounts.authority.value) {
    resolvedAccounts.authority.value = context.identity.publicKey;
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
  const data = getCreateFeeConfigInstructionDataSerializer().serialize(
    resolvedArgs as CreateFeeConfigInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([{ instruction: { keys, programId, data }, signers, bytesCreatedOnChain }]);
}
