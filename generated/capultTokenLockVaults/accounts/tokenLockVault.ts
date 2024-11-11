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
  bool,
  bytes,
  mapSerializer,
  option,
  publicKey as publicKeySerializer,
  struct,
  u64,
  u8,
} from '@metaplex-foundation/umi/serializers';
import {
  AutoClaimConfig,
  AutoClaimConfigArgs,
  UnlockSchedule,
  UnlockScheduleArgs,
  getAutoClaimConfigSerializer,
  getUnlockScheduleSerializer,
} from '../types';

export type TokenLockVault = Account<TokenLockVaultAccountData>;

export type TokenLockVaultAccountData = {
  discriminator: Uint8Array;
  withdrawAuthority: PublicKey;
  tokenMint: PublicKey;
  delegatedAuthority: Option<PublicKey>;
  permanentAuthority: boolean;
  royaltyConfig: Option<PublicKey>;
  unlockSchedule: UnlockSchedule;
  autoClaimConfig: Option<AutoClaimConfig>;
  withdrawnAmount: bigint;
  vaultInitKey: PublicKey;
  initializedAt: bigint;
  bump: number;
};

export type TokenLockVaultAccountDataArgs = {
  withdrawAuthority: PublicKey;
  tokenMint: PublicKey;
  delegatedAuthority: OptionOrNullable<PublicKey>;
  permanentAuthority: boolean;
  royaltyConfig: OptionOrNullable<PublicKey>;
  unlockSchedule: UnlockScheduleArgs;
  autoClaimConfig: OptionOrNullable<AutoClaimConfigArgs>;
  withdrawnAmount: number | bigint;
  vaultInitKey: PublicKey;
  initializedAt: number | bigint;
  bump: number;
};

export function getTokenLockVaultAccountDataSerializer(): Serializer<
  TokenLockVaultAccountDataArgs,
  TokenLockVaultAccountData
> {
  return mapSerializer<TokenLockVaultAccountDataArgs, any, TokenLockVaultAccountData>(
    struct<TokenLockVaultAccountData>(
      [
        ['discriminator', bytes({ size: 8 })],
        ['withdrawAuthority', publicKeySerializer()],
        ['tokenMint', publicKeySerializer()],
        ['delegatedAuthority', option(publicKeySerializer())],
        ['permanentAuthority', bool()],
        ['royaltyConfig', option(publicKeySerializer())],
        ['unlockSchedule', getUnlockScheduleSerializer()],
        ['autoClaimConfig', option(getAutoClaimConfigSerializer())],
        ['withdrawnAmount', u64()],
        ['vaultInitKey', publicKeySerializer()],
        ['initializedAt', u64()],
        ['bump', u8()],
      ],
      { description: 'TokenLockVaultAccountData' }
    ),
    (value) => ({ ...value, discriminator: new Uint8Array([68, 170, 38, 203, 120, 109, 181, 189]) })
  ) as Serializer<TokenLockVaultAccountDataArgs, TokenLockVaultAccountData>;
}

export function deserializeTokenLockVault(rawAccount: RpcAccount): TokenLockVault {
  return deserializeAccount(rawAccount, getTokenLockVaultAccountDataSerializer());
}

export async function fetchTokenLockVault(
  context: Pick<Context, 'rpc'>,
  publicKey: PublicKey | Pda,
  options?: RpcGetAccountOptions
): Promise<TokenLockVault> {
  const maybeAccount = await context.rpc.getAccount(toPublicKey(publicKey, false), options);
  assertAccountExists(maybeAccount, 'TokenLockVault');
  return deserializeTokenLockVault(maybeAccount);
}

export async function safeFetchTokenLockVault(
  context: Pick<Context, 'rpc'>,
  publicKey: PublicKey | Pda,
  options?: RpcGetAccountOptions
): Promise<TokenLockVault | null> {
  const maybeAccount = await context.rpc.getAccount(toPublicKey(publicKey, false), options);
  return maybeAccount.exists ? deserializeTokenLockVault(maybeAccount) : null;
}

export async function fetchAllTokenLockVault(
  context: Pick<Context, 'rpc'>,
  publicKeys: Array<PublicKey | Pda>,
  options?: RpcGetAccountsOptions
): Promise<TokenLockVault[]> {
  const maybeAccounts = await context.rpc.getAccounts(
    publicKeys.map((key) => toPublicKey(key, false)),
    options
  );
  return maybeAccounts.map((maybeAccount) => {
    assertAccountExists(maybeAccount, 'TokenLockVault');
    return deserializeTokenLockVault(maybeAccount);
  });
}

export async function safeFetchAllTokenLockVault(
  context: Pick<Context, 'rpc'>,
  publicKeys: Array<PublicKey | Pda>,
  options?: RpcGetAccountsOptions
): Promise<TokenLockVault[]> {
  const maybeAccounts = await context.rpc.getAccounts(
    publicKeys.map((key) => toPublicKey(key, false)),
    options
  );
  return maybeAccounts
    .filter((maybeAccount) => maybeAccount.exists)
    .map((maybeAccount) => deserializeTokenLockVault(maybeAccount as RpcAccount));
}

export function getTokenLockVaultGpaBuilder(context: Pick<Context, 'rpc' | 'programs'>) {
  const programId = context.programs.getPublicKey(
    'capultTokenLockVaults',
    'CPTLVeSKEXbPNZ4WnHTTGBX4J2uV3ktv3YkL9i7wSPwC'
  );
  return gpaBuilder(context, programId)
    .registerFields<{
      discriminator: Uint8Array;
      withdrawAuthority: PublicKey;
      tokenMint: PublicKey;
      delegatedAuthority: OptionOrNullable<PublicKey>;
      permanentAuthority: boolean;
      royaltyConfig: OptionOrNullable<PublicKey>;
      unlockSchedule: UnlockScheduleArgs;
      autoClaimConfig: OptionOrNullable<AutoClaimConfigArgs>;
      withdrawnAmount: number | bigint;
      vaultInitKey: PublicKey;
      initializedAt: number | bigint;
      bump: number;
    }>({
      discriminator: [0, bytes({ size: 8 })],
      withdrawAuthority: [8, publicKeySerializer()],
      tokenMint: [40, publicKeySerializer()],
      delegatedAuthority: [72, option(publicKeySerializer())],
      permanentAuthority: [null, bool()],
      royaltyConfig: [null, option(publicKeySerializer())],
      unlockSchedule: [null, getUnlockScheduleSerializer()],
      autoClaimConfig: [null, option(getAutoClaimConfigSerializer())],
      withdrawnAmount: [null, u64()],
      vaultInitKey: [null, publicKeySerializer()],
      initializedAt: [null, u64()],
      bump: [null, u8()],
    })
    .deserializeUsing<TokenLockVault>((account) => deserializeTokenLockVault(account))
    .whereField('discriminator', new Uint8Array([68, 170, 38, 203, 120, 109, 181, 189]));
}

export function findTokenLockVaultPda(
  context: Pick<Context, 'eddsa' | 'programs'>,
  seeds: {
    vaultInitKey: PublicKey;
  }
): Pda {
  const programId = context.programs.getPublicKey(
    'capultTokenLockVaults',
    'CPTLVeSKEXbPNZ4WnHTTGBX4J2uV3ktv3YkL9i7wSPwC'
  );
  return context.eddsa.findPda(programId, [
    bytes().serialize(new Uint8Array([67, 65, 80, 85, 76, 84, 95, 83, 69, 69, 68])),
    publicKeySerializer().serialize(seeds.vaultInitKey),
    bytes().serialize(
      new Uint8Array([84, 79, 75, 69, 78, 95, 76, 79, 67, 75, 95, 86, 65, 85, 76, 84, 95, 83, 69, 69, 68])
    ),
  ]);
}

export async function fetchTokenLockVaultFromSeeds(
  context: Pick<Context, 'eddsa' | 'programs' | 'rpc'>,
  seeds: Parameters<typeof findTokenLockVaultPda>[1],
  options?: RpcGetAccountOptions
): Promise<TokenLockVault> {
  return fetchTokenLockVault(context, findTokenLockVaultPda(context, seeds), options);
}

export async function safeFetchTokenLockVaultFromSeeds(
  context: Pick<Context, 'eddsa' | 'programs' | 'rpc'>,
  seeds: Parameters<typeof findTokenLockVaultPda>[1],
  options?: RpcGetAccountOptions
): Promise<TokenLockVault | null> {
  return safeFetchTokenLockVault(context, findTokenLockVaultPda(context, seeds), options);
}
