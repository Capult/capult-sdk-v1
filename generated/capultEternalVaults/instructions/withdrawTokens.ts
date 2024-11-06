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
import { Serializer, bytes, mapSerializer, option, struct, u64, u8 } from '@metaplex-foundation/umi/serializers';
import { ResolvedAccount, ResolvedAccountsWithIndices, getAccountMetasAndSigners } from '../shared';

// Accounts.
export type WithdrawTokensInstructionAccounts = {
  eternalVault: PublicKey | Pda;
  authority?: Signer;
  payer?: Signer;
  vaultAta: PublicKey | Pda;
  recipient: PublicKey | Pda;
  toAta: PublicKey | Pda;
  tokenMint: PublicKey | Pda;
  tokenProgram?: PublicKey | Pda;
  associatedTokenProgram: PublicKey | Pda;
  systemProgram?: PublicKey | Pda;
};

// Data.
export type WithdrawTokensInstructionData = {
  discriminator: Uint8Array;
  tokenAmount: bigint;
  decimals: number;
  transferFeeAmount: Option<bigint>;
};

export type WithdrawTokensInstructionDataArgs = {
  tokenAmount: number | bigint;
  decimals: number;
  transferFeeAmount: OptionOrNullable<number | bigint>;
};

export function getWithdrawTokensInstructionDataSerializer(): Serializer<
  WithdrawTokensInstructionDataArgs,
  WithdrawTokensInstructionData
> {
  return mapSerializer<WithdrawTokensInstructionDataArgs, any, WithdrawTokensInstructionData>(
    struct<WithdrawTokensInstructionData>(
      [
        ['discriminator', bytes({ size: 8 })],
        ['tokenAmount', u64()],
        ['decimals', u8()],
        ['transferFeeAmount', option(u64())],
      ],
      { description: 'WithdrawTokensInstructionData' }
    ),
    (value) => ({ ...value, discriminator: new Uint8Array([2, 4, 225, 61, 19, 182, 106, 170]) })
  ) as Serializer<WithdrawTokensInstructionDataArgs, WithdrawTokensInstructionData>;
}

// Args.
export type WithdrawTokensInstructionArgs = WithdrawTokensInstructionDataArgs;

// Instruction.
export function withdrawTokens(
  context: Pick<Context, 'identity' | 'payer' | 'programs'>,
  input: WithdrawTokensInstructionAccounts & WithdrawTokensInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'capultEternalVaults',
    'CPEVjv7pvzLceHN9auJhniU2y3divtY4PUaTvLEoxpbP'
  );

  // Accounts.
  const resolvedAccounts = {
    eternalVault: { index: 0, isWritable: true as boolean, value: input.eternalVault ?? null },
    authority: { index: 1, isWritable: true as boolean, value: input.authority ?? null },
    payer: { index: 2, isWritable: true as boolean, value: input.payer ?? null },
    vaultAta: { index: 3, isWritable: true as boolean, value: input.vaultAta ?? null },
    recipient: { index: 4, isWritable: false as boolean, value: input.recipient ?? null },
    toAta: { index: 5, isWritable: true as boolean, value: input.toAta ?? null },
    tokenMint: { index: 6, isWritable: false as boolean, value: input.tokenMint ?? null },
    tokenProgram: { index: 7, isWritable: false as boolean, value: input.tokenProgram ?? null },
    associatedTokenProgram: { index: 8, isWritable: false as boolean, value: input.associatedTokenProgram ?? null },
    systemProgram: { index: 9, isWritable: false as boolean, value: input.systemProgram ?? null },
  } satisfies ResolvedAccountsWithIndices;

  // Arguments.
  const resolvedArgs: WithdrawTokensInstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.authority.value) {
    resolvedAccounts.authority.value = context.identity;
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
  const data = getWithdrawTokensInstructionDataSerializer().serialize(
    resolvedArgs as WithdrawTokensInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([{ instruction: { keys, programId, data }, signers, bytesCreatedOnChain }]);
}
