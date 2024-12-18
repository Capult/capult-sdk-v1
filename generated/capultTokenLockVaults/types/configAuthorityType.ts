/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import { Serializer, scalarEnum } from '@metaplex-foundation/umi/serializers';

export enum ConfigAuthorityType {
  FeeConfig,
  RewardConfig,
}

export type ConfigAuthorityTypeArgs = ConfigAuthorityType;

export function getConfigAuthorityTypeSerializer(): Serializer<ConfigAuthorityTypeArgs, ConfigAuthorityType> {
  return scalarEnum<ConfigAuthorityType>(ConfigAuthorityType, { description: 'ConfigAuthorityType' }) as Serializer<
    ConfigAuthorityTypeArgs,
    ConfigAuthorityType
  >;
}
