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
  string,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';

export type Metadata = Account<MetadataAccountData>;

export type MetadataAccountData = { discriminator: Uint8Array; capultOwnedPda: PublicKey; bump: number; url: string };

export type MetadataAccountDataArgs = { capultOwnedPda: PublicKey; bump: number; url: string };

export function getMetadataAccountDataSerializer(): Serializer<MetadataAccountDataArgs, MetadataAccountData> {
  return mapSerializer<MetadataAccountDataArgs, any, MetadataAccountData>(
    struct<MetadataAccountData>(
      [
        ['discriminator', bytes({ size: 8 })],
        ['capultOwnedPda', publicKeySerializer()],
        ['bump', u8()],
        ['url', string()],
      ],
      { description: 'MetadataAccountData' }
    ),
    (value) => ({ ...value, discriminator: new Uint8Array([72, 11, 121, 26, 111, 181, 85, 93]) })
  ) as Serializer<MetadataAccountDataArgs, MetadataAccountData>;
}

export function deserializeMetadata(rawAccount: RpcAccount): Metadata {
  return deserializeAccount(rawAccount, getMetadataAccountDataSerializer());
}

export async function fetchMetadata(
  context: Pick<Context, 'rpc'>,
  publicKey: PublicKey | Pda,
  options?: RpcGetAccountOptions
): Promise<Metadata> {
  const maybeAccount = await context.rpc.getAccount(toPublicKey(publicKey, false), options);
  assertAccountExists(maybeAccount, 'Metadata');
  return deserializeMetadata(maybeAccount);
}

export async function safeFetchMetadata(
  context: Pick<Context, 'rpc'>,
  publicKey: PublicKey | Pda,
  options?: RpcGetAccountOptions
): Promise<Metadata | null> {
  const maybeAccount = await context.rpc.getAccount(toPublicKey(publicKey, false), options);
  return maybeAccount.exists ? deserializeMetadata(maybeAccount) : null;
}

export async function fetchAllMetadata(
  context: Pick<Context, 'rpc'>,
  publicKeys: Array<PublicKey | Pda>,
  options?: RpcGetAccountsOptions
): Promise<Metadata[]> {
  const maybeAccounts = await context.rpc.getAccounts(
    publicKeys.map((key) => toPublicKey(key, false)),
    options
  );
  return maybeAccounts.map((maybeAccount) => {
    assertAccountExists(maybeAccount, 'Metadata');
    return deserializeMetadata(maybeAccount);
  });
}

export async function safeFetchAllMetadata(
  context: Pick<Context, 'rpc'>,
  publicKeys: Array<PublicKey | Pda>,
  options?: RpcGetAccountsOptions
): Promise<Metadata[]> {
  const maybeAccounts = await context.rpc.getAccounts(
    publicKeys.map((key) => toPublicKey(key, false)),
    options
  );
  return maybeAccounts
    .filter((maybeAccount) => maybeAccount.exists)
    .map((maybeAccount) => deserializeMetadata(maybeAccount as RpcAccount));
}

export function getMetadataGpaBuilder(context: Pick<Context, 'rpc' | 'programs'>) {
  const programId = context.programs.getPublicKey('capultMetadata', 'CPMDk1zycejhBAPLUiCrYfQWDD5Kdi19zzM4s1ts6EkQ');
  return gpaBuilder(context, programId)
    .registerFields<{ discriminator: Uint8Array; capultOwnedPda: PublicKey; bump: number; url: string }>({
      discriminator: [0, bytes({ size: 8 })],
      capultOwnedPda: [8, publicKeySerializer()],
      bump: [40, u8()],
      url: [41, string()],
    })
    .deserializeUsing<Metadata>((account) => deserializeMetadata(account))
    .whereField('discriminator', new Uint8Array([72, 11, 121, 26, 111, 181, 85, 93]));
}

export function findMetadataPda(
  context: Pick<Context, 'eddsa' | 'programs'>,
  seeds: {
    capultOwnedPda: PublicKey;
  }
): Pda {
  const programId = context.programs.getPublicKey('capultMetadata', 'CPMDk1zycejhBAPLUiCrYfQWDD5Kdi19zzM4s1ts6EkQ');
  return context.eddsa.findPda(programId, [
    bytes().serialize(new Uint8Array([67, 65, 80, 85, 76, 84, 95, 83, 69, 69, 68])),
    publicKeySerializer().serialize(seeds.capultOwnedPda),
    bytes().serialize(new Uint8Array([77, 69, 84, 65, 68, 65, 84, 65, 95, 83, 69, 69, 68])),
  ]);
}

export async function fetchMetadataFromSeeds(
  context: Pick<Context, 'eddsa' | 'programs' | 'rpc'>,
  seeds: Parameters<typeof findMetadataPda>[1],
  options?: RpcGetAccountOptions
): Promise<Metadata> {
  return fetchMetadata(context, findMetadataPda(context, seeds), options);
}

export async function safeFetchMetadataFromSeeds(
  context: Pick<Context, 'eddsa' | 'programs' | 'rpc'>,
  seeds: Parameters<typeof findMetadataPda>[1],
  options?: RpcGetAccountOptions
): Promise<Metadata | null> {
  return safeFetchMetadata(context, findMetadataPda(context, seeds), options);
}
