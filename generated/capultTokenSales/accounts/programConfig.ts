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
  i64,
  mapSerializer,
  option,
  publicKey as publicKeySerializer,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';
import {
  FeeConfig,
  FeeConfigArgs,
  RewardConfig,
  RewardConfigArgs,
  getFeeConfigSerializer,
  getRewardConfigSerializer,
} from '../types';

export type ProgramConfig = Account<ProgramConfigAccountData>;

export type ProgramConfigAccountData = {
  discriminator: Uint8Array;
  feeConfigAuthority: Option<PublicKey>;
  rewardConfigAuthority: Option<PublicKey>;
  feeConfig: FeeConfig;
  rewardConfig: RewardConfig;
  initializedAt: bigint;
  bump: number;
};

export type ProgramConfigAccountDataArgs = {
  feeConfigAuthority: OptionOrNullable<PublicKey>;
  rewardConfigAuthority: OptionOrNullable<PublicKey>;
  feeConfig: FeeConfigArgs;
  rewardConfig: RewardConfigArgs;
  initializedAt: number | bigint;
  bump: number;
};

export function getProgramConfigAccountDataSerializer(): Serializer<
  ProgramConfigAccountDataArgs,
  ProgramConfigAccountData
> {
  return mapSerializer<ProgramConfigAccountDataArgs, any, ProgramConfigAccountData>(
    struct<ProgramConfigAccountData>(
      [
        ['discriminator', bytes({ size: 8 })],
        ['feeConfigAuthority', option(publicKeySerializer())],
        ['rewardConfigAuthority', option(publicKeySerializer())],
        ['feeConfig', getFeeConfigSerializer()],
        ['rewardConfig', getRewardConfigSerializer()],
        ['initializedAt', i64()],
        ['bump', u8()],
      ],
      { description: 'ProgramConfigAccountData' }
    ),
    (value) => ({ ...value, discriminator: new Uint8Array([196, 210, 90, 231, 144, 149, 140, 63]) })
  ) as Serializer<ProgramConfigAccountDataArgs, ProgramConfigAccountData>;
}

export function deserializeProgramConfig(rawAccount: RpcAccount): ProgramConfig {
  return deserializeAccount(rawAccount, getProgramConfigAccountDataSerializer());
}

export async function fetchProgramConfig(
  context: Pick<Context, 'rpc'>,
  publicKey: PublicKey | Pda,
  options?: RpcGetAccountOptions
): Promise<ProgramConfig> {
  const maybeAccount = await context.rpc.getAccount(toPublicKey(publicKey, false), options);
  assertAccountExists(maybeAccount, 'ProgramConfig');
  return deserializeProgramConfig(maybeAccount);
}

export async function safeFetchProgramConfig(
  context: Pick<Context, 'rpc'>,
  publicKey: PublicKey | Pda,
  options?: RpcGetAccountOptions
): Promise<ProgramConfig | null> {
  const maybeAccount = await context.rpc.getAccount(toPublicKey(publicKey, false), options);
  return maybeAccount.exists ? deserializeProgramConfig(maybeAccount) : null;
}

export async function fetchAllProgramConfig(
  context: Pick<Context, 'rpc'>,
  publicKeys: Array<PublicKey | Pda>,
  options?: RpcGetAccountsOptions
): Promise<ProgramConfig[]> {
  const maybeAccounts = await context.rpc.getAccounts(
    publicKeys.map((key) => toPublicKey(key, false)),
    options
  );
  return maybeAccounts.map((maybeAccount) => {
    assertAccountExists(maybeAccount, 'ProgramConfig');
    return deserializeProgramConfig(maybeAccount);
  });
}

export async function safeFetchAllProgramConfig(
  context: Pick<Context, 'rpc'>,
  publicKeys: Array<PublicKey | Pda>,
  options?: RpcGetAccountsOptions
): Promise<ProgramConfig[]> {
  const maybeAccounts = await context.rpc.getAccounts(
    publicKeys.map((key) => toPublicKey(key, false)),
    options
  );
  return maybeAccounts
    .filter((maybeAccount) => maybeAccount.exists)
    .map((maybeAccount) => deserializeProgramConfig(maybeAccount as RpcAccount));
}

export function getProgramConfigGpaBuilder(context: Pick<Context, 'rpc' | 'programs'>) {
  const programId = context.programs.getPublicKey('capultTokenSales', 'CPTSoDzrvBad8fW2DWRgXhb2R5pa8sVdBJvZhfhuyYKe');
  return gpaBuilder(context, programId)
    .registerFields<{
      discriminator: Uint8Array;
      feeConfigAuthority: OptionOrNullable<PublicKey>;
      rewardConfigAuthority: OptionOrNullable<PublicKey>;
      feeConfig: FeeConfigArgs;
      rewardConfig: RewardConfigArgs;
      initializedAt: number | bigint;
      bump: number;
    }>({
      discriminator: [0, bytes({ size: 8 })],
      feeConfigAuthority: [8, option(publicKeySerializer())],
      rewardConfigAuthority: [null, option(publicKeySerializer())],
      feeConfig: [null, getFeeConfigSerializer()],
      rewardConfig: [null, getRewardConfigSerializer()],
      initializedAt: [null, i64()],
      bump: [null, u8()],
    })
    .deserializeUsing<ProgramConfig>((account) => deserializeProgramConfig(account))
    .whereField('discriminator', new Uint8Array([196, 210, 90, 231, 144, 149, 140, 63]));
}
