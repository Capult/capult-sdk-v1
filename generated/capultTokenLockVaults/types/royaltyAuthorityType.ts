/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import { Serializer, scalarEnum } from '@metaplex-foundation/umi/serializers';

export enum RoyaltyAuthorityType {
  ConfigAuthority,
  WithdrawAuthority,
}

export type RoyaltyAuthorityTypeArgs = RoyaltyAuthorityType;

export function getRoyaltyAuthorityTypeSerializer(): Serializer<RoyaltyAuthorityTypeArgs, RoyaltyAuthorityType> {
  return scalarEnum<RoyaltyAuthorityType>(RoyaltyAuthorityType, { description: 'RoyaltyAuthorityType' }) as Serializer<
    RoyaltyAuthorityTypeArgs,
    RoyaltyAuthorityType
  >;
}