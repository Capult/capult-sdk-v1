/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  Account,
  Context,
  Pda,
  PublicKey,
  RpcAccount,
  RpcGetAccountOptions,
  RpcGetAccountsOptions,
  assertAccountExists,
  deserializeAccount,
  gpaBuilder,
  publicKey as toPublicKey,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  bytes,
  mapSerializer,
  publicKey as publicKeySerializer,
  struct,
  u64,
  u8,
} from '@metaplex-foundation/umi/serializers';

export type PurchaseRecord = Account<PurchaseRecordAccountData>;

export type PurchaseRecordAccountData = {
  discriminator: Uint8Array;
  authority: PublicKey;
  tokenSale: PublicKey;
  amountBought: bigint;
  lamportsPaid: bigint;
  bump: number;
};

export type PurchaseRecordAccountDataArgs = {
  authority: PublicKey;
  tokenSale: PublicKey;
  amountBought: number | bigint;
  lamportsPaid: number | bigint;
  bump: number;
};

export function getPurchaseRecordAccountDataSerializer(): Serializer<
  PurchaseRecordAccountDataArgs,
  PurchaseRecordAccountData
> {
  return mapSerializer<PurchaseRecordAccountDataArgs, any, PurchaseRecordAccountData>(
    struct<PurchaseRecordAccountData>(
      [
        ['discriminator', bytes({ size: 8 })],
        ['authority', publicKeySerializer()],
        ['tokenSale', publicKeySerializer()],
        ['amountBought', u64()],
        ['lamportsPaid', u64()],
        ['bump', u8()],
      ],
      { description: 'PurchaseRecordAccountData' }
    ),
    (value) => ({ ...value, discriminator: new Uint8Array([239, 38, 40, 199, 4, 96, 209, 2]) })
  ) as Serializer<PurchaseRecordAccountDataArgs, PurchaseRecordAccountData>;
}

export function deserializePurchaseRecord(rawAccount: RpcAccount): PurchaseRecord {
  return deserializeAccount(rawAccount, getPurchaseRecordAccountDataSerializer());
}

export async function fetchPurchaseRecord(
  context: Pick<Context, 'rpc'>,
  publicKey: PublicKey | Pda,
  options?: RpcGetAccountOptions
): Promise<PurchaseRecord> {
  const maybeAccount = await context.rpc.getAccount(toPublicKey(publicKey, false), options);
  assertAccountExists(maybeAccount, 'PurchaseRecord');
  return deserializePurchaseRecord(maybeAccount);
}

export async function safeFetchPurchaseRecord(
  context: Pick<Context, 'rpc'>,
  publicKey: PublicKey | Pda,
  options?: RpcGetAccountOptions
): Promise<PurchaseRecord | null> {
  const maybeAccount = await context.rpc.getAccount(toPublicKey(publicKey, false), options);
  return maybeAccount.exists ? deserializePurchaseRecord(maybeAccount) : null;
}

export async function fetchAllPurchaseRecord(
  context: Pick<Context, 'rpc'>,
  publicKeys: Array<PublicKey | Pda>,
  options?: RpcGetAccountsOptions
): Promise<PurchaseRecord[]> {
  const maybeAccounts = await context.rpc.getAccounts(
    publicKeys.map((key) => toPublicKey(key, false)),
    options
  );
  return maybeAccounts.map((maybeAccount) => {
    assertAccountExists(maybeAccount, 'PurchaseRecord');
    return deserializePurchaseRecord(maybeAccount);
  });
}

export async function safeFetchAllPurchaseRecord(
  context: Pick<Context, 'rpc'>,
  publicKeys: Array<PublicKey | Pda>,
  options?: RpcGetAccountsOptions
): Promise<PurchaseRecord[]> {
  const maybeAccounts = await context.rpc.getAccounts(
    publicKeys.map((key) => toPublicKey(key, false)),
    options
  );
  return maybeAccounts
    .filter((maybeAccount) => maybeAccount.exists)
    .map((maybeAccount) => deserializePurchaseRecord(maybeAccount as RpcAccount));
}

export function getPurchaseRecordGpaBuilder(context: Pick<Context, 'rpc' | 'programs'>) {
  const programId = context.programs.getPublicKey('capultTokenSales', 'CPTSoDzrvBad8fW2DWRgXhb2R5pa8sVdBJvZhfhuyYKe');
  return gpaBuilder(context, programId)
    .registerFields<{
      discriminator: Uint8Array;
      authority: PublicKey;
      tokenSale: PublicKey;
      amountBought: number | bigint;
      lamportsPaid: number | bigint;
      bump: number;
    }>({
      discriminator: [0, bytes({ size: 8 })],
      authority: [8, publicKeySerializer()],
      tokenSale: [40, publicKeySerializer()],
      amountBought: [72, u64()],
      lamportsPaid: [80, u64()],
      bump: [88, u8()],
    })
    .deserializeUsing<PurchaseRecord>((account) => deserializePurchaseRecord(account))
    .whereField('discriminator', new Uint8Array([239, 38, 40, 199, 4, 96, 209, 2]));
}

export function getPurchaseRecordSize(): number {
  return 89;
}

export function findPurchaseRecordPda(
  context: Pick<Context, 'eddsa' | 'programs'>,
  seeds: {
    authority: PublicKey;

    tokenSale: PublicKey;
  }
): Pda {
  const programId = context.programs.getPublicKey('capultTokenSales', 'CPTSoDzrvBad8fW2DWRgXhb2R5pa8sVdBJvZhfhuyYKe');
  return context.eddsa.findPda(programId, [
    bytes().serialize(new Uint8Array([67, 65, 80, 85, 76, 84, 95, 83, 69, 69, 68])),
    publicKeySerializer().serialize(seeds.authority),
    publicKeySerializer().serialize(seeds.tokenSale),
    bytes().serialize(new Uint8Array([80, 85, 82, 67, 72, 65, 83, 69, 95, 82, 69, 67, 79, 82, 68, 95, 83, 69, 69, 68])),
  ]);
}

export async function fetchPurchaseRecordFromSeeds(
  context: Pick<Context, 'eddsa' | 'programs' | 'rpc'>,
  seeds: Parameters<typeof findPurchaseRecordPda>[1],
  options?: RpcGetAccountOptions
): Promise<PurchaseRecord> {
  return fetchPurchaseRecord(context, findPurchaseRecordPda(context, seeds), options);
}

export async function safeFetchPurchaseRecordFromSeeds(
  context: Pick<Context, 'eddsa' | 'programs' | 'rpc'>,
  seeds: Parameters<typeof findPurchaseRecordPda>[1],
  options?: RpcGetAccountOptions
): Promise<PurchaseRecord | null> {
  return safeFetchPurchaseRecord(context, findPurchaseRecordPda(context, seeds), options);
}
