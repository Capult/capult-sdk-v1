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
import { AutoClaimSetupArgs, AutoClaimSetupArgsArgs, getAutoClaimSetupArgsSerializer } from '../types';

// Accounts.
export type ClaimTokensToTlvInstructionAccounts = {
  purchaseRecord: PublicKey | Pda;
  tokenSale: PublicKey | Pda;
  payer?: Signer;
  authority?: Signer;
  tokenLockVault: PublicKey | Pda;
  tlvInitKey: PublicKey | Pda;
  tokenLockVaultsProgramConfig: PublicKey | Pda;
  tokenSaleAta: PublicKey | Pda;
  tlvAta: PublicKey | Pda;
  tokenMint: PublicKey | Pda;
  tokenLockVaultsProgram: PublicKey | Pda;
  tokenProgram?: PublicKey | Pda;
  associatedTokenProgram: PublicKey | Pda;
  systemProgram?: PublicKey | Pda;
};

// Data.
export type ClaimTokensToTlvInstructionData = {
  discriminator: Uint8Array;
  tokenAmount: bigint;
  decimals: number;
  transferFeeAmount: Option<bigint>;
  autoClaimSetup: Option<AutoClaimSetupArgs>;
};

export type ClaimTokensToTlvInstructionDataArgs = {
  tokenAmount: number | bigint;
  decimals: number;
  transferFeeAmount: OptionOrNullable<number | bigint>;
  autoClaimSetup: OptionOrNullable<AutoClaimSetupArgsArgs>;
};

export function getClaimTokensToTlvInstructionDataSerializer(): Serializer<
  ClaimTokensToTlvInstructionDataArgs,
  ClaimTokensToTlvInstructionData
> {
  return mapSerializer<ClaimTokensToTlvInstructionDataArgs, any, ClaimTokensToTlvInstructionData>(
    struct<ClaimTokensToTlvInstructionData>(
      [
        ['discriminator', bytes({ size: 8 })],
        ['tokenAmount', u64()],
        ['decimals', u8()],
        ['transferFeeAmount', option(u64())],
        ['autoClaimSetup', option(getAutoClaimSetupArgsSerializer())],
      ],
      { description: 'ClaimTokensToTlvInstructionData' }
    ),
    (value) => ({ ...value, discriminator: new Uint8Array([174, 131, 70, 227, 7, 239, 39, 182]) })
  ) as Serializer<ClaimTokensToTlvInstructionDataArgs, ClaimTokensToTlvInstructionData>;
}

// Args.
export type ClaimTokensToTlvInstructionArgs = ClaimTokensToTlvInstructionDataArgs;

// Instruction.
export function claimTokensToTlv(
  context: Pick<Context, 'identity' | 'payer' | 'programs'>,
  input: ClaimTokensToTlvInstructionAccounts & ClaimTokensToTlvInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey('capultTokenSales', 'CPTSoDzrvBad8fW2DWRgXhb2R5pa8sVdBJvZhfhuyYKe');

  // Accounts.
  const resolvedAccounts = {
    purchaseRecord: { index: 0, isWritable: true as boolean, value: input.purchaseRecord ?? null },
    tokenSale: { index: 1, isWritable: true as boolean, value: input.tokenSale ?? null },
    payer: { index: 2, isWritable: true as boolean, value: input.payer ?? null },
    authority: { index: 3, isWritable: false as boolean, value: input.authority ?? null },
    tokenLockVault: { index: 4, isWritable: true as boolean, value: input.tokenLockVault ?? null },
    tlvInitKey: { index: 5, isWritable: false as boolean, value: input.tlvInitKey ?? null },
    tokenLockVaultsProgramConfig: {
      index: 6,
      isWritable: false as boolean,
      value: input.tokenLockVaultsProgramConfig ?? null,
    },
    tokenSaleAta: { index: 7, isWritable: true as boolean, value: input.tokenSaleAta ?? null },
    tlvAta: { index: 8, isWritable: true as boolean, value: input.tlvAta ?? null },
    tokenMint: { index: 9, isWritable: false as boolean, value: input.tokenMint ?? null },
    tokenLockVaultsProgram: { index: 10, isWritable: false as boolean, value: input.tokenLockVaultsProgram ?? null },
    tokenProgram: { index: 11, isWritable: false as boolean, value: input.tokenProgram ?? null },
    associatedTokenProgram: { index: 12, isWritable: false as boolean, value: input.associatedTokenProgram ?? null },
    systemProgram: { index: 13, isWritable: false as boolean, value: input.systemProgram ?? null },
  } satisfies ResolvedAccountsWithIndices;

  // Arguments.
  const resolvedArgs: ClaimTokensToTlvInstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.payer.value) {
    resolvedAccounts.payer.value = context.payer;
  }
  if (!resolvedAccounts.authority.value) {
    resolvedAccounts.authority.value = context.identity;
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
  const data = getClaimTokensToTlvInstructionDataSerializer().serialize(
    resolvedArgs as ClaimTokensToTlvInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([{ instruction: { keys, programId, data }, signers, bytesCreatedOnChain }]);
}
