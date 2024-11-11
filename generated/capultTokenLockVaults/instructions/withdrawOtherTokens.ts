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
  mapSerializer,
  option,
  publicKey as publicKeySerializer,
  struct,
  u64,
  u8,
} from '@metaplex-foundation/umi/serializers';
import { ResolvedAccount, ResolvedAccountsWithIndices, expectPublicKey, getAccountMetasAndSigners } from '../shared';

// Accounts.
export type WithdrawOtherTokensInstructionAccounts = {
  tokenLockVault: PublicKey | Pda;
  withdrawAuthority: Signer;
  payer?: Signer;
  vaultAta?: PublicKey | Pda;
  recipient?: PublicKey | Pda;
  recipientAta?: PublicKey | Pda;
  tokenMint: PublicKey | Pda;
  tokenProgram?: PublicKey | Pda;
  associatedTokenProgram?: PublicKey | Pda;
  systemProgram?: PublicKey | Pda;
};

// Data.
export type WithdrawOtherTokensInstructionData = {
  discriminator: Uint8Array;
  tokenAmount: bigint;
  decimals: number;
  transferFeeAmount: Option<bigint>;
};

export type WithdrawOtherTokensInstructionDataArgs = {
  tokenAmount: number | bigint;
  decimals: number;
  transferFeeAmount: OptionOrNullable<number | bigint>;
};

export function getWithdrawOtherTokensInstructionDataSerializer(): Serializer<
  WithdrawOtherTokensInstructionDataArgs,
  WithdrawOtherTokensInstructionData
> {
  return mapSerializer<WithdrawOtherTokensInstructionDataArgs, any, WithdrawOtherTokensInstructionData>(
    struct<WithdrawOtherTokensInstructionData>(
      [
        ['discriminator', bytes({ size: 8 })],
        ['tokenAmount', u64()],
        ['decimals', u8()],
        ['transferFeeAmount', option(u64())],
      ],
      { description: 'WithdrawOtherTokensInstructionData' }
    ),
    (value) => ({ ...value, discriminator: new Uint8Array([211, 165, 18, 53, 66, 49, 234, 111]) })
  ) as Serializer<WithdrawOtherTokensInstructionDataArgs, WithdrawOtherTokensInstructionData>;
}

// Args.
export type WithdrawOtherTokensInstructionArgs = WithdrawOtherTokensInstructionDataArgs;

// Instruction.
export function withdrawOtherTokens(
  context: Pick<Context, 'eddsa' | 'identity' | 'payer' | 'programs'>,
  input: WithdrawOtherTokensInstructionAccounts & WithdrawOtherTokensInstructionArgs
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
    payer: { index: 2, isWritable: true as boolean, value: input.payer ?? null },
    vaultAta: { index: 3, isWritable: true as boolean, value: input.vaultAta ?? null },
    recipient: { index: 4, isWritable: false as boolean, value: input.recipient ?? null },
    recipientAta: { index: 5, isWritable: true as boolean, value: input.recipientAta ?? null },
    tokenMint: { index: 6, isWritable: false as boolean, value: input.tokenMint ?? null },
    tokenProgram: { index: 7, isWritable: false as boolean, value: input.tokenProgram ?? null },
    associatedTokenProgram: { index: 8, isWritable: false as boolean, value: input.associatedTokenProgram ?? null },
    systemProgram: { index: 9, isWritable: false as boolean, value: input.systemProgram ?? null },
  } satisfies ResolvedAccountsWithIndices;

  // Arguments.
  const resolvedArgs: WithdrawOtherTokensInstructionArgs = { ...input };

  // Default values.
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
  if (!resolvedAccounts.vaultAta.value) {
    resolvedAccounts.vaultAta.value = context.eddsa.findPda(programId, [
      publicKeySerializer().serialize(expectPublicKey(resolvedAccounts.tokenLockVault.value)),
      publicKeySerializer().serialize(expectPublicKey(resolvedAccounts.tokenProgram.value)),
      publicKeySerializer().serialize(expectPublicKey(resolvedAccounts.tokenMint.value)),
    ]);
  }
  if (!resolvedAccounts.recipient.value) {
    resolvedAccounts.recipient.value = context.identity.publicKey;
  }
  if (!resolvedAccounts.recipientAta.value) {
    resolvedAccounts.recipientAta.value = context.eddsa.findPda(programId, [
      publicKeySerializer().serialize(expectPublicKey(resolvedAccounts.recipient.value)),
      publicKeySerializer().serialize(expectPublicKey(resolvedAccounts.tokenProgram.value)),
      publicKeySerializer().serialize(expectPublicKey(resolvedAccounts.tokenMint.value)),
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
  const data = getWithdrawOtherTokensInstructionDataSerializer().serialize(
    resolvedArgs as WithdrawOtherTokensInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([{ instruction: { keys, programId, data }, signers, bytesCreatedOnChain }]);
}
