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
import {
  AccessConfigSetup,
  AccessConfigSetupArgs,
  Price,
  PriceArgs,
  SaleParameters,
  SaleParametersArgs,
  UnlockSchedule,
  UnlockScheduleArgs,
  getAccessConfigSetupSerializer,
  getPriceSerializer,
  getSaleParametersSerializer,
  getUnlockScheduleSerializer,
} from '../types';

// Accounts.
export type CreateSaleInstructionAccounts = {
  tokenSale: PublicKey | Pda;
  payer?: Signer;
  authority?: PublicKey | Pda;
  saleInitKey: PublicKey | Pda;
  payerAta: PublicKey | Pda;
  tokenSaleAta: PublicKey | Pda;
  tokenMint: PublicKey | Pda;
  whitelistCollection?: PublicKey | Pda;
  feeConfig: PublicKey | Pda;
  tokenProgram?: PublicKey | Pda;
  associatedTokenProgram: PublicKey | Pda;
  systemProgram?: PublicKey | Pda;
};

// Data.
export type CreateSaleInstructionData = {
  discriminator: Uint8Array;
  saleAmount: bigint;
  price: Price;
  decimals: number;
  transferFeeAmount: Option<bigint>;
  startSlot: Option<bigint>;
  endSlot: Option<bigint>;
  saleParameters: SaleParameters;
  unlockSchedule: Option<UnlockSchedule>;
  accessConfig: AccessConfigSetup;
};

export type CreateSaleInstructionDataArgs = {
  saleAmount: number | bigint;
  price: PriceArgs;
  decimals: number;
  transferFeeAmount: OptionOrNullable<number | bigint>;
  startSlot: OptionOrNullable<number | bigint>;
  endSlot: OptionOrNullable<number | bigint>;
  saleParameters: SaleParametersArgs;
  unlockSchedule: OptionOrNullable<UnlockScheduleArgs>;
  accessConfig: AccessConfigSetupArgs;
};

export function getCreateSaleInstructionDataSerializer(): Serializer<
  CreateSaleInstructionDataArgs,
  CreateSaleInstructionData
> {
  return mapSerializer<CreateSaleInstructionDataArgs, any, CreateSaleInstructionData>(
    struct<CreateSaleInstructionData>(
      [
        ['discriminator', bytes({ size: 8 })],
        ['saleAmount', u64()],
        ['price', getPriceSerializer()],
        ['decimals', u8()],
        ['transferFeeAmount', option(u64())],
        ['startSlot', option(u64())],
        ['endSlot', option(u64())],
        ['saleParameters', getSaleParametersSerializer()],
        ['unlockSchedule', option(getUnlockScheduleSerializer())],
        ['accessConfig', getAccessConfigSetupSerializer()],
      ],
      { description: 'CreateSaleInstructionData' }
    ),
    (value) => ({ ...value, discriminator: new Uint8Array([137, 197, 124, 245, 254, 35, 17, 12]) })
  ) as Serializer<CreateSaleInstructionDataArgs, CreateSaleInstructionData>;
}

// Args.
export type CreateSaleInstructionArgs = CreateSaleInstructionDataArgs;

// Instruction.
export function createSale(
  context: Pick<Context, 'identity' | 'payer' | 'programs'>,
  input: CreateSaleInstructionAccounts & CreateSaleInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey('capultTokenSales', 'CPTSoDzrvBad8fW2DWRgXhb2R5pa8sVdBJvZhfhuyYKe');

  // Accounts.
  const resolvedAccounts = {
    tokenSale: { index: 0, isWritable: true as boolean, value: input.tokenSale ?? null },
    payer: { index: 1, isWritable: true as boolean, value: input.payer ?? null },
    authority: { index: 2, isWritable: false as boolean, value: input.authority ?? null },
    saleInitKey: { index: 3, isWritable: false as boolean, value: input.saleInitKey ?? null },
    payerAta: { index: 4, isWritable: true as boolean, value: input.payerAta ?? null },
    tokenSaleAta: { index: 5, isWritable: true as boolean, value: input.tokenSaleAta ?? null },
    tokenMint: { index: 6, isWritable: false as boolean, value: input.tokenMint ?? null },
    whitelistCollection: { index: 7, isWritable: false as boolean, value: input.whitelistCollection ?? null },
    feeConfig: { index: 8, isWritable: false as boolean, value: input.feeConfig ?? null },
    tokenProgram: { index: 9, isWritable: false as boolean, value: input.tokenProgram ?? null },
    associatedTokenProgram: { index: 10, isWritable: false as boolean, value: input.associatedTokenProgram ?? null },
    systemProgram: { index: 11, isWritable: false as boolean, value: input.systemProgram ?? null },
  } satisfies ResolvedAccountsWithIndices;

  // Arguments.
  const resolvedArgs: CreateSaleInstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.payer.value) {
    resolvedAccounts.payer.value = context.payer;
  }
  if (!resolvedAccounts.authority.value) {
    resolvedAccounts.authority.value = context.identity.publicKey;
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
  const data = getCreateSaleInstructionDataSerializer().serialize(resolvedArgs as CreateSaleInstructionDataArgs);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([{ instruction: { keys, programId, data }, signers, bytesCreatedOnChain }]);
}
