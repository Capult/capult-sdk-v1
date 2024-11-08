/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import { Serializer, scalarEnum } from '@metaplex-foundation/umi/serializers';

export enum Key {
  Uninitialized,
  AssetV1,
  HashedAssetV1,
  PluginHeaderV1,
  PluginRegistryV1,
  CollectionV1,
}

export type KeyArgs = Key;

export function getKeySerializer(): Serializer<KeyArgs, Key> {
  return scalarEnum<Key>(Key, { description: 'Key' }) as Serializer<KeyArgs, Key>;
}
