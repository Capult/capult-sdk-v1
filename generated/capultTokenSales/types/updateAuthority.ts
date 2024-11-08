/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import { PublicKey } from '@metaplex-foundation/umi';
import {
  GetDataEnumKind,
  GetDataEnumKindContent,
  Serializer,
  dataEnum,
  publicKey as publicKeySerializer,
  struct,
  tuple,
  unit,
} from '@metaplex-foundation/umi/serializers';

export type UpdateAuthority =
  | { __kind: 'None' }
  | { __kind: 'Address'; fields: [PublicKey] }
  | { __kind: 'Collection'; fields: [PublicKey] };

export type UpdateAuthorityArgs = UpdateAuthority;

export function getUpdateAuthoritySerializer(): Serializer<UpdateAuthorityArgs, UpdateAuthority> {
  return dataEnum<UpdateAuthority>(
    [
      ['None', unit()],
      [
        'Address',
        struct<GetDataEnumKindContent<UpdateAuthority, 'Address'>>([['fields', tuple([publicKeySerializer()])]]),
      ],
      [
        'Collection',
        struct<GetDataEnumKindContent<UpdateAuthority, 'Collection'>>([['fields', tuple([publicKeySerializer()])]]),
      ],
    ],
    { description: 'UpdateAuthority' }
  ) as Serializer<UpdateAuthorityArgs, UpdateAuthority>;
}

// Data Enum Helpers.
export function updateAuthority(kind: 'None'): GetDataEnumKind<UpdateAuthorityArgs, 'None'>;
export function updateAuthority(
  kind: 'Address',
  data: GetDataEnumKindContent<UpdateAuthorityArgs, 'Address'>['fields']
): GetDataEnumKind<UpdateAuthorityArgs, 'Address'>;
export function updateAuthority(
  kind: 'Collection',
  data: GetDataEnumKindContent<UpdateAuthorityArgs, 'Collection'>['fields']
): GetDataEnumKind<UpdateAuthorityArgs, 'Collection'>;
export function updateAuthority<K extends UpdateAuthorityArgs['__kind']>(
  kind: K,
  data?: any
): Extract<UpdateAuthorityArgs, { __kind: K }> {
  return Array.isArray(data) ? { __kind: kind, fields: data } : { __kind: kind, ...(data ?? {}) };
}
export function isUpdateAuthority<K extends UpdateAuthority['__kind']>(
  kind: K,
  value: UpdateAuthority
): value is UpdateAuthority & { __kind: K } {
  return value.__kind === kind;
}
