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
  Option,
  OptionOrNullable,
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
  option,
  publicKey as publicKeySerializer,
  string,
  struct,
  u64,
} from '@metaplex-foundation/umi/serializers';
import {
  Key,
  KeyArgs,
  UpdateAuthority,
  UpdateAuthorityArgs,
  getKeySerializer,
  getUpdateAuthoritySerializer,
} from '../types';

export type BaseAssetV1 = Account<BaseAssetV1AccountData>;

export type BaseAssetV1AccountData = {
  discriminator: Uint8Array;
  key: Key;
  owner: PublicKey;
  updateAuthority: UpdateAuthority;
  name: string;
  uri: string;
  seq: Option<bigint>;
};

export type BaseAssetV1AccountDataArgs = {
  key: KeyArgs;
  owner: PublicKey;
  updateAuthority: UpdateAuthorityArgs;
  name: string;
  uri: string;
  seq: OptionOrNullable<number | bigint>;
};

export function getBaseAssetV1AccountDataSerializer(): Serializer<BaseAssetV1AccountDataArgs, BaseAssetV1AccountData> {
  return mapSerializer<BaseAssetV1AccountDataArgs, any, BaseAssetV1AccountData>(
    struct<BaseAssetV1AccountData>(
      [
        ['discriminator', bytes({ size: 8 })],
        ['key', getKeySerializer()],
        ['owner', publicKeySerializer()],
        ['updateAuthority', getUpdateAuthoritySerializer()],
        ['name', string()],
        ['uri', string()],
        ['seq', option(u64())],
      ],
      { description: 'BaseAssetV1AccountData' }
    ),
    (value) => ({ ...value, discriminator: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]) })
  ) as Serializer<BaseAssetV1AccountDataArgs, BaseAssetV1AccountData>;
}

export function deserializeBaseAssetV1(rawAccount: RpcAccount): BaseAssetV1 {
  return deserializeAccount(rawAccount, getBaseAssetV1AccountDataSerializer());
}

export async function fetchBaseAssetV1(
  context: Pick<Context, 'rpc'>,
  publicKey: PublicKey | Pda,
  options?: RpcGetAccountOptions
): Promise<BaseAssetV1> {
  const maybeAccount = await context.rpc.getAccount(toPublicKey(publicKey, false), options);
  assertAccountExists(maybeAccount, 'BaseAssetV1');
  return deserializeBaseAssetV1(maybeAccount);
}

export async function safeFetchBaseAssetV1(
  context: Pick<Context, 'rpc'>,
  publicKey: PublicKey | Pda,
  options?: RpcGetAccountOptions
): Promise<BaseAssetV1 | null> {
  const maybeAccount = await context.rpc.getAccount(toPublicKey(publicKey, false), options);
  return maybeAccount.exists ? deserializeBaseAssetV1(maybeAccount) : null;
}

export async function fetchAllBaseAssetV1(
  context: Pick<Context, 'rpc'>,
  publicKeys: Array<PublicKey | Pda>,
  options?: RpcGetAccountsOptions
): Promise<BaseAssetV1[]> {
  const maybeAccounts = await context.rpc.getAccounts(
    publicKeys.map((key) => toPublicKey(key, false)),
    options
  );
  return maybeAccounts.map((maybeAccount) => {
    assertAccountExists(maybeAccount, 'BaseAssetV1');
    return deserializeBaseAssetV1(maybeAccount);
  });
}

export async function safeFetchAllBaseAssetV1(
  context: Pick<Context, 'rpc'>,
  publicKeys: Array<PublicKey | Pda>,
  options?: RpcGetAccountsOptions
): Promise<BaseAssetV1[]> {
  const maybeAccounts = await context.rpc.getAccounts(
    publicKeys.map((key) => toPublicKey(key, false)),
    options
  );
  return maybeAccounts
    .filter((maybeAccount) => maybeAccount.exists)
    .map((maybeAccount) => deserializeBaseAssetV1(maybeAccount as RpcAccount));
}

export function getBaseAssetV1GpaBuilder(context: Pick<Context, 'rpc' | 'programs'>) {
  const programId = context.programs.getPublicKey('capultTokenSales', 'CPTSoDzrvBad8fW2DWRgXhb2R5pa8sVdBJvZhfhuyYKe');
  return gpaBuilder(context, programId)
    .registerFields<{
      discriminator: Uint8Array;
      key: KeyArgs;
      owner: PublicKey;
      updateAuthority: UpdateAuthorityArgs;
      name: string;
      uri: string;
      seq: OptionOrNullable<number | bigint>;
    }>({
      discriminator: [0, bytes({ size: 8 })],
      key: [8, getKeySerializer()],
      owner: [9, publicKeySerializer()],
      updateAuthority: [41, getUpdateAuthoritySerializer()],
      name: [null, string()],
      uri: [null, string()],
      seq: [null, option(u64())],
    })
    .deserializeUsing<BaseAssetV1>((account) => deserializeBaseAssetV1(account))
    .whereField('discriminator', new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]));
}
