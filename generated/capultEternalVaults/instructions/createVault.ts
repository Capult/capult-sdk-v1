/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  Context,
  Option,
  OptionOrNullable,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  bytes,
  i64,
  mapSerializer,
  option,
  publicKey as publicKeySerializer,
  struct,
  u64,
  u8,
} from '@metaplex-foundation/umi/serializers';
import { ResolvedAccount, ResolvedAccountsWithIndices, expectPublicKey, getAccountMetasAndSigners } from '../shared';

// Accounts.
export type CreateVaultInstructionAccounts = {
  eternalVault?: PublicKey | Pda;
  vaultInitKey: PublicKey | Pda;
  authority?: PublicKey | Pda;
  payer?: Signer;
  tokenPayer: Signer;
  tokenPayerAta?: PublicKey | Pda;
  vaultAta?: PublicKey | Pda;
  tokenMint: PublicKey | Pda;
  capultFeeConfig?: PublicKey | Pda;
  tokenProgram?: PublicKey | Pda;
  associatedTokenProgram?: PublicKey | Pda;
  systemProgram?: PublicKey | Pda;
};

// Data.
export type CreateVaultInstructionData = {
  discriminator: Uint8Array;
  unlockDelay: bigint;
  tokenAmount: bigint;
  decimals: number;
  transferFeeAmount: Option<bigint>;
};

export type CreateVaultInstructionDataArgs = {
  unlockDelay: number | bigint;
  tokenAmount: number | bigint;
  decimals: number;
  transferFeeAmount: OptionOrNullable<number | bigint>;
};

export function getCreateVaultInstructionDataSerializer(): Serializer<
  CreateVaultInstructionDataArgs,
  CreateVaultInstructionData
> {
  return mapSerializer<CreateVaultInstructionDataArgs, any, CreateVaultInstructionData>(
    struct<CreateVaultInstructionData>(
      [
        ['discriminator', bytes({ size: 8 })],
        ['unlockDelay', i64()],
        ['tokenAmount', u64()],
        ['decimals', u8()],
        ['transferFeeAmount', option(u64())],
      ],
      { description: 'CreateVaultInstructionData' }
    ),
    (value) => ({ ...value, discriminator: new Uint8Array([29, 237, 247, 208, 193, 82, 54, 135]) })
  ) as Serializer<CreateVaultInstructionDataArgs, CreateVaultInstructionData>;
}

// Args.
export type CreateVaultInstructionArgs = CreateVaultInstructionDataArgs;

// Instruction.
export function createVault(
  context: Pick<Context, 'eddsa' | 'identity' | 'payer' | 'programs'>,
  input: CreateVaultInstructionAccounts & CreateVaultInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'capultEternalVaults',
    'CPEVjv7pvzLceHN9auJhniU2y3divtY4PUaTvLEoxpbP'
  );

  // Accounts.
  const resolvedAccounts = {
    eternalVault: { index: 0, isWritable: true as boolean, value: input.eternalVault ?? null },
    vaultInitKey: { index: 1, isWritable: false as boolean, value: input.vaultInitKey ?? null },
    authority: { index: 2, isWritable: false as boolean, value: input.authority ?? null },
    payer: { index: 3, isWritable: true as boolean, value: input.payer ?? null },
    tokenPayer: { index: 4, isWritable: true as boolean, value: input.tokenPayer ?? null },
    tokenPayerAta: { index: 5, isWritable: true as boolean, value: input.tokenPayerAta ?? null },
    vaultAta: { index: 6, isWritable: true as boolean, value: input.vaultAta ?? null },
    tokenMint: { index: 7, isWritable: false as boolean, value: input.tokenMint ?? null },
    capultFeeConfig: { index: 8, isWritable: false as boolean, value: input.capultFeeConfig ?? null },
    tokenProgram: { index: 9, isWritable: false as boolean, value: input.tokenProgram ?? null },
    associatedTokenProgram: { index: 10, isWritable: false as boolean, value: input.associatedTokenProgram ?? null },
    systemProgram: { index: 11, isWritable: false as boolean, value: input.systemProgram ?? null },
  } satisfies ResolvedAccountsWithIndices;

  // Arguments.
  const resolvedArgs: CreateVaultInstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.eternalVault.value) {
    resolvedAccounts.eternalVault.value = context.eddsa.findPda(programId, [
      bytes().serialize(new Uint8Array([67, 65, 80, 85, 76, 84, 95, 83, 69, 69, 68])),
      publicKeySerializer().serialize(expectPublicKey(resolvedAccounts.vaultInitKey.value)),
      bytes().serialize(new Uint8Array([69, 84, 69, 82, 78, 65, 76, 95, 86, 65, 85, 76, 84, 95, 83, 69, 69, 68])),
    ]);
  }
  if (!resolvedAccounts.authority.value) {
    resolvedAccounts.authority.value = context.identity.publicKey;
  }
  if (!resolvedAccounts.payer.value) {
    resolvedAccounts.payer.value = context.payer;
  }
  if (!resolvedAccounts.tokenProgram.value) {
    resolvedAccounts.tokenProgram.value = context.programs.getPublicKey(
      'splToken',
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
    );
    resolvedAccounts.tokenProgram.isWritable = false;
  }
  if (!resolvedAccounts.tokenPayerAta.value) {
    resolvedAccounts.tokenPayerAta.value = context.eddsa.findPda(programId, [
      publicKeySerializer().serialize(expectPublicKey(resolvedAccounts.tokenPayer.value)),
      publicKeySerializer().serialize(expectPublicKey(resolvedAccounts.tokenProgram.value)),
      publicKeySerializer().serialize(expectPublicKey(resolvedAccounts.tokenMint.value)),
    ]);
  }
  if (!resolvedAccounts.vaultAta.value) {
    resolvedAccounts.vaultAta.value = context.eddsa.findPda(programId, [
      publicKeySerializer().serialize(expectPublicKey(resolvedAccounts.eternalVault.value)),
      publicKeySerializer().serialize(expectPublicKey(resolvedAccounts.tokenProgram.value)),
      publicKeySerializer().serialize(expectPublicKey(resolvedAccounts.tokenMint.value)),
    ]);
  }
  if (!resolvedAccounts.capultFeeConfig.value) {
    resolvedAccounts.capultFeeConfig.value = context.eddsa.findPda(programId, [
      bytes().serialize(new Uint8Array([70, 69, 69, 95, 67, 79, 78, 70, 73, 71, 95, 83, 69, 69, 68])),
    ]);
  }
  if (!resolvedAccounts.associatedTokenProgram.value) {
    resolvedAccounts.associatedTokenProgram.value = context.programs.getPublicKey(
      'associatedTokenProgram',
      'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
    );
    resolvedAccounts.associatedTokenProgram.isWritable = false;
  }
  if (!resolvedAccounts.systemProgram.value) {
    resolvedAccounts.systemProgram.value = context.programs.getPublicKey(
      'systemProgram',
      '11111111111111111111111111111111'
    );
    resolvedAccounts.systemProgram.isWritable = false;
  }

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(resolvedAccounts).sort((a, b) => a.index - b.index);

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(orderedAccounts, 'programId', programId);

  // Data.
  const data = getCreateVaultInstructionDataSerializer().serialize(resolvedArgs as CreateVaultInstructionDataArgs);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([{ instruction: { keys, programId, data }, signers, bytesCreatedOnChain }]);
}
