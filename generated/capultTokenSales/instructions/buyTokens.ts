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
  array,
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
export type BuyTokensInstructionAccounts = {
  tokenSale: PublicKey | Pda;
  purchaseRecord?: PublicKey | Pda;
  payer?: Signer;
  recipient?: PublicKey | Pda;
  tokenSaleAta?: PublicKey | Pda;
  tokenMint: PublicKey | Pda;
  whitelistToken?: PublicKey | Pda;
  whitelistTokenCollection?: PublicKey | Pda;
  mplCoreProgram?: PublicKey | Pda;
  feeConfig?: PublicKey | Pda;
  tokenProgram?: PublicKey | Pda;
  systemProgram?: PublicKey | Pda;
};

// Data.
export type BuyTokensInstructionData = {
  discriminator: Uint8Array;
  tokenAmount: bigint;
  decimals: number;
  lamportsToPay: bigint;
  allowlistProof: Option<Array<Uint8Array>>;
};

export type BuyTokensInstructionDataArgs = {
  tokenAmount: number | bigint;
  decimals: number;
  lamportsToPay: number | bigint;
  allowlistProof: OptionOrNullable<Array<Uint8Array>>;
};

export function getBuyTokensInstructionDataSerializer(): Serializer<
  BuyTokensInstructionDataArgs,
  BuyTokensInstructionData
> {
  return mapSerializer<BuyTokensInstructionDataArgs, any, BuyTokensInstructionData>(
    struct<BuyTokensInstructionData>(
      [
        ['discriminator', bytes({ size: 8 })],
        ['tokenAmount', u64()],
        ['decimals', u8()],
        ['lamportsToPay', u64()],
        ['allowlistProof', option(array(bytes({ size: 32 })))],
      ],
      { description: 'BuyTokensInstructionData' }
    ),
    (value) => ({ ...value, discriminator: new Uint8Array([189, 21, 230, 133, 247, 2, 110, 42]) })
  ) as Serializer<BuyTokensInstructionDataArgs, BuyTokensInstructionData>;
}

// Args.
export type BuyTokensInstructionArgs = BuyTokensInstructionDataArgs;

// Instruction.
export function buyTokens(
  context: Pick<Context, 'eddsa' | 'identity' | 'payer' | 'programs'>,
  input: BuyTokensInstructionAccounts & BuyTokensInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey('capultTokenSales', 'CPTSoDzrvBad8fW2DWRgXhb2R5pa8sVdBJvZhfhuyYKe');

  // Accounts.
  const resolvedAccounts = {
    tokenSale: { index: 0, isWritable: true as boolean, value: input.tokenSale ?? null },
    purchaseRecord: { index: 1, isWritable: true as boolean, value: input.purchaseRecord ?? null },
    payer: { index: 2, isWritable: true as boolean, value: input.payer ?? null },
    recipient: { index: 3, isWritable: false as boolean, value: input.recipient ?? null },
    tokenSaleAta: { index: 4, isWritable: true as boolean, value: input.tokenSaleAta ?? null },
    tokenMint: { index: 5, isWritable: false as boolean, value: input.tokenMint ?? null },
    whitelistToken: { index: 6, isWritable: true as boolean, value: input.whitelistToken ?? null },
    whitelistTokenCollection: { index: 7, isWritable: true as boolean, value: input.whitelistTokenCollection ?? null },
    mplCoreProgram: { index: 8, isWritable: false as boolean, value: input.mplCoreProgram ?? null },
    feeConfig: { index: 9, isWritable: false as boolean, value: input.feeConfig ?? null },
    tokenProgram: { index: 10, isWritable: false as boolean, value: input.tokenProgram ?? null },
    systemProgram: { index: 11, isWritable: false as boolean, value: input.systemProgram ?? null },
  } satisfies ResolvedAccountsWithIndices;

  // Arguments.
  const resolvedArgs: BuyTokensInstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.recipient.value) {
    resolvedAccounts.recipient.value = context.identity.publicKey;
  }
  if (!resolvedAccounts.purchaseRecord.value) {
    resolvedAccounts.purchaseRecord.value = context.eddsa.findPda(programId, [
      bytes().serialize(new Uint8Array([67, 65, 80, 85, 76, 84, 95, 83, 69, 69, 68])),
      publicKeySerializer().serialize(expectPublicKey(resolvedAccounts.recipient.value)),
      publicKeySerializer().serialize(expectPublicKey(resolvedAccounts.tokenSale.value)),
      bytes().serialize(
        new Uint8Array([80, 85, 82, 67, 72, 65, 83, 69, 95, 82, 69, 67, 79, 82, 68, 95, 83, 69, 69, 68])
      ),
    ]);
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
  if (!resolvedAccounts.tokenSaleAta.value) {
    resolvedAccounts.tokenSaleAta.value = context.eddsa.findPda(programId, [
      publicKeySerializer().serialize(expectPublicKey(resolvedAccounts.tokenSale.value)),
      publicKeySerializer().serialize(expectPublicKey(resolvedAccounts.tokenProgram.value)),
      publicKeySerializer().serialize(expectPublicKey(resolvedAccounts.tokenMint.value)),
    ]);
  }
  if (!resolvedAccounts.mplCoreProgram.value) {
    resolvedAccounts.mplCoreProgram.value = context.programs.getPublicKey(
      'mplCoreProgram',
      'CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d'
    );
    resolvedAccounts.mplCoreProgram.isWritable = false;
  }
  if (!resolvedAccounts.feeConfig.value) {
    resolvedAccounts.feeConfig.value = context.eddsa.findPda(programId, [
      bytes().serialize(
        new Uint8Array([83, 65, 76, 69, 83, 95, 70, 69, 69, 95, 67, 79, 78, 70, 73, 71, 95, 83, 69, 69, 68])
      ),
    ]);
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
  const data = getBuyTokensInstructionDataSerializer().serialize(resolvedArgs as BuyTokensInstructionDataArgs);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([{ instruction: { keys, programId, data }, signers, bytesCreatedOnChain }]);
}
